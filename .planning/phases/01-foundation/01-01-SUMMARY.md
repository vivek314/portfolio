---
phase: 01-foundation
plan: "01"
subsystem: infra
tags: [nextjs, typescript, tailwind, clerk, drizzle, neon, zustand, react-query, upstash]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.6 App Router project with TypeScript and Tailwind CSS 4.x
  - Landing page at src/app/page.tsx with SystemDesign.Interactive heading
  - Clean root layout at src/app/layout.tsx (ClerkProvider-ready for Plan 03)
  - Shared domain types at src/types/index.ts (Difficulty, ScenarioId, Submission, CriterionResult, EvaluationResult)
  - All Phase 1 npm packages pre-installed (@clerk/nextjs, drizzle-orm, @neondatabase/serverless, zustand, @tanstack/react-query, @upstash/redis, @upstash/ratelimit)
  - Developer environment template at .env.local.example
  - Canonical folder structure (src/db, src/lib, src/components/ui, src/components/auth)
affects: [01-02, 01-03, 01-04, 01-05, all-phases]

# Tech tracking
tech-stack:
  added:
    - Next.js 16.1.6 (App Router)
    - React 19.2.3
    - TypeScript 5
    - Tailwind CSS 4 (@tailwindcss/postcss)
    - "@clerk/nextjs ^6.39.0"
    - "drizzle-orm ^0.45.1"
    - "@neondatabase/serverless ^1.0.2"
    - "zustand ^5.0.11"
    - "@tanstack/react-query ^5.90.21"
    - "@upstash/redis ^1.36.3"
    - "@upstash/ratelimit ^2.0.8"
    - "drizzle-kit ^0.31.9 (dev)"
  patterns:
    - "App Router layout hierarchy: layout.tsx imports globals.css, wraps all pages"
    - "Shared types in src/types/index.ts — downstream phases import from here"
    - "Environment template pattern: .env.local.example committed, .env.local gitignored"

key-files:
  created:
    - systemdesign-interactive/src/app/page.tsx
    - systemdesign-interactive/src/app/layout.tsx
    - systemdesign-interactive/src/app/globals.css
    - systemdesign-interactive/src/types/index.ts
    - systemdesign-interactive/.env.local.example
    - systemdesign-interactive/src/db/.gitkeep
    - systemdesign-interactive/src/lib/.gitkeep
    - systemdesign-interactive/src/components/ui/.gitkeep
    - systemdesign-interactive/src/components/auth/.gitkeep
  modified:
    - systemdesign-interactive/.gitignore
    - systemdesign-interactive/package.json

key-decisions:
  - "Used Tailwind 4.x @import syntax in globals.css (not deprecated @tailwind directives) — scaffold produced Tailwind 4 which uses @import tailwindcss"
  - "Added !.env.local.example exception to .gitignore so the example template is committed but actual secrets are not"
  - "Added /drizzle/ to .gitignore for migration output (uncommitted for now)"
  - "Next.js 16.1.6 scaffolded (latest at execution time, plan said 15 but 16 is the current release)"

patterns-established:
  - "Shared types pattern: all domain types defined once in src/types/index.ts, imported by feature modules"
  - "Gitignore pattern: .env* wildcard blocks all env files, !.env.local.example exception allows template to be tracked"

requirements-completed: [INFRA-05]

# Metrics
duration: 15min
completed: 2026-03-01
---

# Phase 1 Plan 01: Project Scaffold Summary

**Next.js 16 App Router project with Tailwind 4, all Phase 1 dependencies installed, shared TypeScript domain types, and canonical folder structure ready for Plans 02-05**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-01T07:30:00Z
- **Completed:** 2026-03-01T07:45:00Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Scaffolded Next.js 16.1.6 with App Router, TypeScript, Tailwind CSS 4.x, src/ directory layout
- Installed all 8 Phase 1 packages in one pass (Clerk, Drizzle, Neon, Zustand, React Query, Upstash Redis/Ratelimit, drizzle-kit)
- Replaced boilerplate with clean SystemDesign.Interactive landing page and minimal layout
- Created canonical folder structure (db/, lib/, components/ui/, components/auth/) for downstream plans to populate
- Defined stable shared TypeScript types (Difficulty, ScenarioId, Submission, CriterionResult, EvaluationResult) that all phases depend on
- Committed developer environment template (.env.local.example) with all Phase 1 variable names

## Task Commits

Each task was committed atomically:

