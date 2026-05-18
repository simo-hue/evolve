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

## ☁️ 3. Deploy and Host the Site
To host this landing page online for free, you can use:
*   **GitHub Pages**:
    1. Initialize a remote repository for `/Users/simo/Downloads/DEV/evolve` (the folder already contains `.git`).
    2. Commit and push the code:
       ```bash
       git add .
       git commit -m "feat: initial landing page implementation"
       git remote add origin YOUR_REMOTE_URL
       git push -u origin main
       ```
    3. Go to repository Settings -> Pages -> Source and select `main` branch.
*   **Vercel / Netlify**: Simply drag and drop the `/Users/simo/Downloads/DEV/evolve` folder onto their web dashboard to deploy in 5 seconds.
