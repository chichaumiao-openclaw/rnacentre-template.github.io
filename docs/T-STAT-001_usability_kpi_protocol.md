# T-STAT-001 — KPI + 1-Week Rapid Usability Protocol + Decision Thresholds

## Scope
This protocol evaluates the MVP scientific database frontend (Home/Browse/Detail + theme switch) for **task usability**, **perceived trust**, and **interaction reliability** over one week.

## Primary Questions
1. Can target users complete core discovery tasks quickly and correctly?
2. Does UI theme switching preserve comprehension and interaction quality?
3. Are observed changes practically meaningful, not just noisy?

---

## KPI Framework

### Primary KPIs (decision-driving)
1. **Task Success Rate (TSR)**
   - Definition: proportion of participants completing each task without moderator intervention.
   - Unit: %
2. **Time on Task (ToT)**
   - Definition: elapsed seconds from task start to successful completion.
   - Unit: seconds (median + IQR reported)
3. **Critical Error Rate (CER)**
   - Definition: count of blocking errors per participant-task (wrong page path, dead-end, failed recovery).
   - Unit: errors / participant-task
4. **Single Ease Question (SEQ)**
   - Definition: post-task ease score on 7-point scale.
   - Unit: mean score (with CI)

### Secondary KPIs (diagnostic)
1. **Theme Switch Cost (TSC)**
   - Delta in ToT immediately after theme change vs same task class pre-switch.
2. **Navigation Backtrack Rate (NBR)**
   - Number of redundant route reversals per task.
3. **Content Trust Rating (CTR)**
   - 5-point Likert confidence in scientific content presentation clarity.

---

## Baseline, Controls, and Ablations

### Baseline
- Current MVP interaction flow with default theme (RiboCentre blue), no UI modifications.

### Control Condition
- Fixed-theme flow (no user-triggered theme switch) for matched tasks.

### Ablation Conditions
1. **Ablation A (No quick filters)** — remove/disable browse filter shortcuts if available.
2. **Ablation B (Reduced detail metadata)** — show minimal metadata on Detail page.
3. **Ablation C (Theme-switch stress)** — force one switch before each task.

Rationale: isolate whether usability comes from core IA/content versus convenience affordances and visual token changes.

---

## 1-Week Rapid Usability Plan

## Participants
- Target: **n=18** total (6 per role segment: bench scientist, bioinformatics analyst, student/trainee).
- Minimum analyzable sample: **n=15** (below this, classify as underpowered for between-role comparisons).

## Task Set (per participant)
1. Find a target entry from Home search.
2. Narrow results in Browse and identify a candidate.
3. Validate key metadata in Detail and report one evidence field.
4. Repeat one matched task after theme switch.

## Schedule
- **Day 1:** pilot (n=3), instrument validation, wording fixes.
- **Day 2–4:** moderated sessions (n≈10).
- **Day 5:** unmoderated sessions (n≈5) for ecological realism.
- **Day 6:** analysis and threshold check.
- **Day 7:** decision memo (supported / weakly supported / unsupported).

---

## Analysis Plan

## Estimation-first reporting
- Report **95% confidence intervals** for TSR, CER, SEQ, CTR.
- For ToT and skewed metrics, report bootstrap 95% CI (10,000 resamples).
- Report effect sizes:
  - Proportions: risk difference + Wilson CI
  - Time metrics: Hodges–Lehmann median difference + bootstrap CI

## Hypothesis checks (secondary to estimation)
- TSR/CER: mixed-effects logistic/Poisson models (participant random intercept).
- ToT: robust regression or rank-based comparison for paired tasks.
- Theme effects: within-subject paired comparisons.

## Multiple testing control
- Primary KPI family (TSR, ToT, CER, SEQ): Holm–Bonferroni control at familywise α=0.05.
- Secondary KPIs are exploratory; label explicitly as non-confirmatory.

## Power and precision guardrail
- With n=18, small effects may be undetectable; do not over-interpret nulls.
- If CI width for TSR exceeds ±12 percentage points, classify inference as **precision-limited**.

---

## Decision Thresholds (Go / Conditional / No-Go)

### Go (Supported)
All must hold:
1. TSR ≥ 0.85 overall, and no role segment < 0.75.
2. Median ToT improvement or non-inferiority after theme switch: ΔToT ≤ +10%.
3. CER ≤ 0.20 errors per participant-task.
4. Mean SEQ ≥ 5.2/7.
5. No severe accessibility/usability blocker recurring in ≥3 participants.

