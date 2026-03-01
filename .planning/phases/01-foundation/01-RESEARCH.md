# Phase 1: Foundation - Research

**Researched:** 2026-03-01
**Domain:** Next.js 15 App Router scaffold + Clerk authentication + Neon/Drizzle database + Vercel deployment
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| AUTH-01 | User can sign up with email and password | Clerk pre-built `<SignUpButton>` / `<SignUp>` components handle email+password signup out of the box; no custom implementation needed |
| AUTH-02 | User receives email verification link after signup | Clerk sends verification emails automatically when email verification is enabled in Clerk Dashboard; zero-config for the app |
| AUTH-03 | User can reset password via email link | Clerk `<TaskResetPassword>` component + Clerk's built-in "forgot password" flow handles full reset cycle; custom flow available via `useSignIn()` hook |
| AUTH-04 | User session persists across browser refresh | Clerk manages session tokens in secure cookies; `<ClerkProvider>` re-hydrates session on load; session persists until explicit sign-out or expiry |
| INFRA-05 | Database uses Neon (serverless PostgreSQL) | Neon + Drizzle ORM is a verified, officially-documented combination with a dedicated Vercel integration; HTTP driver is required for serverless |
</phase_requirements>

---

## Summary

Phase 1 establishes the complete technical scaffold for SystemDesign.Interactive: Next.js 15 App Router, Clerk authentication (signup/email verification/password reset/persistent sessions), Neon PostgreSQL via Drizzle ORM, and production deployment to Vercel. The stack was pre-decided in STACK.md (confirmed in STATE.md "Stack finalized" decision) — this research validates and operationalizes those decisions rather than exploring alternatives.

The most important insight for planning is that **Clerk handles all five AUTH requirements with zero custom auth logic**. Signup, email verification, password reset, and session persistence are all pre-built Clerk behaviors controlled from the Clerk Dashboard. The application code wraps the app in `<ClerkProvider>`, adds `clerkMiddleware()` in `middleware.ts`, and places `<SignIn>`, `<SignUp>`, and `<UserButton>` components where needed. No JWT handling, no session tables, no email sending infrastructure required from the app side.

The critical architectural decision for INFRA-05: Clerk user IDs (`user.id` from `currentUser()` or `auth()`) become the foreign key linking all application data in Neon. There is no separate "users" table that mirrors Clerk data — application tables reference Clerk's `userId` string directly. This eliminates webhook syncing complexity entirely for Phase 1 and is the pattern validated by Neon's official Clerk integration guide.

**Primary recommendation:** Scaffold Next.js 15 with `create-next-app`, install Clerk/Neon/Drizzle packages, configure middleware and ClerkProvider, define the initial Drizzle schema (submissions, evaluation results referenced by Clerk user ID), push schema to Neon, deploy to Vercel. Phase 1 ends with a working sign-up → verify email → sign in → see dashboard flow live in production.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (latest) | Full-stack framework, App Router | Pre-decided; zero-config Vercel deploy; Turbopack local dev |
| TypeScript | 5.7+ | Type safety across stack | Pre-decided; strict mode required |
| Tailwind CSS | 4.x | Utility-first styling | Pre-decided; pairs with shadcn/ui |
| `@clerk/nextjs` | 6.x (latest) | Authentication — signup, login, session, password reset, email verification | Pre-decided; 30-min setup; pre-built App Router components; free tier covers 10K MAU |
| `drizzle-orm` | 0.36+ | Database ORM | Pre-decided; 7KB bundle (vs Prisma 65KB); Edge Runtime compatible; instant TypeScript inference |
| `@neondatabase/serverless` | 0.10+ | Neon HTTP/WebSocket driver | Required for serverless/Vercel; HTTP driver for single queries, WebSocket for transactions |
| `drizzle-kit` | 0.28+ | Schema migrations CLI | Companion to drizzle-orm; `generate` + `migrate` commands |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@upstash/redis` | 1.34+ | Redis client | Rate limiting in Phase 5 (PA assistant); caching in Phase 4 (evaluation) — install now, configure later |
| `@upstash/ratelimit` | 2.0+ | Rate limiting | Only needed when PA assistant routes ship; install scaffold now |
| `zustand` | 4.5+ | Client state management | Editor state, scenario state across components |
| `@tanstack/react-query` | 5.x | Server state / async fetching | Data fetching patterns with caching |
| `svix` | 1.x | Clerk webhook verification | Only needed if webhook sync is added later; NOT needed for Phase 1 pattern |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Clerk | NextAuth / Auth.js | NextAuth requires custom email/password UI, session table, email adapter — adds 3-5 days. Clerk is 30 min. Pre-decided. |
| Drizzle ORM | Prisma | Prisma is 65KB bundle, slow cold starts on Vercel serverless, requires codegen step. Drizzle is 7KB, no codegen. Pre-decided. |
| Neon | Supabase, PlanetScale | Neon: auto-suspend, pay-per-compute, Vercel-native integration, branching for PR previews. Supabase adds real-time features not needed. Pre-decided. |
| `@neondatabase/serverless` HTTP | `node-postgres` (pg) | `pg` uses TCP — incompatible with Vercel serverless cold starts. HTTP driver is mandatory here. |

**Installation:**
```bash
# Scaffold
npx create-next-app@latest systemdesign-interactive --typescript --tailwind --app --src-dir

