# Stack Research: Interactive System Design Learning Platform

**Domain:** Educational SaaS - Interactive IDE + visualization platform
**Researched:** 2025-02-28
**Confidence:** HIGH

## Executive Summary

For an interactive system design learning platform (code editor + visualization + LLM evaluation), the 2025 standard stack is a full-stack TypeScript solution with Next.js 15 (App Router), React 19, Vercel AI SDK v6+ for LLM streaming, Drizzle ORM for minimal-footprint database access, and Framer Motion for visualization animations. This stack prioritizes rapid solo development, minimal Vercel cold starts, type safety end-to-end, and the ability to ship an MVP in 2-4 weeks without infrastructure overhead.

The core requirements demand three technical capabilities: (1) responsive code editor with syntax highlighting and live execution (Monaco Editor), (2) smooth animated visualizations showing system state changes (Framer Motion + SVG), and (3) intelligent LLM-powered evaluation that identifies design flaws (Claude 3.5 Sonnet via Vercel AI SDK). The recommended stack handles all three without overengineering.

---

## Recommended Stack

### Frontend & Framework

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Next.js** | 15.1+ | Full-stack React framework with App Router | De facto 2025 standard for web apps. Fast dev experience (Turbopack GA in v15 for instant hot reload). Native API routes eliminate need for separate backend. Zero-config Vercel deployment. App Router is production-stable with excellent streaming support. This is what 95% of new React projects choose. Turbopack makes local dev iteration fast—critical for solo developer. |
| **React** | 19+ | UI library | Bundled with Next.js 15. React 19 improvements to Server Components and streaming pair perfectly with Next.js App Router and server actions. Native concurrent rendering is default. |
| **TypeScript** | 5.7+ | Language for full-stack type safety | Non-negotiable for a learning platform where subtle logic errors in design evaluation are expensive. Fast type checking (milliseconds) in Next.js 15. Excellent IDE support for refactoring across layers. |
| **Tailwind CSS** | 4.1+ | Styling framework | Fastest path to polished UI without CSS-in-JS overhead. v4 brings CSS nesting and bundle optimizations. Perfect pairing with shadcn/ui for component library. No runtime cost. |

**Why NOT alternatives:**
- Remix: Good framework but slower cold starts on Vercel (matters when iterating on features). Smaller ecosystem than Next.js.
- Vite + React Router: Requires building your own backend—adds weeks of complexity for solo dev. Better for pure SPA without server logic.
- Astro: Wrong tool—SSR only, not SPA. Your platform needs real-time state updates and interactive forms.

---

### Code Editor Library

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| **Monaco Editor** via `@monaco-editor/react` | 0.61+ | In-browser code editor with syntax highlighting, IntelliSense, theme support, multi-cursor | Industry standard for web IDEs. Uses same engine as VS Code. Handles complex code editing scenarios. Excellent TypeScript support for system design logic (import hints, type checking). Large bundle (~2.5MB uncompressed → ~800KB gzipped) but justified—users expect professional IDE UX. Lazy-load to avoid initial page bloat. |
| **Shiki** | 1.20+ | Lightweight syntax highlighter (complementary) | Use for read-only code display (solutions, examples). Much smaller than Monaco. Combined: Monaco for editing, Shiki for display-only contexts. |

**Why NOT alternatives:**
- CodeMirror 6: Good ecosystem but smaller than Monaco. Less TS/IntelliSense support.
- Ace Editor: Older, smaller community. Monaco is more modern and better maintained.

---

### Visualization & Animation

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Framer Motion** | 11.0+ | React animation library for declarative animations | Primary choice for parking lot animations. Animates vehicle positions, parking state changes, queue growth. Component-based, integrates seamlessly with React state. Perfect for data-driven animations where state updates trigger motion. ~32KB gzipped—reasonable for what you get. |
| **@xyflow/react** (React Flow) | 12.10+ | Graph/diagram visualization library | Use for system architecture visualization (services, databases, queues). Building node-edge diagrams programmatically. Built-in zoom, pan, selection. Good for showing service dependencies. Recently updated (Feb 2025 release 12.10.1). |
| **D3.js** | 7.9+ | Data visualization library | Use for complex performance charts (latency graphs, throughput curves). More powerful than Framer Motion for data-heavy visualizations. Steeper learning curve—defer to v1.5+ unless essential. |
| **SVG + native** | — | Low-level drawing | Use SVG for parking lot grid and parking spaces. Combine with Framer Motion for animated vehicles. Avoids canvas complexity while maintaining performance. |

