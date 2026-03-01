# Requirements: SystemDesign.Interactive

**Defined:** 2026-03-01
**Core Value:** Help engineers understand and improve their system design thinking through structured LLM evaluation, targeted PA feedback, and a contextual dashboard that tells them exactly where they are weak.

## v1 Requirements

Requirements for MVP launch. Grouped by category with REQ-IDs for traceability.

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User receives email verification link after signup
- [ ] **AUTH-03**: User can reset password via email link
- [ ] **AUTH-04**: User session persists across browser refresh
- [ ] **AUTH-05**: Free tier gives 5 PA assistant calls per day

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
- [ ] **EVAL-07**: All user code submissions must be validated and sanitized before LLM injection across all endpoints
- [ ] **EVAL-08**: User can see evaluation rubric before submitting

### Dashboard & Progress

- [ ] **DASH-01**: User has personal dashboard showing submitted problems
- [ ] **DASH-02**: Dashboard shows submission history with dates and grades
- [ ] **DASH-03**: Dashboard shows progress (problems solved, success rate)
- [ ] **DASH-04**: User can filter submissions by difficulty level
- [ ] **DASH-05**: User can click submission to revisit and re-submit
- [ ] **DASH-06**: Dashboard includes a contextual chatbot that analyzes the user's criterion-level failure history and tells them which areas they are weakest in
- [ ] **DASH-07**: Chatbot responses include direct links to relevant Weapons entries (patterns or editorials) so users can immediately study the identified weakness

### Weapons (Pattern Library & Resources)

- [ ] **LIB-01**: Platform includes Weapons library (10-15 design patterns)
- [ ] **LIB-02**: Each pattern has description, when to use, code example, and a unique ID for deep linking
- [ ] **LIB-03**: User can search patterns by keyword
- [ ] **LIB-04**: Platform includes 5-7 editorial solutions for parking lot
- [ ] **LIB-05**: Editorial solutions include explanation of design choices

### Infrastructure & Quality

- [ ] **INFRA-01**: Platform deployed to Vercel with auto-scaling
- [ ] **INFRA-02**: LLM evaluation uses Claude 3.5 Sonnet with temperature=0 (consistent)
- [ ] **INFRA-03**: Evaluation results are cached to prevent duplicate API calls
- [ ] **INFRA-04**: Rate limiting via Upstash Redis
- [x] **INFRA-05**: Database uses Neon (serverless PostgreSQL)
- [ ] **INFRA-07**: Error monitoring active in production — unhandled exceptions generate alerts and LLM model parameters are logged per evaluation record

## v2 Requirements

Deferred to post-MVP. Tracked but not in current roadmap.

### Visualization

- **VIZ-01**: Premium tier users see animated parking lot visualization
- **VIZ-02**: Animation shows parking lot state before user's design
- **VIZ-03**: Animation shows parking lot state after user's design
- **VIZ-04**: Animation highlights failure modes (e.g., users clogging at entry)
- **VIZ-05**: Visualization is 2D SVG + Framer Motion animation
- **VIZ-06**: Animation plays in 2-3 minute realistic simulation
- **VIZ-07**: Video export of parking lot simulation (async job queue)
- **VIZ-08**: Multi-scenario visualization (URL Shortener, Social Feed)
- **VIZ-09**: Interactive replay controls (pause, rewind, speedup)

### Premium Tier & Payments

- **AUTH-06**: Premium tier ($9/month via Stripe) gives unlimited PA calls + visualization
- **INFRA-06**: Payment processing via Stripe

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
| Video synthesis/generation | Async video export deferred to v2. |
| Certification/badges | Focus on learning outcomes, not gamification in v1. |
| Multi-language support | English only for v1. |
| Advanced DevOps features | Cloud architecture, Kubernetes, advanced load balancing out of scope. |
| Real-time collaboration | Single-user focus for v1. Multiplayer deferred to v2. |
| Animated visualization | SVG + Framer Motion replay deferred to v2 alongside premium tier. |
| Stripe payments | No payment processing in v1. All features are free tier. |

## Traceability

Which phases cover which requirements. Updated during roadmap revision (2026-03-01).

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 — Foundation | Pending |
| AUTH-02 | Phase 1 — Foundation | Pending |
| AUTH-03 | Phase 1 — Foundation | Pending |
| AUTH-04 | Phase 1 — Foundation | Pending |
| AUTH-05 | Phase 5 — PA Assistant | Pending |
| EDIT-01 | Phase 3 — Editor | Pending |
| EDIT-02 | Phase 3 — Editor | Pending |
| EDIT-03 | Phase 3 — Editor | Pending |
| EDIT-04 | Phase 3 — Editor | Pending |
| EDIT-05 | Phase 3 — Editor | Pending |
| SCEN-01 | Phase 2 — Scenario Engine | Pending |
| SCEN-02 | Phase 2 — Scenario Engine | Pending |
| SCEN-03 | Phase 2 — Scenario Engine | Pending |
| SCEN-04 | Phase 2 — Scenario Engine | Pending |
| SCEN-05 | Phase 2 — Scenario Engine | Pending |
| SCEN-06 | Phase 2 — Scenario Engine | Pending |
| EVAL-01 | Phase 4 — Evaluation Engine | Pending |
| EVAL-02 | Phase 4 — Evaluation Engine | Pending |
| EVAL-03 | Phase 4 — Evaluation Engine | Pending |
| EVAL-04 | Phase 5 — PA Assistant | Pending |
| EVAL-05 | Phase 5 — PA Assistant | Pending |
| EVAL-06 | Phase 5 — PA Assistant | Pending |
| EVAL-07 | Phase 8 — Infrastructure | Pending |
| EVAL-08 | Phase 4 — Evaluation Engine | Pending |
| DASH-01 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-02 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-03 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-04 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-05 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-06 | Phase 6 — Dashboard + Chatbot | Pending |
| DASH-07 | Phase 6 — Dashboard + Chatbot | Pending |
| LIB-01 | Phase 7 — Weapons | Pending |
| LIB-02 | Phase 7 — Weapons | Pending |
| LIB-03 | Phase 7 — Weapons | Pending |
| LIB-04 | Phase 7 — Weapons | Pending |
| LIB-05 | Phase 7 — Weapons | Pending |
| INFRA-01 | Phase 8 — Infrastructure | Pending |
| INFRA-02 | Phase 8 — Infrastructure | Pending |
| INFRA-03 | Phase 8 — Infrastructure | Pending |
| INFRA-04 | Phase 8 — Infrastructure | Pending |
| INFRA-05 | Phase 1 — Foundation | Complete |
| INFRA-07 | Phase 8 — Infrastructure | Pending |

**Coverage:**
- v1 requirements: 32 total
- Mapped to phases: 32/32
- Unmapped: 0

**Moved to v2 (2026-03-01 revision):**
- VIZ-01 through VIZ-06 (animated visualization — deferred with premium tier)
- AUTH-06 (premium Stripe subscription — no payments in v1)
- INFRA-06 (Stripe payment processing — no payments in v1)

**Added in v1 (2026-03-01 revision):**
- DASH-06 (dashboard contextual chatbot — weakness analysis)
- DASH-07 (chatbot-to-Weapons deep linking)

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 — roadmap revised to 8 phases; VIZ and payment requirements moved to v2; contextual chatbot added to v1*