# Auth
npm install @clerk/nextjs

# Database
npm install drizzle-orm @neondatabase/serverless dotenv
npm install -D drizzle-kit

# State (install now, configure in later phases as needed)
npm install zustand @tanstack/react-query

# Rate limiting (scaffold for later phases)
npm install @upstash/redis @upstash/ratelimit
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx          # Clerk <SignIn /> component
│   │   └── sign-up/[[...sign-up]]/
│   │       └── page.tsx          # Clerk <SignUp /> component
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       └── page.tsx          # Protected dashboard (Phase 1: placeholder)
│   ├── api/
│   │   └── webhooks/             # Future Clerk webhooks (not needed Phase 1)
│   ├── layout.tsx                # Root layout with <ClerkProvider>
│   └── page.tsx                  # Landing page (public)
├── db/
│   ├── index.ts                  # Drizzle client singleton
│   └── schema.ts                 # All table definitions
├── lib/
│   ├── auth.ts                   # auth() / currentUser() helpers
│   └── db.ts                     # Re-export of db client
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   └── auth/                     # Auth-adjacent UI (nav, user button)
└── types/
    └── index.ts                  # Shared TypeScript types
drizzle.config.ts                 # Drizzle Kit config
middleware.ts                     # clerkMiddleware() — root level
```

### Pattern 1: Clerk Middleware — Protect Routes by Default

**What:** `clerkMiddleware()` in `middleware.ts` intercepts all requests. By default, all routes are public — you opt routes into protection using `auth().protect()` in Server Components or route handlers.
**When to use:** Phase 1 setup; every subsequent phase's protected routes rely on this.
**Example:**
```typescript
// middleware.ts — Source: https://clerk.com/docs/nextjs/getting-started/quickstart
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

### Pattern 2: ClerkProvider Root Layout

**What:** Wrap the entire app in `<ClerkProvider>` in the root layout so all Clerk hooks and components work throughout the component tree.
**When to use:** Phase 1 setup; required once, never changes.
**Example:**
```typescript
// app/layout.tsx — Source: https://clerk.com/docs/nextjs/getting-started/quickstart
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Pattern 3: Protect Server Components/Actions with auth()

**What:** `auth()` from `@clerk/nextjs/server` returns the current session. Call `.protect()` to throw a redirect to sign-in if unauthenticated.
**When to use:** Every Server Component or Server Action that requires authentication.
**Example:**
```typescript
// app/(dashboard)/dashboard/page.tsx
// Source: https://clerk.com/docs/reference/nextjs/app-router/auth
import { auth } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  // userId is the Clerk user ID — use as FK in all DB queries
  return <div>Dashboard for {userId}</div>
}
```

### Pattern 4: Neon + Drizzle Client Singleton

**What:** Create a single Drizzle client instance using the Neon HTTP driver. Import `db` from this module throughout the app.
**When to use:** Any server-side database operation.
**Example:**
```typescript
// src/db/index.ts
// Source: https://neon.com/blog/nextjs-authentication-using-clerk-drizzle-orm-and-neon
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string')
}

