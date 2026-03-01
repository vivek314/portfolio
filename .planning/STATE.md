# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-01)

**Core value:** Help engineers visualize the real impact of their system design decisions — turning abstract architecture thinking into concrete animated feedback
**Current focus:** Phase 1 — Foundation

## Current Position

Phase: 1 of 10 (Foundation)
Plan: 2 of 3 in current phase
Status: In progress
Last activity: 2026-03-01 — Completed Plan 02 (Neon DB + Drizzle)

Progress: [██░░░░░░░░] 7%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 30 min
- Total execution time: 0.75 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 60 min | 30 min |

**Recent Trend:**
- Last 5 plans: 15 min, 45 min
- Trend: —

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Pre-build]: Freemium boundary — Free tier: editor (unlimited) + PA (5/day) + static snapshot. Premium ($9/month): animated visualization + unlimited PA + submission history. Paywall appears after PA feedback delivered, never on first visit.
- [Pre-build]: No code sandbox — user code is design configuration, not executable. Server runs deterministic TypeScript simulation engine. Eliminates Docker/WASM/Judge0 complexity entirely.
- [Pre-build]: Stack finalized — Next.js 15 + Clerk (not NextAuth) + Neon + Drizzle (not Prisma) + Vercel AI SDK + Claude 3.5 Sonnet + Upstash Redis + Framer Motion + SVG.
- [Phase 2]: Scenario plugin interface is non-negotiable — Scenario interface with simulate(), evaluate(), visualize() methods must be defined in Phase 2 before evaluator or visualization code is written.
- [Phase 4]: Evaluator golden test gate — 20+ known-correct and known-broken solutions must pass at 90%+ criterion accuracy before Phase 5 (PA) or Phase 6 (visualization) work begins.
- [01-01]: Tailwind 4.x @import syntax used (not v3 @tailwind directives) — create-next-app 16 installs Tailwind 4 which uses @import "tailwindcss".
- [01-01]: Next.js 16.1.6 scaffolded (plan said 15, but 16 is current release and backward-compatible for all planned features).
- [01-01]: .env.local.example whitelist added to .gitignore via !.env.local.example negation rule — template file must be committed.
- [01-02]: Neon HTTP driver (drizzle-orm/neon-http) used instead of TCP pg driver — TCP connections fail on Vercel serverless; HTTP driver is required for this deployment target.
- [01-02]: generate + migrate workflow enforced over drizzle-kit push — push skips migration history; all schema changes go through generate → migrate pipeline.
- [01-02]: Clerk user IDs stored as text FK (clerk_user_id) with no local users table — Clerk is the authority on user records; eliminates user sync complexity entirely.

### Pending Todos

None yet.

### Blockers/Concerns

- Phase 4 blocker: Parking lot evaluation rubric (8-10 criteria, binary pass/fail, what constitutes correct reasoning at Medium difficulty) is a domain knowledge question — requires explicit rubric design session with sample solutions before implementation. Research flag from SUMMARY.md.
- Phase 6 dependency: Visualization (Phase 6) must start after Stripe gating (Phase 7) is wired — or Stripe must be pulled forward before visualization ships to any user. Plan order is 6 then 7 but coordinate so visualization is not accessible to users until 7 is complete.

## Session Continuity

Last session: 2026-03-01
Stopped at: Completed 01-02-PLAN.md (Neon DB + Drizzle) — Plan 03 (Clerk Auth + Vercel Deployment) ready to proceed.
Resume file: None
