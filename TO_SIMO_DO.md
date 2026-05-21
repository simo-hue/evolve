# Manual Actions & Setup Tasks for Simo

Here are the manual actions to preview, test, and deploy the Evolve landing page:

## 1. Preview the Landing Page locally
A local background HTTP server has been started automatically to serve the site.
- **Action**: Open your browser and navigate to:
  [http://localhost:8099](http://localhost:8099)
- **What to test**:
  - Scroll down the page and observe the central iPhone mockup screen transitions and matching neon background glowing color shifts.
  - Hover your cursor over the screenshots in the **La galleria dell'evoluzione** grid to observe the dynamic 3D tilt and mouse-following reflection highlights.
  - Click any screenshot in the grid to test the high-fidelity Zoom Lightbox modal.
  - Expand the items in the **Domande Frequenti** (FAQ) section to verify smooth height transitions.

## 2. Managing the Local Server (Optional)
If you ever need to stop or restart the server:
- The server was started with: `python3 -m http.server 8099`
- If you need to stop it, you can terminate it from your active terminals or find it via terminal: `kill $(lsof -t -i:8099)`

## 3. Review Modern Redesign
- Apri la pagina web nel browser locale (es. `http://localhost:8099`) per testare il nuovo design stile "Bento Box" con glassmorphism intenso e micro-animazioni.
- Prova la Lightbox (cliccando sugli screenshot) ora basata sulla Native API `<dialog>` e con animazioni `@starting-style`.
- Tutte le informazioni originarie sono state mantenute come richiesto.