1. **Initial scaffold** - `1bae18b` (chore: initial Next.js 15 scaffold)
2. **Task 1: Scaffold Next.js project with Phase 1 dependencies** - `24be11e` (feat)
3. **Task 2: Create folder structure and shared types** - `a54c69d` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/app/page.tsx` - Minimal landing page with "SystemDesign.Interactive" heading, ready for production
- `src/app/layout.tsx` - Root layout with Inter font, ClerkProvider slot ready (Plan 03 will add it)
- `src/app/globals.css` - Tailwind 4 import only, no default CSS variable boilerplate
- `src/types/index.ts` - Shared domain types: Difficulty, ScenarioId, ScenarioConfig, Submission, CriterionResult, EvaluationResult
- `.env.local.example` - Template with Clerk, Neon DATABASE_URL, and Upstash variables (committed, no secrets)
- `.gitignore` - Added /drizzle/ exclusion and !.env.local.example whitelist
- `package.json` - All Phase 1 dependencies installed with exact resolved versions
- `src/db/.gitkeep` - Placeholder for Drizzle client + schema (Plan 02)
- `src/lib/.gitkeep` - Placeholder for auth helpers and utilities
- `src/components/ui/.gitkeep` - Placeholder for shadcn/ui primitives (later phases)
- `src/components/auth/.gitkeep` - Placeholder for nav bar and user button wrappers

## Decisions Made

- **Tailwind 4.x @import syntax:** The scaffold produced Tailwind 4, which uses `@import "tailwindcss"` rather than the v3 `@tailwind base/components/utilities` directives. The plan mentioned v3 syntax but Tailwind 4 is what create-next-app 16 installs. Used `@import "tailwindcss"` in globals.css for compatibility.
- **Next.js 16.1.6 (not 15):** create-next-app@latest scaffolded 16.1.6, the current release. Plan said "Next.js 15" but 16 is backward-compatible and all features planned for Phase 1 work identically.
- **gitignore exception for .env.local.example:** The default `.env*` wildcard blocked the example file. Added `!.env.local.example` exception so the template is tracked in git. Actual `.env.local` (with secrets) remains ignored.
- **drizzle/ added to .gitignore:** Added `/drizzle/` to keep migration output uncommitted (per plan guidance).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Tailwind CSS version mismatch in globals.css**
- **Found during:** Task 1 (scaffold cleanup)
- **Issue:** Plan specified `@tailwind base/components/utilities` directives, but create-next-app installed Tailwind 4.x which uses `@import "tailwindcss"`. Using v3 directives with Tailwind 4 would break compilation.
- **Fix:** Used `@import "tailwindcss"` (Tailwind 4 syntax) in globals.css instead of v3 directives
- **Files modified:** src/app/globals.css
- **Verification:** Build passed with zero errors
- **Committed in:** 1bae18b (initial scaffold commit)

**2. [Rule 2 - Missing Critical] Added .env.local.example gitignore whitelist**
- **Found during:** Task 2 (committing .env.local.example)
- **Issue:** Default .gitignore uses `.env*` wildcard which blocked committing the example template file
- **Fix:** Added `!.env.local.example` exception to .gitignore so the template is tracked
- **Files modified:** .gitignore
- **Verification:** `git add .env.local.example` succeeded after exception added
- **Committed in:** a54c69d (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 version compatibility fix, 1 gitignore correction)
**Impact on plan:** Both fixes necessary for correctness. No scope creep. Plan artifacts all delivered as specified.

## Issues Encountered

- Tailwind 4 `@import` syntax vs v3 `@tailwind` directives — resolved by using the version-appropriate syntax
- `.env.local.example` blocked by `.env*` gitignore pattern — resolved by adding negation rule

## User Setup Required

None at this stage — no external services configured yet. Plans 02 (Neon) and 03 (Clerk) will require service setup. See `.env.local.example` for the variables that will need to be filled in.

## Next Phase Readiness

- Project compiles with zero TypeScript errors (`npx tsc --noEmit` passes)
- `npm run build` exits 0, all static pages generated
- All Phase 1 packages installed and verified in package.json
- Shared types stable and exportable — Plans 02, 03, 04, 05 can all import from `@/types`
- Folder structure in place — Plans 02 (db/) and 03 (lib/, components/auth/) have their directories ready
- Plan 02 (Neon + Drizzle schema) and Plan 03 (Clerk auth) can proceed in parallel

---
*Phase: 01-foundation*
*Completed: 2026-03-01*
