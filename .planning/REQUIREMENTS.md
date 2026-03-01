# Requirements: SystemDesign.Interactive

**Defined:** 2026-03-01
**Core Value:** Help engineers visualize the real impact of their system design decisions, turning abstract concepts into concrete visual feedback.

## v1 Requirements

Requirements for MVP launch (2-4 weeks). Grouped by category with REQ-IDs for traceability.

### Authentication & Freemium

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User receives email verification link after signup
- [ ] **AUTH-03**: User can reset password via email link
- [ ] **AUTH-04**: User session persists across browser refresh
- [ ] **AUTH-05**: Free tier gives 5 PA assistant calls per day
- [ ] **AUTH-06**: Premium tier ($9/month via Stripe) gives unlimited PA calls + visualization

### Code Editor & IDE

- [ ] **EDIT-01**: User can write design logic in Monaco editor (JavaScript/TypeScript)
- [ ] **EDIT-02**: Editor has syntax highlighting and autocomplete
- [ ] **EDIT-03**: User can submit design for evaluation with one click
- [ ] **EDIT-04**: Editor preserves user's code between sessions
- [ ] **EDIT-05**: User can see error messages if code fails to parse

### Parking Lot Scenario

- [ ] **SCEN-01**: Parking lot scenario has three difficulty levels: Easy, Medium, Hard
- [ ] **SCEN-02**: Easy level (no concurrency, simple entity management)
- [ ] **SCEN-03**: Medium level (multiple entities, light concurrency)
- [ ] **SCEN-04**: Hard level (multiple entities, full concurrency)
- [ ] **SCEN-05**: System generates acceptance criteria based on selected difficulty
- [ ] **SCEN-06**: User sees acceptance criteria before writing solution

### Evaluation & PA Assistant

- [ ] **EVAL-01**: System evaluates user's design against parking lot requirements
- [ ] **EVAL-02**: Evaluation uses structured rubric (8-10 criteria per difficulty)
- [ ] **EVAL-03**: System generates grade (pass/fail with explanation)
- [ ] **EVAL-04**: PA Assistant provides LLM feedback on design flaws
- [ ] **EVAL-05**: PA feedback streams to user in real-time (<5 seconds)
- [ ] **EVAL-06**: Free users see 5 PA calls per day (rate-limited)
- [ ] **EVAL-07**: Premium users have unlimited PA calls
- [ ] **EVAL-08**: User can see evaluation rubric before submitting

### Visualization (Premium)

- [ ] **VIZ-01**: Premium tier users see animated parking lot visualization
- [ ] **VIZ-02**: Animation shows parking lot state before user's design
- [ ] **VIZ-03**: Animation shows parking lot state after user's design
- [ ] **VIZ-04**: Animation highlights failure modes (e.g., users clogging at entry)
- [ ] **VIZ-05**: Visualization is 2D SVG + Framer Motion animation
- [ ] **VIZ-06**: Animation plays in 2-3 minute realistic simulation

### Dashboard & Progress

- [ ] **DASH-01**: User has personal dashboard showing submitted problems
- [ ] **DASH-02**: Dashboard shows submission history with dates and grades
- [ ] **DASH-03**: Dashboard shows progress (problems solved, success rate)
- [ ] **DASH-04**: User can filter submissions by difficulty level
- [ ] **DASH-05**: User can click submission to revisit and re-submit

### Pattern Library & Resources

- [ ] **LIB-01**: Platform includes pattern library (10-15 design patterns)
- [ ] **LIB-02**: Each pattern has description, when to use, code example
- [ ] **LIB-03**: User can search patterns by keyword
- [ ] **LIB-04**: Platform includes 5-7 editorial solutions for parking lot
- [ ] **LIB-05**: Editorial solutions include explanation of design choices

### Infrastructure & Quality

- [ ] **INFRA-01**: Platform deployed to Vercel with auto-scaling
- [ ] **INFRA-02**: LLM evaluation uses Claude 3.5 Sonnet with temperature=0 (consistent)
- [ ] **INFRA-03**: Evaluation results are cached to prevent duplicate API calls
- [ ] **INFRA-04**: Rate limiting via Upstash Redis
- [ ] **INFRA-05**: Database uses Neon (serverless PostgreSQL)
- [ ] **INFRA-06**: Payment processing via Stripe
- [ ] **INFRA-07**: All user code submissions must be validated before execution

## v2 Requirements

Deferred to post-MVP. Tracked but not in current roadmap.

### Visualization Enhancements

- **VIZ-07**: Video export of parking lot simulation (async job queue)
- **VIZ-08**: Multi-scenario visualization (URL Shortener, Social Feed)
- **VIZ-09**: Interactive replay controls (pause, rewind, speedup)

### Community & Gamification

- **COMM-01**: Leaderboard showing top designers by score
- **COMM-02**: User profiles with bio and design solutions
- **COMM-03**: Share design solutions with link (read-only view)
- **COMM-04**: Community discussion forum per scenario
- **COMM-05**: Peer code review with comments

### Additional Scenarios

- **SCEN-07**: URL Shortener system design scenario
- **SCEN-08**: Social media feed system design scenario
- **SCEN-09**: Rate limiter design scenario
- **SCEN-10**: Notification system design scenario

### Advanced Features

- **ADV-01**: Adaptive difficulty recommendations based on user performance
- **ADV-02**: AI-powered explanations of why user design failed
- **ADV-03**: Live mock interview mode (timed challenge)
- **ADV-04**: Performance metrics dashboard (p50, p99 latencies)
- **ADV-05**: Multi-user collaborative design sessions

## Out of Scope

Explicitly excluded from v1. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Real-time code execution | Users write design intent, not executable code. No sandbox needed. |
| Mobile app | Web-first launch only. Mobile can come post-v1. |
| OAuth login | Email/password sufficient for v1. OAuth is v2. |
| Video synthesis/generation | Async video export deferred to v2. v1 uses real-time SVG animation. |
| Certification/badges | Focus on learning outcomes, not gamification in v1. |
| Multi-language support | English only for v1. |
| Advanced DevOps features | Cloud architecture, Kubernetes, advanced load balancing out of scope. |
| Real-time collaboration | Single-user focus for v1. Multiplayer deferred to v2. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 to AUTH-04 | Phase 1 | Pending |
| AUTH-05 to AUTH-06 | Phase 2 | Pending |
| EDIT-01 to EDIT-05 | Phase 1 | Pending |
| SCEN-01 to SCEN-06 | Phase 1 | Pending |
| EVAL-01 to EVAL-08 | Phase 1 | Pending |
| VIZ-01 to VIZ-06 | Phase 2 | Pending |
| DASH-01 to DASH-05 | Phase 3 | Pending |
| LIB-01 to LIB-05 | Phase 3 | Pending |
| INFRA-01 to INFRA-07 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: (pending roadmap)
- Unmapped: (pending roadmap)

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 after v1 scoping*
