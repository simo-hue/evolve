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
- **2026-05-18 15:15**: Professional & Cohesive Legal Pages Creation
  - *Details*: Designed and implemented beautiful, professional, and architecturally cohesive legal pages (`privacy.html`, `terms.html`, `cookie.html`) for Evolve. These documents fully reflect the real mobile application architecture (Supabase Auth/DB, PostgreSQL Row Level Security, OpenAI GPT-4o-mini via serverless Edge Functions, Isar/Hive offline-first caches, and Apple/Google sign-in) while maintaining identical dark mode branding, color tokens, typography (`Outfit` & `Plus Jakarta Sans`), and glassmorphism styling.
  - *Tech Notes*:
    - **UI & Layout**: Integrated a dual-column layout on desktop consisting of a sticky Table of Contents sidebar and a massive glassmorphic card housing the legal text, complete with styled sub-headings, lists with custom bullet bullet-points, info boxes, and custom responsive tables.
    - **Responsive Design**: Added media queries in `style.css` collapsing the sidebar to a stacked block on tablets and mobiles while adjusting content card paddings and font scale factors for maximum readability on devices.
    - **Interactive ScrollSpy**: Integrated lightweight, high-performance JS scroll trackers in each legal page that monitor viewport scroll positions and dynamically highlight the corresponding Table of Contents index link as the user reads.
    - **Footer Routing**: Updated the footer in `index.html` to direct the "Legale" navigation items directly to their newly created static files instead of empty `#` anchors.
- **2026-05-18 15:20**: Personal Branding Footer Integration
  - *Details*: Integrated Simone's personal links directly into the footer across all pages of the Evolve showcase (`index.html`, `privacy.html`, `terms.html`, and `cookie.html`), replacing standard placeholder social networks.
  - *Tech Notes*:
    - **Links Updated**: Integrated LinkedIn (`https://www.linkedin.com/in/simonemattioli2003/`), Personal Website (`https://simo-hue.github.io`), and Instagram (`https://www.instagram.com/simo___one/`).
    - **Best Practices**: Added `target="_blank" rel="noopener"` attributes to ensure secure navigation to external tabs.
    - **UI Elements**: Configured a Globe icon (`fa-solid fa-globe`) for the personal web project and updated accessibility aria-labels.
- **2026-05-18 15:25**: Brand Logo Integration
  - *Details*: Replaced the generic placeholder wind icon logo with the newly provided premium brand mark `logo.png` across the header and footer branding elements of all 4 website pages (`index.html`, `privacy.html`, `terms.html`, and `cookie.html`).
  - *Tech Notes*:
    - **CSS Sizing**: Added a `.logo-img` CSS rule in `style.css` establishing a sleek proportional height limit of `36px` to fit seamlessly inside both the sticky navbar container and the brand column of the main footer.
    - **HTML Updates**: Injected `<img src="logo.png" ...>` tags inside all header `.logo` and footer `.logo` links, preserving clean flex alignment and typography.
- **2026-05-18 15:30**: AI Coach Data Processing Policy Correction
  - *Details*: Corrected the Evolve AI Coach data privacy policy in `privacy.html` to accurately disclose standard OpenAI developer API transmission instead of customized enterprise contracts. Added an explicit, transparent product roadmap declaration highlighting future on-device, local LLM execution to eliminate external data transfer.
  - *Tech Notes*:
    - **API Transmission Disclosure**: Clarified that prompt context (recent 30-day notes) is temporarily transmitted to external cloud systems (OpenAI standard APIs) with non-training assurances.
    - **Local LLM Roadmap**: Integrated a bold, highly encouraging vision statement regarding upcoming local model hosting natively on the user's phone, aligning with Evolve's offline-first values.
- **2026-05-18 15:35**: Generalization & Modularization of AI Provider References
  - *Details*: Updated the AI Coach data policy in `privacy.html` to be completely supplier-neutral. Removed all explicit mentions of "OpenAI" and "GPT-4o-mini" and replaced them with general, modular terms.
  - *Tech Notes*:
    - **Supplier-Neutral Disclosures**: Used terms such as "Fornitori terzi di modelli di linguaggio (LLM)" and "Provider Leader di Modelli di Linguaggio". This allows switching the API provider (e.g., to Anthropic, Gemini, or DeepSeek) at any time on the backend without requiring revisions of the legal pages.
    - **Policy Alignment**: Maintained strict developer API non-training criteria and standard GDPR responsibilities under the new generalized partner format.
- **2026-05-18 21:40**: Privacy Policy Legal Compliance Update
  - *Details*: Fully aligned the Privacy Policy in `privacy.html` with GDPR requirements for mobile app environments. Disclosed Simone Mattioli as the Titolare, clarified email-based authentication and user-inserted data (habits, goals, mood), established Esecuzione di Contratto and Consenso as primary legal bases, introduced Sentry as a sub-processor for crash logs, and highlighted direct in-app settings tools for exercising GDPR rights.
  - *Tech Notes*:
    - **Titolare Details**: Specified Simone Mattioli as Titolare with contact email `mattioli.simone.10@gmail.com` for exercising user rights.
    - **Sub-processors**: Detailed Supabase for authentication and database management, and added Sentry as an optional crash reporting sub-processor.
    - **Legal Bases**: Explicitly mapped contractual performance for essential services and consent for optional services (Sentry logs, AI Coach, Life View widget).
    - **User Control**: Highlighted that access, rectification, cancellation, and consent revocation can be exercised autonomously directly from the app's settings.
- **2026-05-19 09:30**: Subscription Naming Alignment (Evolve Pro)
  - *Details*: Performed an audit of the local website files in the marketing and legal pages to ensure strict alignment with Apple's App Review findings and Guideline 3.1.2. Discovered and corrected a critical nomenclature mismatch where the website referred to the premium subscription as **Evolve Plus** while the mobile app calls it **Evolve Pro**.
  - *Tech Notes*:
    - **Naming Correction**: Replaced all occurrences of `Evolve Plus` and `Prezzi / Plus` with `Evolve Pro` and `Prezzi / Pro` across `index.html`, `terms.html`, `privacy.html`, and `cookie.html`.
    - **Script Integration**: Updated `script.js` color mapping logs from `Plus` to `Pro` for architectural cohesion.

- **2026-05-21 11:58**: Evolve Website Modern Redesign
  - *Details*: Completely redesigned the Evolve app website to create a highly premium, modern, and "WOW" user experience. The original structure and text were maintained, but visually elevated.
  - *Tech Notes*:
    - **CSS/HTML Modernization**: Refactored `index.html` and `style.css` to use modern features like Native HTML5 `<dialog>` for the Lightbox modal instead of custom JS overlays.
    - **Bento Box Layout**: Restructured the Features and FAQ sections into sleek Bento Box grids.
    - **Advanced Aesthetics**: Applied deep Glassmorphism (`backdrop-filter`), intense dynamic neon glow backgrounds, high-fidelity shadows, and `@starting-style` for smooth top-layer animations.
    - **Performance**: Removed redundant JS logic and synced native CSS animations with GSAP ScrollTriggers where appropriate.

- **2026-05-21 12:01**: Evolve Website Gallery Auto-scroll
  - *Details*: Added automatic scrolling functionality to the "La galleria dell'evoluzione" section.
  - *Tech Notes*:
    - **Script Update**: Updated `initGallerySlider` in `script.js` to use `setInterval` for advancing the gallery every 3.5 seconds.
    - **UX Enhancements**: Automatically pauses the interval on `mouseenter` or `touchstart` and resumes on `mouseleave`/`touchend` to prevent fighting with user drag inputs.
