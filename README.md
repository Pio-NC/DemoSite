# North State — A study in flow

Ten interactive homepage concepts for North State Powder Coating, with a visual collection page.

## Open the demo

Open `dist/index.html` directly in a modern browser. No installation or build is required. Alternatively run `python -m http.server 4173 --directory dist` from this folder and open `http://localhost:4173`.

In the designer ZIP, `index.html` and its assets sit directly at the archive root. Extract the ZIP first, then open `index.html`. Google Fonts load over the internet; the site uses system-font fallbacks offline.

## The ten directions

1. **Field Notes** — handwriting, warm paper, loose frames, wandering arrows.
2. **The Blueprint** — blue drafting stock, construction marks, orthogonal routes.
3. **One Long Line** — oversized sans type, open white space, a single red thread.
4. **The Workshop Ledger** — ruled paper, editorial serif, red-margin entries.
5. **Carbon Copy** — dark stock, pale chalk, industrial condensed type.
6. **The Color Study** — pigment shapes, playful loops, colorful islands.
7. **A Local Atlas** — topographic contours, organic frames, survey trails.
8. **Cut & Paste** — rotated scraps, tape, torn edges, studio-wall composition.
9. **Brush & Wash** — rice paper, open layouts, expressive brush arcs.
10. **Connected Matter** — fine orbital paths and circular content islands.

## Interaction notes for the designer

- The logo begins at the top center, shrinks and rises, then settles at the upper right during the first 470 pixels of scrolling.
- SVG connectors draw by arc length as scrolling reaches each gap between islands. An arrowhead follows the current end of each stroke. Scrolling backward erases the route.
- Hand-drawn outlines reveal as their content enters the viewport. Fine ink displacement and paper grain use SVG filters.
- The bottom control bar switches concepts, returns to the collection, or replays from the top. Each concept has its own hash URL (`#/concept/field`, for example).
- Four ink chips recolor the route and selected decorative accents. These are design experiments, not a verified product finish catalog.
- The site adapts to mobile widths. Reduced-motion preferences show the completed lines and a stationary corner logo.
- Email and telephone links use the real contact details. There is no form backend or simulated submission.

## Content and logo provenance

Business facts were checked on September 22, 2026 against https://northstatepc.com/ and its indexed official-site content. Source: North State Powder Coating, 1305 Graham St, Burlington, NC; (919) 801-2079; Jesse@northstatepc.com. Confirmed services include powder coating, custom solutions for industrial equipment and machinery, and protective finishing against corrosion and wear. No turnaround guarantees, testimonials, capacity, or additional service claims were invented.

The supplied `NORTHSTATE Logo-02.svg` is an Academy badge; the supplied JPG files depict Manufacturing and Powder Coating badges. To keep the demo scalable and correctly labeled, `assets/northstate-logo.svg` uses the supplied `NORTH_CAROLINA_NORTHSTATE.svg` wordmark with a simple powder-coating descriptor. This is a concept lockup, not a recreation of the supplied spray-gun badge. Dark versions adjust the ink and knockout colors. All original supplied files remain untouched in the parent workspace.

## Files

- `dist/app.js`: collection data, thumbnail markup, routing.
- `dist/journey.js`: island content, SVG geometry, scroll and color interactions.
- `dist/style.css`: collection design, fonts and shared theme tokens.
- `dist/journey.css`: ten compositions, mobile rules and animation styling.
- `dist/assets`: supplied/adapted brand vectors.

## Verification

JavaScript syntax checked. All ten routes checked at desktop and phone width for content, images, connector generation and horizontal overflow. Desktop heading overflow checks passed. Follow-the-line, ink selection, replay, and collection navigation exercised in the browser. No browser console warnings or errors were found during those checks.

## Blueprint refinement — three designer studies

Open `dist/blueprint.html` for the new Whiteprint, Assembly, and Drawing Office directions. These combine monochrome technical drawings with monospaced typography and a dedicated designer-notes section. The original ten concepts remain available.

The complete written guide is `dist/assets/North-State-Blueprint-Style-Guide.md`. Three editable technical-diagram SVGs are included in `dist/assets`. These are conceptual drawings, not depictions of verified North State equipment. See the written guide for fonts, palettes, stroke weights, spacing, responsive behavior and motion recommendations.


## Dark Whiteprint

Open `dist/blueprint.html#whiteprint-dark` for the dark paper treatment. The Whiteprint comparison controls switch between light and dark. The dark treatment uses dedicated editable SVG variants and has its own downloadable style sheet: `dist/assets/North-State-Dark-Whiteprint-Style-Guide.md`. Main paper is #23262A with #DEDCD3 silver-white type and #B4B7B4 supporting text. Cormorant Garamond carries the main reading copy; IBM Plex Mono carries technical annotations. A lightweight SVG grain layer suggests matte book paper. The existing three directions remain available.
