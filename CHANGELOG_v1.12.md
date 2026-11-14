# Planet Impostor v1.12 — Two-World Questions on Every Flight

- Earth → Moon: answers **Earth** or **Moon**.
- Moon → Mars: answers **Moon** or **Mars**.
- Mars → Moon: answers **Mars** or **Moon**.
- Moon → Earth: answers **Moon** or **Earth**.
- Applies to the entire Easy → Medium → Hard campaign and endless Insane mode.
- Moon/Mars questions draw from Moon and Mars images only, never Earth images.
- Keeps the existing NASA image classification and no-repeat history system. The included 66-image set has 42 eligible Earth/Moon images and 44 eligible Moon/Mars images; the live NASA catalog can add more.
- No change to fuel, difficulty unlocks, score multipliers, or one-wrong-answer Insane failure.
- Updates automated regression tests and increments the service worker's cache version so GitHub Pages clients refresh the game.

NASA photos are served remotely and must be visually checked during live play. The bundled automated tests cover game rules, not remote image quality.