const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })
```

### Pattern 5: Drizzle Schema — User Data Referenced by Clerk ID

**What:** Application tables store `clerkUserId` (text) as a foreign reference. No separate `users` table needed in Phase 1 — Clerk owns user records. All queries filter by `userId` obtained from `auth()` or `currentUser()`.
**When to use:** Every table that stores per-user data (submissions, results, etc.).
**Example:**
```typescript
// src/db/schema.ts — Phase 1 bootstrap schema
// Source: Neon official integration guide + Drizzle docs
import { pgTable, text, timestamp, uuid, integer, jsonb, boolean } from 'drizzle-orm/pg-core'

// Submissions: user design code + scenario metadata
export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: text('clerk_user_id').notNull(),          // FK to Clerk; no DB-level FK since Clerk manages users
  scenarioId: text('scenario_id').notNull(),             // e.g. 'parking-lot'
  difficulty: text('difficulty').notNull(),              // 'easy' | 'medium' | 'hard'
  code: text('code').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// EvaluationResults: LLM grading output per submission
export const evaluationResults = pgTable('evaluation_results', {
  id: uuid('id').defaultRandom().primaryKey(),
  submissionId: uuid('submission_id').references(() => submissions.id, { onDelete: 'cascade' }).notNull(),
  criteriaResults: jsonb('criteria_results').notNull(),  // per-criterion pass/fail JSON
  overallPass: boolean('overall_pass').notNull(),
  llmModel: text('llm_model').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
```

### Pattern 6: Catch-all Routes for Clerk UI Components

**What:** Clerk's pre-built `<SignIn>` and `<SignUp>` components use catch-all routing (`[[...sign-in]]`) so Clerk can handle its own sub-routes (verification steps, SSO callbacks, etc.).
**When to use:** Whenever mounting Clerk's pre-built auth UI pages.
**Example:**
```typescript
// app/(auth)/sign-in/[[...sign-in]]/page.tsx
// Source: https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
```

### Pattern 7: drizzle.config.ts + Migration Workflow

**What:** Drizzle Kit reads `drizzle.config.ts` to know where the schema lives and where to write migrations. `npx drizzle-kit generate` creates SQL migration files; `npx drizzle-kit migrate` runs them against Neon.
**Example:**
```typescript
// drizzle.config.ts — Source: https://neon.com/docs/guides/drizzle
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

**Migration commands:**
```bash
npx drizzle-kit generate   # Create migration files from schema changes
npx drizzle-kit migrate    # Apply migrations to Neon database
npx drizzle-kit studio     # Open Drizzle Studio (visual DB browser)
```

### Anti-Patterns to Avoid

- **Syncing Clerk users to a local `users` table via webhooks in Phase 1:** Unnecessary complexity. Use `auth().userId` directly as a text FK. Add a local users table later only if you need data Clerk doesn't store (tier status, submission counts). This is a Phase 1 simplification, not a permanent pattern.
- **Protecting routes at the middleware level instead of the component level:** `clerkMiddleware()` should not use `matcher` to make routes private — that creates a brittle allowlist. Protect in individual Server Components with `auth().protect()` for fine-grained control.
- **Using `pg` (TCP node-postgres) instead of `@neondatabase/serverless` HTTP driver:** Neon on Vercel requires HTTP or WebSocket connections. TCP will hang or fail on cold starts in serverless environments.
- **Storing the Clerk publishable key only in `.env.local`:** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` must be added to Vercel environment variables in the Vercel dashboard for production to work. Environment variables don't auto-sync from local.
- **Running `drizzle-kit migrate` against production without a test:** Always test migrations against a Neon branch (Neon supports database branching) before running against the production branch.
- **Importing from `@clerk/nextjs` in Server Components for auth checks:** Use `@clerk/nextjs/server` for server-side auth helpers. Wrong import causes runtime errors.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email/password signup UI | Custom form with validation | `<SignUp />` from `@clerk/nextjs` | Clerk handles email format validation, password strength, duplicate account detection |
| Email verification flow | Token generation, email sending, expiry logic | Clerk built-in (Dashboard toggle) | Requires transactional email provider, token storage, expiry — Clerk does it all |
| Password reset via email | "Forgot password" email templates, token lifecycle | Clerk built-in `<TaskResetPassword>` | Token generation, secure delivery, expiry, UI flow are all managed by Clerk |
| Session persistence | JWT refresh logic, cookie management, CSRF protection | Clerk `<ClerkProvider>` | Clerk manages secure session cookies and token refresh automatically |
| Database migrations | Custom SQL scripts applied manually | Drizzle Kit `generate` + `migrate` | Drizzle tracks schema history, generates idempotent SQL, handles rollback patterns |
| Row-level security for user data | Manual `WHERE user_id = $1` in every query | Clerk `auth()` + Drizzle query filters | Use `auth()` to get userId, filter all queries by it — straightforward with Drizzle's type-safe API |
| Rate limiting infrastructure | Redis connection pool + custom counter logic | `@upstash/ratelimit` | HTTP-based, serverless-compatible, three algorithms built-in, free tier sufficient for Phase 1 |

**Key insight:** For a solo developer on a 2-4 week timeline, hand-rolling any auth or database migration tooling is a scope-destroying mistake. Clerk's 30-minute setup eliminates a full week of auth work. Every hour spent on custom auth is an hour not spent on the core product differentiator (the evaluation engine and visualization).

---

## Common Pitfalls

### Pitfall 1: Wrong Import Path for Clerk Server Helpers
**What goes wrong:** Importing `currentUser` or `auth` from `@clerk/nextjs` (client package) instead of `@clerk/nextjs/server` in a Server Component or Route Handler. Results in a runtime error — the client package cannot access server-side session context.
**Why it happens:** Both packages export similarly-named helpers; the distinction is not obvious from the function name alone.
**How to avoid:** Establish a team convention immediately: `@clerk/nextjs/server` for any file that runs on the server (Server Components, Route Handlers, Server Actions, middleware). `@clerk/nextjs` for Client Components.
**Warning signs:** `Error: auth() was called but Clerk can't detect usage of clerkMiddleware()` — this usually means wrong import or middleware not running on the route.

### Pitfall 2: Forgetting Environment Variables in Vercel Dashboard
**What goes wrong:** App works locally but authentication breaks in production — Clerk components render as empty, or database connections fail.
**Why it happens:** `.env.local` is gitignored (correctly) and is NOT automatically synced to Vercel.
**How to avoid:** As part of the Vercel deployment task, add all required environment variables to the Vercel project settings before first deploy: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`.
**Warning signs:** Clerk components show no UI in production; `auth()` returns null userId; database queries throw `DATABASE_URL is not set`.

### Pitfall 3: TCP Database Driver on Vercel Serverless
**What goes wrong:** Using `pg` (node-postgres) or `drizzle-orm/node-postgres` instead of `drizzle-orm/neon-http` with `@neondatabase/serverless`. Requests hang, time out, or fail intermittently in production.
**Why it happens:** Vercel serverless functions do not maintain persistent TCP connections. Neon's HTTP driver uses stateless HTTP requests (one query = one HTTP call) which works perfectly in this model.
**How to avoid:** Always use `import { neon } from '@neondatabase/serverless'` and `import { drizzle } from 'drizzle-orm/neon-http'`. Never use `drizzle-orm/node-postgres` on Vercel.
**Warning signs:** Database queries that work in dev (`next dev`) fail or time out in Vercel production.

### Pitfall 4: Missing Clerk Redirect URL Environment Variables
**What goes wrong:** After sign-in or sign-up, Clerk redirects to `/` instead of the intended dashboard. Or password reset emails contain wrong URLs.
**Why it happens:** Clerk uses environment variables to determine where to redirect after auth flows complete.
**How to avoid:** Set in `.env.local` AND Vercel:
```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```
**Warning signs:** User signs in and lands on the homepage instead of the dashboard.

### Pitfall 5: Schema Drift Between Local and Neon Production
**What goes wrong:** Schema changes are made locally and tested, but `drizzle-kit migrate` is never run against production Neon. App deploys and crashes because tables/columns don't exist.
**Why it happens:** The migration step is manual and easy to forget in the deployment rush.
**How to avoid:** Add `npx drizzle-kit migrate` as a build step or pre-deploy script in Vercel. Or use Neon branching: run migrations against a preview branch first, verify, then merge to main branch.
**Warning signs:** Production errors like `relation "submissions" does not exist` or `column "clerk_user_id" does not exist`.

### Pitfall 6: Next.js Middleware Security Vulnerability (CVS 9.1)
**What goes wrong:** A CVSS 9.1 vulnerability (discovered 2025) allows bypassing Next.js middleware security checks on versions 11.1.4 through 15.2.2 via manipulation of the `x-middleware-subrequest` header — but this affects SELF-HOSTED deployments only.
**Why it happens:** The middleware bypass only works when the app is self-hosted; Vercel's infrastructure mitigates this at the edge layer.
**How to avoid:** Deploy exclusively to Vercel (as pre-decided). Keep Next.js updated to latest 15.x. Do NOT add server-side auth checks only in middleware — also check `auth()` in Server Components for defense in depth.
**Warning signs:** Only relevant if deployment target changes to self-hosted.

---

## Code Examples

Verified patterns from official sources:

### Complete auth() Server Action Pattern
```typescript
// Server Action with Clerk auth — protects mutation
// Source: https://neon.com/blog/nextjs-authentication-using-clerk-drizzle-orm-and-neon
'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { submissions } from '@/db/schema'

export async function createSubmission(code: string, scenarioId: string, difficulty: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const [submission] = await db.insert(submissions).values({
    clerkUserId: userId,
    scenarioId,
    difficulty,
    code,
  }).returning()

  return submission
}
```

### Query User's Own Data Pattern
```typescript
// Server Component — fetch user's submissions
// Source: Drizzle ORM docs + Clerk auth pattern
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { submissions } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function SubmissionsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const userSubmissions = await db
    .select()
    .from(submissions)
    .where(eq(submissions.clerkUserId, userId))
    .orderBy(submissions.createdAt)

  return <SubmissionList submissions={userSubmissions} />
}
```

### Upstash Rate Limiting (for API routes — scaffold for Phase 5)
```typescript
// app/api/pa/route.ts — rate limit pattern
// Source: https://upstash.com/blog/nextjs-ratelimiting
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { auth } from '@clerk/nextjs/server'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '24 h'),  // 5 requests per 24 hours (free tier PA limit)
  analytics: true,
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const { success } = await ratelimit.limit(userId)
  if (!success) return new Response('Rate limit exceeded', { status: 429 })

  // ... PA assistant logic
}
```

### Drizzle Kit Migration Workflow
```bash
# Source: https://neon.com/docs/guides/drizzle
# 1. After modifying src/db/schema.ts, generate migration
npx drizzle-kit generate

