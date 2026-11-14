# Planet Impostor: Mission Home

**Reunia Space AI | NASA Space Apps Challenge 2026**

A mobile-optimized, installable Progressive Web App (PWA) and desktop browser game. Navigate your spacecraft **Earth → Moon → Mars → Moon → Earth** by identifying which world appears in genuine NASA imagery. Correct answers advance your ship, incorrect answers move it backward; every decision consumes fuel. You land at bases for refueling and unlock badges. Ship engine, tank capacity, and difficulty change the mission's resource constraints.

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

1. Choose an engine: efficient/slow, balanced, or powerful/fuel-intensive.
2. Choose a fuel tank: lightweight, standard, or heavy/high capacity.
3. Select Cadet, Explorer or Commander difficulty.
4. Answer actual NASA terrain questions in each of four legs.
5. Correct: +10%/+13%/+17% progress depending on engine. Wrong: -7% progress; both consume fuel. Reach 100% to land. Fail if fuel is exhausted first. For the final question, reaching a destination takes precedence over fuel reaching zero on the same move.
6. Read a science explanation and open the original source after each answer.
7. Refuel and earn a mission badge at each stop; win on Earth.

Fuel usage and movement are **simplified arcade mechanics**, not actual orbital dynamics, delta-v calculations or flight feasibility. Upgrades are intended to demonstrate qualitative mass/performance/fuel trade-offs, not scientific numerical predictions. Future versions can integrate actual trajectory data/mission cost budgets.

## NASA sources

See [`NASA_SOURCES.md`](NASA_SOURCES.md) for every image, instrument, mission, image ID, description and credit. The question bank contains **23 curated NASA Photojournal entries**: 7 Earth, 6 Moon, 10 Mars. The labels are based on NASA's target fields and descriptions.

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
- Answers are randomized. The game may reuse some photos on later legs when a question deck has been exhausted.
- No backend, accounts, multiplayer or persistent global leaderboard.
- The current mission simulator is arcade-style; judging under **Space Mission Design Game** should emphasize the educational engineering trade-offs and explain that quantitative values are fictitious.

## Mobile app (PWA)

This release adds mobile-optimized flight telemetry, larger touch controls, home-screen icons, and a service worker that caches the game shell. NASA photo content still requires an active internet connection.

**Install on iPhone/iPad:** Host the files at a public HTTPS URL (such as GitHub Pages), open in Safari, tap Share, then **Add to Home Screen**.

**Install on Android:** Host on HTTPS, open in Chrome, then select **Install app** or **Add to Home Screen** from the browser menu (depending on device and eligibility).

Installation is **not supported from a local `file://` page**. You can still run `index.html` directly in a desktop browser for testing, but hosting is needed for mobile home-screen installation and service-worker caching.

This is a web app packaged like a phone game; it is **not yet** an App Store or Google Play native binary. It can be wrapped later using Capacitor if needed.
