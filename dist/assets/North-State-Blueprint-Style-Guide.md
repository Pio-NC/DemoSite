# North State / Blueprint series

Three monochrome design directions for the web designer. September 2026.

Open `blueprint.html` to compare the working page studies. Each has a designer-notes section with typography, palette, line-weight, spacing and motion examples.

## Shared brief

Combine technical-drawing discipline with the supplied reference's quiet editorial composition: generous white space, fine isometric linework, small figure captions, subtle rules, and monospaced type. Maintain the original idea of an initially centered logo traveling to the top-right corner while a line draws through connected content islands.

The screenshot guides the art direction, not the content. Its Web3 terminology and business descriptions are not part of the North State site.

Use one mono family per direction. Let weight, scale and space establish hierarchy. Keep essential text dark enough to read; the very pale grays belong to background construction marks. Avoid deep saturated blue fills, heavy drop shadows, rounded app cards and cartoon outlines.

## 01 / Whiteprint — recommended starting point

Closest to the supplied reference. Open service rows, a large quiet isometric illustration, and asymmetrical areas of white space.

| Element | Specification |
|---|---|
| Typeface | IBM Plex Mono |
| Weights | Regular 400, medium 500 |
| Palette | Paper #FFFFFF; text #303A3B; secondary #657172; drawing #B8C1C0 |
| Target type scale | 64 / 24 / 16 / 12 px; fluid headings on smaller screens |
| Spacing | 144 / 80 / 40 / 24 px |
| Primary drawing strokes | 0.75–1.25 px at display size |
| Composition | Headline left, diagram right; service notes in two editorial columns; contact island offset right |

Illustration: isometric open-frame geometry, pale edges, white surfaces, selected darker details. Keep diagram labels brief. Use one illustration to support a whole group of services rather than an icon for every sentence.

Motion: the logo scales and moves into the upper-right corner during the opening scroll. An orthogonal leader draws through the whitespace toward the next island. The reader controls the pace.

Designer takeaway: start here. It is the clearest connection between the reference and North State, with a technical identity that still feels calm and approachable.

## 02 / Assembly

A diagram-led direction with bold mono type, an exploded component drawing, and vertically connected service modules.

| Element | Specification |
|---|---|
| Typeface | Space Mono |
| Weights | Regular 400, bold 700 |
| Palette | Paper #F7FAFC; text #344957; secondary #687E8B; drawing #9BADB7 |
| Target type scale | 64 / 24 / 16 / 12 px |
| Spacing | 128 / 72 / 32 / 24 px |
| Primary drawing strokes | 1–1.5 px |
| Composition | Large exploded drawing in the hero; diagram left and connected modules right below it |

Illustration: three-dimensional relationships without photorealism. Separate plates and components vertically. Retain dashed projection lines, bores, small datums and figure numbers. Keep fills flat and near-white.

Motion: staged connector drawing. For the production design, consider separating layers by 4–8 pixels on hover with a 250–400 ms transition, returning to rest on pointer exit. The current demo illustrates connector motion; the layer-hover behavior is a designer recommendation.

Designer takeaway: choose this when the drawing should be the memorable part of the site. Keep the rest of the composition restrained.

## 03 / Drawing Office

A formal drawing-sheet approach: measured margins, orthographic views, fine borders and a compact contact title block.

| Element | Specification |
|---|---|
| Typeface | JetBrains Mono |
| Weights | Regular 400, medium 500 |
| Palette | Paper #FBFBF6; text #41413C; secondary #74766D; drawing #AFB2A5 |
| Target type scale | 56 / 22 / 16 / 12 px |
| Spacing | 112 / 64 / 32 / 20 px |
| Drawing hierarchy | 1.5 px primary; 1 px secondary; 0.5 px construction |
| Composition | Fine outer sheet border; consistent note margin; contact inside a restrained title block |

Illustration: front, plan and section views, small hatch patterns and projection lines. Use dimension leaders only when they explain the composition; do not invent actual dimensions or technical specifications.

Motion: right-angle leaders and small datums. Keep the drawing stable. Scroll reveals a route through the sheet rather than moving the entire illustration.

Designer takeaway: choose this for the most precise, utilitarian identity. Apply drafting conventions selectively so the page remains welcoming and easy to read.

## Assets

- `assets/modular-finishing-workflow.svg`: conceptual open-frame equipment and hanging-panel diagram, viewBox 0 0 900 620.
- `assets/exploded-surface-assembly.svg`: three separated machined plates with bores, slots, leaders and projection lines, viewBox 0 0 900 620.
- `assets/orthographic-folded-panel.svg`: front, plan and section views of a folded component, viewBox 0 0 900 620.

These are editable, original SVG diagrams. Geometry is grouped into construction, material, detail, ghost and dimension elements. They illustrate the visual language; they do not depict North State's verified equipment or real production drawings. No dimensions, oven capacities, temperatures, turnaround promises or certification claims are implied.

The logo is the concept lockup assembled in the previous exploration from the supplied North State wordmark and a powder-coating descriptor. Original assets remain untouched in the project workspace. Use the approved production powder-coating vector when available.

## Responsive and accessibility rules

- Stack drawing beneath headline on mobile. Preserve the order of the service content.
- Keep regular reading text at a comfortable production size, targeting 16 px. Use 12 px only for secondary labels and larger typography where content needs emphasis. Tiny specimen drawing labels are decorative and not the only source of information.
- Keep essential text contrast high. Pale drawing lines may remain subtle because they are decorative.
- Respect reduced motion: completed connectors, stationary logo, no looping motion sample.
- Keep the logo clear of navigation and content. Disable its floating state before it reaches the designer-notes section.
- Use native links for telephone and email. Do not add a simulated form submission.

## Content source

Business copy is derived from https://northstatepc.com/ and the verified content from the first concept collection: professional powder coating, custom coating for industrial equipment and machinery, protective finishing, local service, and environmentally conscious solutions.

Contact: Jesse@northstatepc.com · (919) 801-2079 · 1305 Graham St, Burlington, NC.

## Files and handoff

`blueprint.html`, `blueprint.css`, and `blueprint.js` contain the working guide. The original ten concepts remain in `index.html`. The site is plain HTML/CSS/JavaScript and needs no build or installation. Extract the ZIP and open `blueprint.html`. Google Fonts need an internet connection; system mono fallbacks are provided.
