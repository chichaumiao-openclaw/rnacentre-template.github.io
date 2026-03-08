# T-STAT-001 Analysis Shell (Execution-Ready)

Use this shell on Day 6/7 to convert session logs into a verdict without analysis drift.

## 1) Required Inputs
- Participant-task table with required columns from `docs/T-STAT-001_usability_kpi_protocol.md`.
- Session metadata: role segment, mode, and theme order.
- Baseline and ablation labels for each row.

## 2) KPI Computation Order (locked)
1. Compute denominators and missingness.
2. Compute primary KPIs with 95% CI:
   - TSR (Wilson CI)
   - ToT median (bootstrap CI, 10,000 resamples)
   - CER (Wilson or bootstrap CI)
   - SEQ mean/median (bootstrap CI)
3. Apply threshold checks before any exploratory tests.
4. Run Holm correction on primary hypothesis family only if hypothesis p-values are reported.
5. Run exploratory tests (theme and ablations), labeled non-confirmatory.

## 3) Guardrail Gates
- Missingness >15% in any primary KPI field => downgrade one evidence level.
- TSR CI half-width >0.12 => precision-limited claim.
- Any role segment with TSR <0.75 => cannot mark Supported.
- Any critical dead-end in >=20% participants => Unsupported.

## 4) Output Tables (must include)
- Table A: Sample composition + missingness.
- Table B: Primary KPI estimates + 95% CI + threshold pass/fail.
- Table C: Theme-switch paired deltas (ToT, TSR, CER, SEQ).
- Table D: Ablation deltas vs baseline with uncertainty.
- Table E: Worst-segment fairness table.

## 5) Final Verdict Template
- **Supported** / **Weakly supported** / **Unsupported**
- One-sentence threshold summary.
- One-sentence uncertainty and power caveat.
- Top-3 fixes by expected KPI lift.

## 6) Reproducibility Stamp
Record in final memo:
- commit hash of analysis artifacts
- command list used to generate outputs
- timestamp + analyst id
