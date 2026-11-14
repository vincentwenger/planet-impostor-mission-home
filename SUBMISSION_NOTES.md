## Current gameplay — Version 1.13

Each difficulty uses the same **Earth → Moon → Mars → Earth** three-flight circuit. The campaign starts on Easy; returning to Earth from Mars unlocks Medium, returning to Earth on Medium unlocks Hard, and returning to Earth on Hard unlocks endless Insane. The complete main campaign consists of **nine flights**. At each difficulty milestone, a landing/unlock overlay lets the player continue immediately from Earth with a full tank. Insane then repeats the same Earth → Moon → Mars → Earth loop indefinitely, starting from Earth.

Every leg offers exactly **two possible answers**, ordered by the journey: **Earth / Moon**, **Moon / Mars**, or on the newly added direct return flight **Mars / Earth**. NASA question images come only from the corresponding two worlds; the built-in eligible pools have 42 / 44 / 46 images respectively. The same photo is not reused while eligible unused questions remain. Insane ends immediately after one wrong answer or fuel depletion. Correct answers earn 100 / 200 / 350 on Easy / Medium / Hard. Insane starts at 500 and increases the reward by **10% per consecutive correct answer**, including across landings. Landing bonuses are additional 250 / 500 / 900 / 1,500 points.

These game rules are **arcade abstractions**, not actual NASA orbital dynamics or realistic propulsion calculations. The NASA dataset/image caveat from v1.7–v1.9 still applies: the automatically acquired catalog may contain unsuitable images even after metadata screening; visually audit any examples shown in the submission video and document the exact NASA records used.

---

## Version 1.10 mission progression (historical)

Version 1.10 introduced six journeys, with an automatic difficulty handoff after each pair of legs: Easy Earth → Moon → Mars; Medium Mars → Moon → Earth; Hard Earth → Moon → Mars. Landing on Mars at the end of Easy unlocks Medium; landing on Earth at the end of Medium unlocks Hard; landing on Mars at the end of Hard unlocks endless Insane survival mode. A landing/unlock overlay allows players to continue without revisiting the setup screen. The same NASA source credits, image-selection rules and simplified fuel mechanics apply. For the current v1.13 demonstration, show the **Mars → Earth** final Easy flight and the Medium unlock on Earth (not Mars).

## v1.9 NASA image quality

The game is a landscape-identification quiz, so crew portraits, mission plaques, spacecraft interiors, and launches are not valid questions. Automatic NASA Library records now require surface-landform metadata and imaging-instrument provenance, with previous cached entries discarded. The total may fall short of 170; do not describe that as 170 individually verified photographs. See `CHANGELOG_v1.9.md` for limitations and test evidence.

## Version 1.8 accuracy notice

A player correctly identified NASA image KSC-2009-3781 as Earth, but the online classifier had labeled it Moon because its caption referenced the Lunar Reconnaissance Orbiter mission. Version 1.8 blocks launch/facility photos and requires terrain plus observing-instrument provenance, and excludes untrusted Version 1.7 cached selections. Verify several NASA API images manually before final submission; do not claim that 170 photos have all been individually reviewed.

## Version 1.7 NASA media note

The game includes 66 manually curated NASA Photojournal images and can discover additional NASA Images archive photographs, targeting 170 total (60 Earth, 50 Moon, 60 Mars) when online. The on-screen count is the current source of truth. Do not claim 170 verified/loaded images until an actual browser session shows 170 and all images have been checked. Each question links back to its original NASA image or Photojournal page. NASA API access can be unavailable in some environments. The catalog uses NASA source observations, not AI-generated photographs.

# NASA Space Apps 2026 Submission Checklist

Keep the submission in **Save Progress** status while building. Do not click **Submit for Judging** until the project links, demo and acknowledgments are final.

## Required fields

- **Project Name:** Planet Impostor: Mission Home
- **Summary:** Write truthfully about implemented features after testing.
- **Project Demonstration:** A public video **30 seconds or less** OR a public presentation of **7 slides or fewer**. Link must work without login.
- **Project:** Public URL of playable deployed site (can also link public code repository).
- **Project Details:** Gameplay, design process, engineering trade-offs, real NASA images, audience, limitations, tech stack.
- **Use of Super Intelligence:** Disclose use of OpenAI ChatGPT for code development. Any future SI-generated imagery must receive the requested visible watermark; none is shipped in this version.
- **NASA Data:** Cite the NASA Photojournal and mission/instrument pages from NASA_SOURCES.md, and **Design and Develop Science Missions** from the selected challenge's Resources tab; verify its exact inclusion on the official event page and accurately explain how it informed the game architecture.
- **Space Agency Partner & Other Data:** Credit any other APIs, packages, visual assets, audio and fonts actually used. This version has zero runtime dependencies or commercial assets.
- **Terms and originality checkboxes:** Only check after verifying third-party resources and accuracy.
- **Save Progress** during editing; then **Submit for Judging** before the event deadline.

## Suggested 30-second demo storyboard

- 0–5s: Title / choose difficulty (automated mission fuel profile)
- 5–11s: NASA landscape identification (two choices on every leg; Earth/Moon, Moon/Mars or Mars/Earth)
- 11–17s: ship moves, fuel meter drops, explanation and citation
- 17–22s: moon landing, badge and refill
- 22–27s: show the Mars → Earth return, then Medium unlock on arriving home
- 27–30s: project name, educational goal, public game URL

## AI acknowledgment suggested text

> OpenAI ChatGPT was used as a code-development assistant for HTML, CSS, JavaScript and editorial text. The images presented in the questions link to authentic NASA Photojournal records and are not AI-generated. Code-drawn spaceship and planet illustrations are stylized and not NASA imagery.

## Scientific limitations

The game uses **fictional arcade progress and fuel units**. The difficulty presets vary the simplified fuel budget, speed and setbacks. The model is not a realistic spacecraft engineering simulation. Do not claim realistic orbital propagation or validated delta-v values.

## Version 1.5 progression

Historical v1.5: each difficulty originally required a four-leg round trip. Historical v1.10–v1.12: each chapter had two legs and automatic progression at its final landing. **Current v1.13:** each difficulty lasts three legs and the next mode unlocks on returning to Earth, with a Continue dialog and locally saved unlock progress.


## Version 1.5 — more NASA images, fewer repeats

- 66 curated NASA observations: 22 Earth, 20 Moon, 24 Mars (previously 23 total).
- Includes deserts, volcanic fields, glacial landscapes, polar craters, lunar ridges, Martian ice, and rover panoramas.
- The same question is not intentionally repeated across the four flight legs until the eligible question catalog has been exhausted.
- Recent image history is stored locally in the browser to reduce repeats between replay sessions on the same device. Clearing site data resets that history.
- Source links and credit details appear after answers; NASA images remain externally hosted and require an internet connection.
- Historical note: earlier releases used 2/3/3/2 choices; v1.13 uses two choices on every flight and adds Mars / Earth questions.

## Version 1.6 — question variety

The game now avoids reusing NASA observations until all images eligible for the current journey have been shown. This used-image cycle persists across browser sessions and resets only when that journey’s eligible pool has been exhausted; no backend tracking is used.
