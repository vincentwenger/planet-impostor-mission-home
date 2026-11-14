# Planet Impostor v1.11 — Endless Insane Survival + Escalating Scores

- Fourth difficulty: **Insane**, locked until both flights of Hard are completed and Mars is reached.
- Auto-transition Easy → Medium → Hard → Insane, with brief landing/achievement dialogs.
- Insane travels Mars → Moon → Earth → Moon → Mars and repeats, with no final destination or victory limit.
- One wrong answer ends an Insane run immediately; no retry on the same leg. Fuel depletion also ends the run. A new run can start from Mars once Insane is unlocked.
- Per-correct-answer points: **Easy 100, Medium 200, Hard 350, Insane 500 × 1.10^(n−1)** (rounded to whole points). `n` is the running count of correct Insane answers and persists across leg changes within the run.
- Landing bonuses: 250 / 500 / 900 / 1,500 points on Easy / Medium / Hard / Insane.
- HUD and answers display point awards; very large scores use compact / scientific notation so the UI remains readable.
- Insane displays a cumulative leg counter and a survival summary after failure.
- Existing verified NASA catalog, no-repeat selection, automatic discovery, local difficulty-unlock persistence, PWA functionality, and all previous easy/medium/hard controls are preserved.
- Includes expanded gameplay regression tests and bumps service-worker cache version to v1.11.

## Notes

Arcade progress and fuel consumption are illustrative gameplay rules, not physically modeled flight trajectories. NASA image auto-classification is metadata-based; photo URL/scene accuracy still requires visual review before use in a formal submission.