# 2. Inspect generated SQL in ./drizzle/ directory — verify before applying
# 3. Apply to Neon (will prompt for DATABASE_URL if not set)
npx drizzle-kit migrate

# 4. In development, use Drizzle Studio to verify
npx drizzle-kit studio
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| NextAuth (Auth.js) for Next.js auth | Clerk for pre-built auth components | 2023-2024 | 30-min setup vs. days; pre-built verified email/password/reset flows |
| Prisma ORM on Vercel | Drizzle ORM | 2024-2025 | 7KB vs 65KB bundle; no codegen; Edge Runtime support |
| Supabase for Postgres | Neon for Postgres | 2024 | Neon: consumption-based pricing, auto-suspend, Vercel-native integration |
| TCP `pg` driver | `@neondatabase/serverless` HTTP driver | 2023 | Mandatory for Vercel serverless — TCP connections fail |
| `authMiddleware()` from Clerk | `clerkMiddleware()` from Clerk | Clerk 5.x (2024) | New API; `authMiddleware` is deprecated; use `clerkMiddleware()` |
| Pages Router (`pages/`) | App Router (`app/`) | Next.js 13-15 | RSC-native; server-first; Clerk has first-class App Router support |

**Deprecated/outdated:**
- `authMiddleware()` from Clerk: Deprecated as of Clerk 5.x. Use `clerkMiddleware()` instead.
- `middleware.ts` named `proxy.ts` in older docs: Some older Clerk guides reference `proxy.ts`. Current Next.js 15 uses `middleware.ts` at project root or `src/middleware.ts`.
- Clerk's `withClerkMiddleware()`: Old API, replaced by `clerkMiddleware()`.

