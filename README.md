# Planet Impostor: Mission Home — v1.12

**Version 1.12 — two answers per flight:** Earth ↔ Moon journeys offer **Earth / Moon** and Moon ↔ Mars journeys offer **Moon / Mars**, ordered to match the departure and destination. There is no Earth option or Earth photo on Moon ↔ Mars flights. All four difficulties (including endless Insane) use the same rule. The no-repeat cycle still prevents repeated eligible images: **42 curated Earth/Moon images** or **44 curated Moon/Mars images** before each corresponding pool resets. The expanding online catalog adds more eligible NASA photos when available. No changes were made to fuel, rewards, progression, or NASA photo screening.

**Previously in v1.11:** The campaign now unlocks an **endless Insane survival mode** when you reach Mars on Hard. Insane loops Mars → Moon → Earth → Moon → Mars and repeats until you lose. A single wrong answer ends the Insane run immediately; fuel depletion also ends it. Correct answers earn **100 (Easy), 200 (Medium), 350 (Hard)** and on Insane **500 × 1.10^(n−1)** points on the nth consecutive correct answer. The exponent continues across all Insane landings. Landing bonuses also scale by difficulty (250 / 500 / 900 / 1,500 points). An on-screen prompt shows the next potential award and the final dialog shows the survival score. Points grow without a predetermined round limit. Unlocked modes are saved locally, including prior v1.10 Hard unlocks.

**Quick tests:** `node test-game.js` and `node test-catalog.js`. The first checks campaign unlocks, looping Insane journeys, score growth, immediate failure on a wrong answer, and preserved no-repeat image cycling. The second simulates NASA archive responses and screening; it does not validate every remote image visually. For a real NASA image check, load the website online and inspect the returned photos.

---

## Version 1.10 — Two flights per difficulty, automatic progression

The game is now one **six-flight adventure across three difficulty levels**:

1. **Easy:** Earth → Moon → Mars. Arriving on Mars wins Easy and unlocks Medium.
2. **Medium:** Mars → Moon → Earth. Arriving on Earth wins Medium and unlocks Hard.
3. **Hard:** Earth → Moon → Mars. Arriving on Mars wins the final Planet Impostor trophy.

On completing Easy or Medium, the game automatically selects the next difficulty and shows a milestone celebration. Tap **Continue** to launch from the current planet — you **do not** return to the setup screen or have to choose the difficulty manually. Fuel refills at every landing. Returning players can still select any previously unlocked difficulty on the start screen; Medium starts on Mars and Hard starts on Earth. Unlocks remain in local browser storage using the original key. The space-image filter, 66 curated NASA records, optional NASA library expansion, no-repeat history, mobile UI, and fuel rules are unchanged.

## Version 1.9 — exclude Apollo crew and plaque photographs

The automatic NASA Image and Video Library extension now requires a clearly named surface feature and a surface-imaging instrument. Apollo crew photographs, lunar module interiors, plaques, launch scenes and other non-terrain subjects are excluded. The v1.7/v1.8 auto-library caches are discarded, while saved difficulty unlocks remain. The game can still use its 66 curated observations offline. See [`CHANGELOG_v1.9.md`](CHANGELOG_v1.9.md).

## Version 1.8 — NASA image accuracy fix

The live NASA image catalog now requires evidence that an image actually **depicts terrain on the labeled world**. Photos of launches, facilities, portraits or mission hardware are excluded. The prior Version 1.7 automatically labeled cache is invalidated to remove images with unreliable labels. The original 66 curated NASA Photojournal questions remain available; the total number of additional online images may be lower than the 170-photo target because correctness takes priority over quantity. See `CHANGELOG_v1.8.md`.

# Planet Impostor: Mission Home

## Version 1.7 — NASA image library expansion toward 170 observations

**Target: 170 different NASA image records (60 Earth / 50 Moon / 60 Mars).** The 66 individually curated NASA Photojournal records are included immediately. When the game runs online, it searches the official NASA Image and Video Library API for up to **104 additional distinct photo records**, filters out illustrations/diagrams/non-terrain material, and caches the approved metadata in the browser. The actual number depends on NASA API availability and search results; only the 66 included records are guaranteed when offline. The setup screen reports the number currently available.

- Historical v1.7 release: the four-leg quiz, fuel, difficulty unlocking, and no-repeat cycles were unchanged at the time. See v1.10 above for the current six-leg route.
- New records retain their NASA ID, original NASA Images page, NASA credit, and science caption.
- On the first online visit, the catalog expands in the background; the game is playable immediately. Later visits restore the expanded catalog from localStorage.
- NASA photos are not bundled in the ZIP; they are loaded from official NASA servers. If a remote image cannot load, the existing labeled fallback is shown.
- Static code checks: `node test-game.js` and `node test-catalog.js`. The second test simulates a 170-record NASA API response and offline failures; it does **not** prove every remote image can be fetched.

**NASA API documentation:** https://api.nasa.gov/ (NASA Image and Video Library) and https://images-api.nasa.gov/ .

## Version 1.6 — exhaust every available photo before repeating

- 66 curated NASA observations: 22 Earth, 20 Moon, 24 Mars (previously 23 total).
- Includes deserts, volcanic fields, glacial landscapes, polar craters, lunar ridges, Martian ice, and rover panoramas.
- An image is **never repeated** while there is an unused image eligible for the current flight leg. A leg with Earth/Moon choices cycles through 42 curated photos; a leg with Moon/Mars choices cycles through 44 curated photos. If that leg exhausts its eligible pool, it begins a fresh cycle of those photos.
- The complete used-photo cycle is saved in the browser across journeys, game restarts, and page reloads. This version carries forward the recent photo history saved by v1.5 where available. Clearing site data resets that history.
- Source links and credit details appear after answers; NASA images remain externally hosted and require an internet connection.
- Historical v1.6 used the 2/3/3/2 pattern. Version 1.12 uses two choices on every flight, including the endless Insane loop.


