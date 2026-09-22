# North State — Whiteprint / Graphite paper

A dark interpretation of the Whiteprint direction, for the web designer.

## Visual intent

Treat the page as matte graphite book paper printed in silver-white ink. Keep the open editorial rows and fine isometric illustrations. Pair a book serif with monospaced technical annotations. Fine, stationary grain and very shallow lighting give the material depth; avoid neon, glow, and heavy panels.

## Palette

| Role | Value |
| --- | --- |
| Main paper | `#23262A` |
| Primary text and logo | `#DEDCD3` |
| Secondary text | `#B4B7B4` |
| Main drawing lines | `#8D9498` |
| Drawing details | `#B9BFBE` |
| Fine dividers | `#41464A` |
| Designer notes surface | `#202428` |

Keep meaningful copy at full opacity. Low-contrast dashed construction marks are decorative. Do not invert the light illustrations with a filter; use the included SVG variants so filled component surfaces match the paper and the logo knockouts stay correct.

## Typography and space

- Reading typeface: Cormorant Garamond, 400 for paragraphs and 500 for headings; Georgia fallback.
- Annotation typeface: IBM Plex Mono, 400 and 500; system monospace fallback. Keep navigation, dimensions, labels, and notes in mono.
- Desktop target sizes: 76–80 px uppercase serif hero, 29 px service headings, 21–22 px reading copy, 12 px mono actions and small text.
- Mobile hero: 48 px; lead copy: 21 px; supporting serif copy: 18 px. Decorative drawing labels may be smaller.
- Reading line height: 1.6–1.7; mono notes: 1.9. Avoid compressed tracking in paragraphs.
- Spacing scale: 144 / 80 / 40 / 24 px. Preserve generous empty areas between content islands.

## Composition

Start with the North State logo centered above the page. Place a large silver-white serif headline on the left and an isometric drawing on the right. Below, arrange the three finishing themes as quiet editorial rows, paired with a second drawing. Offset the contact section to create a flowing journey rather than a stack of boxed cards.

On phones, retain copy-first reading order and place the technical drawing beneath it. Keep contact information and comparison controls visible without horizontal scrolling.

## Paper and print

Use `graphite-paper-grain.svg` as a 240 px repeated tile. The live page uses a stationary overlay with `mix-blend-mode: soft-light` and `--paper-grain-strength: .42`. Keep grain fine enough to suggest stock without breaking small letterforms. The overlay ignores pointer input. A very shallow light gradient creates paper depth, and a subtle dark offset gives large letters a printed edge. No animated noise or blurred copy.

## SVG and motion

- Main edges: 1.05 px; component edges: 1.15 px; detail edges: 1.3 px.
- Projection lines: dashed 0.8 px, 48% opacity. Construction lines: 0.7 px, 27% opacity.
- Fill component faces with the paper color. Use brighter edges only where they explain the geometry.
- The logo smoothly moves from top center to the top right as the reader scrolls.
- An orthogonal connector draws between content islands, with an arrowhead following its end.
- Respect reduced-motion preferences: render complete connectors and keep the logo in the corner.
- Do not use neon effects, blinking points, perpetual diagram rotation, or parallax that competes with reading.

## Included vector assets

- `graphite-paper-grain.svg` — small, editable procedural SVG texture.
- `modular-finishing-workflow-dark.svg` — conceptual isometric finishing modules.
- `exploded-surface-assembly-dark.svg` — separated metal layers and alignment projections.
- `northstate-logo-dark.svg` — concept powder-coating lockup in silver-white with graphite knockout.

These illustrations are conceptual, not verified drawings of North State’s actual equipment. The lockup adapts the supplied wordmark for this demo; confirm final brand artwork with the business.

## Working comparison

Open `blueprint.html#whiteprint-dark` for the dark page. Use **Light paper / Dark paper** to compare the two versions. Designer notes are built into the page and can be printed as a light sheet.

Business content is carried over from the original studies, checked against https://northstatepc.com/ on September 22, 2026.
