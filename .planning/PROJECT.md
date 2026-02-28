# SystemDesign.Interactive

## What This Is

An interactive platform where engineers visualize the real-world impact of their system design decisions in real-time. Users tackle interview-level design problems, write logic in an integrated IDE, and watch how their choices affect system performance through visual feedback. The PA assistant (free tier) identifies design flaws; premium users see animated visualizations of failures and successes.

## Core Value

Help engineers move from abstract system design thinking to concrete, visual understanding by showing the actual impact of their architectural decisions — turning "what if I remove this service?" into "watch users get clogged here."

## Requirements

### Validated

(None yet — ship to validate)

### Active

#### MVP (v1)

- [ ] Interactive IDE where users write design logic (code editor in browser)
- [ ] Parking lot system scenario (interview-level complexity)
- [ ] Difficulty levels: Easy (no concurrency), Medium (multiple entities + light concurrency), Hard (full concurrency)
- [ ] PA Assistant (LLM-powered) identifies design flaws and suggests improvements
- [ ] Requirements generator that creates acceptance criteria based on difficulty level
- [ ] Design evaluator that grades user solutions against requirements
- [ ] Visualization for parking lot scenario showing real-world impact of design choices
- [ ] Free tier access with PA assistant feedback only
- [ ] Premium tier with animated video visualization of design performance

#### Future (v2+)

- [ ] Additional system design scenarios (URL shortener, social media feed, etc.)
- [ ] Real-time collaborative design sessions
- [ ] Leaderboards and shared designs community
- [ ] Performance metrics tracking and improvement over time
- [ ] Video generation for all scenarios (not just parking lot)

### Out of Scope

- Mobile app (web-first launch)
- Real-time multiplayer collaboration in v1
- Certification/badges in v1 (focus on learning feedback loop first)
- Video generation for scenarios beyond parking lot initially
- Advanced ML-based pattern recognition across user designs

## Context

**Target Users:**
- Engineers preparing for FAANG system design interviews
- Working professionals upskilling for promotions/senior roles
- Interview prep community (huge market)

**Market Insight:**
- System design is one of the hardest topics to learn because it's concept-heavy and non-visual
- Interview prep is a multi-billion-dollar market (LeetCode, DesignGurus, bootcamps)
- No major competitor has cracked *interactive visual feedback* yet
- Freemium model works well in this space (free + premium conversion path)

**Technical Approach:**
- Start with one scenario (parking lot) perfected
- Web stack (React + Node) for fastest development and visualization
- LLM for requirements generation and solution evaluation
- Simple 2D visualization/animation for parking lot scenario
- Scale to more scenarios and problems in future phases

## Constraints

- **Timeline**: 2-4 weeks for v1 MVP (parking lot + PA + basic visualization)
- **Team**: Solo build initially (must prioritize ruthlessly)
- **Tech Stack**: Web-based (JavaScript/TypeScript recommended for speed)
- **Complexity**: Interview-level parking lot (realistic FAANG problem depth)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Start with one scenario (parking lot) | Reduces scope dramatically while proving core concept | — Pending |
| Free tier = PA assistant only, Premium = Video visualization | Freemium model proven in education; PA creates habit, video is monetization | — Pending |
| Web stack (React + Node) | Fastest development + easy visualization; target audience is web-savvy engineers | — Pending |
| LLM-powered evaluation | Avoids rigid rule engines; can adapt to different design approaches | — Pending |

---
*Last updated: 2025-02-28 after initialization*