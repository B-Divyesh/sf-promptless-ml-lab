# Seeded ML Drills — visual thesis

## Direction

**Brutalist concrete and moss.** A good drill is a small, repeatable test in a
rough working space: marks on a concrete slab, seed values stamped like field
notes, and moss as the proof that patient practice compounds. The interface is
purposefully structural rather than glossy. It makes the data trace feel more
important than the decoration.

## Tokens

- Background: `#e6e1d5` limestone dust
- Ink: `#182019` near-black green
- Muted ink: `#536052`
- Surface: `#f5f1e8` chalk
- Concrete: `#c8c3b7`
- Moss: `#315c3c` (accent) and `#d8e2c4` (wash)
- Oxide: `#a54b31` (warning / destructive action)
- Sun: `#e8c65d` (active seed marker)
- Focus: `#143e99`

The site is intentionally single-mode. Pale stone preserves the paper-and-lab
notebook feel while the dark ink and moss have high contrast.

## Type and layout

`Georgia` is the specimen voice: a high-contrast, familiar serif for the
exercise names and learning notes. `Arial` / `Helvetica` is the concise lab
label voice for instructions, controls, and numbers. No remote font is loaded.
The rhythm is an 8px grid. Wide screens use an offset two-column workbench;
the mobile layout stacks the run controls before the trace.

Cards are squared slabs with 2px ink edges and hard 5px concrete shadows.
Buttons are stamped rectangles. Fine grid lines and small seed dots create a
field-note texture without obscuring the task.

## Motion

Changing a drill briefly stamps the new run record into place (180ms opacity
and 4px translate). The trace bars grow once when a run finishes. With
`prefers-reduced-motion`, all changes are immediate and trace bars appear at
their final size.

## Art plan and provenance

The hero uses one original generated illustration: an overhead concrete lab
bench with seed tags, a moss-green learning curve made from physical objects,
and no readable text. It is an atmospheric explanation of the product world,
not a fake UI. The production prompt is:

> Use case: stylized-concept. Asset type: static-web hero illustration. Primary request: overhead editorial still life of a rough concrete laboratory workbench used for machine-learning practice; a square paper seed tag, small graphite plots, moss growing along a simple rising line, one dark pencil, tiny calibration weights. Scene/backdrop: pale limestone concrete. Style/medium: tactile editorial photography with restrained collage qualities. Composition/framing: wide landscape with quiet negative space on the left for web copy. Lighting/mood: soft overcast daylight, serious and calm. Color palette: limestone dust, charcoal ink, deep moss green, muted oxide red. Materials/textures: porous concrete, recycled paper, living moss, graphite. Constraints: no people, no screens, no logos, no words, no watermark, no brands.

Generated with the factory image deployment on 2026-08-28. It is original
product artwork. A WebP derivative is shipped below 300 KB; a PNG source and
JSON prompt sidecar remain in `assets/src/`.
