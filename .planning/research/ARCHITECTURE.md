# Architecture Research

**Domain:** Interactive system design learning platform
**Researched:** 2026-02-28
**Confidence:** MEDIUM (patterns from analogous systems — online judges, edtech platforms, LLM streaming — verified; no single authoritative reference exists for this exact domain combination)

## Standard Architecture

### System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                            │
├────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  Code Editor │  │  PA Chat UI  │  │  Visualization Canvas    │  │
│  │  (Monaco)    │  │  (streaming) │  │  (Konva / HTML Canvas)   │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬──────────────┘  │
│         │                 │                       │                 │
│  ┌──────┴─────────────────┴───────────────────────┴──────────────┐  │
│  │                   React App Shell                              │  │
│  │         (routing, auth state, tier gating)                     │  │
│  └─────────────────────────────┬──────────────────────────────────┘  │
└────────────────────────────────┼──────────────────────────────────┘
                                 │  HTTPS / SSE
┌────────────────────────────────┼──────────────────────────────────┐
│                     NEXT.JS API LAYER                              │
├────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  /api/submit │  │  /api/pa     │  │  /api/auth               │  │
│  │  (evaluate)  │  │  (LLM proxy) │  │  (sessions/tier)         │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────────────┘  │
│         │                 │                                         │
│  ┌──────┴───────┐  ┌───────┴──────────────────────────┐            │
│  │  Evaluator   │  │  LLM Gateway (PA + Requirements) │            │
│  │  Service     │  │  (OpenAI / Anthropic via SDK)    │            │
│  └──────┬───────┘  └──────────────────────────────────┘            │
│         │                                                           │
│  ┌──────┴──────────────────────────────────────────────┐           │
│  │              Scenario Engine                         │           │
│  │  (parking lot simulation logic, state machine)       │           │
│  └──────┬──────────────────────────────────────────────┘           │
└─────────┼──────────────────────────────────────────────────────────┘
          │
┌─────────┼──────────────────────────────────────────────────────────┐
│         │              DATA LAYER                                   │
├─────────┴──────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │  PostgreSQL  │  │  Redis       │  │  Object Store (S3/R2)    │  │
│  │  (users,     │  │  (session    │  │  (video exports, if any) │  │
│  │  submissions)│  │  cache)      │  │                          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Code Editor | In-browser code authoring, syntax highlighting, auto-complete | @monaco-editor/react (same engine as VS Code) |
| PA Chat UI | Display streaming LLM feedback token-by-token | React component consuming SSE stream |
| Visualization Canvas | Animate parking lot state changes (cars entering, spots filling) | Konva.js (React-Konva) for 2D canvas scenes |
| React App Shell | Routing, auth context, tier gating guard components | Next.js App Router + React Context |
| Evaluator Service | Run user code, extract design decisions, score vs requirements | Next.js Route Handler → Scenario Engine |
| Scenario Engine | Simulate parking lot behavior given user's design choices | Pure TypeScript state machine (no external sandbox needed — logic, not arbitrary code execution) |
| LLM Gateway | Forward evaluation context to LLM, stream response back | Vercel AI SDK or direct Anthropic/OpenAI SDK with SSE |
| Auth Service | Session management, tier enforcement (free vs premium) | NextAuth.js (Auth.js) with JWT claims for plan |
| PostgreSQL | Persist users, submissions, evaluation results, tier status | Prisma ORM, hosted on Supabase or Railway |
| Redis | Rate limiting LLM calls, session cache | Upstash Redis (serverless-friendly) |
| Object Store | Store generated video exports (premium tier) | Cloudflare R2 or AWS S3 |

---

## Key Architectural Insight: No Arbitrary Code Sandbox Needed

Unlike LeetCode-style judges, this platform does NOT execute arbitrary user code. Users write **design logic** (describing classes, relationships, concurrency approaches) — the platform **interprets** their design and runs a deterministic parking lot simulation. This eliminates the need for sandboxed Docker execution (the hardest part of online judge architecture) and reduces infrastructure complexity dramatically for v1.

