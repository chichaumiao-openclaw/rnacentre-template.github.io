# T-STAT-001 Precision Budget (1-Week Rapid Study)

## Goal
Quantify whether the planned rapid usability sample can support decisive conclusions for primary KPIs.

## Planned sample
- Target: `n = 18` participants
- Tasks per participant: 4
- Participant-task rows: 72 (assuming complete data)

## KPI precision expectations

### 1) Task Success Rate (TSR)
Approximate 95% CI half-widths (normal approximation, worst near p=0.5):
- If TSR ~= 0.85 with `n=72` participant-task rows: half-width ≈ 0.08–0.09
- If analyzed at participant level (`n=18`): half-width ≈ 0.16–0.17

Interpretation:
- **Primary gate should use participant-task level TSR for precision check**.
- Participant-level TSR remains useful for sensitivity reporting, not sole go/no-go evidence.

### 2) Critical Error Rate (CER)
With expected low event rates (0.10–0.20), binomial intervals remain wide at `n=18`.
- Use participant-task denominator for main CER estimate.
- Always report exact/Wilson CI and event counts.

### 3) Time on Task (ToT)
ToT is usually right-skewed.
- Use median + bootstrap CI (10k resamples).
- Report paired theme-switch delta for matched tasks.
- Require non-inferiority margin pre-specification (`+10%` already defined in protocol).

### 4) SEQ
For 7-point SEQ with n=18:
- Mean SEQ CI is often around ±0.4 to ±0.6 (depends on variance).
- Borderline values (around threshold 5.2) should be classified as weak evidence unless CI is cleanly above threshold.

## Segment-level fairness risk
Planned role segments: 6/6/6.
- Segment-level estimates will be noisy.
- Keep fairness rule (no segment TSR <0.75), but treat segment CI width as decision context.
- If one segment is under-recruited (<5), verdict cannot be stronger than **weakly supported**.

## Practical decision guardrails (precision-aware)
1. Keep global go/no-go thresholds as defined in `T-STAT-001_usability_kpi_protocol.md`.
2. Add precision override:
   - If any primary KPI CI crosses both sides of decision boundary by >2pp margin, cap verdict at **weakly supported**.
3. Add sample integrity override:
   - If usable participant-task rows <60 (after exclusions), cap verdict at **weakly supported**.

## Reporting snippet (recommended)
"This rapid study is designed for directional confidence with explicit uncertainty bounds. Threshold attainment without sufficient precision is interpreted conservatively and cannot alone justify a Supported verdict."