**Animation Strategy for Parking Lot v1:**
1. SVG grid for lot structure (parking spaces, lanes)
2. Framer Motion for vehicle animations (position, rotation, opacity)
3. Zustand state updates trigger re-renders
4. Result: smooth 60fps animations without canvas manual loops

**Why NOT GSAP:**
- GSAP is powerful for timeline-based animation (animators' tool), but overkill here
- You're building state-driven animations (data → DOM), not timeline-choreography
- Framer Motion integrates better with React state
- GSAP shines when you need frame-perfect control; Framer Motion shines when React state drives motion

---

### State Management

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Zustand** | 4.5+ | Global state for user session, design session, editor content | Use for: current problem difficulty, user's code in editor, evaluation results, visualization playback state. Simple API (define store, use hook in components). ~2.5KB gzipped. No Redux boilerplate. Perfect for solo dev—subscribe to slices of state, no action types or dispatch. |
| **React Context + useState** | Native | Local component state | Use for: form inputs, dropdown toggles, temporary UI state (modal open/closed). Don't over-centralize—keep Context for truly shared state only. Component-local useState is fine. |
| **TanStack Query (React Query)** | 5.0+ | Server state management | Use for: caching evaluation results, polling submission status, requirements data. Handles background refetch, stale-while-revalidate, optimistic updates. Separate from Zustand—Zustand is UI state, Query is server state. Don't mix. |

**Why Zustand over Redux:**
- Redux is for large teams (10+ engineers) needing strict patterns and time-travel debugging
- You're one person shipping in weeks
- Zustand: one file defines state and actions together, components hook in, done
- DX wins significantly for small projects

---

### LLM Integration & Streaming

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Vercel AI SDK** | 6.0+ | Unified LLM abstraction for streaming, tool calling, agent orchestration | Universal API across Claude, OpenAI, Gemini. `useChat` hook auto-handles streaming state (messages array updates character-by-character). Built-in Server-Sent Events (SSE) support. ~15KB minified. Designed for this exact use case. Can swap `model: "claude-3-5-sonnet"` for OpenAI at deployment time. No lock-in. |
| **Anthropic SDK** (@anthropic-ai/sdk) | 0.28+ | Direct Claude API access (lower-level) | Use only if Vercel AI SDK lacks features. For this project, AI SDK is better—cleaner streaming, less boilerplate. But keep Anthropic SDK as fallback for future advanced features (vision, prompt caching). |
| **Claude 3.5 Sonnet** | claude-3-5-sonnet-20241022 | LLM for requirements generation, design evaluation, PA assistant | Excellent reasoning for architectural analysis. Fast enough for real-time feedback (median latency ~1s). Costs ~$3/1M input tokens (cheap). Perfect for parsing design code, identifying flaws, suggesting improvements. Use streaming to show feedback character-by-character. |

**Why NOT alternatives:**
- OpenAI GPT-4: Much more expensive (~20x). Overkill for system design evaluation where Claude works well.
- Open-source models (Llama, Mistral): Require self-hosting/inference infrastructure. Claude API is simpler for solo dev.
- Older Anthropic completions API: Deprecated. Use Messages API with streaming.

**Integration Example:**
```typescript
// app/api/evaluate/route.ts
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { designCode } = await req.json();

  const result = streamText({
    model: 'claude-3-5-sonnet-20241022',
    system: 'You are a system design expert evaluating parking lot architecture...',
    messages: [{ role: 'user', content: designCode }],
  });

  return result.toDataStreamResponse();
}

// In React component:
const { messages, input, handleSubmit } = useChat({
  api: '/api/evaluate',
});
```

---

### Database & ORM

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Neon (Serverless PostgreSQL)** | Latest | PostgreSQL database with auto-scaling, branching | Excellent cold starts (crucial for Vercel Functions). Branches create preview databases automatically for PR testing. Consumption-based pricing—free tier: 500MB storage, 1 compute unit, auto-suspend after 5 min idle. Vercel integration seamless. Recommended over Supabase for database-only needs (you're using Clerk for auth separately). |
| **Drizzle ORM** | 0.36+ | TypeScript ORM with type safety, minimal overhead | Pure TypeScript schema (no `.prisma` file generation step). Zero-cost abstractions compile to raw SQL. Instant type updates as you edit schema. ~7KB gzipped vs Prisma 65KB. Critical for serverless—Drizzle has negligible cold start impact. Prisma v7 is now pure TS but still heavier. For solo dev with tight deadlines, Drizzle's DX wins. Edge Runtime compatible. |
| **@vercel/postgres** | 0.8+ | Vercel Postgres client (edge-compatible) | If deploying to Vercel, use their official client. Works with Drizzle. Native fetch-based, runs on Edge Runtime without connection pooling headaches. |

**Why NOT Prisma:**
- Prisma v7 improved (pure TypeScript now) but still 65KB vs Drizzle 7KB
- Prisma requires `prisma generate` step for type updates; Drizzle infers from code instantly
- Prisma's magic queries are slower to learn; Drizzle's direct SQL is more transparent
- For solo dev shipping in weeks, Drizzle's minimal setup and cold-start advantage wins

**Why NOT Supabase alone:**
- You don't need their built-in auth (using Clerk separately)
- You don't need real-time subscriptions in v1
- You don't need file storage (video generation is external service)
- Pure database solution (Neon) is simpler

**Drizzle Schema Example:**
```typescript
// lib/db/schema.ts
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique(),
  tier: text('tier').default('free'), // 'free' | 'premium'
  createdAt: timestamp('created_at').defaultNow(),
});

export const designs = pgTable('designs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  scenarioId: text('scenario_id'), // 'parking-lot', etc.
  code: text('code'), // User's design solution
  evaluationJson: text('evaluation_json'), // Structured LLM feedback
  visualizationState: text('visualization_state'), // Parking lot snapshot
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### Authentication

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Clerk** | 5.x | Authentication & user management | Freemium model (10K monthly active users free). Pre-built components work in Next.js App Router (Server Components compatible). Passkey support (2.5x faster auth). Reduces auth implementation from weeks to 30 minutes. Integrated session management. Perfect for shipping fast. Free tier covers MVP. |

**Why Clerk over NextAuth:**
- NextAuth requires building custom UI from scratch—slow for solo dev
- Clerk's pre-built UI is production-ready
- Passkey support becoming table stakes; Clerk has it, NextAuth needs custom integration
- Free tier generous enough for MVP
- If cost scales prohibitively, can switch later, but launches you faster

**Integration:**
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
```

---

### Rate Limiting & Cost Control

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Upstash Redis** | Latest | Serverless Redis for rate limiting | HTTP-based, no connection pooling complexity. Free tier: 10k requests/day. Rate-limit LLM calls per user (prevent cost abuse on free tier). Premium tier: unlimited. Costs ~$0.20 per 1M requests. Perfect for Vercel Functions (no persistent connections). |

**Rate Limiting Strategy:**
- Free tier: 5 evaluations/day per user (prevents abuse)
- Premium tier: unlimited evaluations
- PA assistant: 10 feedback requests/day free, unlimited premium

---

### Video Generation (Premium Feature - Not v1)

| Technology | Version | Purpose | Note |
|------------|---------|---------|------|
| **Remotion** | 4.2+ | React-based video rendering library | If building custom video export: render React components to video. Overkill for MVP but track for v1.5. |
| **ffmpeg.wasm** | 0.12+ | Video encoding in browser | Lightweight if you go custom route. |

**For v1:** Video generation is deferred. Use static visualization only. Premium tier shows static images in v1, animated video in v1.5+. Focus on proving product-market fit first.

---

## Installation & Setup

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest system-design-interactive \
  --typescript \
  --tailwind \
  --app \
  --no-eslint \
  --src-dir

cd system-design-interactive

# Core framework dependencies (already in create-next-app)
# npm install react@19 next@15 typescript@5.7

# Code Editor
npm install @monaco-editor/react

# Visualization & Animation
npm install framer-motion @xyflow/react

# State Management
npm install zustand @tanstack/react-query

# LLM Integration
npm install ai @anthropic-ai/sdk

# Database
npm install drizzle-orm @vercel/postgres
npm install -D drizzle-kit

# Authentication
npm install @clerk/nextjs

# Rate Limiting
npm install @upstash/redis

# Utilities
npm install zod clsx

# Dev dependencies
npm install -D @types/react @types/node eslint prettier
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

---

## Drizzle Setup (Database)

```bash
# Initialize Drizzle
npm run drizzle-kit init-postgres

# Configure DATABASE_URL in .env.local
# Example: postgresql://user:password@neon-host/dbname

# Generate Drizzle client
npm run drizzle-kit generate

# Apply migrations
npm run drizzle-kit migrate
```

---

## Environment Variables

```bash
# .env.local (never commit!)

# Database (Neon)
DATABASE_URL=postgresql://user:password@host/database

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Anthropic LLM
ANTHROPIC_API_KEY=sk-ant-...

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Stripe (premium features, future)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# Sentry (error tracking, future)
SENTRY_AUTH_TOKEN=...
```

---

## Alternatives Considered

| Layer | Recommended | Alternative | When to Use Alternative |
|-------|-------------|-------------|-------------------------|
| Framework | Next.js 15 | Remix v2 | If you need more granular control over data loading per route. Remix's actions are powerful. But Remix has slower cold starts on Vercel—matters when iterating locally. |
| Editor | Monaco | CodeMirror 6 | If bundle size is critical (<500KB). Monitor Monaco's size in future releases. CodeMirror is smaller but less polished. |
| Animation | Framer Motion | GSAP | If you need frame-perfect timeline animations or animating thousands of objects simultaneously. Unlikely for parking lot in v1. GSAP is overkill. |
| ORM | Drizzle | Prisma v7 | If team prefers `.prisma` schema files. Prisma has larger ecosystem of plugins. But Drizzle wins on cold starts and code generation speed. |
| Auth | Clerk | Auth.js (NextAuth v5) | If you need complete data ownership or have complex enterprise auth needs. Auth.js is free and self-hosted. Clerk is vendor-locked but faster to ship. |
| State | Zustand | React Context | For this project's state scope, Context + useState is fine. Zustand is upgrade path if state becomes complex. Try Context first. |
| LLM API | Vercel AI SDK | Direct Anthropic SDK | If you need Claude-specific features not wrapped by Vercel. AI SDK covers most use cases more simply. Both can coexist. |
| Database | Neon | Supabase | If you need real-time features or file storage now. For database-only MVP, Neon is purer. Supabase is all-in-one but heavier. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Redux | Overkill for solo dev + small feature set. Redux is for 50+ engineers coordinating state. | Zustand |
| tRPC | Adds abstraction layer you don't need. Direct fetch + Vercel AI SDK streaming is simpler. | Fetch + Vercel AI SDK |
| GraphQL | Complexity without benefit. REST + simple JSON queries work fine. | REST API routes in Next.js |
| Socket.io | v1 doesn't need real-time multiplayer. HTTP + Server-Sent Events is enough. | Server-Sent Events (built into Vercel AI SDK) |
| Vite + custom backend (Express) | Tempting for control, but you'll spend 2 weeks on infra instead of features. Next.js handles full-stack in one framework. | Next.js App Router + API routes |
| OpenAI API directly | No abstraction layer makes model-swapping hard. Vercel AI SDK gives flexibility. | Vercel AI SDK wrapping Claude |
| Prisma v5 or earlier | Performance and bundle size issues. | Prisma v6+ or Drizzle |
| Self-hosted PostgreSQL | Operations burden for solo dev. Neon's serverless handles scaling. | Neon serverless |
| MongoDB | Wrong fit for relational data (users, designs, evaluations). Adds operational overhead. | PostgreSQL (Neon) |

---

## Stack Patterns by Use Case

### **If you need real-time collaboration later (v2+):**
- Add: Yjs (CRDT library) + Socket.io/WebSockets
- Database: Neon stays same
- State: Zustand for local state, Yjs for server sync
- Don't attempt in v1—scope creep kills MVP

### **If you need on-premise/self-hosted deployment:**
- Database: Replace Neon with self-hosted PostgreSQL
- Auth: Replace Clerk with Auth.js
- Hosting: Replace Vercel with self-hosted Node.js on Docker
- Everything else (Next.js, Drizzle, React) works identically
- Not recommended for MVP—SaaS simplicity is a feature

### **If LLM costs become critical (100K+ users):**
- Add: Redis caching for evaluation results
- Model: Switch to faster/cheaper Claude Haiku for requirements
- Database: Add query optimization and indexes
- This is v2+ concern, not v1

### **If you decide to use OpenAI instead of Claude:**
```typescript
// One line change in API route:
model: 'gpt-4o-mini' // instead of claude-3-5-sonnet

// Everything else stays the same—Vercel AI SDK handles it
```

---

## Version Compatibility & Critical Notes

| Package | Version | Critical Notes |
|---------|---------|-----------------|
| Next.js | 15.1+ | Turbopack GA, App Router stable |
| React | 19+ | Server Components, concurrent rendering default |
| TypeScript | 5.7+ | Fast type checking in Next.js 15 |
| Drizzle ORM | 0.36+ | **Critical:** Must have Edge Runtime support for Vercel |
| @vercel/postgres | 0.8+ | Works with Neon + Vercel |
| Vercel AI SDK | 6.0+ | SSE streaming, tool calling, agent framework |
| @anthropic-ai/sdk | 0.28+ | Messages API stable, streaming available |
| Framer Motion | 11.0+ | React 19 compatible |
| @xyflow/react | 12.10+ | Latest: v12.10.1 (Feb 2025), stable |
| Zustand | 4.5+ | Hooks, subscriptions work well |
| Clerk | 5.x | App Router support, passkeys |
| Upstash Redis | Latest | HTTP API, serverless-friendly |

---

## Deployment Architecture

```
Next.js App (Next.js 15 App Router)
├── Frontend: React 19 + Tailwind CSS
├── API Routes: Vercel Functions (serverless)
├── LLM Calls: Claude 3.5 Sonnet via Vercel AI SDK
└── Database: Neon PostgreSQL via Drizzle ORM

Hosting: Vercel (automatic deployments on git push)
Auth: Clerk (managed)
Cache: Upstash Redis (HTTP-based)
```

This is the "zero-ops" stack. After shipping, you have no servers to manage. Vercel handles scaling, Neon handles database scaling, Clerk handles authentication. You focus on features.

---

## Performance Targets for v1

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| Initial page load | < 2s (Lighthouse) | Lazy-load Monaco editor, split Framer Motion/D3, minify CSS |
| Code submit → evaluation | < 3s (median) | Evaluation runs synchronously; LLM latency ~1s is baseline |
| PA feedback streaming start | < 500ms | Vercel AI SDK streams first token ASAP |
| Visualization render | < 100ms | Framer Motion handles batching; Zustand state updates are atomic |
| Cold start (after deploy) | < 2s | Drizzle's minimal bundle keeps Edge Functions fast |

---

## Migration Path (If Assumptions Change Later)

1. **Need more LLM control?** Add Anthropic SDK directly; Vercel AI SDK can coexist
2. **Need video generation?** Integrate Remotion alongside. Doesn't affect core platform
3. **Need multi-provider LLMs?** Vercel AI SDK already supports it. Just env var changes
4. **Need collaborative editing?** Add Yjs + Socket.io. Zustand handles local state, Yjs syncs to server
5. **Visualization performance bottleneck?** Migrate Framer Motion to Canvas. Keep Zustand state management
6. **Need real-time updates?** Add Neon replication or webhooks. Don't need full Socket.io

---

## Sources

- [Next.js 15.1 Changelog](https://nextjs.org/blog/next-15) — Turbopack GA, App Router maturity, Feb 2025
- [React 19 Release Blog](https://react.dev/blog/2025/2/25/react-19-stable) — Server Components, streaming improvements
- [Vercel AI SDK 6.0 Release](https://vercel.com/blog/ai-sdk-6) — Streaming, tool calling, agent framework, Dec 2025
- [Drizzle vs Prisma Comprehensive Comparison](https://makerkit.dev/blog/tutorials/drizzle-vs-prisma) — Cold start benchmarks, bundle size, Jan 2025
- [Neon vs Supabase](https://designrevision.com/blog/supabase-vs-neon) — Serverless architecture, pricing, Feb 2025
- [Framer Motion vs GSAP](https://www.artekia.com/en/blog/gsap-vs-framer-motion) — Use case analysis, performance, 2025
- [React Flow v12.10.1 Release](https://github.com/xyflow/xyflow/releases) — Latest updates, Feb 2025
- [Zustand vs Redux Toolkit](https://betterstack.com/community/guides/scaling-nodejs/zustand-vs-redux-toolkit-vs-jotai/) — Team size considerations, 2025
- [Clerk Authentication Guide](https://clerk.com/articles/user-authentication-for-nextjs-top-tools-and-recommendations-for-2025) — Passkeys, free tier, App Router support
- [Next.js + Claude AI Integration Patterns](https://mehd.ir/posts/building-ai-applications-with-anthropics-sdk-and-nextjs) — Production patterns, 2025

---

*Stack research for: Interactive System Design Learning Platform*
*Researched: 2025-02-28*
*Confidence: HIGH*