---

## Open Questions

1. **Should a local `users` table be created in Phase 1 to track tier status?**
   - What we know: Clerk stores user metadata; you can store custom metadata in Clerk's `publicMetadata` (e.g., `{ tier: 'free' | 'premium' }`). Tier enforcement via Clerk metadata eliminates a DB join.
   - What's unclear: Whether Clerk `publicMetadata` is the right place to store tier (free/premium) for Phase 1, or whether a DB `users` table is better for querying.
   - Recommendation: For Phase 1, use Clerk `publicMetadata` for tier flag. Avoids DB table. When Stripe is added (Phase 7+), webhook sets `publicMetadata.tier = 'premium'`. No local users table needed until there's a clear reason to add one.

2. **Which Neon Drizzle driver variant — HTTP or WebSocket?**
   - What we know: HTTP driver (`neon-http`) is for single, non-interactive transactions (stateless). WebSocket driver (`neon-ws`) is for sessions and interactive transactions. Vercel serverless functions are stateless.
   - What's unclear: Whether Phase 1's write patterns (insert submission + insert evaluation result in the same request) require transactions, which would need the WebSocket driver.
   - Recommendation: Start with HTTP driver. If multi-statement transactions are needed, use `neon-http`'s `transaction()` method which supports multiple statements in a single HTTP roundtrip. Only switch to WebSocket driver if session-level transactions are required.

