/* ==========================================================================
   Evolve App Showcase JavaScript Logic
   Animations: GSAP + ScrollTrigger, 3D Hover Tilt, Smooth Accordions, Lightbox
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Registra ScrollTrigger con GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Inizializza tutte le funzionalità
    initNavbar();
    initMobileMenu();
    initFeatureScroll();
    init3DTilt();
    initLightbox();
    initPhilosophyAnimation();
    initFaqAccordion();
});

/* ==========================================================================
   1. NAVBAR & HERO INTERACTION
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMenu = () => {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        document.body.classList.toggle("no-scroll");
    };

    menuToggle.addEventListener("click", toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   2. SCROLL SHOWCASE (THE CORE FEATURE)
   ========================================================================== */
function initFeatureScroll() {
    const screens = document.querySelectorAll(".scroll-screen-img");
    const dots = document.querySelectorAll(".progress-dot");
    const glowBg = document.getElementById("dynamic-glow-bg");
    
    // Mappa dei colori per l'effetto glow dinamico associato ad ogni schermata
    const glowColors = {
        1: "#8B5CF6", // Violet (Dashboard)
        2: "#EC4899", // Pink (Habit Tracker)
        3: "#06B6D4", // Cyan (Routine)
        4: "#3B82F6", // Blue (Tasks)
        5: "#D946EF", // Deep Magenta (AI Coach)
        6: "#10B981", // Emerald (Analytics)
        7: "#FBBF24"  // Gold (Plus / Custom)
    };

    // Funzione per aggiornare la schermata attiva, il pallino e lo sfondo glow
    function updateActiveScreen(index) {
        // Aggiorna Schermata Telefono
        screens.forEach(screen => {
            const screenIndex = parseInt(screen.getAttribute("data-index"));
            if (screenIndex === index) {
                screen.classList.add("active");
            } else {
                screen.classList.remove("active");
            }
        });

        // Aggiorna Pallini di Progresso
        dots.forEach(dot => {
            const dotIndex = parseInt(dot.getAttribute("data-index"));
            if (dotIndex === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Aggiorna il Glow Ambientale Dinamico
        if (glowBg && glowColors[index]) {
            glowBg.style.backgroundColor = glowColors[index];
            glowBg.style.transform = `scale(${1 + (index * 0.05)})`;
        }
    }

    // ScrollTrigger per ciascun blocco di testo
    const textBlocks = gsap.utils.toArray(".feature-text-block");
    
    textBlocks.forEach((block, idx) => {
        const blockIndex = idx + 1;

        ScrollTrigger.create({
            trigger: block,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => updateActiveScreen(blockIndex),
            onEnterBack: () => updateActiveScreen(blockIndex),
            onLeave: () => {
                // Se superiamo l'ultimo blocco in discesa, mantieni l'ultimo attivo
                if (blockIndex === textBlocks.length) updateActiveScreen(blockIndex);
            },
            onLeaveBack: () => {
                // Se torniamo sopra il primo blocco in salita, mantieni il primo attivo
                if (blockIndex === 1) updateActiveScreen(1);
            },
            toggleClass: { targets: block, className: "active" },
            // markers: false // Attivare per debugging se necessario
        });
    });

    // Interattività sui pallini di progresso laterali
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetIndex = parseInt(dot.getAttribute("data-index"));
            const targetBlock = document.getElementById(`feature-${targetIndex}`);
            
            if (targetBlock) {
                // Scroll fluido fino al blocco corrispondente
                targetBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
}

/* ==========================================================================
   3. INTERACTIVE 3D PERSPECTIVE TILT
   ========================================================================== */
function init3DTilt() {
    // 3D Tilt su Hero Phone
    const heroPhone = document.getElementById("hero-phone-tilt");
    if (heroPhone) {
        setupTiltEffect(heroPhone, heroPhone.querySelector(".screenshot-showcase"), null);
    }

    // 3D Tilt su Gallery Cards
    const galleryCards = document.querySelectorAll(".gallery-card");
    galleryCards.forEach(card => {
        const inner = card.querySelector(".gallery-card-inner");
        const glow = card.querySelector(".gallery-card-glow");
        setupTiltEffect(card, inner, glow);
    });
}

function setupTiltEffect(container, targetElement, glowElement) {
    container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // coordinata x all'interno dell'elemento
        const y = e.clientY - rect.top;  // coordinata y all'interno dell'elemento
        
        const width = rect.width;
        const height = rect.height;
        
        const xc = width / 2;
        const yc = height / 2;
        
        // Calcola l'angolo di rotazione (max 12 gradi per non deformare troppo)
        const maxTilt = 12;
        const angleX = -((y - yc) / yc) * maxTilt;
        const angleY = ((x - xc) / xc) * maxTilt;
        
        // Applica le trasformazioni 3D
        targetElement.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        targetElement.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
        
        // Effetto Glow basato sulla posizione del mouse
        if (glowElement) {
            glowElement.style.opacity = "1";
            glowElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
        }
    });

    container.addEventListener("mouseleave", () => {
        // Ripristina lo stato originale con una transizione fluida
        targetElement.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        targetElement.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        
        if (glowElement) {
            glowElement.style.opacity = "0";
            glowElement.style.transition = "opacity 0.6s ease";
        }
    });
}

/* ==========================================================================
   4. LIGHTBOX / SCREENSHOT ZOOM GALLERY
   ========================================================================== */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const galleryCards = document.querySelectorAll(".gallery-card");
    
    let currentIndex = 0;
    const imagesData = [];

    // Mappa le descrizioni degli screenshots
    const screenshotCaptions = {
        1: "Dashboard Principale: Il tuo baricentro quotidiano.",
        2: "Habit Tracker: Visualizzazione intuitiva della costanza.",
        3: "Routine Blocchi: Struttura la tua giornata ideale.",
        4: "Task Focus: Gestione priorità e sessioni a tempo.",
        5: "Evolve AI Coach: Consigli personalizzati e supporto 24/7.",
        6: "Analytics Growth: Report dettagliati sul tuo sviluppo.",
        7: "Customization themes: Esprimi la tua identità con temi eleganti."
    };

    // Popola l'array dei dati delle immagini
    galleryCards.forEach((card, index) => {
        const img = card.querySelector("img");
        const imgIndex = parseInt(card.getAttribute("data-index"));
        imagesData.push({
            src: img.src,
            caption: screenshotCaptions[imgIndex] || "Evolve Screenshot",
            index: imgIndex
        });

        // Event listener per click sulla card
        card.addEventListener("click", () => {
            currentIndex = index;
            openLightbox(imagesData[currentIndex]);
        });
    });

    function openLightbox(data) {
        lightboxImg.src = data.src;
        lightboxCaption.textContent = data.caption;
        lightbox.classList.add("open");
        document.body.classList.add("no-scroll");
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");
    }

    function navigateLightbox(direction) {
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % imagesData.length;
        } else {
            currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        }
        
        // Animazione di crossfade durante la navigazione
        gsap.fromTo(lightboxImg, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 });
        lightboxImg.src = imagesData[currentIndex].src;
        lightboxCaption.textContent = imagesData[currentIndex].caption;
    }

    // Eventi Click
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", () => navigateLightbox("next"));
    prevBtn.addEventListener("click", () => navigateLightbox("prev"));
    
    // Chiudi cliccando sullo sfondo
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navigazione Tastiera
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
    });
}

