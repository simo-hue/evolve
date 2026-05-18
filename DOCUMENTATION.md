# Evolve App Showcase Landing Page - Documentation

## Project Setup & Concept
The objective is to design and develop a premium, highly immersive, and modern website showcasing the "Evolve" iPhone app, using the official App Store screenshots located in `iphone_img/` (`01.png` to `07.png`).

### Key Features
1. **Premium Dark Mode Design**: A visually stunning deep-space theme using CSS gradients, glowing effects, and glassmorphic elements to match high-end iOS application branding.
2. **Scroll-Driven Phone Animations (GSAP & ScrollTrigger)**:
   - A sticky, central iPhone mockup frame.
   - As the user scrolls, the screenshot within the frame transitions dynamically (using smooth cross-fades and vertical slides).
   - Side text blocks fade in/out dynamically to describe the app's features corresponding to each screen.
3. **Interactive 3D-Tilt Screenshot Grid**:
   - An elegant showcase gallery where the user can hover to trigger 3D perspective tilts and glow effects, or click to enlarge.
4. **Interactive Philosophy Section**:
   - Highlights the app motto: "Migliora ogni giorno, diventa chi sei destinato ad essere." with scroll-revealed text highlighting (letter by letter).
5. **SEO & Accessibility**:
   - Optimizations including semantic tags, meta tags, and structured heading hierarchies.

---
## Change Log
- **2026-05-18 14:45**: Created `DOCUMENTATION.md` and drafted design concept.
- **2026-05-18 14:50**: Premium Landing Page Implementation
  - *Details*: Designed and implemented a single-page website for "Evolve" under `/Users/simo/Downloads/DEV/TMP/`. The site showcases 7 App Store screenshots (`01.png` to `07.png`) with dynamic scroll animations using GSAP and ScrollTrigger, alongside elegant glassmorphic layouts, 3D perspective mouse hover effects, a responsive grid system, and interactive FAQs.
  - *Tech Notes*:
    - **Frontend Stack**: Native HTML5, Vanilla CSS3 (custom layouts, flexbox, grid, glassmorphism, keyframe animations, HSL-color states), Vanilla JavaScript ES6+.
    - **External CDNs**: GSAP v3.12.2, ScrollTrigger v3.12.2, FontAwesome v6.4.0, Google Fonts (Outfit, Plus Jakarta Sans).
    - **Animations**: Integrated ScrollTrigger triggers on vertical text blocks to control the active screen inside a sticky high-fidelity iPhone mockup container. Implemented dynamic ambient light backdrop gradients changing colors matching screen content. Word-by-word kinetic text illumination highlights on motto scroll. Mouse move tilt calculation on gallery elements.
    - **Responsive Design**: Integrated a `@media` query system transitioning the layout from a sticky side-by-side showcase on desktops to a sticky overlays layout on smaller mobile screens.
- **2026-05-18 14:55**: Typography & Stretch Issue Bugfix
  - *Details*: Solved horizontal typography distortion report. The `Syne` font family bold weight has a naturally extremely wide, expanded geometry which gives the impression of being stretched/flattened. Replaced `Syne` with `Outfit`, a gorgeous geometric sans-serif that retains a clean, tech-forward, and extremely modern appearance with standard, balanced proportions.
  - *Tech Notes*:
    - Updated Google Fonts import link in `index.html` to load `Outfit`.
    - Swapped CSS variable `--font-heading` in `style.css` from `Syne` to `Outfit`.
- **2026-05-18 15:00**: iPhone Mockup Wrapper Removal (Avoiding "Matryoshka" Effect)
  - *Details*: Resolved device overlay redundancy. The original App Store screenshots (`01.png` - `07.png`) already contain a beautifully designed iPhone mockup frame inside them. Displaying them within another HTML/CSS iPhone device created a duplicate frame ("matryoshka" effect). Removed all CSS iPhone mockup details (earpiece speaker, notch/Dynamic Island, camera dot, button side extensions, thick black bezels).
  - *Tech Notes*:
    - Defined a new `.screenshot-showcase` container class in `style.css` with natural aspect ratio proportions (1:2.05), elegant rounded corners, a subtle 1px border with light-refracting edge highlight, and a premium box-shadow.
    - Updated `index.html` structure to place screenshot images directly within `.screenshot-showcase` divs in the Hero section and Sticky Scroll features container, keeping internal elements like `.iphone-glare` overlays intact.
    - Updated target elements in `script.js` to run the 3D-tilt calculations on `.screenshot-showcase` containers.
    - Swapped `border: 3px solid #1a1a24;` on `.perspective-img` in the download card for an elegant `1px solid var(--border-color)` card border.
- **2026-05-18 15:05**: Interactive Gallery Slider Overhaul
  - *Details*: Redesigned the "Galleria dell'evoluzione" section to resolve layout asymmetry and misalignment. The previous grid system attempted to space 7 vertical screenshots across 4 columns, creating an uneven bottom row (4 cards on top, 3 cards on bottom) and overlapping staggered offsets which clipped bottom cards. Replaced the grid with a luxurious horizontal draggable slider, providing perfect alignment and full viewport overflow.
  - *Tech Notes*:
    - Replaced `gallery-grid` structure in `index.html` with a `gallery-slider-wrapper` containing touch-friendly, drag-to-scroll `.gallery-track` containing all 7 screenshot cards.
    - Added glowing, blur-backed premium glassmorphic navigation arrows (`#gallery-prev` and `#gallery-next`) for step-by-step navigation.
    - Incorporated a sleek, gradient progress bar at the bottom (`#gallery-progress`) that reflects live track scroll percentage.
    - Wrote full mouse drag-to-scroll logic in `script.js` (grab-to-drag, release-to-snap) that automatically filters drag movements from accidental lightbox modal triggers.
    - Integrated tablet and mobile-responsive breakpoints in `style.css` that hide navigation arrows on smaller devices (favoring native multi-touch swipe mechanics) and scale down card flex sizes from 280px to 210px to fit gracefully.
