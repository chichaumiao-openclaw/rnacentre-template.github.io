# T-STAT-001 Analysis Runbook (Operational)

## Purpose
Provide a reproducible command path to compute Day-6 KPI summaries before final Supported/Weakly supported/Unsupported verdicting.

## Input
CSV with required columns:
- success
- time_seconds
- critical_errors
- seq_score
- role_segment

## Command
```bash
node scripts/t-stat-001-kpi.mjs <path/to/participant_task.csv>
```

## Output (quick gate check)
- TSR + Wilson 95% CI
- ToT median + bootstrap 95% CI
- CER (participant-task with >=1 critical error) + Wilson 95% CI
- SEQ mean
- Missingness by primary KPI field
- Role-segment TSR table

## Interpretation guardrails
- If any primary field missingness >15%: downgrade evidence one level.
- If TSR CI half-width >12pp: precision-limited, avoid strong claims.
- If any role segment TSR <75%: cannot mark **Supported**.

## Note
This script is a quick summary layer; full reporting still follows:
- `docs/T-STAT-001_usability_kpi_protocol.md`
- `docs/T-STAT-001_analysis_shell.md`
