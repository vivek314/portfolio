# Feature Landscape

**Domain:** Interactive system design learning platform
**Researched:** 2026-02-28
**Confidence:** MEDIUM-HIGH (mapped to industry best practices from interview prep market; validated against PROJECT.md requirements)

---

## Table Stakes

Features users expect. Missing = product feels incomplete for an "interactive system design learning platform."

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Code Editor** (browser-based) | Users need to write/submit design code. Monaco standard in IDE space. | Medium | Monaco is 3MB bundle; lazy-load to keep main bundle under 200KB. |
| **Design Evaluation** (automatic grading) | Core value: feedback on whether design works. Interview prep platforms all have this. | High | Must evaluate against structured requirements. LLM-powered grading handles design intent interpretation. |
| **Requirements/Acceptance Criteria** | Users need to know what "success" looks like. All interview prep platforms show this upfront. | Low | Generate per-difficulty-level. Can be templated for parking lot. |
| **PA Assistant Feedback** (LLM-powered) | Users expect intelligent feedback, not just "pass/fail." PA is the free tier hook. | High | Streaming response essential for UX. Must contextualize feedback to user's specific design. |
| **Visualization of Design Impact** | Core differentiator: show *how* the design behaves. Static diagrams ≠ interactive learning. | High | Parking lot v1: 2D canvas showing car entry/exit, spot allocation, congestion. Must be animated, not static screenshots. |
| **User Authentication** | Required for tracking progress, tier enforcement, submission history. | Low | Use NextAuth + GitHub/Google OAuth. |
| **Free vs Premium Tier** | Freemium model is standard in education (LeetCode, DesignGurus). Monetization gate. | Medium | Free: PA assistant only. Premium: animated visualization replay, unlimited PA history. |
| **Submission History** | Users expect to see past attempts. Helps with learning progression. | Low | Show list of submissions with scores, timestamps, design choices. |
| **Difficulty Levels** (Easy/Medium/Hard) | Scaffolding: Easy has simpler constraints (no concurrency), Hard has full complexity. | Medium | Easy: sequential, single-threaded entry/exit. Medium: multiple vehicles + light race conditions. Hard: full distributed concurrency + failure scenarios. |
| **Real-Time Feedback Loop** | Submit → get score + visualization + PA feedback within 3-5s. No waiting. | High | Critical UX: slow feedback breaks learning loop. Use SSE streaming for PA, synchronous evaluation for score. |

---

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Animated Visualization of Failures** (premium) | Watch cars queue up during peak hours. See bottlenecks in real-time. Turns abstract "throughput" into visual reality. | High | This is the core moat vs. static diagram competitors. Use Konva + Motion for smooth animations. |
| **Scenario-Specific Metrics Dashboard** | Show user-relevant stats: avg car entry time, spot utilization %, queue depth over time. Not generic. | Medium | Extract from simulation snapshots. Helps user understand design trade-offs. |
| **PA Assistant Context Awareness** | PA knows user's specific design (reads submitted code), so feedback is personalized, not generic. | Medium | Include submission content + simulation results in PA prompt. Avoid generic "good job" messages. |
| **Design Decision Rationale Extraction** | PA extracts and explains *why* user made each choice (from code comments or inferred). Helps user articulate thinking. | Medium | Use structured LLM output (JSON schema) to extract: allocation strategy, concurrency approach, monitoring points. Store for analytics. |
| **Leaderboard** (future, v2+) | Compare solution performance against other users. Gamification hook for premium tier. | Low (for v1) | Parking lot: sort by "cars served per second" or "max queue time." Need to be careful about dominance/farming. |
| **Video Export of Visualization Replay** (premium) | User can download their simulation as MP4. Share on LinkedIn. Marketing gold. | High | Use headless browser (Puppeteer) or Frame.io API to render Konva canvas at 60fps to video. Post-v1 nice-to-have. |
| **Multi-User Collaborative Design** (future, v2+) | Real-time collaborative whiteboard where two engineers design together, see same visualization. | Very High | Requires WebSocket, OT/CRDT for code sync. Post-v1. Skip for now. |
| **Design Pattern Library** | Show how experienced engineers solve the parking lot (different approaches: bitmap allocation, queue + pool, etc.). | Low | Community contributions or staff-curated. Prevents "blank page syndrome." |
| **Performance Regression Detection** | "Your design regressed from v1 — avg wait time increased 2s." Track design evolution. | Medium | Store version history of submissions. Compare metrics across versions. |

