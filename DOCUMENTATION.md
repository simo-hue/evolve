# Evolve iOS App Landing Page - Project Documentation

## Recent Changes

- [2026-05-18 14:28]: **Sticky 3D Scroll Coverflow Presentation Carousel**
  - *Details*: Replaced the static vertical-tab-based showcase with a jaw-dropping, scroll-driven Coverflow timeline. Screenshots glide dynamically from right to left, scaling up in focus, tilting in 3D, and shifting depth, with descriptive cards fading in/out automatically.
  - *Tech Notes*:
    - **Sticky Viewport Locking**: Set up a `380vh` scroll block container with `position: sticky` and `height: 100vh` to lock the viewport during the sweep animation.
    - **Responsive 3D Coverflow Algorithm**: Coded an algorithm in `app.js` that tracks normalized vertical progress ($0$ to $1$) and translates the `.coverflow-track` horizontally, while applying 3D transformations (`scale`, `rotateY`, `translateZ`, `opacity`) to individual slides relative to their distance from the viewport's center focus.
    - **Adaptive Layout Specs**: Configured responsive CSS media blocks for tablets and mobile devices ($200px$ width and scaled tilt angles) for flawless performance on all form factors.

- [2026-05-18 14:26]: **Hotfix: Resolved Accent Variable Typos & Restored Memento Grid Visibility**
  - *Details*: Fixed a stylesheet bug where an undefined CSS variable `var(--accent-color)` caused interactive features, hotspot pins, and weeks dots to render as completely black/invisible.
  - *Tech Notes*:
    - **Variable Synchronization**: Mapped all typo occurrences of `var(--accent-color)` to the correct flagship custom theme color `var(--accent-indigo)` inside `styles.css` and `app.js`.
    - **Memento Grid Contrast Rebalancing**: Configured `.dot-cell.future` to use the correct highly-visible slate border color `var(--border-color)` instead of the extremely dark translucent gray, restoring the beautiful 4,160 weeks grid representation.

- [2026-05-18 14:23]: **AAA Premium Interactivity Rewrite (Maximum UX & Jaw-Dropping Aesthetics)**
  - *Details*: Upgraded the entire landing page with high-end, immersive, and sensory interactive features that deliver an Apple-level product showcase experience.
  - *Tech Notes*:
    - **Ambient Cursor Light Focus**: Implemented a global mouse tracker (`--mouse-x`, `--mouse-y`) that drives an elegant indigo/green gradient orb behind elements, following the mouse organically.
    - **3D Tilt & Specular Shine**: Programmed dynamic coordinate tracking on all iPhone 17 Pro Max mockups. Hovering over a device triggers realistic **3D parallax tilting** and sweeps a **specular shine glass reflection** based on the cursor position.
    - **Glowing Interactive Hotspots**: Integrated glowing hotspot pins (`+` buttons with ripple-ring wave animations) overlaying the real screenshots. Hovering reveals glassmorphic iOS-style tooltips explaining key app features.
    - **Delegated Weeks Grid Tooltips**: Refactored the 4,160 weeks calculator grid with optimized **event delegation**. A single floating card dynamically maps current coordinates, displaying weekly count, age, and state (Lived/Current/Future) at 60fps.
    - **Interactive Analytics Chart**: Transformed the static SVG chart into a live dashboard. Moving the cursor sweeps a vertical guide line and highlights daily correlation metrics (Wellness Score & Productivity gains) on a floating stat card.

