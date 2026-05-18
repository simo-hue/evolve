# Evolve iOS App Landing Page - Project Documentation

## Recent Changes

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
