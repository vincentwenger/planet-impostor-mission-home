# Planet Impostor: Mission Home

## Version 1.6 — exhaust every available photo before repeating

- 66 curated NASA observations: 22 Earth, 20 Moon, 24 Mars (previously 23 total).
- Includes deserts, volcanic fields, glacial landscapes, polar craters, lunar ridges, Martian ice, and rover panoramas.
- An image is **never repeated** while there is an unused image eligible for the current flight leg. A leg with Earth/Moon choices cycles through 42 photos; a leg with Earth/Moon/Mars choices cycles through all 66. If that leg exhausts its eligible pool, it begins a fresh cycle of those photos.
- The complete used-photo cycle is saved in the browser across journeys, game restarts, and page reloads. This version carries forward the recent photo history saved by v1.5 where available. Clearing site data resets that history.
- Source links and credit details appear after answers; NASA images remain externally hosted and require an internet connection.
- Existing 2/3/3/2 answer choices, Easy→Medium→Hard progression, and all flight mechanics are unchanged.


**Reunia Space AI | NASA Space Apps Challenge 2026**

A mobile-optimized, installable Progressive Web App (PWA) and desktop browser game. Navigate your spacecraft **Earth → Moon → Mars → Moon → Earth** by identifying which world appears in genuine NASA imagery. Correct answers advance your ship, incorrect answers move it backward; every decision consumes fuel. You land at bases for refueling and unlock badges. Players begin with Easy difficulty; completing all four journeys unlocks Medium, and completing all four on Medium unlocks Hard. Each mode sets the mission’s fuel budget, speed and penalties automatically.

## Run

**Fastest:** Double-click `index.html` in a browser. No installation, account, build, or backend required.

**For local web serving (optional):**

```bash
cd planet-impostor
python -m http.server 8080
# visit http://localhost:8080
```

The game HTML, CSS, JS and data catalog work locally. **Real NASA question images are loaded from `assets.science.nasa.gov` and require an internet connection.** When a photo cannot load, the UI clearly labels an illustrative fallback and reveals a NASA-sourced text clue so play can continue. For a production submission, consider downloading approved NASA images and serving them locally after checking their individual usage notices, with attribution maintained.

## Gameplay

1. Begin on **Easy**. Medium and Hard are locked at first. Completing all four journeys on Easy unlocks Medium; completing all four journeys on Medium unlocks Hard. A full mission win is required to unlock each mode, not just the first landing. Your unlock progress is saved locally in the same browser/device (`localStorage`). Each difficulty sets your fuel capacity and how far each correct/wrong answer moves your ship.
2. Answer NASA terrain questions over four legs. Earth → Moon and Moon → Earth offer **Earth / Moon** (two choices); Moon → Mars and Mars → Moon offer **Earth / Moon / Mars** (three choices). Keyboard keys 1, 2 and (when available) 3 also work.
3. Correct guesses move you closer and consume fuel. Wrong guesses move you backward and consume more fuel. Reach 100% to land; run out of fuel before arriving and you fail. If arrival and fuel exhaustion happen on the same answer, arriving wins.
4. Read a science explanation and open the original source after each answer.
5. Refuel and earn a mission badge at each stop; win on Earth.

Fuel usage and movement are **simplified arcade mechanics**, not actual orbital dynamics, delta-v calculations or flight feasibility. Preset difficulty profiles illustrate mission resource budgeting rather than realistic spacecraft engineering calculations. Future versions can integrate actual trajectory data/mission cost budgets.

## NASA sources

See [`NASA_SOURCES.md`](NASA_SOURCES.md) for every image, instrument, mission, image ID, description and credit. The question bank contains **66 curated NASA Photojournal entries**: 22 Earth, 20 Moon, 24 Mars. The labels are based on NASA's target fields and descriptions.

The image display uses an image delivery URL pattern from NASA Science assets; if NASA later changes it, use each record's linked NASA Photojournal page to obtain updated image URLs.

## Files

- `index.html`: screens and UI
- `style.css`: responsive styling, space scene, spacecraft, planets and HUD
- `game.js`: gameplay state and mission logic
- `data.js`: original curated question catalog referencing official NASA sources
- `NASA_SOURCES.md`: full image credits and source links
- `SUBMISSION_NOTES.md`: submission checklist and AI-use disclosure guidance

## Deployment

GitHub Pages: create a public repository, commit all files, open **Settings → Pages**, choose **Deploy from a branch**, select main and `/ (root)`. Public game URL: `https://<your-username>.github.io/<repository-name>/` after GitHub confirms publishing. Add a public source repository link and a separate 30-second-or-shorter video link to NASA's required fields.

Other static hosts work: Cloudflare Pages, Netlify, AWS S3 + CloudFront, etc. Do not claim the game is deployed until it has a functioning public URL.

## Credits and disclosure

Game concept: Reunia Space AI. HTML/CSS/JS implementation was developed with the assistance of **OpenAI ChatGPT**. Source NASA terrain photos are **not AI-generated**. Planet and ship visuals are code-drawn illustrations. There are no external code dependencies, commercial game assets or embedded music. The question explanations are original short summaries of NASA descriptions and require source review before formal publication. NASA does not endorse or sponsor this specific game.

## Known limitations

- Live NASA asset requests are needed for full photo gameplay and cannot be tested without network access; try the game in your browser and verify each photo loads before submitting.
- NASA Photojournal entries can include false/enhanced color, orbital views, and rover close-ups. These differences may hint at the answer. Enhanced-color entries are identified after the reveal.
- Answers are randomized from the worlds available on each flight leg. The game will only reuse a photo when every image eligible for the current leg has already appeared in that leg’s persistent used-photo cycle.
- No backend, accounts, multiplayer or persistent global leaderboard. Difficulty unlocks are stored locally in the browser, not synced between devices; clearing site data can reset them.
- The current mission simulator is arcade-style; judging under **Space Mission Design Game** must clearly explain that the simplified fuel/speed profiles are arcade abstractions, not real mission design calculations. The fit with the official challenge should be evaluated carefully.

## Mobile app (PWA)

This release adds mobile-optimized flight telemetry, larger touch controls, home-screen icons, and a service worker that caches the game shell. NASA photo content still requires an active internet connection.

**Install on iPhone/iPad:** Host the files at a public HTTPS URL (such as GitHub Pages), open in Safari, tap Share, then **Add to Home Screen**.

**Install on Android:** Host on HTTPS, open in Chrome, then select **Install app** or **Add to Home Screen** from the browser menu (depending on device and eligibility).

Installation is **not supported from a local `file://` page**. You can still run `index.html` directly in a desktop browser for testing, but hosting is needed for mobile home-screen installation and service-worker caching.

This is a web app packaged like a phone game; it is **not yet** an App Store or Google Play native binary. It can be wrapped later using Capacitor if needed.

## Version 1.5

Difficulty progression: Easy available from the start, Medium unlocked by completing the full Easy round trip, Hard unlocked by completing the full Medium round trip. Locked modes are disabled visually and programmatically. Existing gameplay and NASA questions are unchanged.

## Version 1.6 — persistent, strict no-repeat photo cycles

- Once a NASA image is displayed, it is excluded from future selection while other images eligible for that flight leg remain unseen.
- Previously viewed images are remembered in the browser, across page reloads and repeated missions, using `localStorage`.
- When a flight leg runs out of eligible unseen images, those images become available again for a new cycle. Images from other worlds retain their history.
- Version 1.5 recent-photo history is migrated automatically on first play of Version 1.6.
- No user account is needed; private browsing or clearing site data resets image-use history.
