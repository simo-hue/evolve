# Manual Actions Required

## 🚀 1. Preview the Landing Page Locally
The landing page has been built as a static site for maximum speed, instant loads, and zero dependency issues. To open and preview it locally:

*   **Option A**: Simply double-click the `index.html` file inside this folder to open it directly in any browser (Safari, Chrome, Firefox).
*   **Option B (Recommended for Live Reloader)**: Use a lightweight local server. Run this in your terminal inside `/Users/simo/Downloads/DEV/evolve`:
    ```bash
    npx serve .
    ```
    Then, open the local link (e.g., `http://localhost:3000`) in your browser to interact with the clocks, habit checkboxes, mood buttons, and Memento Mori grid generator!

## 🍏 2. Register your URL in App Store Connect
When submitting **Evolve - Daily Habits & Goals** for review, enter this website URL under the following metadata sections:
*   **Marketing URL**: This is the primary showcase page (`index.html` or your domain).
*   **Support URL**: A direct link to contact you (e.g., the footer Support section or `mailto:support@evolve.app`).

## ☁️ 3. Deploy and Host the Site on GitHub Pages
Ho già provveduto a **creare il commit iniziale** con tutti i file della landing page sul tuo repository locale. Per pubblicarla su GitHub Pages, ti basta seguire questi passaggi:

1.  **Invia il codice a GitHub**:
    Apri il terminale ed esegui il push del commit (visto che il tuo remote `origin` è già configurato su `simo-hue/evolve`):
    ```bash
    # Se sei nella cartella /Users/simo/Downloads/DEV/evolve:
    git push -u origin main
    ```
2.  **Attiva GitHub Pages**:
    *   Vai su GitHub alla pagina del tuo repository: `https://github.com/simo-hue/evolve`
    *   Clicca sulla scheda **Settings** (Impostazioni) in alto.
    *   Nella barra laterale sinistra, clicca su **Pages**.
    *   Sotto la sezione **Build and deployment** -> **Branch**:
        *   Seleziona `main` dal menu a discesa.
        *   Mantieni la cartella impostata su `/ (root)`.
        *   Clicca su **Save** (Salva).
    *   GitHub avvierà un flusso automatico di compilazione (GitHub Actions) e il tuo sito sarà online in meno di 2 minuti all'indirizzo:
        `https://simo-hue.github.io/evolve/`
3.  **Nota sui percorsi relativi**:
    Il codice della landing page è stato interamente sviluppato utilizzando *percorsi relativi* (es. `styles.css` e `app.js` invece di `/styles.css` o `/app.js`). Questo garantisce che tutto funzioni al 100% sia sull'URL standard di GitHub Pages (`https://simo-hue.github.io/evolve/`) sia nel caso in cui decidessi di associare un dominio personalizzato (es. `https://evolve.app`), senza mai rischiare link o fogli di stile rotti!

