# T-STAT-001: KPI + 1-Week Rapid Usability Protocol + Thresholds

## Scope
This protocol evaluates MVP usability for three branded scientific database fronts (RiboCentre, Riboswitch, Aptamer) built on a shared UI shell. It is designed for rapid signal in 1 week, not definitive long-term product-market fit.

## Decision Rule Vocabulary
- **Supported**: KPI estimates meet target with uncertainty bands comfortably above threshold.
- **Weakly supported**: Point estimates meet threshold but uncertainty overlaps failure region and/or subgroup instability appears.
- **Unsupported**: KPI estimates miss threshold or show severe instability, high failure rates, or strong qualitative friction.

## Primary KPIs (Go/No-Go)
1. **Task completion rate (TCR)**
   - Definition: proportion of participants who complete each critical task without moderator rescue.
   - Critical tasks:
     - T1: Find a target dataset from Home/Browse.
     - T2: Open Detail and identify provenance/source metadata.
     - T3: Switch theme and continue task without confusion.
   - Aggregation: participant-level completion across all 3 tasks.
   - **Threshold**: >= 0.80 overall; each task >= 0.75.

2. **Time-on-task (ToT)**
   - Definition: median seconds from task start to successful completion.
   - **Threshold**: median <= 120s for T1/T2, <= 45s for T3.
   - Report bootstrap 95% CI for median.

3. **Critical error rate (CER)**
   - Definition: proportion of attempts with dead-end, wrong-entity interpretation, or inability to recover in 2 navigation actions.
   - **Threshold**: <= 0.15 overall and no single task > 0.20.

4. **Single Ease Question (SEQ, 1-7)**
   - Definition: post-task ease score (7 easiest).
   - **Threshold**: mean >= 5.0 for each task; lower 95% CI bound >= 4.5 for overall pooled tasks.

## Secondary KPIs (Diagnostic)
- **Navigation path efficiency**: actual clicks / optimal clicks; target median <= 1.5.
- **Theme-switch comprehension**: % users recognizing visual-only change and no content loss; target >= 85%.
- **Perceived trust in scientific metadata** (Likert 1-7); target mean >= 5.0.

## Experimental Design (1-Week Rapid Protocol)

### Sample and Power Reality Check
- Target N=18 participants (minimum analyzable N=15).
- Composition:
  - 6 bioinformatics-adjacent researchers
  - 6 graduate-level life science users
  - 6 advanced general users (non-domain specialists)
- Rationale: with N=18 and p=0.80, Wilson 95% CI half-width is ~0.17 (coarse but acceptable for MVP gatekeeping).
- This is **screening power**, not confirmatory power.

### Session Design
- Moderated remote sessions, 30 min each.
- Within-subject exposure to all 3 themes; randomized theme order via Latin-square style balancing.
- Task order randomized within constraints to reduce learning bias.
- Instrumentation logs: timestamped page transitions, clicks, search/filter usage, error events.

### Week Timeline
- **Day 1**: Pilot 2 sessions, verify scripts/instrumentation.
- **Days 2-5**: Run core sessions (target 4/day).
- **Day 6**: Data cleaning + coding qualitative observations.
- **Day 7**: Analysis + verdict memo.

## Baselines and Ablations (Required)
1. **Baseline comparator (must report)**
   - Compare current MVP against the previous internal template build (or, if unavailable, an unthemed neutral variant).
   - Primary baseline deltas to report: TCR (pp), CER (pp), and ToT (seconds).

2. **Ablation A: Theme switch removed**
   - Remove live theme toggle while keeping all navigation/content identical.
   - Purpose: isolate whether theme-switch interaction adds measurable friction.

3. **Ablation B: Provenance panel minimized**
   - Collapse provenance metadata by default on Detail page.
   - Purpose: test tradeoff between faster scanning and metadata discoverability/trust.

4. **Ablation C: Browse filter simplification**
   - Keep only top-3 most-used filters from pilot logs.
   - Purpose: measure potential gains in speed vs losses in precision.

## Analysis Plan
1. **Completion/error proportions**
   - Use Wilson 95% CI per task and overall.
   - Report absolute differences versus baseline and each ablation with bootstrap CI.

2. **Time-on-task**
   - Use medians + bootstrap 95% CI due to skew.
   - Complement with Hodges-Lehmann location shift between themes/baseline (exploratory).

3. **SEQ and trust scores**
   - Treat as ordinal; report median and mean with bootstrap CI.
   - Non-parametric paired comparisons across themes (Wilcoxon signed-rank; exploratory only).

4. **Multiple testing control**
   - Primary go/no-go relies on pre-registered 4 KPI thresholds (no p-value gate).
   - Exploratory pairwise tests controlled with Benjamini-Hochberg FDR q=0.10.

5. **Minimum effect reporting**
   - Because N is small, emphasize effect-size intervals over dichotomous significance.
   - Pre-specify practical deltas: +10pp TCR, -20s ToT, -8pp CER as meaningful improvement markers.

6. **Missing data policy**
   - If recording fails but completion known: include completion/error, exclude ToT.
   - If >15% missing in any KPI, downgrade evidence one level (e.g., supported -> weakly supported).

## Bias/Fairness and Validity Checks
- Check subgroup deltas (domain experts vs non-experts) for TCR and CER.
- Flag if any subgroup TCR < 0.65 even when aggregate passes.
- Check theme-order effects; if strong (>15 percentage-point swing), mark as weak support pending replication.

## Go/No-Go Threshold Matrix
- **Go (Supported)**: all 4 primary KPI thresholds met; no severe subgroup failure.
- **Conditional Go (Weakly supported)**: at most 1 primary KPI marginally misses target but CI overlaps threshold and no safety-critical friction.
- **No-Go (Unsupported)**: 2+ primary KPIs fail, or any critical task TCR < 0.60, or CER > 0.25.

## Deliverables
- Cleaned anonymized session table (participant x task x theme).
- KPI summary with uncertainty intervals.
- One-page verdict with top 5 fixes ranked by expected KPI lift.