The evaluator reads the user's code/design, extracts intent (via LLM or structured schema), then runs the scenario engine with those parameters. The scenario engine is a pure TypeScript simulation — safe, fast, and fully server-controlled.

---

## Recommended Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth routes (login, signup)
│   ├── (platform)/             # Main app routes (gated by auth)
│   │   ├── scenarios/[id]/     # Scenario page (editor + visualization)
│   │   └── dashboard/          # User history, progress
│   ├── api/
│   │   ├── submit/route.ts     # Code submission endpoint
│   │   ├── pa/route.ts         # PA assistant SSE stream
│   │   ├── requirements/route.ts # Generate requirements
│   │   └── auth/[...nextauth]/ # Auth.js handler
│   └── layout.tsx
│
├── components/
│   ├── editor/                 # Monaco editor wrapper
│   ├── visualization/          # Konva canvas, animation orchestrator
│   ├── chat/                   # PA chat panel, streaming renderer
│   ├── scenario/               # Scenario header, requirements panel
│   └── ui/                     # Shared (buttons, modals, tier gates)
│
├── lib/
│   ├── scenarios/              # Scenario definitions
│   │   └── parking-lot/
│   │       ├── engine.ts       # State machine simulation logic
│   │       ├── evaluator.ts    # Score design against requirements
│   │       └── requirements.ts # Requirement templates per difficulty
│   ├── llm/
│   │   ├── pa-assistant.ts     # PA feedback prompts + streaming
│   │   └── requirements-gen.ts # Requirements generation prompts
│   ├── auth/
│   │   └── tier.ts             # Tier checking utilities
│   └── db/
│       ├── schema.ts           # Prisma schema
│       └── queries.ts          # Common DB queries
│
├── types/
│   ├── scenario.ts             # Scenario, submission, evaluation types
│   └── user.ts                 # User, tier, session types
│
└── hooks/
    ├── useSubmission.ts        # Submit code, poll for result
    ├── useStreaming.ts          # Consume SSE from PA endpoint
    └── useVisualization.ts     # Drive canvas animation from sim state
```

### Structure Rationale

- **`lib/scenarios/parking-lot/`:** All scenario-specific logic is isolated here. Adding a new scenario in v2 means adding a new folder, not touching core platform code.
- **`lib/llm/`:** LLM concerns are separated from scenario logic. This allows swapping models (Anthropic → OpenAI) or prompts without touching the evaluator.
- **`components/visualization/`:** Visualization is a pure render layer — it receives simulation state and animates it. No business logic lives here.
- **`app/api/`:** All backend logic is in Next.js route handlers. For v1 scale this is sufficient. If evaluation becomes CPU-heavy, these move to dedicated workers.

---

## Architectural Patterns

### Pattern 1: Simulation State Machine

**What:** The parking lot simulation runs as an event-driven state machine. The user's submitted design is translated into configuration parameters (spot allocation strategy, concurrency handling, entry/exit logic). The engine then drives a tick-based or event-driven simulation, emitting state snapshots.

**When to use:** When visualization must accurately reflect the consequences of specific design decisions — not just display static diagrams.

**Trade-offs:** Requires writing a faithful simulation of the domain. More upfront complexity than showing a static diagram, but this is the core value proposition of the product.

**Example:**
```typescript
// lib/scenarios/parking-lot/engine.ts
export type SimulationState = {
  tick: number;
  spots: SpotState[];
  queue: VehicleId[];
  events: SimEvent[];
};

export type SimConfig = {
  allocationStrategy: "sequential" | "nearest-available";
  concurrencyModel: "optimistic" | "locked";
  spotCount: number;
};

