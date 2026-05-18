/* ==========================================================================
   EVOLVE LANDING PAGE INTERACTIVITY & ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLiveClocks();
    initHeroInteractivity();
    initShowcaseSwitcher();
    initMoodCheckIn();
    initMementoMoriCalculator();
    initFAQAccordion();
    initScrollAnimations();
    initMobileMenu();
});

/* ==========================================================================
   1. LIVE PHONE CLOCKS
   ========================================================================== */
function initLiveClocks() {
    const clockHero = document.getElementById('iphone-time');
    const clockInteractive = document.getElementById('interactive-iphone-time');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        if (clockHero) clockHero.textContent = timeString;
        if (clockInteractive) clockInteractive.textContent = timeString;
    }

    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

/* ==========================================================================
   2. HERO INTERACTIVE HABIT SIMULATOR
   ========================================================================== */
function initHeroInteractivity() {
    const habitCheckbox = document.getElementById('hero-habit-checkbox');
    const habitItem = document.getElementById('interactive-habit-item');
    const progressPercent = document.getElementById('hero-progress-percent');
    const progressBar = document.getElementById('hero-progress-bar');
    const streakCount = document.getElementById('hero-streak');
    const streakBadge = streakCount.parentElement;

    let isCompleted = false;

    if (habitCheckbox && habitItem && progressBar && progressPercent) {
        habitCheckbox.addEventListener('click', () => {
            isCompleted = !isCompleted;

            if (isCompleted) {
                // Mark habit complete
                habitItem.classList.add('completed');
                habitItem.classList.add('done');
                habitItem.classList.remove('pending');

                // Animate progress ring to 100%
                // 251.2 is the stroke-dasharray (2 * pi * r = 2 * 3.1415 * 40 = 251.2)
                progressBar.style.strokeDashoffset = '0';
                progressPercent.textContent = '100%';

                // Pop the streak counter
                streakCount.textContent = '15';
                streakBadge.classList.add('celebrate');

            } else {
                // Revert to original state
                habitItem.classList.remove('completed');
                habitItem.classList.remove('done');
                habitItem.classList.add('pending');

                // Animate progress ring back to 80% (offset 50.2)
                progressBar.style.strokeDashoffset = '50.2';
                progressPercent.textContent = '80%';

                // Reset streak counter
                streakCount.textContent = '14';
                streakBadge.classList.remove('celebrate');
            }
        });
    }
}

/* ==========================================================================
   3. SHOWCASE SCREEN SWITCHER
   ========================================================================== */
function initShowcaseSwitcher() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const screens = document.querySelectorAll('.iphone-screen-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetScreenId = tab.getAttribute('data-target');

            // Deactivate all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Activate current tab
            tab.classList.add('active');

            // Fade out previous screens and fade in current screen
            screens.forEach(screen => {
                if (screen.id === targetScreenId) {
                    screen.classList.add('active');
                } else {
                    screen.classList.remove('active');
                }
            });
        });
    });
}

/* ==========================================================================
   4. MOOD CHECK-IN ENGINE (INSIDE INTERACTIVE PHONE)
   ========================================================================== */
function initMoodCheckIn() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodFeedback = document.getElementById('mood-feedback');

    const feedbacks = {
        super: "🤩 Energia al massimo! Ottimo momento per spingere sulle abitudini chiave.",
        bene: "🙂 Ti senti bene. Il tuo equilibrio mentale sostiene la costanza.",
        normale: "😐 Giornata neutra. Concentrati sulle routine per mantenere il focus.",
        teso: "😰 Tensione rilevata. Ti consigliamo 10 min di Meditazione per bilanciare.",
        no: "😢 Giornata difficile. Ricorda: l'autodisciplina batte la motivazione."
    };

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selection
            moodBtns.forEach(b => b.classList.remove('selected'));
            // Add selection
            btn.classList.add('selected');

            const mood = btn.getAttribute('data-mood');
            if (moodFeedback && feedbacks[mood]) {
                moodFeedback.style.opacity = '0';
                setTimeout(() => {
                    moodFeedback.textContent = feedbacks[mood];
                    moodFeedback.style.opacity = '1';
                }, 150);
            }
        });
    });
}