- [2026-05-18 14:17]: **App Store Professional Screenshots Integration**
  - *Details*: Swapped the custom-styled mock screens inside the iPhone mockups with your professional App Store screenshots located in the `iphone_img` directory.
  - *Tech Notes*:
    - **index.html**:
      - Replaced the mockup HTML inside the **Hero iPhone** with `iphone_img/01.png` (Dashboard) for instant authenticity.
      - Expanded the **Interactive Showcase** to **7 tabs** (Dashboard, Storico & Calendario, Macro Obiettivi, Statistiche Avanzate, Mood & Benessere, Life View, and Evolve Pro & Privacy) mapping exactly to your 7 screenshots (`01.png` to `07.png`).
      - Loaded the gorgeous premium settings overview (`iphone_img/07.png`) inside the bottom diagonal 3D angled iPhone.
      - Maintained interactive clock syncing on top of the screenshots for a high-fidelity live hardware feel.
    - **styles.css**:
      - Configured `.app-viewport` and `.iphone-screen-content` to render at `100%` height and `0` padding, allowing native edge-to-edge screenshot fits.
      - Added the `.app-screenshot` class to handle `object-fit: cover` rendering with smooth corners.

- [2026-05-18 14:14]: **iPhone 17 Pro Max Next-Gen Upgrade**
  - *Details*: Redesigned the pure CSS virtual device mockup to represent the future/latest flagship **iPhone 17 Pro Max** with high-fidelity visuals.
  - *Tech Notes*:
    - **index.html**: Updated copy and text structures to explicitly reference the flagship iPhone 17 Pro Max virtual hardware.
    - **styles.css**:
      - Upgraded bezel physics by implementing ultra-thin screen borders (`border: 1.5px solid #000`) representing Apple's next-generation screen-to-body ratios.
      - Styled the casing shell with a premium specular gradient to simulate highly polished liquid-titanium metal casing.
      - Reconfigured the Dynamic Island into a next-generation **Micro-Island** punch-hole under-display camera (38px width, 14px height) that dynamically grows and responds to hover triggers (scaling up to 85px status pill on phone hover).
      - Scaled up overall dimensions to represent the wider, taller 6.9" Pro Max flagship posture.

- [2026-05-18 14:15]: **Initial Landing Page Architecture & Core Implementation**
  - *Details*: Designed and implemented a high-performance, premium landing page for the native iOS application **Evolve**. Created an interactive, fully responsive experience in Italian, showcasing Evolve's core philosophical and analytical pillars.
  - *Tech Notes*:
    - **index.html**: Established semantic HTML5 structure with optimized Open Graph (OG) and Twitter meta cards, Google Fonts integration (`Inter` for body, `Outfit` for headings), structured features grids, a pricing tier breakdown, interactive FAQs, and high-fidelity embedded inline SVGs.
    - **styles.css**: Coded a master design system matching Evolve's iOS dark palette (`0xFF050608` background, `#090A0F` card containers, `#272730` borders, `#26C252` habit completion green). Developed a pixel-perfect, pure-CSS **iPhone 15 Pro hardware mockup** complete with volume buttons, a dynamic bezel, a status bar (with SVG battery and Wi-Fi icons), and a Dynamic Island capsule. Added sleek glassmorphism panels, CSS-based radar axes, and keyframe-based pulsers.
    - **app.js**: Designed a clean, vanilla JavaScript interaction engine:
      - *System Time Sync*: Updates the virtual clocks inside the iPhone mockups in real-time.
      - *Interactive Habit Checkoff*: Built an active toggle simulator on the home-screen mockup where clicking the "Allenamento" habit checkbox completes the item, runs a smooth progress wheel transition from 80% to 100%, and pops the streak badge from 14 to 15 with scale-up haptics.
      - *Showcase Transitioner*: Manages the active state of feature tabs and coordinates CSS transform slide/fade page transitions within the showcase iPhone.
      - *Mood Analyzer*: Tracks clicks on custom emoji buttons and feeds back customized, stoic-inspired health and focus advice.
      - *Memento Mori Grid Engine*: Created a dynamic grid calculator where users input their birthday to instantly map out 4,160 dots representing their weeks of life (shading lived weeks, pulsing the current week, and fading future weeks).
      - *FAQ Accordions & Scroll-reveal transitions*: Implemented responsive touch interactions and scroll visibility fades via the `IntersectionObserver` API.

## Current Status
- **Next Step**: Host the folder at your domain or link it as the primary App Store marketing website!