---

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Real Code Execution in Browser** | Arbitrary code execution (Wasm VM, iframe sandbox) is complex, unsafe, and unnecessary. Users aren't writing production code; they're sketching designs. | Interpret design intent from code (via LLM or structured parser). Run simulation server-side under known, safe constraints. |
| **Multiple Concurrent Scenarios in v1** | Each scenario needs: domain logic, requirements templates, visualization, PA prompts. Parking lot is >2 weeks alone. Feature bloat kills v1 ship date. | Laser focus on parking lot perfection. Get one scenario bulletproof. Add URL shortener, social feed, etc. in v2 with learnings from v1. |
| **Certification/Badges** | Interview prep ≠ cert-track education. Badges don't help engineers pass interviews. Adds gamification UX debt. | Focus on skill building feedback loop first. Badges if/when platform scales and has community demand. |
| **Mobile App** | Responsive web is harder than desktop. Code editor on mobile is painful. Interview prep is desktop-centric (interviews happen on laptops). | Ship web-first. Mobile PWA if desktop grows to 10k+ users and analytics show mobile traffic desire. |
| **AI-Generated Video Synthesis** (in v1) | Generating videos at 60fps is expensive (compute, storage). First video export users will use for social proof; perfectionism trap. | v1: Simple canvas-to-video (Puppeteer headless render). Gets 80% of value. VEO 3.1 AI video synthesis is nice-to-have for v2+. |
| **Peer Code Reviews** | Social friction: users may feel judged. Mod overhead for inappropriate feedback. Distraction from core learning loop. | AI (PA) feedback is better scoped and immediate. Peer reviews can come in v2 as opt-in community feature. |
| **Live Coding Interviews** | Out of scope for learning. Adds video streaming infrastructure, scheduling complexity, live tutoring coordination. | Stay focused on self-paced learning. "Live interview prep" is a different product. |
| **Offline Mode** | Code editor offline is complex (sync on reconnect). Learning platform users expect cloud saves. Unused complexity. | Always assume internet. Auto-save submissions to DB. No offline fallback. |

---

## Feature Dependencies

```
Code Editor
    ↓
Evaluator (depends on editor code)
    ↓
Score Display (depends on evaluator)
    ↓
Visualization (depends on evaluator → simulation results)

PA Assistant
    ↓ (depends on code + evaluation results for context)
PA Chat UI (depends on PA assistant, streaming)

Requirements Generator
    ↓ (can be independent, shown before editor)
Requirements Display Panel

Auth/User Management
    ↓ (gates all features, required for)
Submission History, Tier Gating, User Preferences

Tier Gating
    ↓
Premium Visualization Unlock
Premium PA History Unlock
```

**Critical path to MVP:**
1. Code Editor (enabler)
2. Evaluator (core logic)
3. Visualization (core value)
4. PA Assistant (free tier hook)
5. Auth + Tier Gating (monetization gate)

**Nice-to-haves for v1.1 (not blocking MVP ship):**
- Submission History
- Design Pattern Library (staff-curated)
- Leaderboard (soft launch, opt-in)
- Video Export (premium, but can be async job)

---

## MVP Recommendation

Ship with:

1. **Code Editor** — Monaco-based, syntax highlighting for TypeScript (target audience speaks TS)
2. **Parking Lot Scenario (Medium Difficulty Only)** — Start with one difficulty. Easy is too simple, Hard adds concurrency complexity for v1 learnings.
3. **Design Evaluator** — Parse code, run simulation, score against 5-7 requirements (concurrency handling, spot allocation fairness, entry/exit throughput, etc.)
4. **PA Assistant** — Streaming LLM feedback on design. Free tier gets 5 feedback requests/day.
5. **Visualization** — 2D Konva canvas: parking lot grid, car animations, queue display. Must animate state transitions smoothly.
6. **Authentication** — GitHub OAuth via NextAuth. Free tier prompt.
7. **Basic Tier Gating** — Visualization is premium-locked behind $9/month or free ad experience. No paywall for PA initially; convert via visibility (free users see what premium users get).

**Defer to v1.1:**
- Easy/Hard difficulty levels (test Medium first; difficulty UX can adjust after v1 data)
- Leaderboard (launch without, add if community asks)
- Video Export (async job, post-v1)
- Design Pattern Library (can add curated examples post-launch)
- Submission History (nice to have; basic v1 just shows current submission)

**Defer to v2:**
- Additional scenarios (URL shortener, social media feed, distributed cache)
- Collaborative design sessions
- Premium features (performance tracking, design evolution, peer reviews)
- AI-generated video synthesis for replay

---

## Feature Complexity & Effort Estimates

