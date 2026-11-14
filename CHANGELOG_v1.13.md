# Version 1.13 — Three-flight Earth round trips

## Gameplay changes

- Every difficulty starts on **Earth** and follows **Earth → Moon → Mars → Earth**.
- **Easy:** land on Earth at the end of the third leg to unlock Medium. Flying only to Mars no longer unlocks the next difficulty.
- **Medium:** start again from Earth; complete the same three-leg loop to unlock Hard on Earth.
- **Hard:** start from Earth; complete the same loop to unlock Insane on Earth.
- **Insane:** start on Earth and repeat Earth → Moon → Mars → Earth forever, with no final championship cutoff. A single wrong answer ends the Insane run immediately; fuel depletion also ends it.
- Between **Mars → Earth**, ask **“Mars or Earth?”** with two choice buttons, drawing question images only from the Mars or Earth NASA catalogs. Earth / Moon and Moon / Mars choices are unchanged.
- The normal flight counter now spans **nine campaign flights** before the endless Insane counter takes over.
- On every difficulty milestone, retain the Continue dialog, refuel the spacecraft and continue from Earth without returning to the setup screen.

## Preserved features

- Difficulty scoring: Easy +100, Medium +200, Hard +350. Insane starts at +500 and compounds by 10% per correct answer across landings.
- Difficulty unlocks, stored under the existing localStorage key, remain valid after updating.
- Correct/incorrect progress movement, fuel rules, landing bonuses, game-over behavior and NASA source attributions remain unchanged.
- The curated catalog has 22 Earth, 20 Moon and 24 Mars records, with no-repeat photo history persisting across reloads. The new Mars/Earth leg has **46 curated eligible photos** before any needed reuse.
- Existing optional NASA catalog expansion and content screening are unchanged.

## Verification

- `node --check game.js`
- `node test-game.js`: nine core legs, unlocks only upon Earth arrival, three-step Insane repetition, direct Mars/Earth photo pool, scoring, keyboard, no-repeat cycling, persistent saves and fail states.
- `node test-catalog.js`: NASA API catalog caching/screening simulated tests.

**Release:** Reunia Space AI — NASA Space Apps Challenge 2026.
