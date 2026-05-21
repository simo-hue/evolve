/* ==========================================================================
   Evolve App Showcase JavaScript Logic - MODERNIZED
   Animations: GSAP + ScrollTrigger, 3D Hover Tilt, Smooth Accordions, Native Dialog
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Registra ScrollTrigger con GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initFeatureScroll();
        initPhilosophyAnimation();
    }

    initNavbar();
    initMobileMenu();
    init3DTilt();
    initGallerySlider();
    initLightbox();
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
        document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
    }

    if(menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("open")) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   2. SCROLL SHOWCASE (GSAP ScrollTrigger)
   ========================================================================== */
function initFeatureScroll() {
    const screens = document.querySelectorAll(".scroll-screen-img");
    const dots = document.querySelectorAll(".progress-dot");
    const glowBg = document.getElementById("dynamic-glow-bg");
    
    const glowColors = {
        1: "#8B5CF6", // Violet
        2: "#EC4899", // Pink
        3: "#06B6D4", // Cyan
        4: "#3B82F6", // Blue
        5: "#D946EF", // Deep Magenta
        6: "#10B981", // Emerald
        7: "#FBBF24"  // Gold
    };

    function updateActiveScreen(index) {
        screens.forEach(screen => {
            if (parseInt(screen.getAttribute("data-index")) === index) {
                screen.classList.add("active");
            } else {
                screen.classList.remove("active");
            }
        });

        dots.forEach(dot => {
            if (parseInt(dot.getAttribute("data-index")) === index) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        if (glowBg && glowColors[index]) {
            glowBg.style.backgroundColor = glowColors[index];
            glowBg.style.transform = `scale(${1 + (index * 0.05)})`;
        }
    }

    const textBlocks = gsap.utils.toArray(".feature-text-block");
    
    textBlocks.forEach((block, idx) => {
        const blockIndex = idx + 1;

        ScrollTrigger.create({
            trigger: block,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => updateActiveScreen(blockIndex),
            onEnterBack: () => updateActiveScreen(blockIndex),
            onLeave: () => {
                if (blockIndex === textBlocks.length) updateActiveScreen(blockIndex);
            },
            onLeaveBack: () => {
                if (blockIndex === 1) updateActiveScreen(1);
            },
            toggleClass: { targets: block, className: "active" }
        });
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const targetIndex = parseInt(dot.getAttribute("data-index"));
            const targetBlock = document.getElementById(`feature-${targetIndex}`);
            if (targetBlock) {
                targetBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
}

/* ==========================================================================
   3. INTERACTIVE 3D PERSPECTIVE TILT
   ========================================================================== */
function init3DTilt() {
    // Disabilita se prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiltElements = document.querySelectorAll(".gallery-card, .screenshot-showcase");
    
    tiltElements.forEach(container => {
        const targetElement = container.classList.contains("gallery-card") 
            ? container.querySelector(".gallery-card-inner")
            : container;
            
        const glowElement = container.querySelector(".gallery-card-glow");

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const maxTilt = 8; // Ridotto per eleganza
            const angleX = -((y - yc) / yc) * maxTilt;
            const angleY = ((x - xc) / xc) * maxTilt;
            
            targetElement.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
            targetElement.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
            
            if (glowElement) {
                glowElement.style.opacity = "1";
                glowElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`;
            }
        });

        container.addEventListener("mouseleave", () => {
            targetElement.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
            targetElement.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
            if (glowElement) glowElement.style.opacity = "0";
        });
    });
}

/* ==========================================================================
   4. GALLERY SLIDER (DRAGGABLE + NAVIGATION + PROGRESS)
   ========================================================================== */
function initGallerySlider() {
    const track = document.getElementById("gallery-track");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");
    const progressBar = document.getElementById("gallery-progress");
    const wrapper = document.querySelector(".gallery-slider-wrapper");
    
    if (!track) return;

    const getScrollAmount = () => {
        const firstCard = track.querySelector(".gallery-card");
        return firstCard ? firstCard.offsetWidth + 30 : 330; 
    };

    const scrollNext = () => track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    const scrollPrev = () => track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });

    if (prevBtn) prevBtn.addEventListener("click", scrollPrev);
    if (nextBtn) nextBtn.addEventListener("click", scrollNext);

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollTimer;

    // Funzione per l'auto-scroll automatico
    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollTimer = setInterval(() => {
            if (!isDown) {
                // Se siamo alla fine, torna all'inizio, altrimenti scorri avanti
                if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
                    track.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollNext();
                }
            }
        }, 3500); // Scorre automaticamente ogni 3.5 secondi
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
    };

    // Pausa l'auto-scroll se l'utente interagisce con la galleria
    if (wrapper) {
        wrapper.addEventListener("mouseenter", stopAutoScroll);
        wrapper.addEventListener("mouseleave", startAutoScroll);
        wrapper.addEventListener("touchstart", stopAutoScroll, {passive: true});
        wrapper.addEventListener("touchend", startAutoScroll);
    }

    // Inizializza l'auto-scroll all'avvio
    startAutoScroll();

    track.addEventListener("mousedown", (e) => {
        isDown = true;
        track.classList.add("dragging");
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        stopAutoScroll();
    });

    track.addEventListener("mouseleave", () => { 
        if(isDown) { isDown = false; track.classList.remove("dragging"); } 
    });
    
    track.addEventListener("mouseup", () => { 
        isDown = false; track.classList.remove("dragging"); 
    });

    track.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; 
        track.scrollLeft = scrollLeft - walk;
    });

    const updateProgressBar = () => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) { progressBar.style.width = "0%"; return; }
        const percentage = (track.scrollLeft / maxScroll) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    };

    track.addEventListener("scroll", updateProgressBar);
    window.addEventListener("resize", updateProgressBar);
    setTimeout(updateProgressBar, 100);
}

/* ==========================================================================
   5. LIGHTBOX / NATIVE HTML5 DIALOG
   ========================================================================== */
function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    if(!lightbox || typeof lightbox.showModal !== 'function') return; // Fallback se dialog non supportato nativamente
    
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const galleryCards = document.querySelectorAll(".gallery-card");
    
    let currentIndex = 0;
    const imagesData = [];

    const screenshotCaptions = {
        1: "Dashboard Principale: Il tuo baricentro quotidiano.",
        2: "Habit Tracker: Visualizzazione intuitiva della costanza.",
        3: "Routine Blocchi: Struttura la tua giornata ideale.",
        4: "Task Focus: Gestione priorità e sessioni a tempo.",
        5: "Evolve AI Coach: Consigli personalizzati e supporto 24/7.",
        6: "Analytics Growth: Report dettagliati sul tuo sviluppo.",
        7: "Customization themes: Esprimi la tua identità con temi eleganti."
    };

    galleryCards.forEach((card, index) => {
        const img = card.querySelector("img");
        const imgIndex = parseInt(card.getAttribute("data-index"));
        imagesData.push({
            src: img.src,
            caption: screenshotCaptions[imgIndex] || "Evolve Screenshot",
            index: imgIndex
        });

        card.addEventListener("click", () => {
            // Evita di aprire il modal se l'utente sta trascinando la galleria
            if(document.getElementById("gallery-track").classList.contains("dragging")) return;
            
            currentIndex = index;
            openLightbox(imagesData[currentIndex]);
        });
    });

    function openLightbox(data) {
        lightboxImg.src = data.src;
        lightboxCaption.textContent = data.caption;
        lightbox.showModal();
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.close();
        document.body.style.overflow = "";
    }

    function navigateLightbox(direction) {
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % imagesData.length;
        } else {
            currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
        }
        
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = imagesData[currentIndex].src;
            lightboxCaption.textContent = imagesData[currentIndex].caption;
            lightboxImg.style.opacity = 1;
        }, 150); // Piccolo delay per animazione CSS
    }

    if(closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if(nextBtn) nextBtn.addEventListener("click", () => navigateLightbox("next"));
    if(prevBtn) prevBtn.addEventListener("click", () => navigateLightbox("prev"));
    
    // Chiudi cliccando sul backdrop (fuori dall'immagine)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.open) return;
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
    });
}

/* ==========================================================================
   6. KINETIC MOTTO TEXT ANIMATION
   ========================================================================== */
function initPhilosophyAnimation() {
    const philosophyWords = gsap.utils.toArray(".philosophy-text .word");
    if (philosophyWords.length === 0) return;

    gsap.fromTo(philosophyWords, 
        { color: "rgba(255, 255, 255, 0.1)", textShadow: "none" },
        { 
            color: (i, target) => target.classList.contains('text-accent') ? 'var(--accent)' : '#ffffff',
            textShadow: (i, target) => {
                const glowColor = target.classList.contains('text-accent') ? 'var(--accent-glow)' : 'var(--primary-glow)';
                return `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`;
            },
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".philosophy-section",
                start: "top 80%",
                end: "bottom 40%",
                scrub: true
            }
        }
    );
}

/* ==========================================================================
   7. FAQ ACCORDION INTERACTION
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("open")) {
                    otherItem.classList.remove("open");
                    otherItem.querySelector(".faq-answer").style.maxHeight = "0px";
                }
            });

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
