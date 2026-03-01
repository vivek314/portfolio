---
phase: 01-foundation
plan: "02"
subsystem: database
tags: [neon, drizzle-orm, postgresql, drizzle-kit, serverless, migrations]

# Dependency graph
requires:
  - phase: 01-01
    provides: Project scaffold with packages installed, TypeScript types in src/types/index.ts
provides:
  - Drizzle client singleton (src/db/index.ts) using Neon HTTP driver
  - PostgreSQL schema for submissions and evaluation_results tables (src/db/schema.ts)
  - Drizzle Kit config (drizzle.config.ts) for migration generation and execution
  - Applied migration (drizzle/0000_faulty_robbie_robertson.sql) — tables live in Neon
  - Database scripts in package.json: db:generate, db:migrate, db:studio
affects: [02-scenario-engine, 03-editor, 04-evaluation-engine, 05-pa-assistant, 06-dashboard]

# Tech tracking
tech-stack:
  added:
    - drizzle-orm@0.45.1 (Drizzle ORM with Neon HTTP driver)
    - @neondatabase/serverless@1.0.2 (Neon serverless PostgreSQL client)
    - drizzle-kit@0.31.9 (migration generation and execution CLI)
    - dotenv@17.3.1 (env var loading for drizzle.config.ts)
  patterns:
    - Neon HTTP driver (drizzle-orm/neon-http) used instead of TCP pg driver — required for Vercel serverless compatibility
    - Drizzle client exported as singleton from src/db/index.ts
    - generate + migrate workflow (not drizzle-kit push) to maintain migration audit trail
    - Clerk user IDs stored as text FK — no local users table, Clerk owns user records

key-files:
  created:
    - src/db/index.ts
    - src/db/schema.ts
    - drizzle.config.ts
    - drizzle/0000_faulty_robbie_robertson.sql
    - drizzle/meta/_journal.json
    - drizzle/meta/0000_snapshot.json
  modified:
    - package.json (added db:generate, db:migrate, db:studio scripts)
    - .env.local (added DATABASE_URL for Neon)

key-decisions:
  - "Neon HTTP driver (drizzle-orm/neon-http) used instead of node-postgres TCP driver — TCP connections fail on Vercel serverless; HTTP driver is Vercel-compatible"
  - "generate + migrate workflow (not drizzle-kit push) — maintains migration audit trail in drizzle/meta/_journal.json; push skips history"
  - "Clerk user IDs as text column (clerk_user_id) with no DB-level FK to a users table — Clerk is the authority on user records; no local users table needed"
  - "evaluation_results.submission_id has CASCADE DELETE — removing a submission removes all evaluation results for it"
  - "criteria_results stored as JSONB — CriterionResult[] array is flexible and queryable without a separate junction table"

patterns-established:
  - "Database client: import { db } from '@/db' (singleton from src/db/index.ts)"
  - "Schema imports: import { submissions, evaluationResults } from '@/db/schema'"
  - "Migration workflow: npm run db:generate (schema changes) then npm run db:migrate (apply to Neon)"

requirements-completed: [INFRA-05]

# Metrics
duration: 45min
completed: 2026-03-01
---

# Phase 1 Plan 02: Neon Database + Drizzle ORM Summary

**Drizzle ORM connected to Neon PostgreSQL via HTTP driver, with submissions and evaluation_results tables migrated and live**

## Performance

- **Duration:** ~45 min (includes human Neon setup checkpoint)
- **Started:** 2026-03-01
- **Completed:** 2026-03-01
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Drizzle client singleton configured with Neon HTTP driver — Vercel serverless compatible
- Phase 1 schema defined: `submissions` (clerk_user_id, scenario_id, difficulty, code, timestamps) and `evaluation_results` (submission_id FK with cascade, criteria_results JSONB, overall_pass, llm_model)
- Migration `0000_faulty_robbie_robertson.sql` generated and applied — both tables live in Neon with correct columns and constraints
- Database scripts added to package.json (`db:generate`, `db:migrate`, `db:studio`) for ongoing schema management

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Drizzle client, schema, and config** - `1b4f013` (feat)
2. **Task 2: Generate migrations and apply to Neon** - `1ea67f3` (feat)