/* ==========================================================================
   5. MEMENTO MORI SIMULATOR & GRID ENGINE
   ========================================================================== */
function initMementoMoriCalculator() {
    const birthDateInput = document.getElementById('birth-date');
    const calculateBtn = document.getElementById('calculate-memento-btn');
    const gridContainer = document.getElementById('memento-interactive-grid');
    const previewGridContainer = document.getElementById('memento-dots-preview');

    const weeksLivedVal = document.getElementById('weeks-lived-val');
    const weeksRemainingVal = document.getElementById('weeks-remaining-val');
    const percentLivedVal = document.getElementById('percent-lived-val');

    const LIFESPAN_YEARS = 80;
    const TOTAL_WEEKS = LIFESPAN_YEARS * 52; // 4160 weeks

    function calculateMemento() {
        const dobValue = birthDateInput.value;
        if (!dobValue) return;

        const dob = new Date(dobValue);
        const today = new Date();

        // Calculate total difference in weeks
        const diffMs = today.getTime() - dob.getTime();
        if (diffMs < 0) {
            alert("La data di nascita deve essere nel passato!");
            return;
        }

        const weeksLived = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
        const weeksRemaining = Math.max(0, TOTAL_WEEKS - weeksLived);
        const percentLived = ((weeksLived / TOTAL_WEEKS) * 100).toFixed(1);

        // Update Text Stats
        if (weeksLivedVal) weeksLivedVal.textContent = weeksLived.toLocaleString();
        if (weeksRemainingVal) weeksRemainingVal.textContent = weeksRemaining.toLocaleString();
        if (percentLivedVal) percentLivedVal.textContent = `${percentLived}%`;

        // Render main simulator grid
        if (gridContainer) {
            gridContainer.innerHTML = ''; // Clear previous
            
            // Fragment to improve DOM insertion speed for 4,160 nodes
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < TOTAL_WEEKS; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot-cell';

                if (i < weeksLived) {
                    dot.classList.add('lived');
                } else if (i === weeksLived) {
                    dot.classList.add('current', 'animate-pulse');
                } else {
                    dot.classList.add('future');
                }

                fragment.appendChild(dot);
            }
            gridContainer.appendChild(fragment);
        }

        // Render mini preview grid inside phone screen 4
        if (previewGridContainer) {
            previewGridContainer.innerHTML = '';
            // Render a subset grid of 15 x 12 = 180 dots in phone preview
            const previewCols = 15;
            const previewRows = 12;
            const previewTotal = previewCols * previewRows;
            
            // Scale age to preview grid
            const previewLived = Math.floor((weeksLived / TOTAL_WEEKS) * previewTotal);

            for (let i = 0; i < previewTotal; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';

                if (i < previewLived) {
                    dot.classList.add('lived');
                } else if (i === previewLived) {
                    dot.classList.add('current', 'animate-pulse');
                }
                previewGridContainer.appendChild(dot);
            }

            // Update percentage tag in phone preview too
            const previewPercentTag = document.querySelector('.memento-header .percent-label');
            if (previewPercentTag) {
                previewPercentTag.textContent = `${percentLived}%`;
            }

            const previewLivedNum = document.querySelector('.memento-stats-footer .stat:first-child .num');
            const previewRemNum = document.querySelector('.memento-stats-footer .stat:last-child .num');
            if (previewLivedNum) previewLivedNum.textContent = weeksLived.toLocaleString();
            if (previewRemNum) previewRemNum.textContent = weeksRemaining.toLocaleString();
        }
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateMemento);
    }

    // Run once on load
    calculateMemento();
}

/* ==========================================================================
   6. FAQ ACCORDION LOGIC
   ========================================================================== */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentItem = btn.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   7. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animElements.forEach(el => el.classList.add('in-view'));
    }
}

/* ==========================================================================
   8. MOBILE RESPONSIVE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('main-header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
