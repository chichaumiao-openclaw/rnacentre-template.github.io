# T-STAT-001 — KPI Framework + 1-Week Rapid Usability Protocol + Decision Thresholds

Owner: `research_statistician`  
Date: 2026-03-07 (CST)  
Scope: Unified scientific database frontend template MVP (RiboCentre / Riboswitch / Aptamer)

## 1) KPI Framework (MVP Gate)

### Primary KPIs (release-gating)
1. **Task success rate (TSR)** for critical flows
   - Flows: Home→Browse, Browse→Detail, theme switch + persistence
   - Metric: % participants completing each flow without moderator intervention
   - Target threshold: **>= 85%** overall, and **>= 75%** per individual flow

2. **Time on task (ToT)**
   - Metric: median completion time per flow (seconds)
   - Baseline: internal pilot median from day-1 benchmark run
   - Target threshold: **no worse than +20% vs baseline** by week end

3. **Interaction error rate**
   - Metric: mean count of recoverable UX errors per participant per flow
   - Examples: wrong nav path, failed filter interaction, theme toggle confusion
   - Target threshold: **<= 1.0 errors/flow/participant**

4. **Perceived usability (SUS, 0–100)**
   - Metric: System Usability Scale post-test score
   - Target threshold: **median >= 72** (industry “good” benchmark region)

### Secondary KPIs (diagnostic, non-blocking unless extreme)
1. **Theme clarity score (Likert 1–5)** for each brand palette
   - Threshold: mean >= 4.0, and no theme < 3.5
2. **Visual readability pass rate** for key text blocks
   - Threshold: >= 90% “easy to read” responses
3. **Navigation confidence (Likert 1–5)**
   - Threshold: mean >= 4.0

## 2) Experimental Design (1-week rapid protocol)

### Study type
- **Mixed-method rapid usability test** with repeated measures.
- Each participant tests all three themes (within-subject), order randomized by Latin-square rotation.

### Sample plan
- **N = 18 target** (minimum analyzable N = 12)
- Composition: mix of novice/intermediate domain users, at least 30% first-time exposure to this UI family.
- Device split target: desktop >= 70%, tablet/mobile exploratory <= 30%.

### Timeline (7 days)
- **Day 1:** Pilot (n=3), instrument calibration, baseline timing capture.
- **Days 2–5:** Main sessions (n=3–4/day).
- **Day 6:** Data cleaning, coding of qualitative issues, preliminary analysis.
- **Day 7:** Final analysis + go/no-go recommendation.

### Controlled tasks (per participant)
1. Locate a target entry from Home via Browse.
2. Apply at least one filter and open a detail view.
3. Switch among all three themes and confirm active theme persistence.
4. Return to Home and locate one predefined content block.

### Counterbalancing and controls
- Theme order randomized via precomputed assignment list.
- Standardized prompts/script to reduce facilitator variance.
- Same dataset slice and same predefined targets across participants.
- Exclude pilot participants from confirmatory inferential analysis.

## 3) Statistical Analysis Plan

### Estimation-first reporting
- Report point estimates + uncertainty intervals for every primary KPI.
- Confidence interval convention:
  - Proportions (TSR): **Wilson 95% CI**
  - Times/errors: **Bootstrap 95% CI** for medians/means (10k resamples)
  - SUS: median + bootstrap 95% CI

### Hypothesis checks (supportive, not sole basis)
- Repeated-measures comparisons across themes:
  - ToT/errors: Friedman test; post-hoc Wilcoxon signed-rank with Holm correction.
  - Likert outcomes: Friedman + Holm-corrected pairwise tests.
- Multiple testing control: **Holm step-down** within each KPI family.
- Practical significance emphasis:
  - Predefine meaningful deltas: ToT >= 15% change, SUS >= 5 points.

### Missing data and exclusions
- Exclude sessions with major technical interruption > 20% of total task time.
- Partial completion retained for diagnostic metrics; flagged for primary KPI denominator rules.
- All exclusions logged with reason table.

## 4) Decision Thresholds (Verdict rubric)

### Supported
- All primary KPI thresholds met, and no severe qualitative blocker (severity 1).

### Weakly supported
- Exactly one primary KPI misses threshold by <= 10% relative margin, with clear fix path <= 2 dev-days.

### Unsupported
- Two or more primary KPIs miss threshold, or any single KPI misses by > 10% relative margin, or severe blocker persists.

## 5) Deliverables checklist
- [ ] Raw session logs (timestamped)
- [ ] KPI table with 95% CIs
- [ ] Multiple-testing adjustment table
- [ ] Severity-ranked issue log
- [ ] Final verdict: Supported / Weakly Supported / Unsupported

## 6) Risks and mitigation
- **Underpowered subgroup comparisons**: treat subgroup outputs as exploratory only.
- **Learning effect in within-subject design**: randomized order + first-task warm-up.
- **Facilitator bias**: fixed script + no hinting policy.

---
This protocol is designed to support fast MVP decisions while preserving statistical rigor, uncertainty quantification, and fair comparison across themes.