/* ==========================================================================
   5. KINETIC MOTTO TEXT ANIMATION
   ========================================================================== */
function initPhilosophyAnimation() {
    const philosophyWords = gsap.utils.toArray(".philosophy-text .word");
    
    if (philosophyWords.length === 0) return;

    // Crea un'animazione ScrollTrigger per illuminare le parole una dopo l'altra
    gsap.fromTo(philosophyWords, 
        { 
            color: "rgba(255, 255, 255, 0.15)",
            textShadow: "none"
        },
        { 
            color: (i, target) => {
                return target.classList.contains('text-accent') ? 'var(--accent)' : '#ffffff';
            },
            textShadow: (i, target) => {
                const glowColor = target.classList.contains('text-accent') ? 'var(--accent-glow)' : 'var(--primary-glow)';
                const colorValue = target.classList.contains('text-accent') ? 'var(--accent)' : 'var(--primary)';
                return `0 0 15px ${glowColor}, 0 0 30px ${glowColor}`;
            },
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".philosophy-section",
                start: "top 75%",
                end: "bottom 35%",
                scrub: true,
                // markers: false
            }
        }
    );
}

/* ==========================================================================
   6. FAQ ACCORDION INTERACTION
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Chiudi tutte le altre risposte
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("open")) {
                    otherItem.classList.remove("open");
                    otherItem.querySelector(".faq-answer").style.maxHeight = "0px";
                }
            });

            // Apri o chiudi quella corrente
            if (isOpen) {
                item.classList.remove("open");
                answer.style.maxHeight = "0px";
            } else {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}
