# Planet Impostor: Mission Home — v1.14

## Cinematic visual upgrade (no gameplay changes)

### Graphics
- Added original procedural transparent WebP planet art for Earth, Moon and Mars,
  including globe-like lighting, clouds, crater detail and Martian terrain.
- Built layered ambient starfield/nebula drift, subtle shooting star animation,
  atmospheric halo effects, animated planetary marker rings and orbit dashes.
- Upgraded the original SVG spacecraft hull and glowing plasma exhaust; added
  an animated contrail and a short correct-answer thruster boost.
- Added correct/incorrect visual feedback and floating point awards in the
  flight scene. NASA photo pixels are not recolored, obscured or modified.
- Added animated landing glow, arrival/achievement dialogs and optional
  celebratory particles. Failure dialogs use a distinct warning treatment.
- Added red/orange Insane-only space/HUD lighting and faster star motion.
- Refined controls and telemetry, preserved the compact mobile layout, and
  respected `prefers-reduced-motion` for decorative motion.

### Compatibility and integrity
- The HTML/CSS and three local WebP images are cached by the refreshed
  service worker (`planet-impostor-mobile-v1.14`).
- The core `LEGS`, `DIFFICULTY`, scoring/fuel/unlock logic, persistent storage
  keys, 66 manually curated NASA question records and optional image library
  expansion remain untouched by this visual pass.
- Automated gameplay and NASA catalog regression tests continue to pass.
- No new JS packages, tracking SDKs, fonts, music or network dependencies.

### Attribution
- Decorative planets are original procedural artwork rendered using Python
  algorithms with development assistance from OpenAI ChatGPT, not NASA photos.
- The spaceship is an original SVG illustration assisted by ChatGPT.
- NASA terrain-question images remain real NASA records with source links;
  all photography credits are preserved in `NASA_SOURCES.md`.

### Known limitations
- All animated effects are intentionally decorative and not realistic
  orbital/propulsion simulation.
- Live browser animation performance and remote NASA photos still require
  testing on the intended devices, especially mobile. Browser WebP support is
  expected on current mainstream browsers.
