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
NASA_QUESTIONS.forEach(q=>{
  const n=q.id.toLowerCase();
  q.image=`https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/${n.slice(0,5)}/${n}/${q.id}.jpg?crop=faces%2Cfocalpoint&fit=crop&w=1100&h=800`;
  q.source=`https://science.nasa.gov/photojournal/${q.slug}/`;
});
