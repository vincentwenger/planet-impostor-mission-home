/* Original curation of NASA Photojournal source records for Planet Impostor.
 * Image content is served by NASA; the question catalog and learning copy are original.
 * Photos require internet; the game provides a labeled illustration fallback.
 */
const NASA_QUESTIONS = [
  // EARTH — Terra/ASTER and Galileo imagery
  {id:'PIA17632',world:'Earth',name:'Namib Desert, Namibia',region:'Namibia',mission:'Terra · ASTER',credit:'NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team',slug:'namib-desert-namibia',fact:'This sand sea is on Earth. NASA’s Terra satellite mapped long linear dunes in the Namib Desert.'},
  {id:'PIA14766',world:'Earth',name:'Four Corners',region:'Southwestern United States',mission:'Terra · ASTER',credit:'NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team',slug:'four-corners-united-states',fact:'A barren landscape at the junction of four US states. Dry Earth terrain can resemble Mars.'},
  {id:'PIA11084',world:'Earth',name:'Rub’ al Khali',region:'Arabian Peninsula',mission:'Terra · ASTER',credit:'NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team',slug:'rub-al-khali-arabia',fact:'The Rub’ al Khali is a huge sand desert on Earth, with dune patterns reminiscent of other worlds.'},
  {id:'PIA17539',world:'Earth',name:'Canyonlands National Park',region:'Utah, USA',mission:'Terra · ASTER',credit:'NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team',slug:'canyonlands-national-park-utah',fact:'Canyonlands preserves eroded sandstone formations visible from Earth orbit.'},
  {id:'PIA00115',world:'Earth',name:'Simpson Desert',region:'Central Australia',mission:'Galileo · Imaging System',credit:'NASA/JPL',slug:'earth-simpson-desert-central-australia',fact:'NASA’s Galileo spacecraft photographed Earth’s desert on its journey to Jupiter.'},
  {id:'PIA11094',world:'Earth',name:'Thar Desert',region:'India / Pakistan',mission:'Terra · ASTER',credit:'NASA/GSFC/METI/ERSDAC/JAROS and U.S./Japan ASTER Science Team',slug:'thar-desert',fact:'The Thar Desert has migrating sand dunes, rocky outcrops and very low rainfall.'},
  {id:'PIA24551',world:'Earth',name:'Namibia Dunes',region:'Kalahari, Namibia',mission:'Terra · ASTER',credit:'NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team',slug:'namibia-dunes',fact:'Straight dune ridges mark this landscape on Earth, captured by the Terra satellite.'},
  // MOON — LRO imagery
  {id:'PIA12912',world:'Moon',name:'Ejecta Sweeps the Surface',region:'Lunar highlands',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'ejecta-sweeps-the-surface',fact:'Bright and dark debris fans around an impact crater on the Moon.'},
  {id:'PIA12884',world:'Moon',name:'First LROC Images',region:'Lunar highlands',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'first-lroc-images',fact:'Craters dominate this portion of the Moon, where there is no weather-driven erosion like Earth.'},
  {id:'PIA13532',world:'Moon',name:'Slipher Crater Scarps',region:'Slipher Crater',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'slipher-crater-fractured-moon-in-3-d',fact:'Fault scarps and fractures can form as the Moon cools and contracts.'},
  {id:'PIA14426',world:'Moon',name:'Action Shot',region:'Unnamed lunar crater',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'action-shot',fact:'A fresh lunar impact threw ejecta across the surface in a starburst pattern.'},
  {id:'PIA13135',world:'Moon',name:'In an Instant!',region:'Fresh lunar crater',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'in-an-instant',fact:'Boulders and frozen impact melt line the walls of a fresh lunar crater.'},
  {id:'PIA13246',world:'Moon',name:'Linné Crater',region:'Mare Serenitatis',mission:'Lunar Reconnaissance Orbiter · NAC',credit:'NASA/GSFC/Arizona State University',slug:'linne-crater',fact:'The well-preserved Linné crater sits on an ancient lunar lava plain.'},
  // MARS — rover and orbital imagery
  {id:'PIA04452',world:'Mars',name:'Dunes',region:'Northern polar region',mission:'Mars Odyssey · THEMIS',credit:'NASA/JPL/Arizona State University',slug:'dunes',fact:'Dark sand forms dune fields in the Martian north polar region.'},
  {id:'PIA20171',world:'Mars',name:'Martian Sand Dune Close-Up',region:'Bagnold Dunes, Gale Crater',mission:'Curiosity · MAHLI',credit:'NASA/JPL-Caltech/MSSS',slug:'surface-close-up-of-a-martian-sand-dune',fact:'The Curiosity rover inspected actual sand grains on a Martian dune.'},
  {id:'PIA25351',world:'Mars',name:'Dunes in Meridiani Planum',region:'Meridiani Planum',mission:'Mars Reconnaissance Orbiter · HiRISE',credit:'NASA/JPL-Caltech/University of Arizona',slug:'dunes-in-meridiani-planum',fact:'HiRISE uses enhanced color to reveal patterns in Martian bedrock and dunes.',enhanced:true},
  {id:'PIA06840',world:'Mars',name:'Sand Sheet and Dunes',region:'Southern high latitudes',mission:'Mars Global Surveyor · MOC',credit:'NASA/JPL/Malin Space Science Systems',slug:'sand-sheet-and-dunes',fact:'Dust-devil tracks cross windblown dunes inside a crater on Mars.'},
  {id:'PIA26330',world:'Mars',name:'Defrosting Dunes',region:'Martian polar dune field',mission:'Mars Reconnaissance Orbiter · HiRISE',credit:'NASA/JPL-Caltech/University of Arizona',slug:'defrosting-dunes',fact:'Seasonal carbon-dioxide frost turns into gas and leaves dark marks on Mars.',enhanced:true},
  {id:'PIA05952',world:'Mars',name:'Martian Dunes',region:'Southern mid-latitude crater',mission:'Mars Global Surveyor · MOC',credit:'NASA/JPL/Malin Space Science Systems',slug:'martian-dunes',fact:'Elongated Martian dunes preserve the signatures of changing wind directions.'},
  {id:'PIA25917',world:'Mars',name:'Hollowed-Out Rock',region:'Jezero Crater',mission:'Perseverance · Mastcam-Z',credit:'NASA/JPL-Caltech/ASU/MSSS',slug:'perseverance-finds-a-hollowed-out-rock',fact:'The Perseverance rover found a rock shaped by long-term sandblasting on Mars.'},
  {id:'PIA05060',world:'Mars',name:'Opportunity Rocks!',region:'Meridiani Planum',mission:'Opportunity · Panoramic Camera',credit:'NASA/JPL/Cornell',slug:'opportunity-rocks',fact:'Opportunity investigated thin Martian rock layers that may preserve environmental history.'},
  {id:'PIA06323',world:'Mars',name:'Layered Rocks in Crater',region:'Terra Tyrrhena',mission:'Mars Global Surveyor · MOC',credit:'NASA/JPL/Malin Space Science Systems',slug:'layered-rocks-in-crater',fact:'Layers exposed in Mars craters can record a planet’s geological past.'},
  {id:'PIA26308',world:'Mars',name:'Snow Lake Sulfur Rock',region:'Gale Crater',mission:'Curiosity · MAHLI',credit:'NASA/JPL-Caltech/MSSS',slug:'curiosity-views-rock-made-of-sulfur-at-snow-lake',fact:'Curiosity found elemental sulfur in rocks around this Martian site.'}
];

