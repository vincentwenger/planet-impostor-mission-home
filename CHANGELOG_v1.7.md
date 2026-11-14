# Planet Impostor — v1.7 change summary

- Keep 66 previously curated NASA Photojournal images immediately available.
- Discover up to 104 additional unique observational photos using NASA's public Image and Video Library API, targeting 60 Earth + 50 Moon + 60 Mars.
- Reject obvious artist concepts, diagrams, and equipment photos; preserve NASA asset IDs, credits, and source links.
- Cache new entries per browser/device and preserve strict image no-repeat behavior.
- Show the count of NASA images currently available on the setup screen.
- Do not block gameplay when the remote NASA media search fails.
- All four legs, Easy/Medium/Hard unlocks and fuel logic remain unchanged.
- Service worker cache identifier incremented to v1.7 for GitHub Pages updates.
- Added deterministic offline API tests in `test-catalog.js`.

**Important:** the expansion is online and depends on the official NASA API. In a network-restricted environment there are still 66 included entries. The 170-photo target is validated in a simulated test but has not been verified against the live NASA Images API in this environment. This game is not shipped with 170 bundled photo files.
