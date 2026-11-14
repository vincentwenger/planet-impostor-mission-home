# NASA image sources — Planet Impostor v1.7

The game uses **real NASA spacecraft and Earth-observation images as question content**, not decorative art. Each result links to its original NASA Science/Photojournal record and lists the spacecraft/instrument and credit. All external photographs remain hosted by NASA; an internet connection is required. The game does not download or include the imagery in the ZIP.

Some orbital images are **enhanced-color, radar-derived, or false-color**; such observations should not be mistaken for natural-color human-eye photographs. Image processing metadata should be read on the linked NASA source page. The flight and fuel gameplay mechanics are simplified arcade rules, not real orbital calculations.

Photo records added in v1.5 were sourced from NASA Earth/planetary galleries and NASA Science Lunar Resources; links refer to the official image pages.

## Version 1.7 — additional NASA Image and Video Library records

In addition to the **66 hand-curated records listed below**, the game uses NASA’s public [Image and Video Library search API](https://api.nasa.gov/) to discover other observational photographs during online play. This is an official NASA media archive, distinct from NASA Photojournal. The game aims for **170 total records** (60 Earth, 50 Moon and 60 Mars), but the actual count depends on search results and availability and is shown on the game setup screen. We **do not claim** all 104 extras are present when offline or that all remote image URLs have been manually checked in this environment.

Each dynamically acquired question stores the **NASA image asset ID**, the NASA Images source page (`https://images.nasa.gov/details/<asset-id>`), the original title/description, mission/creator when available, and the public preview image URL. The metadata is cached in localStorage. The source link is shown after answering, as with the original questions. Artist concepts, diagrams and hardware photos are filtered from search results. Users can inspect each source for color processing and usage notes. New records are not reproduced in this static table because NASA’s search results may vary across sessions.

Searches focus on Terra/ASTER, Landsat, lunar surface/LRO/Apollo, and Mars imagery from HiRISE, Curiosity, Perseverance and Mars Odyssey. Official API documentation: https://api.nasa.gov/ and https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf .


| World | NASA image | Mission/instrument | Image credit | NASA source |
|---|---|---|---|---|
| Earth | Namib Desert, Namibia (PIA17632) | Terra · ASTER | NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/namib-desert-namibia/) |
| Earth | Four Corners (PIA14766) | Terra · ASTER | NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/four-corners-united-states/) |
| Earth | Rub’ al Khali (PIA11084) | Terra · ASTER | NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/rub-al-khali-arabia/) |
| Earth | Canyonlands National Park (PIA17539) | Terra · ASTER | NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/canyonlands-national-park-utah/) |
| Earth | Simpson Desert (PIA00115) | Galileo · Imaging System | NASA/JPL | [NASA Photojournal](https://science.nasa.gov/photojournal/earth-simpson-desert-central-australia/) |
| Earth | Thar Desert (PIA11094) | Terra · ASTER | NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/thar-desert/) |
| Earth | Namibia Dunes (PIA24551) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA Photojournal](https://science.nasa.gov/photojournal/namibia-dunes/) |
| Moon | Ejecta Sweeps the Surface (PIA12912) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/ejecta-sweeps-the-surface/) |
| Moon | First LROC Images (PIA12884) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/first-lroc-images/) |
| Moon | Slipher Crater Scarps (PIA13532) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/slipher-crater-fractured-moon-in-3-d/) |
| Moon | Action Shot (PIA14426) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/action-shot/) |
| Moon | In an Instant! (PIA13135) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/in-an-instant/) |
| Moon | Linné Crater (PIA13246) | Lunar Reconnaissance Orbiter · NAC | NASA/GSFC/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/linne-crater/) |
| Mars | Dunes (PIA04452) | Mars Odyssey · THEMIS | NASA/JPL/Arizona State University | [NASA Photojournal](https://science.nasa.gov/photojournal/dunes/) |
| Mars | Martian Sand Dune Close-Up (PIA20171) | Curiosity · MAHLI | NASA/JPL-Caltech/MSSS | [NASA Photojournal](https://science.nasa.gov/photojournal/surface-close-up-of-a-martian-sand-dune/) |
| Mars | Dunes in Meridiani Planum (PIA25351) | Mars Reconnaissance Orbiter · HiRISE | NASA/JPL-Caltech/University of Arizona | [NASA Photojournal](https://science.nasa.gov/photojournal/dunes-in-meridiani-planum/) |
| Mars | Sand Sheet and Dunes (PIA06840) | Mars Global Surveyor · MOC | NASA/JPL/Malin Space Science Systems | [NASA Photojournal](https://science.nasa.gov/photojournal/sand-sheet-and-dunes/) |
| Mars | Defrosting Dunes (PIA26330) | Mars Reconnaissance Orbiter · HiRISE | NASA/JPL-Caltech/University of Arizona | [NASA Photojournal](https://science.nasa.gov/photojournal/defrosting-dunes/) |
| Mars | Martian Dunes (PIA05952) | Mars Global Surveyor · MOC | NASA/JPL/Malin Space Science Systems | [NASA Photojournal](https://science.nasa.gov/photojournal/martian-dunes/) |
| Mars | Hollowed-Out Rock (PIA25917) | Perseverance · Mastcam-Z | NASA/JPL-Caltech/ASU/MSSS | [NASA Photojournal](https://science.nasa.gov/photojournal/perseverance-finds-a-hollowed-out-rock/) |
| Mars | Opportunity Rocks! (PIA05060) | Opportunity · Panoramic Camera | NASA/JPL/Cornell | [NASA Photojournal](https://science.nasa.gov/photojournal/opportunity-rocks/) |
| Mars | Layered Rocks in Crater (PIA06323) | Mars Global Surveyor · MOC | NASA/JPL/Malin Space Science Systems | [NASA Photojournal](https://science.nasa.gov/photojournal/layered-rocks-in-crater/) |
| Mars | Snow Lake Sulfur Rock (PIA26308) | Curiosity · MAHLI | NASA/JPL-Caltech/MSSS | [NASA Photojournal](https://science.nasa.gov/photojournal/curiosity-views-rock-made-of-sulfur-at-snow-lake/) |
| Earth | Hutt Lagoon (PIA26510) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/hutt-lagoon-australia/) |
| Earth | Heard Island Volcano (PIA26509) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/heard-volcano-australia/) |
| Earth | Taal Volcano (PIA26506) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/taal-volcano-philippines/) |
| Earth | Clayton Valley (PIA26505) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/clayton-valley-nv/) |
| Earth | Halemaʻumaʻu, Kīlauea (PIA26504) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/halemaumau-kilauea-hawaii/) |
| Earth | Craters of the Moon (PIA26501) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/craters-of-the-moon-national-monument-idaho/) |
| Earth | Humboldt Glacier (PIA26447) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/humboldt-glacier-venezuela/) |
| Earth | Tofua Island (PIA26393) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/tofua-island-tonga-islands/) |
| Earth | Fernandina Volcano (PIA26326) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/fernandina-volcano-galapagos/) |
| Earth | Dinosaur Provincial Park (PIA26290) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/dinosaur-provincial-park-canada/) |
| Earth | Iceland Volcanic Eruption (PIA26288) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/march-2024-iceland-eruption/) |
| Earth | Star Dunes (PIA26287) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/star-dunes-morocco/) |
| Earth | Rinjani Caldera (PIA26281) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/rinjani-caldera-indonesia/) |
| Earth | Badwater Basin (PIA26197) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/badwater-death-valley/) |
| Earth | Channeled Scablands (PIA26008) | Terra · ASTER | NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team | [NASA source](https://science.nasa.gov/photojournal/channeled-scablands-washington/) |
| Moon | Tycho Crater Central Peak (MOON-TYCHO) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/tycho-craters-central-peak-on-the-moon/) |
| Moon | Reiner Gamma Lunar Swirl (MOON-REINER) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/lunar-swirl-reiner-gamma/) |
| Moon | Shackleton Crater (MOON-SHACKLETON) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/) |
| Moon | Ancient Volcanic Vent (MOON-PLATO) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/ancient-volcanic-vent-near-the-moons-plato-crater/) |
| Moon | Malapert Massif (MOON-MALAPERT) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/malapert-massif/) |
| Moon | Komarov Fractured Crater (MOON-KOMAROV) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/fractured-crater/) |
| Moon | Lunar Pit (MOON-PIT) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/lunar-pit/) |
| Moon | Aristarchus Crater (MOON-ARISTARCHUS) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/aristarchus-crater-2/) |
| Moon | Copernicus Central Peak (MOON-COPERNICUS) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/copernicus-central-peak-another-layered-target/) |
| Moon | Jackson Crater (MOON-JACKSON) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/jackson-emerges/) |
| Moon | Hawke Crater (MOON-HAWKE) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/hawke-crater/) |
| Moon | Pierazzo Crater (MOON-PIERAZZO) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/resource/luminous-pierazzo-crater/) |
| Moon | Wrinkle Ridges (PIA23210) | Lunar Reconnaissance Orbiter · LROC | NASA | [NASA source](https://science.nasa.gov/photojournal/wrinkle-ridges-on-the-moon/) |
| Moon | Natural Lunar Bridge (PIA13515) | Lunar Reconnaissance Orbiter · LROC | NASA/GSFC/Arizona State University | [NASA source](https://science.nasa.gov/photojournal/natural-bridge-on-the-moon/) |
| Mars | Curiosity Looks Downhill (PIA26551) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-looks-downslope-from-the-sulfate-unit/) |
| Mars | Texoli Ridge (PIA26477) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-surveys-texoli/) |
| Mars | Yardang Unit (PIA26472) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-views-the-yardang-unit/) |
| Mars | Gediz Vallis Channel (PIA26410) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiositys-view-within-gediz-vallis-channel/) |
| Mars | Mount Sharp Boxwork (PIA26306) | Mars Reconnaissance Orbiter · HiRISE | NASA/JPL-Caltech/University of Arizona | [NASA source](https://science.nasa.gov/photojournal/hirise-views-mount-sharps-boxwork/) |
| Mars | Curiosity Sulfur Stones (PIA26210) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-takes-a-last-look-at-sulfur-stones/) |
| Mars | Jezero Crater Rim (PIA26378) | Perseverance · Mastcam-Z | NASA/JPL-Caltech/ASU/MSSS | [NASA source](https://science.nasa.gov/photojournal/perseverances-mid-climb-view-of-jezero-crater/) |
| Mars | Dusty Water Ice (PIA26408) | Mars Reconnaissance Orbiter · HiRISE | NASA/JPL-Caltech/University of Arizona | [NASA source](https://science.nasa.gov/photojournal/dusty-water-ice-in-mars-dao-vallis/) |
| Mars | Exposed Subsurface Ice (PIA26407) | Mars Reconnaissance Orbiter · HiRISE | NASA/JPL-Caltech/University of Arizona | [NASA source](https://science.nasa.gov/photojournal/dusty-water-ice-in-mars-terra-sirenum/) |
| Mars | Perseverance Up-Crater View (PIA26373) | Perseverance · Mastcam-Z | NASA/JPL-Caltech/ASU/MSSS | [NASA source](https://science.nasa.gov/photojournal/perseverance-rovers-view-up-crater/) |
| Mars | Bright Angel Panorama (PIA26369) | Perseverance · Mastcam-Z | NASA/JPL-Caltech/ASU/MSSS | [NASA source](https://science.nasa.gov/photojournal/perseverance-captures-bright-angel-in-360-degrees/) |
| Mars | 360° Gediz Vallis Panorama (PIA26363) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-takes-a-360-degree-view-of-gediz-vallis-channel/) |
| Mars | Rocks with Halos (PIA26366) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-views-rocks-with-halos/) |
| Mars | Curiosity Views Gediz Vallis (PIA26367) | Curiosity · Mastcam | NASA/JPL-Caltech/MSSS | [NASA source](https://science.nasa.gov/photojournal/curiosity-views-gediz-vallis-channel/) |

## Other relevant resources

- [NASA Design and Develop Science Missions](https://science.nasa.gov/learn/basics-of-space-flight/): engineering context for the selected challenge.
- [NASA Photojournal](https://science.nasa.gov/photojournal/): official imagery and mission/instrument metadata.
- [NASA Moon Image Gallery](https://science.nasa.gov/moon/image-galleries/moonscapes/): lunar source imagery.

Check each NASA source record for its individual credits and data usage notes before reuse.
