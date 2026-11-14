# Planet Impostor — v1.9 terrain-photo quality fix

- Removed NASA Image and Video Library Apollo-crew and plaque records from automatic selection.
- Block photos of astronauts, cabin interiors, commemorative plaques, flags, space suits, launch scenes, hardware and other non-terrain subjects, even if their captions describe the Moon or Mars.
- Restrict automatic lunar photos to NASA lunar *surface imaging camera* provenance (such as LROC), rather than Apollo mission keywords.
- Require a specific geological landform in the image title, not only generic "Moon surface" language.
- Discard earlier v1.7/v1.8 automatically cached records using a new v1.9 catalog cache key. **Difficulty unlocks and existing game progress are not reset.**
- Add regression tests for user-reported NASA image IDs `AS17-145-22224` (astronaut inside module) and `S71-39357` (Apollo 15 plaque).
- No changes to fuel, flight paths, difficulty unlocks or answer choice behavior.

**Data-quality limitation:** NASA search metadata are not a visual guarantee. The 170-image goal is a *target*, and the actual online library may contain fewer entries under these stricter rules. The original 66 curated image records remain available. For a competition-ready build, each automatically added photograph should ideally be reviewed visually before release.
