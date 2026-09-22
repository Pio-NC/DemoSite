# North State — the graphite website concept

Four pages extend the approved graphite-paper direction: North State, Manufacturing, Powder Coating, and Academy.

## Pages

- `index.html` — parent brand, with illustrated islands linking to each division.
- `manufacturing.html` — machining and fabrication, a workshop drawing, and interactive detail callouts.
- `powder-coating.html` — preparation, application, curing, and protective finishing, with an interactive finishing-workspace drawing.
- `academy.html` — powder coating education, an isometric classroom, illustrative progress, a countdown, and three readable sample journal articles.
- `blueprint.html#whiteprint-dark` — the original graphite style study.
- `concepts.html` — the original ten-concept collection.

## Materials and type

Use graphite `#23262A`, silver-white `#DEDCD3`, secondary text `#B4B7B4`, and drawing lines `#8D9498`. The stationary SVG grain repeats at **180 × 180 px**, 25% finer than the first treatment, with soft-light blending at 42% opacity.

Cormorant Garamond carries the headlines and reading copy. IBM Plex Mono carries navigation, annotations, statuses, and interface labels. Keep body copy generously sized, with restrained line rules and large open areas between islands.

## Illustrations

All three new diagrams use an elevated isometric projection with equal X/Y recession, transparent backgrounds, and graphite component faces. They represent conceptual workspaces, not verified North State facilities or equipment.

Editable files:

- `manufacturing-isometric.svg`
- `powder-coating-isometric.svg`
- `academy-classroom-isometric.svg`

The SVGs are embedded inline on the pages, with unique instance IDs. Logical groups carry `class="iso-part"` and `data-part` attributes. Hover/focus on a detail control highlights the relevant groups; clicking selects or clears that detail. A keyboard and touch user can access the same information.

## Motion

The logo starts at the top center and moves into the navigation’s upper-right corner as the page scrolls. On the landing page, an SVG connector draws between the division islands. Images and content arrive gently; linked drawings lift slightly on hover. Respect reduced-motion preferences by showing completed routes and a stationary corner logo.

## Academy demo behavior

- The progress slider starts at **52%**, is operable with pointer or keyboard, and has a reset control. This is illustrative, not actual construction/curriculum progress; it resets when the page reloads.
- The live countdown targets **January 1, 2027 at midnight Eastern** because only the year was specified. This date is a demo assumption and is labeled on the page; confirm the exact launch date before production. The timer clamps at zero after the target.
- Three fictional journal articles open in accessible dialogs. They are sample editorial content, not published Academy materials or operating procedures.
- Curriculum topics are proposed. There is no enrollment, certification, accreditation, or third-party affiliation claim.

## Content provenance

The owner specified machining/fabrication for Manufacturing and powder coating education for Academy. No machine capacities, tolerance guarantees, certifications, course pricing, or schedules have been invented.

Powder Coating business details come from [North State Powder Coating](https://northstatepc.com/): metal coating, industrial equipment/machinery, protective finishing, North Carolina service, and the displayed contact information.

General powder-coating process and proposed educational topics are informed by the [Powder Coating Institute process overview](https://www.powdercoating.org/page/WhatIsPC), [glossary](https://www.powdercoating.org/page/Glossaryps), and [introductory agenda](https://www.powdercoating.org/page/101Agenda). This does not imply an affiliation or that the illustrative diagram depicts North State’s equipment.

## Implementation

`northstate.css` contains the shared design. `northstate.js` controls the logo, connectors, detail highlights, progress slider, countdown, mobile navigation, and journal dialogs. `build-pages.py` regenerates the four static HTML files using the SVG assets and editable copy. The deployed site needs no runtime backend or build step. Contact links open the visitor’s email or telephone application; they do not simulate submissions.