// Additional official NASA observations curated for Version 1.5.
NASA_QUESTIONS.push(
  {"id":"PIA26510","world":"Earth","name":"Hutt Lagoon","region":"Western Australia","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"This pink salt lake and surrounding sandy landforms are on Earth, along the coast of Western Australia.","slug":"hutt-lagoon-australia"},
  {"id":"PIA26509","world":"Earth","name":"Heard Island Volcano","region":"Southern Indian Ocean","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Heard Island contains an active volcano amid glaciers and ocean, showing how volcanic landscapes can meet ice.","slug":"heard-volcano-australia"},
  {"id":"PIA26506","world":"Earth","name":"Taal Volcano","region":"Philippines","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Taal is an active volcanic complex on Earth, surrounded by a lake and densely settled land.","slug":"taal-volcano-philippines"},
  {"id":"PIA26505","world":"Earth","name":"Clayton Valley","region":"Nevada, United States","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Salt flats and arid basins on Earth can appear otherworldly in satellite imagery.","slug":"clayton-valley-nv"},
  {"id":"PIA26504","world":"Earth","name":"Halemaʻumaʻu, Kīlauea","region":"Hawaiʻi, United States","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Lava fields and crater terrain on Hawaiʻi resemble parts of other volcanic worlds.","slug":"halemaumau-kilauea-hawaii"},
  {"id":"PIA26501","world":"Earth","name":"Craters of the Moon","region":"Idaho, United States","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Despite its name, Craters of the Moon is a terrestrial volcanic landscape in Idaho.","slug":"craters-of-the-moon-national-monument-idaho"},
  {"id":"PIA26447","world":"Earth","name":"Humboldt Glacier","region":"Venezuela","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Glaciers can survive in tropical mountains at high elevation on Earth.","slug":"humboldt-glacier-venezuela"},
  {"id":"PIA26393","world":"Earth","name":"Tofua Island","region":"Tonga","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"This circular island on Earth is shaped by volcanic activity and a crater lake.","slug":"tofua-island-tonga-islands"},
  {"id":"PIA26326","world":"Earth","name":"Fernandina Volcano","region":"Galápagos Islands, Ecuador","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Fernandina is a young volcanic island on Earth with dark lava and a prominent caldera.","slug":"fernandina-volcano-galapagos"},
  {"id":"PIA26290","world":"Earth","name":"Dinosaur Provincial Park","region":"Alberta, Canada","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Badlands carved by erosion on Earth can look like rugged planetary terrain.","slug":"dinosaur-provincial-park-canada"},
  {"id":"PIA26288","world":"Earth","name":"Iceland Volcanic Eruption","region":"Iceland","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Recent volcanic eruptions create fresh lava fields on Earth, offering analogs for ancient extraterrestrial volcanism.","slug":"march-2024-iceland-eruption"},
  {"id":"PIA26287","world":"Earth","name":"Star Dunes","region":"Morocco","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Changing wind directions build star-shaped dunes in desert landscapes on Earth.","slug":"star-dunes-morocco"},
  {"id":"PIA26281","world":"Earth","name":"Rinjani Caldera","region":"Lombok, Indonesia","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"A massive volcanic eruption left the Rinjani caldera and its lake on Earth.","slug":"rinjani-caldera-indonesia"},
  {"id":"PIA26197","world":"Earth","name":"Badwater Basin","region":"Death Valley, California","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Death Valley is among Earth’s driest regions, but exceptional rain can temporarily fill Badwater Basin with water.","slug":"badwater-death-valley"},
  {"id":"PIA26008","world":"Earth","name":"Channeled Scablands","region":"Washington, United States","mission":"Terra · ASTER","credit":"NASA/METI/AIST/Japan Space Systems and U.S./Japan ASTER Science Team","fact":"Ancient catastrophic floods carved channels and mesas into Washington state’s basalt landscape.","slug":"channeled-scablands-washington"},
  {"id":"MOON-TYCHO","world":"Moon","name":"Tycho Crater Central Peak","region":"Tycho Crater","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"The tall central peak is inside a large lunar impact crater.","image":"https://assets.science.nasa.gov/content/dam/science/psd/earths-moon/daily-moon-guide/hotspots/22_Tycho_Crater_terrestrial.png/jcr%3Acontent/renditions/cq5dam.web.1280.1280.png","source":"https://science.nasa.gov/resource/tycho-craters-central-peak-on-the-moon/"},
  {"id":"MOON-REINER","world":"Moon","name":"Reiner Gamma Lunar Swirl","region":"Oceanus Procellarum","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Bright, winding lunar swirls reflect unusual surface patterns linked to local magnetic fields.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/earths-moon/daily-moon-guide/hotspots/49_Reiner_Gamma_terrestrial.png?h=1024&w=1024","source":"https://science.nasa.gov/resource/lunar-swirl-reiner-gamma/"},
  {"id":"MOON-SHACKLETON","world":"Moon","name":"Shackleton Crater","region":"Lunar south pole","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Some polar crater interiors remain in nearly permanent shadow, while parts of their rims receive sunlight.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/shackleton-1.png?fit=clip&h=952&w=952","source":"https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/"},
  {"id":"MOON-PLATO","world":"Moon","name":"Ancient Volcanic Vent","region":"Near Plato Crater","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Scientists study volcanic features on the Moon to understand its ancient geological activity.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/l/plato.jpg?fit=clip&h=1024&w=1024","source":"https://science.nasa.gov/resource/ancient-volcanic-vent-near-the-moons-plato-crater/"},
  {"id":"MOON-MALAPERT","world":"Moon","name":"Malapert Massif","region":"Lunar south pole","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"A mountainous region near the lunar south pole is of interest for future exploration.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/MalapertMassif-1.png?fit=clip&h=1024&w=1024","source":"https://science.nasa.gov/resource/malapert-massif/"},
  {"id":"MOON-KOMAROV","world":"Moon","name":"Komarov Fractured Crater","region":"Far side of the Moon","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Fractures across Komarov crater reveal the effects of ancient processes in the Moon’s crust.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/Komarov.png?fit=clip&h=1024&w=1024","source":"https://science.nasa.gov/resource/fractured-crater/"},
  {"id":"MOON-PIT","world":"Moon","name":"Lunar Pit","region":"Moon","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Some lunar pits may be associated with subsurface cavities, an exciting subject of future exploration.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/pit.png?fit=clip&h=800&w=800","source":"https://science.nasa.gov/resource/lunar-pit/"},
  {"id":"MOON-ARISTARCHUS","world":"Moon","name":"Aristarchus Crater","region":"Aristarchus Plateau","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Bright Aristarchus crater and surrounding plateau stand out on the Moon’s surface.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/earths-moon/daily-moon-guide/hotspots/12_Aristarchus_Plateau_terrestrial.png?h=1024&w=1024","source":"https://science.nasa.gov/resource/aristarchus-crater-2/"},
  {"id":"MOON-COPERNICUS","world":"Moon","name":"Copernicus Central Peak","region":"Copernicus Crater","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"The central peak of Copernicus crater reveals layers of material excavated by an impact.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/CopernPeak-2.png?fit=clip&h=1024&w=1024","source":"https://science.nasa.gov/resource/copernicus-central-peak-another-layered-target/"},
  {"id":"MOON-JACKSON","world":"Moon","name":"Jackson Crater","region":"Lunar far side","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Fresh impact craters on the Moon preserve bright ejecta patterns and sharp walls.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/content_jackson_crop1.png?fit=clip&h=952&w=952","source":"https://science.nasa.gov/resource/jackson-emerges/"},
  {"id":"MOON-HAWKE","world":"Moon","name":"Hawke Crater","region":"Moon","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Lunar crater landforms record collisions over billions of years.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/hawke.png?fit=clip&h=1024&w=1024","source":"https://science.nasa.gov/resource/hawke-crater/"},
  {"id":"MOON-PIERAZZO","world":"Moon","name":"Pierazzo Crater","region":"Lunar far side","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"This bright lunar crater contrasts with older, more weathered-looking terrain around it.","image":"https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/m1265532953.jpg?fit=clip&h=952&w=952","source":"https://science.nasa.gov/resource/luminous-pierazzo-crater/"},
  {"id":"PIA23210","world":"Moon","name":"Wrinkle Ridges","region":"Mare Frigoris","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA","fact":"Ridges in lunar lava plains reflect past changes in the Moon’s surface.","slug":"wrinkle-ridges-on-the-moon"},
  {"id":"PIA13515","world":"Moon","name":"Natural Lunar Bridge","region":"Moon","mission":"Lunar Reconnaissance Orbiter · LROC","credit":"NASA/GSFC/Arizona State University","fact":"Lunar Reconnaissance Orbiter imagery revealed a natural bridge-like landform on the Moon.","slug":"natural-bridge-on-the-moon"},
  {"id":"PIA26551","world":"Mars","name":"Curiosity Looks Downhill","region":"Mount Sharp, Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Curiosity photographed layered terrain along a slope of Mount Sharp in Gale Crater.","slug":"curiosity-looks-downslope-from-the-sulfate-unit"},
  {"id":"PIA26477","world":"Mars","name":"Texoli Ridge","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Curiosity surveyed ridges and sedimentary rocks during its climb of Mount Sharp.","slug":"curiosity-surveys-texoli"},
  {"id":"PIA26472","world":"Mars","name":"Yardang Unit","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Wind has sculpted striking ridges called yardangs on Mars.","slug":"curiosity-views-the-yardang-unit"},
  {"id":"PIA26410","world":"Mars","name":"Gediz Vallis Channel","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"The rover investigated landforms in a channel that may have been shaped by water and debris flows.","slug":"curiositys-view-within-gediz-vallis-channel"},
  {"id":"PIA26306","world":"Mars","name":"Mount Sharp Boxwork","region":"Gale Crater","mission":"Mars Reconnaissance Orbiter · HiRISE","credit":"NASA/JPL-Caltech/University of Arizona","fact":"A web of intersecting ridges forms unusual boxwork patterns on Mount Sharp.","slug":"hirise-views-mount-sharps-boxwork","enhanced":true},
  {"id":"PIA26210","world":"Mars","name":"Curiosity Sulfur Stones","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Curiosity studied unusually sulfur-rich rocks exposed on the Martian surface.","slug":"curiosity-takes-a-last-look-at-sulfur-stones"},
  {"id":"PIA26378","world":"Mars","name":"Jezero Crater Rim","region":"Jezero Crater","mission":"Perseverance · Mastcam-Z","credit":"NASA/JPL-Caltech/ASU/MSSS","fact":"Perseverance viewed the rim of Jezero Crater during a difficult climb.","slug":"perseverances-mid-climb-view-of-jezero-crater","enhanced":true},
  {"id":"PIA26408","world":"Mars","name":"Dusty Water Ice","region":"Dao Vallis","mission":"Mars Reconnaissance Orbiter · HiRISE","credit":"NASA/JPL-Caltech/University of Arizona","fact":"Some Martian slopes expose dusty water ice below the surface.","slug":"dusty-water-ice-in-mars-dao-vallis","enhanced":true},
  {"id":"PIA26407","world":"Mars","name":"Exposed Subsurface Ice","region":"Terra Sirenum","mission":"Mars Reconnaissance Orbiter · HiRISE","credit":"NASA/JPL-Caltech/University of Arizona","fact":"Exposed water ice provides clues to Mars’ frozen subsurface.","slug":"dusty-water-ice-in-mars-terra-sirenum","enhanced":true},
  {"id":"PIA26373","world":"Mars","name":"Perseverance Up-Crater View","region":"Jezero Crater","mission":"Perseverance · Mastcam-Z","credit":"NASA/JPL-Caltech/ASU/MSSS","fact":"Perseverance captured a panorama of hills leading toward the Jezero Crater rim.","slug":"perseverance-rovers-view-up-crater","enhanced":true},
  {"id":"PIA26369","world":"Mars","name":"Bright Angel Panorama","region":"Jezero Crater","mission":"Perseverance · Mastcam-Z","credit":"NASA/JPL-Caltech/ASU/MSSS","fact":"The Bright Angel region contains rocks that help scientists investigate the history of ancient water on Mars.","slug":"perseverance-captures-bright-angel-in-360-degrees","enhanced":true},
  {"id":"PIA26363","world":"Mars","name":"360° Gediz Vallis Panorama","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Curiosity assembled a wide panorama of a Martian channel from many separate images.","slug":"curiosity-takes-a-360-degree-view-of-gediz-vallis-channel"},
  {"id":"PIA26366","world":"Mars","name":"Rocks with Halos","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"Pale halos along rocks may preserve traces of past chemical changes caused by groundwater.","slug":"curiosity-views-rocks-with-halos"},
  {"id":"PIA26367","world":"Mars","name":"Curiosity Views Gediz Vallis","region":"Gale Crater","mission":"Curiosity · Mastcam","credit":"NASA/JPL-Caltech/MSSS","fact":"An ancient channel in Gale Crater contains rock piles and landforms that may record flowing water.","slug":"curiosity-views-gediz-vallis-channel"}
);

NASA_QUESTIONS.forEach(q=>{
  if (q.image && q.source) return;
  const n=q.id.toLowerCase();
  q.image=`https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/${n.slice(0,5)}/${n}/${q.id}.jpg?crop=faces%2Cfocalpoint&fit=crop&w=1100&h=800`;
  q.source=`https://science.nasa.gov/photojournal/${q.slug}/`;
});


// V1.9: landscape-only expansion of the hand-curated 66-record Photojournal catalog with additional
// distinct, source-linked images returned by NASA's public Image and Video Library.
// NASA API: https://images-api.nasa.gov/search (no API key required).
// This is progressive enhancement: the original game works if the API is offline.
// Search metadata requires explicit surface-imaging provenance and rejects launches/hardware.
// Previous v1.7 auto-classified cache is intentionally NOT trusted or imported.
const NASA_IMAGE_TARGETS = Object.freeze({Earth:60,Moon:50,Mars:60});
const NASA_IMAGE_LIBRARY_CACHE_KEY = 'planet-impostor-nasa-library-v1.9-landscapes';
const NASA_IMAGE_QUERIES = Object.freeze({
  Earth: [
    'Terra ASTER volcano', 'Terra ASTER desert', 'NASA satellite glacier landscape',
    'NASA satellite coastal landscape', 'Earth satellite mountains',
    'NASA satellite salt flats', 'NASA Earth Observatory canyon', 'Earth Landsat terrain',
    {term:'Earth surface',page:1},{term:'Earth surface',page:2},
    {term:'Landsat',page:1},{term:'Terra',page:2}
  ],
  Moon: [
    'Lunar Reconnaissance Orbiter crater', 'LRO lunar surface',
    'Moon lunar terrain', 'LROC crater landscape', 'lunar highlands',
    'lunar south pole terrain', 'Lunar Reconnaissance Orbiter ridges', 'lunar regolith boulders',
    {term:'Moon surface',page:1},{term:'Moon surface',page:2},
    {term:'LROC lunar craters',page:2},{term:'Lunar Reconnaissance Orbiter Camera terrain',page:2}
  ],
  Mars: [
    'Mars Reconnaissance Orbiter dunes', 'Mars HiRISE crater',
    'Curiosity Mars landscape', 'Perseverance Mars landscape',
    'Mars rover rocky terrain', 'Martian polar terrain',
    'Mars rover panorama', 'Mars Odyssey Martian terrain',
    {term:'Mars surface',page:1},{term:'Mars surface',page:2},
    {term:'Mars crater',page:2},{term:'Martian landscape',page:3}
  ]
});
// The NASA Image and Video Library is *mission-keyword* searchable, not a
// ground-truth database of which world is physically depicted. An Atlas rocket
// launch from Cape Canaveral can mention the Moon, LRO and lunar craters.
// Never label a candidate by the destination of the mission alone.
// These photos are not valid for a "which WORLD is this LANDSCAPE" quiz,
// even if the text mentions lunar terrain or Martian geology.
const NASA_LIBRARY_BLOCKED = /\b(artist.?s? (concept|rendition|illustration)|illustration|rendering|animation|diagram|graph|chart|logo|patch|poster|map legend|mission control|launch|launched|liftoff|lift.?off|rocket|atlas v|centaur|space shuttle|cape canaveral|kennedy space center|launch complex|launch pad|flight deck|spacecraft assembly|model testing|mockup|computer simulation|selfie|team portrait|portrait|microscope|wind tunnel|test stand|press conference|ceremony|crew photo|astronaut training|spacecraft hardware|astronauts?|cosmonauts?|crewmembers?|space ?suits?|helmets?|faces?|portraits?|interiors?|cabin|cockpit|lunar module|command module|plaques?|commemorative|inscriptions?|signatures?|autographs?|flags?|emblems?|insignia|patches?|crew cabin|footprints?|footsteps?|hatches?|docking|spaceship|spacewalk|e\.?v\.?a\.?|mission insignia|memorabilia)\b/i;
// Broad terms like "surface" and "landscape" alone are not sufficient:
// the image's title must identify an actual geological feature.
const NASA_LIBRARY_TERRAIN_TITLE = /\b(dunes?|craters?|volcano(?:es)?|volcanic|rocks?|ridges?|canyons?|glaciers?|deserts?|cliffs?|mountains?|ice|plains?|basins?|lava|lakes?|coasts?|islands?|valleys?|regolith|maria|mare|highlands?|slopes?|outcrops?|erosion|sediments?|dust|sand|geolog(?:y|ical)|badlands|salt flats?|fractures?|scarps?|boulders?|fissures?|landforms?|yardangs?|deltas?)\b/i;
// Keep automatic candidates restricted to cameras/sensors that actually image
// the named world. Apollo astronaut/crew archives are excluded entirely from
// AUTO-ADDED images; manually curated Apollo landscape photos could be added later.
const NASA_LIBRARY_PROVENANCE = {
  Earth: /\b(ASTER|Landsat|Earth Observatory|Earth-observing|Terra satellite|Aqua satellite|Sentinel-2)\b/i,
  Moon: /\b(LROC(?:\s+NAC)?|Lunar Reconnaissance Orbiter Camera|LRO (?:NAC|WAC|Narrow Angle Camera)|Lunar Orbiter (?:camera|imagery))\b/i,
  Mars: /\b(HiRISE|Mastcam(?:-Z)?|Mars Reconnaissance Orbiter.*?(?:image|camera|photograph)|Mars Odyssey.*?(?:image|camera|photograph)|Mars Global Surveyor.*?(?:image|camera|photograph))\b/i
};
const NASA_LIBRARY_BODY = {
  Earth: /\b(earth|terrestrial|landsat|terra satellite|aster|our planet)\b/i,
  Moon: /\b(moon|lunar|lro|apollo)\b/i,
  Mars: /\b(mars|martian|curiosity|perseverance|hirise)\b/i
};
const NASA_LIBRARY_EARTH_FACILITY = /\b(KSC|Kennedy Space Center|Cape Canaveral|Launch Complex|Vandenberg Space Force Base|Baikonur Cosmodrome|Johnson Space Center|Goddard Space Flight Center|NASA Headquarters)\b/i;
function nasaCountByWorld(){return Object.fromEntries(Object.keys(NASA_IMAGE_TARGETS).map(w=>[w,NASA_QUESTIONS.filter(q=>q.world===w).length]));}
function sanitizeNasaCopy(s,max=260){return String(s||'').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|quot|lt|gt);/gi,m=>({'&nbsp;':' ','&amp;':'&','&quot;':'"','&lt;':'<','&gt;':'>'}[m.toLowerCase()]||m)).replace(/\s+/g,' ').trim().slice(0,max);}
function nasaAssetToQuestion(item,world){
  const d=item?.data?.[0];
  const identifier=String(d?.nasa_id||'').trim();
  const title=sanitizeNasaCopy(d?.title,110);
  const description=sanitizeNasaCopy(d?.description||d?.description_508,1000);
  const place=sanitizeNasaCopy(d?.location,110);
  const text=title+' '+description;
  if(!identifier||!title||!description||!NASA_LIBRARY_BODY[world]?.test(text))return null;
  // Site and launch-archive metadata can discuss the Moon/Mars in detail,
  // despite depicting a rocket or a control room on Earth.
  if(/^(?:KSC|AS\d{2}|S\d{2}|JSC|MSFC|GRC)[-_]/i.test(identifier)||NASA_LIBRARY_EARTH_FACILITY.test(place)||NASA_LIBRARY_BLOCKED.test(text))return null;
  // Require positive subject evidence and named observing camera/instrument.
  if(!NASA_LIBRARY_TERRAIN_TITLE.test(title)||!NASA_LIBRARY_PROVENANCE[world].test(text))return null;
  // Reject cross-world captions: the quiz must ask where the photo was taken,
  // NOT what celestial object a mission is traveling to or discussing.
  if(world==='Moon'&&/\b(Mars|Martian|Jupiter|Saturn|Earth|Earthrise|Earthset)\b/i.test(title))return null;
  if(world==='Mars'&&/\b(Moon|lunar|Earth|Earthrise)\b/i.test(title))return null;
  if(world==='Earth'&&/\b(Martian|Mars|lunar|Moon|artist)\b/i.test(title))return null;
  const link=(item.links||[]).find(x=>x?.href&&x?.rel==='preview'&&/^https:\/\//.test(x.href))||
    (item.links||[]).find(x=>x?.href&&/^https:\/\//.test(x.href)&&/\.(jpe?g|png|webp)(\?|$)/i.test(x.href));
  if(!link)return null;
  const image=link.href;
  if(!/\.(jpe?g|png|webp)(\?|$)/i.test(image))return null;
  const id='NASA-LIB-'+identifier;
  const firstSentence=description.split(/(?<=[.!?])\s+(?=[A-Z])/)[0]||description;
  const fact=sanitizeNasaCopy(firstSentence,240)||`NASA captured this ${world} observation.`;
  return {id,world,name:title,region:place||`${world} terrain`,
    mission:sanitizeNasaCopy(d.secondary_creator||d.photographer||d.center||'NASA Image and Video Library',95),
    credit:sanitizeNasaCopy(d.secondary_creator||d.photographer||'NASA Image and Video Library',95),
    image,source:'https://images.nasa.gov/details/'+encodeURIComponent(identifier),fact,
    catalog:'NASA Image and Video Library'};
}
function loadCachedNasaLibrary(){
  try{
    const cache=JSON.parse(localStorage.getItem(NASA_IMAGE_LIBRARY_CACHE_KEY)||'[]');
    if(!Array.isArray(cache))return 0;
    const existing=new Set(NASA_QUESTIONS.map(q=>q.id));
    let n=0;
    for(const q of cache){
      if(!q||!NASA_IMAGE_TARGETS[q.world]||typeof q.id!=='string'||!q.id.startsWith('NASA-LIB-')||
          !/^https:\/\//.test(q.image||'')||!/^https:\/\/images\.nasa\.gov\//.test(q.source||'')||existing.has(q.id))continue;
      if(NASA_QUESTIONS.filter(x=>x.world===q.world).length>=NASA_IMAGE_TARGETS[q.world])continue;
      NASA_QUESTIONS.push(q);existing.add(q.id);n++;
    }
    return n;
  }catch{return 0;}
}
function persistNasaLibrary(){
  try{localStorage.setItem(NASA_IMAGE_LIBRARY_CACHE_KEY,
    JSON.stringify(NASA_QUESTIONS.filter(q=>q.catalog==='NASA Image and Video Library')));
  }catch{}
}
// Keep this non-blocking. Game can start immediately with the curated 66 images;
// the browser adds more NASA observations in the background as results arrive.
async function expandNasaQuestionLibrary({fetcher,targets,searches}={}){
  const useFetch=fetcher||(typeof fetch==='function'?fetch:null);
  if(!useFetch)return nasaCountByWorld();
  const goals=targets||NASA_IMAGE_TARGETS;
  const searchTerms=searches||NASA_IMAGE_QUERIES;
  const existing=new Set(NASA_QUESTIONS.map(q=>q.id));
  async function retrieve(world,search){
    if(NASA_QUESTIONS.filter(q=>q.world===world).length>=goals[world])return;
    const term=typeof search==='string'?search:search.term;
    const page=typeof search==='string'?1:search.page;
    const url='https://images-api.nasa.gov/search?q='+encodeURIComponent(term)+'&media_type=image&page_size=100&page='+page;
    let controller=null,timer=null;
    try{
      if(typeof AbortController==='function'){
        controller=new AbortController();
        if(typeof setTimeout==='function')timer=setTimeout(()=>controller.abort(),12000);
      }
      const response=await useFetch(url,controller?{signal:controller.signal}:undefined);
      if(!response||!response.ok)return;
      const data=await response.json();
      const options=(data?.collection?.items||[]).map(item=>nasaAssetToQuestion(item,world)).filter(Boolean);
      for(let i=options.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
      for(const q of options){
        if(existing.has(q.id))continue;
        if(NASA_QUESTIONS.filter(p=>p.world===world).length>=goals[world])break;
        NASA_QUESTIONS.push(q);existing.add(q.id);
      }
      persistNasaLibrary();
    }catch{/* Network, CORS and HTTP errors never block gameplay. */}
    finally{if(timer!==null)clearTimeout(timer);}
  }
  // First scan several independent terrain searches for each world; then try the
  // remaining search phrases only where a world is still below its target.
  for(let step=0;step<12;step++){
    const jobs=[];
    for(const world of ['Earth','Moon','Mars']){
      if(NASA_QUESTIONS.filter(q=>q.world===world).length>=goals[world])continue;
      if(searchTerms[world]?.[step])jobs.push(retrieve(world,searchTerms[world][step]));
    }
    if(!jobs.length)break;
    await Promise.all(jobs);
  }
  return nasaCountByWorld();
}
// Restore only v1.9 landscape-filtered metadata. v1.7 and v1.8 caches are ignored
// to expunge Apollo-crew/plaques and other non-terrain images already downloaded.
if(typeof localStorage!=='undefined')loadCachedNasaLibrary();
