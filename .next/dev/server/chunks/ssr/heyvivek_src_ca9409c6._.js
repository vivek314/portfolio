module.exports = [
"[project]/heyvivek/src/lib/designs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─── System Design Entries ────────────────────────────────────────────────────
// Add new HLD or LLD entries here. Each entry renders as a card in the
// System Design section and expands to a full detail view.
__turbopack_context__.s([
    "designs",
    ()=>designs
]);
const designs = [
    // ── HLD ──────────────────────────────────────────────────────────────────
    {
        id: "hld-twitter",
        type: "hld",
        topic: "Twitter (X)",
        subtitle: "Designing a real-time social media feed at scale",
        tags: [
            "Kafka",
            "Redis",
            "Elasticsearch",
            "Graph DB",
            "CDC",
            "CDN"
        ],
        diagramImage: "/images/hld-twitter.png",
        summary: "A distributed, microservices-based architecture for Twitter handling tweet publishing, timeline delivery, media serving, and full-text search at hundreds of millions of users.",
        decisions: [
            {
                component: "Load Balancer — Layer 7 (Application), Round Robin",
                choice: "Layer 7 Application Load Balancer with Round-Robin distribution",
                justification: "L7 load balancing gives us content-based routing (e.g. routing /media/* to media service) and enables request-level features like sticky sessions, health checks, and SSL termination. Round Robin is simple and effective when services are stateless and homogeneous."
            },
            {
                component: "Rate Limiter",
                choice: "API-gateway-level Rate Limiter (Redis token bucket)",
                justification: "Positioned before services to neutralize bot activity and unusual flood patterns early — protecting downstream services from cascade overload. Redis is ideal here: sub-millisecond counter reads/writes, TTL-based window resets, and shared state across multiple gateway nodes."
            },
            {
                component: "Tweet Content Storage",
                choice: "MongoDB (Document DB)",
                justification: "Tweets are self-contained documents with variable fields (media, hashtags, reply refs, quoted tweets). MongoDB's flexible schema handles this naturally without JOIN overhead. Horizontal sharding by tweet_id ensures linear write scalability across shards."
            },
            {
                component: "Reply Storage",
                choice: "Separate Reply DB, indexed by tweet_id",
                justification: "Decoupling replies from tweets avoids hot-document contention on popular tweets. Indexing by parent tweet_id enables O(log n) lookups for reply threads. This also lets us scale the Reply service independently if reply-heavy threads (like viral tweets) spike."
            },
            {
                component: "Profile Storage",
                choice: "Relational Database (SQL — PostgreSQL / MySQL)",
                justification: "User profiles are highly structured, require strong consistency (no two users share a handle), and need ACID guarantees for account updates. SQL gives us referential integrity and proven reliability for this critical user identity layer."
            },
            {
                component: "Follower Graph",
                choice: "Graph Database (e.g. Neo4j / Amazon Neptune)",
                justification: "The follower-following relationship is a dense, bidirectional social graph. Graph DBs model this natively — traversing N-hop relationships (followers-of-followers) that would be expensive multi-JOIN queries in relational or doc stores. Essential for feed generation and recommendations."
            },
            {
                component: "Search",
                choice: "Elasticsearch with reverse indexing on tweet content, username, hashtags",
                justification: "Elasticsearch provides sub-second full-text search via inverted indexes across tweet text, @mentions, and #hashtags. Its denormalized, index-friendly structure is orders of magnitude faster than SQL LIKE queries at scale. Real-time indexing via CDC keeps search fresh without hitting primary stores."
            },
            {
                component: "Redis",
                choice: "Redis — in-memory cache for hot reads",
                justification: "Tweet read amplification is massive (one tweet → millions of reads). Redis caches hot tweets, user sessions, and rate limiter counters in memory, serving reads at microsecond latency. This dramatically reduces load on MongoDB and the DB layer."
            },
            {
                component: "CDC → Message Queue (Kafka)",
                choice: "Change Data Capture feeding a Kafka message queue",
                justification: "CDC (e.g. Debezium on MongoDB) captures every write event and streams it to Kafka without coupling services. Kafka acts as the durable, ordered event log — decoupling tweet creation from all downstream consumers (timeline fanout, search indexing, analytics) in a fully async, resilient manner."
            },
            {
                component: "Timeline Fanout",
                choice: "Hybrid: Fanout-on-write for regular users, Fanout-on-read for celebrities",
                justification: "Pure fanout-on-write: when a tweet is published, push to every follower's timeline cache immediately → O(F) writes per tweet. This works perfectly for normal users (small follower counts). But for accounts with millions of followers (celebrities), this would be catastrophically expensive. Hybrid approach: celebrity tweets are NOT pre-fanned-out; instead, when a user opens their timeline the system fetches celebrity tweets on-demand (fanout-on-read) and merges them with pre-computed feed items."
            },
            {
                component: "Timeline Cache",
                choice: "Per-user Redis sorted set (timeline cache)",
                justification: "Each follower's timeline is stored as a Redis sorted set keyed by tweet timestamp. This allows O(log n) insertion during fanout and O(1) range reads when a user opens their feed. Eviction policies ensure memory is reclaimed for inactive users."
            },
            {
                component: "Media & CDN",
                choice: "Object storage (S3) served via CDN",
                justification: "Media (images, videos) are write-once, read-many — a perfect CDN use case. Storing in S3 and serving through a CDN edge network (CloudFront / Cloudflare) moves media bandwidth off origin servers entirely, reducing latency globally and dramatically cutting egress costs."
            }
        ],
        tradeoffs: [
            "Fanout-on-write increases write amplification for popular posts — mitigated by the celebrity hybrid model.",
            "Eventual consistency in timeline delivery: a newly posted tweet may not appear in all follower caches simultaneously.",
            "Elasticsearch replication lag (from CDC) means search results may lag writes by a few seconds.",
            "Graph DB introduces an additional service to maintain; simpler alternatives like an adjacency list in Redis could work at smaller scale."
        ]
    }
];
}),
"[project]/heyvivek/src/components/sections/SystemDesign.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SystemDesign
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$designs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/heyvivek/src/lib/designs.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// ─── Detail Modal ──────────────────────────────────────────────────────────────
function DesignModal({ entry, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            onClick: onClose,
            style: {
                position: "fixed",
                inset: 0,
                background: "rgba(61, 50, 41, 0.5)",
                backdropFilter: "blur(6px)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                },
                animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                },
                transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 24
                },
                onClick: (e)=>e.stopPropagation(),
                style: {
                    background: "var(--clay-bg)",
                    borderRadius: "24px",
                    maxWidth: "860px",
                    width: "100%",
                    maxHeight: "88vh",
                    overflowY: "auto",
                    boxShadow: "0 32px 80px rgba(61,50,41,0.25)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "32px 36px 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            marginBottom: "10px",
                                            flexWrap: "wrap"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "clay-pill",
                                                style: {
                                                    background: entry.type === "hld" ? "rgba(198,123,92,0.15)" : "rgba(143,174,139,0.15)",
                                                    color: entry.type === "hld" ? "#8B4513" : "#4A7A47",
                                                    border: `1px solid ${entry.type === "hld" ? "rgba(198,123,92,0.3)" : "rgba(143,174,139,0.3)"}`,
                                                    fontWeight: 700,
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    fontSize: "11px"
                                                },
                                                children: entry.type.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this),
                                            entry.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "clay-pill clay-pill-tool",
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(28px, 4vw, 40px)",
                                            color: "#3D3229",
                                            lineHeight: 1.1,
                                            marginBottom: "6px"
                                        },
                                        children: entry.topic
                                    }, void 0, false, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontFamily: "var(--font-body)",
                                            fontSize: "14px",
                                            color: "#7A6E62"
                                        },
                                        children: entry.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    flexShrink: 0,
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    background: "var(--clay-card)",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "18px",
                                    color: "#7A6E62",
                                    boxShadow: "3px 3px 8px #C8BFB0, -3px -3px 8px #FFFFFF"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "24px 36px 36px"
                        },
                        children: [
                            entry.diagramImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: "100%",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    marginBottom: "36px",
                                    background: "#1a1a2e",
                                    minHeight: "300px",
                                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: entry.diagramImage,
                                    alt: `${entry.topic} architecture diagram`,
                                    width: 860,
                                    height: 440,
                                    style: {
                                        width: "100%",
                                        height: "auto",
                                        display: "block"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 145,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "var(--font-body)",
                                    fontSize: "15px",
                                    color: "#7A6E62",
                                    lineHeight: 1.8,
                                    marginBottom: "32px",
                                    padding: "20px 24px",
                                    background: "var(--clay-card)",
                                    borderRadius: "14px",
                                    borderLeft: "3px solid #C67B5C"
                                },
                                children: entry.summary
                            }, void 0, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontFamily: "var(--font-body)",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#C67B5C",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    marginBottom: "20px"
                                },
                                children: "Design Decisions & Justifications"
                            }, void 0, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "14px",
                                    marginBottom: "32px"
                                },
                                children: entry.decisions.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "clay-card",
                                        style: {
                                            padding: "20px 24px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    gap: "12px",
                                                    marginBottom: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            flexShrink: 0,
                                                            width: "24px",
                                                            height: "24px",
                                                            borderRadius: "50%",
                                                            background: "rgba(198,123,92,0.15)",
                                                            color: "#C67B5C",
                                                            fontFamily: "var(--font-body)",
                                                            fontSize: "11px",
                                                            fontWeight: 700,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        },
                                                        children: i + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "var(--font-body)",
                                                            fontSize: "13px",
                                                            fontWeight: 700,
                                                            color: "#3D3229",
                                                            lineHeight: 1.4
                                                        },
                                                        children: d.component
                                                    }, void 0, false, {
                                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                lineNumber: 194,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontFamily: "var(--font-body)",
                                                    fontSize: "14px",
                                                    color: "#7A6E62",
                                                    lineHeight: 1.75,
                                                    paddingLeft: "36px"
                                                },
                                                children: d.justification
                                            }, void 0, false, {
                                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            entry.tradeoffs && entry.tradeoffs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: "var(--font-body)",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                            color: "#C67B5C",
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            marginBottom: "16px"
                                        },
                                        children: "Trade-offs & Limitations"
                                    }, void 0, false, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 250,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "clay-card",
                                        style: {
                                            padding: "20px 24px"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            style: {
                                                listStyle: "none",
                                                margin: 0,
                                                padding: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px"
                                            },
                                            children: entry.tradeoffs.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    style: {
                                                        fontFamily: "var(--font-body)",
                                                        fontSize: "14px",
                                                        color: "#7A6E62",
                                                        lineHeight: 1.7,
                                                        paddingLeft: "20px",
                                                        position: "relative"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                position: "absolute",
                                                                left: 0,
                                                                color: "#C67B5C",
                                                                fontWeight: 700
                                                            },
                                                            children: "⚖"
                                                        }, void 0, false, {
                                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 25
                                                        }, this),
                                                        t
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 267,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, "modal", true, {
                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        }, "backdrop", false, {
            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
// ─── Design Card ───────────────────────────────────────────────────────────────
function DesignCard({ entry, index, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: "-60px"
        },
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: index * 0.1
        },
        className: "clay-card",
        onClick: onClick,
        style: {
            cursor: "pointer",
            overflow: "hidden"
        },
        whileHover: {
            y: -6,
            scale: 1.01
        },
        whileTap: {
            scale: 0.98
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "relative",
                    width: "100%",
                    height: "180px",
                    background: "#1a1a2e",
                    overflow: "hidden"
                },
                children: [
                    entry.diagramImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: entry.diagramImage,
                        alt: entry.topic,
                        fill: true,
                        style: {
                            objectFit: "cover",
                            objectPosition: "top left"
                        }
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 337,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: "48px",
                                opacity: 0.3
                            },
                            children: "🗺"
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            background: entry.type === "hld" ? "rgba(198,123,92,0.9)" : "rgba(143,174,139,0.9)",
                            color: "white",
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "4px 10px",
                            borderRadius: "6px"
                        },
                        children: entry.type.toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "22px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: "var(--font-body)",
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#3D3229",
                            marginBottom: "6px"
                        },
                        children: entry.topic
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "#7A6E62",
                            marginBottom: "14px",
                            lineHeight: 1.5
                        },
                        children: entry.subtitle
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            marginBottom: "18px"
                        },
                        children: [
                            entry.tags.slice(0, 5).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "clay-pill clay-pill-tool",
                                    children: tag
                                }, tag, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)),
                            entry.tags.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "clay-pill clay-pill-tool",
                                children: [
                                    "+",
                                    entry.tags.length - 5
                                ]
                            }, void 0, true, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 410,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#C67B5C"
                        },
                        children: "View Design ↗"
                    }, void 0, false, {
                        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
        lineNumber: 315,
        columnNumber: 5
    }, this);
}
function SystemDesign() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("hld");
    const [selectedEntry, setSelectedEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$designs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["designs"].filter((d)=>d.type === activeTab);
    const tabs = [
        {
            key: "hld",
            label: "HLD",
            desc: "High-Level Design"
        },
        {
            key: "lld",
            label: "LLD",
            desc: "Low-Level Design"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "system-design",
                style: {
                    minHeight: "100vh",
                    padding: "128px 24px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "900px",
                        margin: "0 auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                duration: 0.6
                            },
                            style: {
                                marginBottom: "48px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontFamily: "var(--font-display)",
                                        fontSize: "clamp(40px, 6vw, 56px)",
                                        color: "#3D3229",
                                        marginBottom: "12px"
                                    },
                                    children: "System Design"
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 459,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-body)",
                                        fontSize: "16px",
                                        color: "#7A6E62"
                                    },
                                    children: "Architecture deep-dives with design decisions & trade-offs ✦"
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 469,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "inline-flex",
                                gap: "4px",
                                padding: "6px",
                                borderRadius: "60px",
                                background: "var(--clay-card)",
                                boxShadow: "inset 3px 3px 8px #C8BFB0, inset -3px -3px 8px #FFFFFF",
                                marginBottom: "48px"
                            },
                            children: tabs.map((tab)=>{
                                const count = __TURBOPACK__imported__module__$5b$project$5d2f$heyvivek$2f$src$2f$lib$2f$designs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["designs"].filter((d)=>d.type === tab.key).length;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.key),
                                    style: {
                                        padding: "10px 28px",
                                        borderRadius: "50px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontFamily: "var(--font-body)",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        transition: "all 0.25s",
                                        background: activeTab === tab.key ? "#C67B5C" : "transparent",
                                        color: activeTab === tab.key ? "white" : "#7A6E62",
                                        boxShadow: activeTab === tab.key ? "3px 3px 8px rgba(198,123,92,0.4), -2px -2px 6px rgba(255,255,255,0.2)" : "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    },
                                    children: [
                                        tab.label,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "50%",
                                                background: activeTab === tab.key ? "rgba(255,255,255,0.25)" : "rgba(198,123,92,0.12)",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                color: activeTab === tab.key ? "white" : "#C67B5C"
                                            },
                                            children: count
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, tab.key, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 495,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                            lineNumber: 481,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 16
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: -16
                                },
                                transition: {
                                    duration: 0.25
                                },
                                children: filtered.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                                        gap: "28px"
                                    },
                                    children: filtered.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesignCard, {
                                            entry: entry,
                                            index: i,
                                            onClick: ()=>setSelectedEntry(entry)
                                        }, entry.id, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 557,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 549,
                                    columnNumber: 17
                                }, this) : // Empty state for LLD
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.97
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    className: "clay-card",
                                    style: {
                                        padding: "60px 40px",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: "48px"
                                            },
                                            children: "🚧"
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 580,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: "var(--font-body)",
                                                fontSize: "18px",
                                                fontWeight: 600,
                                                color: "#3D3229"
                                            },
                                            children: "Coming Soon"
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 581,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: "var(--font-body)",
                                                fontSize: "14px",
                                                color: "#7A6E62",
                                                maxWidth: "320px",
                                                lineHeight: 1.7
                                            },
                                            children: "LLD case studies (Coffee Machine, Parking Lot, Logging Framework…) are being documented. Check back soon!"
                                        }, void 0, false, {
                                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                            lineNumber: 591,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                    lineNumber: 567,
                                    columnNumber: 17
                                }, this)
                            }, activeTab, false, {
                                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                                lineNumber: 541,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                    lineNumber: 450,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                lineNumber: 446,
                columnNumber: 7
            }, this),
            selectedEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DesignModal, {
                entry: selectedEntry,
                onClose: ()=>setSelectedEntry(null)
            }, void 0, false, {
                fileName: "[project]/heyvivek/src/components/sections/SystemDesign.tsx",
                lineNumber: 611,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/heyvivek/src/components/sections/SystemDesign.tsx [app-ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/heyvivek/src/components/sections/SystemDesign.tsx [app-ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=heyvivek_src_ca9409c6._.js.map