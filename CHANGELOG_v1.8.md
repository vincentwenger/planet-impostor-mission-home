# Planet Impostor — v1.8 terrain-accuracy hotfix

- Fix incorrect NASA Earth/Moon/Mars classifications from the automatic NASA Images catalog.
- Explicitly reject the photographed June 2009 Atlas V launch at Cape Canaveral (`KSC-2009-3781`) and similar launches, facilities, hardware and non-terrain photos.
- Require **terrain subject in the image title** plus credible Earth/Moon/Mars surface-observation camera/instrument provenance in NASA metadata.
- Ignore the previously cached v1.7 auto-labeled image catalog (new v1.8 cache key). Difficulty unlocks and the no-repeat image history are left untouched.
- Preserve the 66 curated NASA Photojournal entries, existing Earth/Moon/Mars gameplay, mobile layout, and dynamic NASA library expansion with stronger safeguards.
- Add regression tests for false Moon classification of Cape Canaveral and for actual surface observations.

**Limitation:** Automated metadata rules are conservative but cannot replace individual image review. The game may expand to fewer than 170 records if sufficient reliable NASA API metadata are not available. This accuracy-first tradeoff is intentional.
