# T-STAT-001 Handoff Checklist (Execution-Ready)

Purpose: ensure the 1-week usability study can be run and judged with minimal analyst drift.

## Pre-Session Lock (Day 1)
- [ ] Freeze task prompts and scoring rubric before Day 2 data collection.
- [ ] Confirm required row schema fields are instrumented:
  - `participant_id, role_segment, session_mode, task_id, theme, theme_switch_forced, success, time_seconds, critical_errors, seq_score`
- [ ] Confirm role-segment sampling targets (scientist/analyst/trainee) and mode balance plan.

## Analysis Lock (Day 6)
- [ ] Missingness audit complete for primary KPI fields (`success,time_seconds,critical_errors,seq_score`).
- [ ] Primary KPI estimates computed with 95% CI before p-values.
- [ ] Holm adjustment applied only to the four primary KPI tests.
- [ ] Worst-segment fairness table produced (min TSR, max CER, min SEQ).
- [ ] Sensitivity analysis run excluding pilot participants.

## Decision Gate
Classify exactly one verdict:

### Supported
- All Go criteria pass:
  - TSR >= 0.85 overall and no segment < 0.75
  - Theme-switch ToT delta <= +10%
  - CER <= 0.20
  - SEQ >= 5.2
  - No recurrent severe blocker (>=3 participants)
- Plus: no statistical guardrail violation.

### Weakly supported
- At least 3/5 Go criteria pass and misses are non-critical/fixable within one sprint.
- No critical failure trigger.

### Unsupported
- Fails >=2 primary Go criteria, or any critical trigger:
  - TSR < 0.70 overall, or
  - CER > 0.35, or
  - reproducible dead-end in >=20% participants.

## Evidence Package (must ship with verdict)
- KPI summary table with point estimates + 95% CI.
- Guardrail audit (precision, multiplicity, missingness, fairness).
- One-paragraph rationale referencing threshold pass/fail by metric.
- Top-3 remediation actions ranked by expected KPI lift.