| Feature | Complexity | Effort (days, solo) | Blockers |
|---------|-----------|-------------------|----------|
| Code Editor (Monaco integration) | Medium | 2 | None |
| Parking Lot Simulation Engine | High | 5 | None (core logic) |
| Design Evaluator (LLM + scoring) | High | 3 | LLM access (Anthropic key) |
| Visualization (Konva canvas) | High | 4 | Simulation engine (data shape) |
| PA Assistant (streaming) | Medium | 2 | Evaluator context + LLM SDK |
| Requirements Generator | Low | 1 | LLM prompts |
| Auth + Tier Gating | Medium | 2 | NextAuth setup |
| Database Schema + Migrations | Low | 1 | None |
| Testing (unit + E2E) | Medium | 3 | All above components |
| Deploy + CI/CD | Low | 1 | None |
| **Total for MVP** | — | **24 days** | — |

**Notes:**
- Assumes one engineer, 6 hours/day effective coding (rest is meetings, testing, debugging)
- 24 days ≈ 4 weeks calendar time
- PROJECT.md targets 2-4 weeks; this assumes 3-week realistic timeline with buffer
- Visualization is the long pole (2D animation, state orchestration, responsive canvas)

---

## Table Stakes vs. Differentiator Summary

| Aspect | Table Stakes | Differentiator | Anti-Feature |
|--------|--------------|----------------|-------------|
| **Code Authoring** | Editor + syntax highlighting | — | Real code execution sandbox |
| **Feedback** | PA assistant generic tips | PA reads *your* code + gives specific feedback | Generic template feedback |
| **Learning Impact** | Requirements list | Animated visualization of failures | Badges/certificates |
| **Accessibility** | Free tier with limits | Free PA (monetize via visualization) | Certification requirement |
| **Scale** | One scenario | Parking lot done perfectly | 10 scenarios, none deep |
| **Community** | Solo design environment | (v2) Leaderboard, shared designs | Live peer reviews |

---

## Revenue Model Implications for Features

**Free Tier:**
- Code editor (unlimited)
- Parking lot scenario (unlimited)
- PA assistant (5 calls/day) — intentional friction to drive upgrades
- Visualization (preview only: final state snapshot, not animation)
- Requirements (read-only)

**Premium Tier ($9/month):**
- Everything in free tier, plus:
- PA assistant (unlimited)
- Full animated visualization (replay, scrub timeline)
- Submission history (last 50 submissions)
- Performance metrics dashboard
- Video export (async render to MP4)

**Rationale:** Free tier has "aha moment" (can code and see results), but premium unlocks the magical part (animation). This creates clear upgrade trigger without making free tier useless.

---

## Early User Research Recommendations

Before v1.1, validate:

1. **Do engineers prefer seeing requirements before coding or after?** (impacts UX flow)
2. **Does animated visualization actually improve learning outcome?** (core hypothesis)
3. **What do users *actually* get wrong in parking lot design?** (informs PA prompts and future scenarios)
4. **Would users pay $9/month or prefer $5 + lower limits?** (pricing sensitivity)

Set up PostHog analytics to track:
- Submission frequency per user
- PA request frequency per user
- Visualization view depth (do premium users actually watch the replay?)
- Feature adoption rates by tier

---

## Sources

- [System Design Interview Common Mistakes — DesignGurus](https://www.designgurus.io/answers/detail/what-are-the-common-mistakes-in-a-system-design-interview) — MEDIUM confidence (platform with 50k+ users)
- [System Design Interview Pitfalls — GeeksforGeeks](https://www.geeksforgeeks.org/system-design/common-mistakes-to-avoid-in-a-system-design-interview/) — MEDIUM confidence (widely referenced in interview prep community)
- [Parking Lot System Design — Medium](https://medium.com/double-pointer/system-design-interview-parking-lot-system-ff2c58167651) — LOW confidence (single article, but pattern corroborated across multiple interview platforms)
- [Freemium SaaS Feature Gating Patterns](https://dev.to/aniefon_umanah_ac5f21311c/feature-gating-how-we-built-a-freemium-saas-without-duplicating-components-1lo6) — LOW confidence (pattern standard in SaaS, corroborated by multiple sources)
- [LeetCode Freemium Model](https://leetcode.com/) — HIGH confidence (observed behavior, multi-billion-dollar platform)
- [DesignGurus Freemium Structure](https://designgurus.io) — MEDIUM confidence (direct observation of competitor)

---
*Feature landscape for: Interactive System Design Learning Platform (SystemDesign.Interactive)*
*Researched: 2026-02-28*