3. **Does `create-next-app` scaffold need any post-scaffold cleanup?**
   - What we know: `create-next-app@latest` generates boilerplate (demo page, default styles) that must be cleared before starting development.
   - What's unclear: Exact scaffold configuration flags to use.
   - Recommendation: Use flags `--typescript --tailwind --app --src-dir --import-alias "@/*"`. Immediately clear `src/app/page.tsx` and `src/app/globals.css` boilerplate content after scaffold.

---

## Sources

### Primary (HIGH confidence)
- [Clerk Next.js App Router Quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart) — installation, middleware setup, ClerkProvider, component usage
- [Clerk auth() App Router reference](https://clerk.com/docs/reference/nextjs/app-router/auth) — server-side auth pattern
- [Neon + Drizzle official integration guide](https://neon.com/docs/guides/drizzle) — packages, connection string, drizzle.config.ts, migration commands
- [Neon blog: Next.js auth with Clerk + Drizzle + Neon](https://neon.com/blog/nextjs-authentication-using-clerk-drizzle-orm-and-neon) — full integration pattern with schema examples and server actions
- [Drizzle ORM get-started Neon](https://orm.drizzle.team/docs/get-started/neon-new) — driver variants, config, schema example
- [Upstash Ratelimit docs](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) — rate limiting algorithms, Next.js compatibility
- [Clerk Neon integration docs](https://clerk.com/docs/integrations/databases/neon) — Clerk user ID as FK pattern

### Secondary (MEDIUM confidence)
- [Next.js 15 project structure best practices (DEV Community, 2025)](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) — route group patterns, folder organization
- [Clerk password reset component docs](https://clerk.com/docs/nextjs/reference/components/authentication/task-reset-password) — `<TaskResetPassword>` component behavior
- [Vercel production checklist (2026)](https://vercel.com/docs/production-checklist) — env variables, deployment steps
- [Upstash Next.js rate limiting tutorial](https://upstash.com/blog/nextjs-ratelimiting) — sliding window implementation pattern
- [Clerk sync user data to database](https://clerk.com/articles/how-to-sync-clerk-user-data-to-your-database) — webhook vs. direct auth() patterns

### Tertiary (LOW confidence)
- Various community articles on Next.js 15 project structure — corroborated by official Next.js docs on file conventions

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All libraries verified via official documentation; Clerk, Neon, and Drizzle have explicit Next.js 15 + App Router integration guides
- Architecture: HIGH — Clerk user ID as FK pattern is documented in Neon's official Clerk integration guide; middleware pattern is from Clerk official docs
- Pitfalls: HIGH — Import path errors and env variable issues are documented in official Clerk troubleshooting; TCP driver issue is documented by Neon; security vulnerability is from official CVE reporting

**Research date:** 2026-03-01
**Valid until:** 2026-06-01 (Clerk and Drizzle are stable; Next.js 15 is in maintenance; check for Next.js 16 or Clerk 7.x before this date)