### Conditional (Weakly Supported)
- Meets at least 3/5 Go criteria; misses are non-critical and fixable in ≤1 sprint.
- Confidence intervals overlap target boundary but direction is favorable.

### No-Go (Unsupported)
- Fails ≥2 primary criteria, or any single critical failure:
  - TSR < 0.70 overall,
  - CER > 0.35,
  - Reproducible navigation dead-end affecting ≥20% participants.

---

## Data Quality & Fairness Checks
1. Pre-register task prompts and scoring rubric before Day 2.
2. Freeze instrumentation after pilot except bug fixes with changelog.
3. Balance role segments and session modality as evenly as feasible.
4. Exclude sessions only for predefined reasons (recording failure, protocol breach).
5. Keep raw logs + anonymized analysis table for reproducibility.

---

## Reporting Template (Required)
- Sample composition + missingness table.
- KPI table with point estimate + 95% CI.
- Ablation comparison summary.
- Multiple-testing adjustment note.
- Final verdict: **supported / weakly supported / unsupported** with one-paragraph rationale.

---

## Minimum Analysis Table Schema (for reproducible aggregation)
Required columns per participant-task row:
- `participant_id` (anonymous ID)
- `role_segment` (scientist / analyst / trainee)
- `session_mode` (moderated / unmoderated)
- `task_id` (1..4)
- `theme` (ribocentre / riboswitch / aptamer)
- `theme_switch_forced` (0/1)
- `success` (0/1)
- `time_seconds`
- `critical_errors`
- `seq_score` (1..7)
- `content_trust_score` (1..5, optional per task)

If any required primary KPI field (`success`, `time_seconds`, `critical_errors`, `seq_score`) has >15% missingness, downgrade final evidence one level.

## Statistical Guardrails (must pass before claiming support)
1. **Precision check**: TSR 95% CI half-width ≤ 0.12, otherwise label as precision-limited.
2. **Multiplicity check**: primary KPI hypothesis claims must use Holm-adjusted p-values.
3. **Power realism**: do not claim equivalence/non-inferiority unless CI is fully inside pre-specified margin.
4. **Segment fairness**: report worst-segment KPI values; avoid aggregate-only conclusions.

## Verdict Wording Standard
- **Supported**: all Go criteria met and no guardrail violations.
- **Weakly supported**: borderline threshold performance and/or one guardrail violation without critical safety risk.
- **Unsupported**: fails No-Go rule or has critical guardrail violation (e.g., severe missingness, unstable estimates).

## Operational Analysis Checklist (Day 6 lock)
1. Export participant-task table to CSV with required schema and run a missingness audit.
2. Compute primary KPI estimates + 95% CI first; defer p-values until estimation tables are frozen.
3. Apply Holm adjustment only to the four primary KPI hypothesis tests (TSR, ToT, CER, SEQ).
4. Produce role-segment worst-case table (`min segment TSR`, `max segment CER`, `min segment SEQ`).
5. Run a sensitivity analysis excluding pilot participants; flag if verdict changes.
6. Stamp final memo with one of: **supported / weakly supported / unsupported** and explicitly name any violated guardrail.

## KPI Computation Defaults (to avoid analyst drift)
- TSR = `mean(success)` by analysis slice.
- CER = `sum(critical_errors) / n_participant_tasks`.
- ToT summary = median with bootstrap CI (10,000 resamples, percentile method).
- SEQ summary = mean with t-based CI when n>=15; otherwise bootstrap CI.
- Theme switch delta = paired difference on matched tasks per participant (`post_switch - pre_switch`).
- Missing primary KPI values are never imputed for confirmatory analysis; report complete-case denominator.

## Acceptance Criteria Traceability (T-STAT-001)
- **KPI defined:** primary + secondary KPI set with explicit formulas and units (see KPI Framework + Computation Defaults).
- **1-week rapid protocol defined:** participant plan, task battery, and day-by-day schedule are specified.
- **Decision thresholds defined:** Go / Conditional / No-Go gates are numerically pre-specified.
- **Statistical validity safeguards included:** confidence intervals, multiplicity control, precision limits, and fairness checks are mandatory before final claims.

## Companion references
- `docs/T-STAT-001_analysis_runbook.md` (operational CLI summary flow)
- `docs/T-STAT-001_precision_budget.md` (CI-width expectations and precision-aware verdict caps)