**Reunia Space AI | NASA Space Apps Challenge 2026**

A mobile-optimized, installable Progressive Web App (PWA) and desktop browser game. Navigate **Earth → Moon → Mars (Easy), Mars → Moon → Earth (Medium), and Earth → Moon → Mars (Hard)** by identifying worlds in genuine NASA imagery. Finish Hard to unlock endless **Insane**, which keeps cycling between Mars and Earth via the Moon until you make a wrong guess or run out of fuel. Each difficulty awards more points and provides its own arcade flight rules. A single wrong guess ends an Insane run, while correct-answer rewards compound by 10% with every consecutive Insane answer.

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

1. Only **Easy** is initially available. Reach Mars via the Moon to complete Easy and unlock Medium. The game automatically switches to Medium without restarting or showing the setup screen.
2. On **Medium**, travel Mars → Moon → Earth. Reaching Earth unlocks Hard and automatically changes the mission to Hard.
3. On **Hard**, travel Earth → Moon → Mars. Reaching Mars unlocks **Insane** and automatically continues after the landing dialog.
4. On **Insane**, repeat Mars → Moon → Earth → Moon → Mars indefinitely. Every wrong answer immediately ends the run; so does running out of fuel. Correct-answer points escalate by 10% per correct answer (500, 550, 605, 666, ...), and the running multiplier does **not** reset at each landing.
5. Earth ↔ Moon journeys offer **Earth / Moon** choices. Moon ↔ Mars journeys offer **Moon / Mars** choices (in travel order). Keyboard keys **1 and 2** select the answer.
6. Correct guesses move the ship forward; wrong guesses move it backward. Every guess costs fuel. Land to refuel; running out of fuel before arrival loses that flight. Reach 100% on the same answer that depletes fuel and the arrival counts as a win.
7. The game remembers which NASA images the player has seen and avoids repeats while unused eligible images remain. It also remembers unlocked difficulties across page reloads.
8. Previously unlocked difficulties remain selectable in the starting menu for replay. Starting directly on Medium begins at **Mars**; starting directly on Hard begins at **Earth**; starting directly on Insane begins at **Mars**.

Fuel use and progress are simplified arcade mechanics rather than realistic orbital dynamics, delta-v calculations, or mission feasibility estimates. NASA landscape images are credited to their original source records.

## NASA sources

See [`NASA_SOURCES.md`](NASA_SOURCES.md) for every image, instrument, mission, image ID, description and credit. The built-in question bank contains **66 curated NASA Photojournal entries**: 22 Earth, 20 Moon, 24 Mars. The online library can grow toward 170 with NASA Image and Video Library photo records; all records include an original NASA source link. The labels are based on NASA's target fields and descriptions.

The image display uses an image delivery URL pattern from NASA Science assets; if NASA later changes it, use each record's linked NASA Photojournal page to obtain updated image URLs.

## Files

- `index.html`: screens and UI
- `style.css`: responsive styling, space scene, spacecraft, planets and HUD
- `game.js`: gameplay state and mission logic
- `data.js`: curated NASA sources plus online NASA image library expansion (v1.7)
- `NASA_SOURCES.md`: full image credits and source links
- `SUBMISSION_NOTES.md`: submission checklist and AI-use disclosure guidance

## Deployment

GitHub Pages: create a public repository, commit all files, open **Settings → Pages**, choose **Deploy from a branch**, select main and `/ (root)`. Public game URL: `https://<your-username>.github.io/<repository-name>/` after GitHub confirms publishing. Add a public source repository link and a separate 30-second-or-shorter video link to NASA's required fields.

Other static hosts work: Cloudflare Pages, Netlify, AWS S3 + CloudFront, etc. Do not claim the game is deployed until it has a functioning public URL.

## Credits and disclosure

Game concept: Reunia Space AI. HTML/CSS/JS implementation was developed with the assistance of **OpenAI ChatGPT**. Source NASA terrain photos are **not AI-generated**. Planet and ship visuals are code-drawn illustrations. There are no external code dependencies, commercial game assets or embedded music. The question explanations are original short summaries of NASA descriptions and require source review before formal publication. NASA does not endorse or sponsor this specific game.

## Known limitations

- Live NASA asset requests are needed for full photo gameplay and cannot be tested without network access; try the game in your browser and verify each photo loads before submitting. The online library expansion may not hit 170 if NASA search results are insufficient or the API is blocked; the 66 built-in records remain available.
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

Current progression (v1.12): Easy Earth → Moon → Mars unlocks Medium; Medium Mars → Moon → Earth unlocks Hard; Hard Earth → Moon → Mars unlocks endless Insane. Difficulty switches automatically after each two-flight chapter. Locked modes remain disabled in the setup menu for new players.

## Version 1.6 — persistent, strict no-repeat photo cycles

- Once a NASA image is displayed, it is excluded from future selection while other images eligible for that flight leg remain unseen.
- Previously viewed images are remembered in the browser, across page reloads and repeated missions, using `localStorage`.
- When a flight leg runs out of eligible unseen images, those images become available again for a new cycle. Images from other worlds retain their history.
- Version 1.5 recent-photo history is migrated automatically on first play of Version 1.6.
- No user account is needed; private browsing or clearing site data resets image-use history.
