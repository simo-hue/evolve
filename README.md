# 🌌 Evolve — Landing Page Ufficiale

> **Migliora ogni giorno, diventa chi sei destinato ad essere.** Landing page istituzionale e immersiva per **Evolve**, l'applicazione iOS avanzata per il tracciamento di abitudini ed obiettivi personali con integrazione di Intelligenza Artificiale.

[![Disponibile su App Store](https://img.shields.io/badge/App_Store-Scarica_Evolve-000000?style=for-the-badge&logo=apple&logoColor=white)](https://apps.apple.com/app/evolve-habits-goal-tracker/id6770482363)
[![Sito Web](https://img.shields.io/badge/Sito_Web-Online-00ADB5?style=for-the-badge)](https://apps.apple.com/app/evolve-habits-goal-tracker/id6770482363)

---

## 📱 Cos'è Evolve?

**Evolve** trasforma la tua routine quotidiana in un viaggio di crescita consapevole. A differenza dei classici tracker, Evolve combina l'offline-first architecture con un potente **Coach AI** che ti supporta nell'analizzare i tuoi trend, pianificare macro-obiettivi e rimanere focalizzato su ciò che conta davvero.

### Scarica Evolve Ora
Pronto ad iniziare il tuo percorso di evoluzione personale? Scarica subito l'applicazione ufficiale dall'App Store di Apple:

👉 **[Scarica Evolve su App Store](https://apps.apple.com/app/evolve-habits-goal-tracker/id6770482363)** *(Compatibile con iPhone e ottimizzato per iOS)*

---

## 🎨 Il Sito Web: Design & Tecnologia

Questo repository ospita il codice sorgente della **Landing Page ufficiale** di Evolve. Il sito è stato progettato per offrire un'esperienza utente premium, riproducendo l'estetica raffinata e "dark-mode" dell'applicazione iOS nativa.

### ✨ Caratteristiche Principali del Sito:
*   **Aestetica Glassmorphic Premium**: Sfondo profondo e scuro arricchito da sfere neon sfuocate e pannelli in vetro semitrasparente (`backdrop-filter` avanzato) per un look futuristico e pulito.
*   **Bento Box Layout**: Le sezioni principali delle *Funzionalità* e delle *FAQ* sono strutturate utilizzando griglie asimmetriche Bento Box moderne e ad alto impatto visivo.
*   **Showcase iPhone Interattivo**: Uno screen mockup centrale che, tramite la potenza di **GSAP & ScrollTrigger**, si sincronizza con lo scorrimento della pagina per presentare i diversi screenshot reali dell'applicazione con eleganti cross-fade.
*   **Galleria 3D Touch-Friendly**:
    *   Scorrimento orizzontale automatico, continuo e ultra-fluido (buttery-smooth) calcolato a 60fps tramite `requestAnimationFrame`.
    *   Pausa intelligente su hover/touch per consentire il drag manuale.
    *   Effetto di inclinazione 3D dinamico al passaggio del mouse su ciascuna scheda.
*   **Lightbox Nativa**: Modalità ingrandimento degli screenshot implementata tramite le API native HTML5 `<dialog>` e transizioni accelerate hardware con `@starting-style`.
*   **Sezioni Legali Complete & Coerenti**: Pagine di [Privacy Policy](privacy.html), [Terms of Service](terms.html) e [Cookie Policy](cookie.html) ottimizzate per l'App Store, con menu di navigazione dinamico in stile *ScrollSpy* ed estetica coerente al brand.

---

## 📁 Struttura del Progetto

```bash
.
├── README.md               # Questa documentazione
├── DOCUMENTATION.md        # Changelog dettagliato e specifiche tecniche delle modifiche
├── TO_SIMO_DO.md           # Note operative e istruzioni per test locali
├── index.html              # Landing Page principale
├── privacy.html            # Informativa sulla Privacy (conforme GDPR/App Store)
├── terms.html              # Termini e Condizioni di Servizio
├── cookie.html             # Informativa sui Cookie
├── style.css               # Sistema di design CSS, layout Bento e animazioni responsive
├── script.js              # Motore JS (animazioni ScrollTrigger, galleria fluida e Lightbox)
├── logo.png                # Brand Logo ufficiale di Evolve
└── iphone_img/             # Screenshot reali dell'App iOS
    ├── 01.png
    ├── ...
    └── 07.png
```

---

## 🛠️ Sviluppo e Preview Locale

Il sito è realizzato interamente in **Vanilla HTML5, CSS3 e JavaScript**, garantendo tempi di caricamento istantanei e performance SEO ottimali senza bisogno di build step complessi o dipendenze npm.

### Avviare un Server Locale
Per testare le transizioni GSAP e verificare il funzionamento corretto delle chiamate agli asset, si consiglia di servire il sito tramite un server HTTP locale.

#### Usando Python (Consigliato ed Immediato):
Apri il terminale nella cartella del progetto e lancia:
```bash
python3 -m http.server 8099
```
Quindi apri il browser all'indirizzo:
👉 **[http://localhost:8099](http://localhost:8099)**

#### Usando Node.js (se installato):
```bash
npx serve -l 8099
```

---

## 🛡️ Note Legali & GDPR
Il sito include documentazione legale dettagliata e trasparente, conforme alle linee guida di revisione di Apple (Guideline 3.1.2) ed al GDPR:
- **Titolare del Trattamento**: Simone Mattioli (`mattioli.simone.10@gmail.com`)
- **GDPR Ready**: Trasparenza assoluta sulla trasmissione dell'AI Coach (senza addestramento dei modelli), sull'architettura Supabase offline-first e sugli strumenti di controllo diretto dei propri dati all'interno dell'app.