## Files Created/Modified

- `src/db/index.ts` — Drizzle client singleton using neon() + drizzle(sql, { schema })
- `src/db/schema.ts` — pgTable definitions for submissions and evaluation_results
- `drizzle.config.ts` — Drizzle Kit config pointing at Neon via DATABASE_URL
- `drizzle/0000_faulty_robbie_robertson.sql` — Generated CREATE TABLE SQL applied to Neon
- `drizzle/meta/_journal.json` — Migration journal tracking applied migrations
- `drizzle/meta/0000_snapshot.json` — Schema snapshot for Drizzle Kit diff engine
- `package.json` — Added db:generate, db:migrate, db:studio scripts
- `.env.local` — DATABASE_URL set to Neon pooled connection string

## Migration SQL (applied to Neon)

```sql
CREATE TABLE "evaluation_results" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "submission_id" uuid NOT NULL,
  "criteria_results" jsonb NOT NULL,
  "overall_pass" boolean NOT NULL,
  "llm_model" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "submissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "clerk_user_id" text NOT NULL,
  "scenario_id" text NOT NULL,
  "difficulty" text NOT NULL,
  "code" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "evaluation_results"
  ADD CONSTRAINT "evaluation_results_submission_id_submissions_id_fk"
  FOREIGN KEY ("submission_id")
  REFERENCES "public"."submissions"("id")
  ON DELETE cascade ON UPDATE no action;
```

## Neon Database Details

- **Region:** us-east-1 (AWS)
- **Connection:** Pooled connection via Neon HTTP driver (`@neondatabase/serverless`)
- **drizzle-orm version:** 0.45.1
- **drizzle-kit version:** 0.31.9
- **Migration file:** `0000_faulty_robbie_robertson.sql`

## Decisions Made

- Neon HTTP driver selected over node-postgres TCP — TCP connections do not work on Vercel serverless Edge/Node.js functions; HTTP driver is the correct choice for this deployment target.
- `generate` + `migrate` workflow enforced over `drizzle-kit push` — push is for local prototyping only and skips the migration history file; all schema changes for this project go through the generate → migrate pipeline.
- No local users table — Clerk manages user identities; `clerk_user_id` is a plain text column referencing Clerk's user.id. This eliminates user sync complexity entirely.

## Deviations from Plan

**Minor: drizzle.config.ts has explicit DATABASE_URL null check**

The plan's drizzle.config.ts used `process.env.DATABASE_URL!` (non-null assertion). The implemented version adds an explicit runtime throw before defineConfig — safer than a silent non-null assertion that gives a cryptic Neon error if DATABASE_URL is missing.

This is a correctness improvement, not a structural change. No impact on plan artifacts.

---

**Total deviations:** 1 (minor defensive improvement, Rule 2)
**Impact on plan:** Zero functional impact, slightly better developer experience when DATABASE_URL is missing.

## User Setup Required

Neon database was provisioned manually by the user (human checkpoint):
- Created Neon project "systemdesign-interactive" at console.neon.tech
- Copied connection string and added to `.env.local` as `DATABASE_URL`
- Confirmed migrations applied via Neon console

## Next Phase Readiness

- Neon database is live with correct schema — ready for Plan 01-03 (Clerk auth) which references `clerk_user_id` in submissions
- All phases that write to the database (Phase 4+) can use `import { db } from '@/db'`
- Schema aligns exactly with `src/types/index.ts` Submission and EvaluationResult interfaces from Plan 01-01
- No blockers for Plan 01-03

---
*Phase: 01-foundation*
*Completed: 2026-03-01*