export function runSimulation(
  config: SimConfig,
  events: VehicleArrivalEvent[]
): SimulationState[] {
  // Returns array of snapshots — one per tick
  // Frontend animates through snapshots
}
```

### Pattern 2: SSE Streaming for PA Feedback

**What:** The PA assistant endpoint streams tokens back as Server-Sent Events. The client uses `EventSource` (or `fetch` with `ReadableStream`) to consume the stream and renders tokens incrementally.

**When to use:** All LLM interactions. Never wait for a complete LLM response before showing the user anything — streaming is the expected UX.

**Trade-offs:** Slightly more complex client code than a single `await fetch()`. Well worth it for perceived responsiveness.

**Example:**
```typescript
// app/api/pa/route.ts — Next.js Route Handler
export async function POST(req: Request) {
  const { designCode, scenario, difficulty } = await req.json();

  const stream = await anthropic.messages.stream({
    model: "claude-3-5-sonnet-20241022",
    messages: [{ role: "user", content: buildPAPrompt(designCode, scenario) }],
    max_tokens: 1024,
  });

  // Return as SSE stream
  return new Response(stream.toReadableStream(), {
    headers: { "Content-Type": "text/event-stream" },
  });
}
```

### Pattern 3: Tier-Gated Feature Components

**What:** A `<FeatureGate tier="premium">` wrapper component checks the user's current plan from auth context. Free tier sees an upgrade prompt; premium tier sees the real component. This pattern avoids scattering tier checks throughout the codebase.

**When to use:** Any premium-only feature (animated visualization, full PA session history).

**Trade-offs:** Requires auth context to be propagated cleanly. Keep tier checks at component boundaries, not deep in business logic.

**Example:**
```typescript
// components/ui/FeatureGate.tsx
export function FeatureGate({
  tier,
  children,
  fallback,
}: {
  tier: "premium";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { user } = useAuth();
  if (user?.plan === tier) return <>{children}</>;
  return fallback ?? <UpgradePrompt />;
}
```

### Pattern 4: Evaluation Pipeline (Design → Simulation → Score)

**What:** User submits code → Evaluator extracts design decisions → Scenario engine runs simulation with those decisions → LLM grades results against requirements → Score + visualization state returned.

**When to use:** Every submission. This is the core evaluation loop.

**Trade-offs:** LLM grading adds latency (1-3s) and cost. Mitigate with deterministic pre-checks for obvious structural errors before calling LLM.

---

## Data Flow

### Submission Flow

```
User clicks "Run"
    ↓
POST /api/submit  { code, scenario: "parking-lot", difficulty: "medium" }
    ↓
[Evaluator] Parse code → extract design parameters
    ↓
[Scenario Engine] runSimulation(config) → SimulationState[]
    ↓
[LLM Gateway] gradeSolution(simulationResults, requirements) → Score + Feedback
    ↓
Response: { score, feedback, simulationSnapshots }
    ↓
Client: animate snapshots on Visualization Canvas
        display score in results panel
        (premium) trigger full video render or animated replay
```

### PA Assistant Flow

```
User clicks "Ask PA" (or auto-triggered on submit for free tier)
    ↓
POST /api/pa  { code, scenario, difficulty, evaluationResult? }
    ↓
[LLM Gateway] builds context-rich prompt
    ↓
Anthropic/OpenAI streams tokens via SSE
    ↓
Client: EventSource consumes stream, appends tokens to chat panel
    ↓
Stream ends → full PA response rendered
```

### Requirements Generation Flow

```
User selects scenario + difficulty
    ↓
POST /api/requirements  { scenario: "parking-lot", difficulty: "hard" }
    ↓
[LLM Gateway] generates acceptance criteria from template
    ↓
Response: { requirements: AcceptanceCriteria[] }
    ↓
Client: render requirements panel before user starts coding
```

### State Management

```
[Server State — React Query / SWR]
    ↓ (cache submissions, user profile, requirements)
[Components] ←→ [Mutations] → [API Routes] → [Database]

[Local UI State — React useState / useReducer]
    Editor content, visualization playback position, chat scroll

[Streaming State — custom useStreaming hook]
    SSE token accumulation → renders into chat panel
```

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Anthropic Claude API | Vercel AI SDK (or direct SDK) with SSE streaming | Use claude-3-5-sonnet for PA, claude-3-haiku for requirements gen (cheaper/faster) |
| Auth.js (NextAuth) | Next.js middleware + session provider | Store plan tier in JWT custom claim to avoid DB lookup on every request |
| Stripe | Webhook → update user plan in DB | Use Stripe Checkout hosted page; don't build custom payment UI |
| PostgreSQL (Supabase/Railway) | Prisma ORM — connection pooling via PgBouncer on Supabase | Supabase free tier adequate for v1 |
| Redis (Upstash) | HTTP-based Redis SDK (serverless-compatible) | Rate limit PA calls per user to prevent LLM cost abuse |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Editor → Evaluator | HTTP POST on submit; never live-evaluate on keystroke | Debounced or explicit submit button; live evaluation is expensive |
| Evaluator → Scenario Engine | Direct TypeScript function call (same process) | No queue needed at v1 scale; add job queue at 1k+ concurrent users |
| Evaluator → LLM Gateway | Async function call, awaited before response | Grade happens synchronously within the request; keep LLM prompt tight to limit latency |
| Simulation Engine → Visualization | JSON snapshot array passed to client; client animates | Snapshots are the "source of truth" — visualization is a pure render of state, not independently computed |
| Auth → Tier Gating | JWT claim checked in middleware and FeatureGate component | Two-layer check: middleware blocks API routes, component blocks UI |

---

## Build Order (Component Dependencies)

The following order respects hard dependencies — earlier items must exist before later ones can be built:

```
1. Auth + User Management
   └── Everything else depends on knowing who the user is and what tier they have

2. Database Schema + Prisma Setup
   └── Submissions, requirements, user records all need a schema

3. Scenario Engine (parking-lot simulation logic)
   └── Evaluator depends on this; visualization depends on engine output shape

4. Code Editor (Monaco)
   └── Users need to write code before anything can be submitted

5. Evaluator Service + /api/submit
   └── Depends on scenario engine; produces the data visualization consumes

6. PA Assistant + /api/pa (LLM streaming)
   └── Depends on having evaluation context to build good prompts

7. Requirements Generator + /api/requirements
   └── Can be built standalone but logically precedes evaluation UX

8. Visualization Canvas
   └── Depends on simulation snapshot schema from scenario engine
   └── Premium gate depends on tier from auth

9. Tier Gating + Stripe Integration
   └── Builds on auth; gates visualization and extended PA history

10. Video Export (premium animated replay)
    └── Depends on visualization being finalized first
```

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–1k users | Current monolith (Next.js full-stack) is fine. No queue, no separate workers. |
| 1k–10k users | Add Upstash Redis rate limiting on LLM calls. Move simulation engine to Edge Functions if Next.js API routes time out. Consider Supabase connection pooler (PgBouncer) if DB connections are a bottleneck. |
| 10k–100k users | Extract Evaluator + Scenario Engine into a dedicated worker service (Node.js or Rust). Add job queue (BullMQ or Inngest) for async submission processing. LLM call caching for identical submissions. |
| 100k+ users | Separate LLM Gateway into a standalone proxy with cost tracking, model fallbacks, and per-user quotas. CDN-cache generated video clips. Read replicas for DB. |

### Scaling Priorities

1. **First bottleneck:** LLM costs and latency. Anthropic/OpenAI calls are expensive and slow. Mitigate with prompt caching (Anthropic's prompt caching feature), model tiering (haiku for cheap tasks, sonnet for evaluation), and per-user rate limits via Redis.
2. **Second bottleneck:** Concurrent simulation runs. The scenario engine is CPU-bound pure TypeScript. At scale, these should move off the Next.js process into a worker pool.

---

## Anti-Patterns

### Anti-Pattern 1: Building a Full Code Sandbox

**What people do:** Add Docker-based sandboxed code execution (like Judge0) to safely run arbitrary user code.

**Why it's wrong:** This platform evaluates *design logic*, not program correctness against test cases. A full sandbox adds massive infrastructure complexity (Docker orchestration, resource limits, security hardening) for no benefit. The scenario engine provides the runtime — the user's code is a design artifact, not an executable program.

**Do this instead:** Parse user code as structured input to the scenario engine. Use LLM to extract design intent if the code format is freeform. Keep execution server-side and deterministic.

### Anti-Pattern 2: Live Evaluation on Every Keystroke

**What people do:** Connect the evaluation pipeline to the editor's `onChange` event to give continuous feedback.

**Why it's wrong:** Each evaluation triggers LLM calls (costing money and time) and runs simulation logic. At typing speed this would be catastrophic for both cost and UX — users would see flickering results mid-thought.

**Do this instead:** Explicit submit button, or at most a "Run" shortcut (Ctrl+Enter). Debounce any auto-eval to minimum 5-second gaps.

### Anti-Pattern 3: Tight Coupling of Visualization to Simulation

**What people do:** Have the visualization component call the scenario engine directly and manage its own simulation state.

**Why it's wrong:** Visualization becomes impossible to test independently, animation scrubbing/replay is hard to implement, and the same simulation cannot be reused across different visualization contexts (canvas vs. video export).

**Do this instead:** Scenario engine produces a snapshot array (pure data). Visualization consumes snapshots as props. This separation makes replay, export, and testing trivial.

### Anti-Pattern 4: Storing LLM Responses Without Structured Extraction

**What people do:** Store raw LLM PA feedback text in the database and try to re-parse it later for analytics.

**Why it's wrong:** Freeform text is hard to query. You lose the ability to track "what design flaw types does this user make most often?" which is valuable for personalization later.

**Do this instead:** Structure LLM response with a JSON schema (force JSON output mode). Store structured feedback (flaw categories, severity, suggestions) alongside the raw text. Raw text for display, structured for analytics.

---

## Sources

- [Online Judge System Architecture — Medium (Dilip Kumar)](https://dilipkumar.medium.com/design-an-online-judge-like-leetcode-30ff9e73b248) — MEDIUM confidence (403 on fetch, but corroborated by multiple search result snippets)
- [Judge0 — Open Source Code Execution System](https://github.com/judge0/judge0) — HIGH confidence (official GitHub)
- [SSE for LLM Streaming in Next.js — Upstash Blog](https://upstash.com/blog/sse-streaming-llm-responses) — HIGH confidence (official vendor documentation)
- [Vercel AI SDK for Streaming LLM Responses](https://blog.logrocket.com/nextjs-vercel-ai-sdk-streaming/) — MEDIUM confidence (verified article, multiple corroborating sources)
- [XState — Actor-based State Management](https://github.com/statelyai/xstate) — HIGH confidence (official GitHub)
- [Feature Gating in Freemium SaaS — DEV Community](https://dev.to/aniefon_umanah_ac5f21311c/feature-gating-how-we-built-a-freemium-saas-without-duplicating-components-1lo6) — LOW confidence (fetch failed, pattern corroborated by other SaaS architecture articles)
- [@monaco-editor/react — Official Package](https://www.npmjs.com/package/@monaco-editor/react) — HIGH confidence (official NPM page)
- [React-Konva for 2D Canvas](https://github.com/konvajs/react-konva) — MEDIUM confidence (widely referenced, stable ecosystem)
- [Designing Online Judge Systems — ResearchGate](https://www.researchgate.net/publication/360861928_Online_Judge_System_Requirements_Architecture_and_Experiences) — MEDIUM confidence (academic paper, multiple search snippets corroborate)

---
*Architecture research for: Interactive System Design Learning Platform (SystemDesign.Interactive)*
*Researched: 2026-02-28*
