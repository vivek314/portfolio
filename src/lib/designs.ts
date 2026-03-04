// ─── System Design Entries ────────────────────────────────────────────────────
// Add new HLD or LLD entries here. Each entry renders as a card in the
// System Design section and expands to a full detail view.

export type DesignType = "hld" | "lld";

export interface DesignDecision {
  component: string;
  choice: string;
  justification: string;
}

export interface DesignEntry {
  id: string;
  type: DesignType;
  topic: string;
  subtitle: string;
  tags: string[];
  diagramImage?: string; // path relative to /public, e.g. "/images/hld-twitter.png"
  summary: string;      // 1-2 sentence overview shown on the card
  decisions: DesignDecision[];
  tradeoffs?: string[];
}

export const designs: DesignEntry[] = [
  // ── HLD ──────────────────────────────────────────────────────────────────
  {
    id: "hld-twitter",
    type: "hld",
    topic: "Twitter (X)",
    subtitle: "Designing a real-time social media feed at scale",
    tags: ["Kafka", "Redis", "Elasticsearch", "Graph DB", "CDC", "CDN"],
    diagramImage: "/images/hld-twitter.png", // <-- User: drop diagram here
    summary:
      "A distributed, microservices-based architecture for Twitter handling tweet publishing, timeline delivery, media serving, and full-text search at hundreds of millions of users.",
    decisions: [
      {
        component: "Load Balancer — Layer 7 (Application), Round Robin",
        choice: "Layer 7 Application Load Balancer with Round-Robin distribution",
        justification:
          "L7 load balancing gives us content-based routing (e.g. routing /media/* to media service) and enables request-level features like sticky sessions, health checks, and SSL termination. Round Robin is simple and effective when services are stateless and homogeneous.",
      },
      {
        component: "Rate Limiter",
        choice: "API-gateway-level Rate Limiter (Redis token bucket)",
        justification:
          "Positioned before services to neutralize bot activity and unusual flood patterns early — protecting downstream services from cascade overload. Redis is ideal here: sub-millisecond counter reads/writes, TTL-based window resets, and shared state across multiple gateway nodes.",
      },
      {
        component: "Tweet Content Storage",
        choice: "MongoDB (Document DB)",
        justification:
          "Tweets are self-contained documents with variable fields (media, hashtags, reply refs, quoted tweets). MongoDB's flexible schema handles this naturally without JOIN overhead. Horizontal sharding by tweet_id ensures linear write scalability across shards.",
      },
      {
        component: "Reply Storage",
        choice: "Separate Reply DB, indexed by tweet_id",
        justification:
          "Decoupling replies from tweets avoids hot-document contention on popular tweets. Indexing by parent tweet_id enables O(log n) lookups for reply threads. This also lets us scale the Reply service independently if reply-heavy threads (like viral tweets) spike.",
      },
      {
        component: "Profile Storage",
        choice: "Relational Database (SQL — PostgreSQL / MySQL)",
        justification:
          "User profiles are highly structured, require strong consistency (no two users share a handle), and need ACID guarantees for account updates. SQL gives us referential integrity and proven reliability for this critical user identity layer.",
      },
      {
        component: "Follower Graph",
        choice: "Graph Database (e.g. Neo4j / Amazon Neptune)",
        justification:
          "The follower-following relationship is a dense, bidirectional social graph. Graph DBs model this natively — traversing N-hop relationships (followers-of-followers) that would be expensive multi-JOIN queries in relational or doc stores. Essential for feed generation and recommendations.",
      },
      {
        component: "Search",
        choice: "Elasticsearch with reverse indexing on tweet content, username, hashtags",
        justification:
          "Elasticsearch provides sub-second full-text search via inverted indexes across tweet text, @mentions, and #hashtags. Its denormalized, index-friendly structure is orders of magnitude faster than SQL LIKE queries at scale. Real-time indexing via CDC keeps search fresh without hitting primary stores.",
      },
      {
        component: "Redis",
        choice: "Redis — in-memory cache for hot reads",
        justification:
          "Tweet read amplification is massive (one tweet → millions of reads). Redis caches hot tweets, user sessions, and rate limiter counters in memory, serving reads at microsecond latency. This dramatically reduces load on MongoDB and the DB layer.",
      },
      {
        component: "CDC → Message Queue (Kafka)",
        choice: "Change Data Capture feeding a Kafka message queue",
        justification:
          "CDC (e.g. Debezium on MongoDB) captures every write event and streams it to Kafka without coupling services. Kafka acts as the durable, ordered event log — decoupling tweet creation from all downstream consumers (timeline fanout, search indexing, analytics) in a fully async, resilient manner.",
      },
      {
        component: "Timeline Fanout",
        choice: "Hybrid: Fanout-on-write for regular users, Fanout-on-read for celebrities",
        justification:
          "Pure fanout-on-write: when a tweet is published, push to every follower's timeline cache immediately → O(F) writes per tweet. This works perfectly for normal users (small follower counts). But for accounts with millions of followers (celebrities), this would be catastrophically expensive. Hybrid approach: celebrity tweets are NOT pre-fanned-out; instead, when a user opens their timeline the system fetches celebrity tweets on-demand (fanout-on-read) and merges them with pre-computed feed items.",
      },
      {
        component: "Timeline Cache",
        choice: "Per-user Redis sorted set (timeline cache)",
        justification:
          "Each follower's timeline is stored as a Redis sorted set keyed by tweet timestamp. This allows O(log n) insertion during fanout and O(1) range reads when a user opens their feed. Eviction policies ensure memory is reclaimed for inactive users.",
      },
      {
        component: "Media & CDN",
        choice: "Object storage (S3) served via CDN",
        justification:
          "Media (images, videos) are write-once, read-many — a perfect CDN use case. Storing in S3 and serving through a CDN edge network (CloudFront / Cloudflare) moves media bandwidth off origin servers entirely, reducing latency globally and dramatically cutting egress costs.",
      },
    ],
    tradeoffs: [
      "Fanout-on-write increases write amplification for popular posts — mitigated by the celebrity hybrid model.",
      "Eventual consistency in timeline delivery: a newly posted tweet may not appear in all follower caches simultaneously.",
      "Elasticsearch replication lag (from CDC) means search results may lag writes by a few seconds.",
      "Graph DB introduces an additional service to maintain; simpler alternatives like an adjacency list in Redis could work at smaller scale.",
    ],
  },

  // ── LLD ──────────────────────────────────────────────────────────────────
  // Add LLD entries below — e.g. Coffee Machine, Parking Lot, etc.
  // {
  //   id: "lld-coffee-machine",
  //   type: "lld",
  //   topic: "Coffee Machine",
  //   ...
  // }
];
