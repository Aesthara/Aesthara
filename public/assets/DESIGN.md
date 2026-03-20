# Design System Strategy: The Artisanal Avant-Garde

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

Unlike standard e-learning platforms or recipe blogs that rely on rigid, repetitive grids, this system treats the browser as a high-end fashion editorial. We are not just displaying information; we are curating an experience of visionary baking. The layout must feel "sculpted." By utilizing intentional asymmetry, overlapping elements, and extreme typographic contrast, we break the "template" look. This is a system where whitespace is not "empty"—it is a premium luxury, providing the "breathing room" required for artisanal mastery to shine.

---

## 2. Color Palette & Atmospheric Depth
Our palette is a sophisticated wash of creams, blushes, and warm earths, designed to evoke the tactile nature of flour, parchment, and raw ingredients.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. 
Boundaries must be defined solely through background color shifts. For instance, a section utilizing `surface-container-low` (#f4f4f0) should sit directly against a `background` (#faf9f6) hero. This creates a seamless, high-end "dipped" effect rather than a boxed-in feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine linen paper.
- **Base:** `surface` (#faf9f6)
- **Primary Content Blocks:** `surface-container-low` (#f4f4f0)
- **Interactive Layers/Cards:** `surface-container-lowest` (#ffffff)
- **Deep Accents:** `primary` (#77574c) for high-impact callouts.

### The Glass & Gradient Rule
To achieve an "Avant-garde" feel, use **Glassmorphism** for floating navigation or overlaying lesson cards. 
- Use a semi-transparent `surface` color (e.g., `#faf9f6cc`) with a `backdrop-blur` of 20px.
- **Signature Texture:** Apply a subtle linear gradient from `primary` (#77574c) to `primary-container` (#ffdbcf) at a 45-degree angle for hero CTAs. This adds a "glow" that flat colors cannot replicate.

---

## 3. Typography: The Editorial Voice
The typography is the backbone of the brand's visionary personality. It is a dialogue between the classic (The Serif) and the modern (The Sans).

- **Display & Headlines (Newsreader):** This high-contrast serif is our "Artisan." Use `display-lg` (3.5rem) for hero statements. Tighten the letter-spacing by -2% to give it a bespoke, printed-look feel. Headlines should often be placed asymmetrically, overlapping image containers to create depth.
- **Body & Labels (Manrope):** Our "Airy Sans." Manrope provides a functional, clean contrast. Use `body-lg` (1rem) for descriptions with a generous `line-height` of 1.6 to ensure the text feels as light as a meringue.
- **The Hierarchy Strategy:** Large display text conveys the "Vision," while small, uppercase `label-md` (0.75rem) with tracked-out spacing (0.1rem) conveys the "Precision" of the academy.

---

## 4. Elevation & Depth: Tonal Layering
We move away from traditional structural lines to convey hierarchy through light and shadow.

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card placed on a `surface-container` (#edeeea) background creates a soft, natural lift.
- **Ambient Shadows:** When a floating element is required (e.g., a modal or a floating action), use an extra-diffused shadow:
  - `box-shadow: 0 20px 40px rgba(119, 87, 76, 0.06);` 
  - *Note:* The shadow color is a tinted version of our `on-surface` to mimic natural, warm ambient light.
- **The Ghost Border Fallback:** If a border is required for accessibility, use `outline-variant` (#afb3ae) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components & Micro-Interactions

### Buttons
- **Primary:** No hard corners. Use `roundedness-md` (0.375rem). Background: `primary` (#77574c). Text: `on-primary` (#fff6f3).
- **Secondary:** Transparent background with a `Ghost Border` (15% opacity `outline-variant`).
- **Interaction:** On hover, primary buttons should shift subtly to `primary-dim` (#6a4b40) with a slight upward "lift" (2px translation).

### Cards & Asymmetric Containers
- **Forbid Dividers:** Do not use lines to separate content. Use `spacing-12` (4rem) to create clear vertical distinction.
- **Overlapping Elements:** Images should use `roundedness-lg` (0.5rem) and be positioned offset from their background containers using the spacing scale (e.g., `top: -2.75rem`).

### Input Fields
- **Styling:** Minimalist. Use `surface-container-high` (#e6e9e4) as the fill. 
- **States:** On focus, the background should transition to `surface-container-lowest` (#ffffff) with a subtle `primary` (#77574c) underline of 2px.

### Additional Signature Components
- **The "Ingredients" Chip:** Use `secondary-container` (#f4dfcb) with `on-secondary-container` (#5e4f40) text for tags.
- **The "Curated" List:** High-end lists for course modules should use `title-lg` for titles and `body-sm` for durations, separated by a `spacing-10` gap instead of a line.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Whitespace:** If a section feels "busy," increase the padding using `spacing-20` (7rem).
- **Asymmetric Balance:** Place a large image on the left and a small, vertically-centered text block on the right, offset from the horizontal axis.
- **Textural Overlays:** Place `display-sm` text so it partially overlaps an image edge to create a 3D "layered paper" effect.

### Don’t:
- **Don’t use black:** Avoid `#000000`. Use `on-surface` (#2f3430) for all "black" text to maintain the warm, organic feel.
- **Don’t use standard grids:** Avoid 12-column bootstrap-style layouts. Use 3 or 5 column grids with varying gutter widths to force an editorial feel.
- **No hard shadows:** Avoid high-contrast, tight shadows. They look "techy" and "cheap" in an artisanal context.
- **No default icons:** If using icons, they must be ultra-thin (0.5px or 1px stroke weight) to match the refinement of the typography.

---

*This design system is a living document intended to evolve. When in doubt, prioritize the "visionary" over the "functional"—beauty is a functional requirement of luxury.*