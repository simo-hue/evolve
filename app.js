/* ==========================================================================
   EVOLVE LANDING PAGE INTERACTIVITY & ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLiveClocks();
    initHeroInteractivity();
    initScrollCoverflow();
    initMoodCheckIn();
    initMementoMoriCalculator();
    initFAQAccordion();
    initScrollAnimations();
    initMobileMenu();
    initIPhone3DTilt();
    initInteractiveAnalyticsChart();
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
   3. STICKY SCROLL COVERFLOW PRESENTATION CAROUSEL
   ========================================================================== */
function initScrollCoverflow() {
    const section = document.getElementById('interactive-showcase');
    const track = document.getElementById('coverflow-track');
    const slides = document.querySelectorAll('.coverflow-slide');
    const progressFill = document.getElementById('coverflow-progress-fill');
    
    if (!section || !track || slides.length === 0) return;
    
    // Set active slide initially
    updateCoverflow();
    
    window.addEventListener('scroll', updateCoverflow);
    window.addEventListener('resize', updateCoverflow);
    
    function updateCoverflow() {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate progress (0 when section top enters viewport, 1 when section bottom leaves viewport)
        const sectionTop = section.offsetTop;
        const totalScrollable = sectionHeight - windowHeight;
        
        // Current scroll position relative to the section start
        const scrollYRelative = window.scrollY - sectionTop;
        
        // Normalize progress between 0 and 1
        let progress = scrollYRelative / totalScrollable;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        // Fill progress bar
        if (progressFill) progressFill.style.width = `${progress * 100}%`;
        
        // Query current slide dimensions (responsive width)
        const slideWidth = slides[0].offsetWidth;
        const viewportWidth = window.innerWidth;
        
        // Gap: 6vw on desktop, 8vw on mobile
        const gapPercent = viewportWidth > 768 ? 0.06 : 0.08;
        const gap = viewportWidth * gapPercent;
        const totalSlideWidth = slideWidth + gap;
        
        const numSlides = slides.length;
        const maxShift = (numSlides - 1) * totalSlideWidth;
        const currentShift = progress * maxShift;
        
        // Apply horizontal sweep translation to the track
        track.style.transform = `translateX(${-currentShift}px) translateZ(0)`;
        
        // Apply 3D scale, tilt (Y-rotation), depth (Z-translation), and opacity based on active center focus
        slides.forEach((slide, idx) => {
            const targetIdx = progress * (numSlides - 1);
            const distance = idx - targetIdx; // How far is this slide from center (-6 to 6)
            const absDistance = Math.abs(distance);
            
            // 1. Scale: 1.15 in center, down to 0.75 on sides
            const scale = Math.max(0.75, 1.15 - (absDistance * 0.18));
            
            // 2. Opacity: 1 in center, down to 0.25 on sides
            const opacity = Math.max(0.25, 1 - (absDistance * 0.3));
            
            // 3. 3D Rotation (Coverflow Cover angles)
            let rotateY = -distance * 22;
            if (rotateY > 32) rotateY = 32;
            if (rotateY < -32) rotateY = -32;
            
            // 4. Translate Z (pop out in 3D space when in focus)
            const translateZ = Math.max(0, 100 - (absDistance * 70));
            
            // Apply high-performance transform styles
            slide.style.transform = `scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
            slide.style.opacity = opacity;
            slide.style.zIndex = Math.round(100 - absDistance * 10);
            
            // Show caption stoic card only for the focused slide
            const caption = slide.querySelector('.slide-caption');
            if (caption) {
                if (absDistance < 0.48) {
                    caption.style.opacity = '1';
                    caption.style.transform = 'translateY(0) translateZ(80px)';
                    caption.style.pointerEvents = 'all';
                } else {
                    caption.style.opacity = '0';
                    caption.style.transform = 'translateY(15px) translateZ(0)';
                    caption.style.pointerEvents = 'none';
                }
            }
        });
    }
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

            // Append dynamic hover card tooltip inside grid container
            const hoverCard = document.createElement('div');
            hoverCard.className = 'memento-hover-card';
            gridContainer.appendChild(hoverCard);

            // Register lightweight event delegation for hover tooltips
            gridContainer.addEventListener('mouseover', (e) => {
                const dot = e.target.closest('.dot-cell');
                if (!dot) return;
                
                const cells = Array.from(gridContainer.querySelectorAll('.dot-cell'));
                const idx = cells.indexOf(dot);
                if (idx === -1) return;
                
                const weekNum = idx + 1;
                const age = (idx / 52).toFixed(1);
                
                let state = "Futura";
                if (dot.classList.contains('lived')) state = "Vissuta";
                if (dot.classList.contains('current')) state = "Attuale";
                
                hoverCard.innerHTML = `Settimana ${weekNum.toLocaleString()} (Età ${age}) — <span style="color: ${state === 'Vissuta' ? 'var(--accent-indigo)' : '#fbbf24'}">${state}</span>`;
                
                const dotRect = dot.getBoundingClientRect();
                const gridRect = gridContainer.getBoundingClientRect();
                
                const topOffset = dotRect.top - gridRect.top - 40;
                const leftOffset = dotRect.left - gridRect.left + (dotRect.width / 2);
                
                hoverCard.style.top = `${topOffset}px`;
                hoverCard.style.left = `${leftOffset}px`;
                hoverCard.style.opacity = '1';
                hoverCard.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            gridContainer.addEventListener('mouseleave', () => {
                hoverCard.style.opacity = '0';
                hoverCard.style.transform = 'translateX(-50%) translateY(5px)';
            });
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

/* ==========================================================================
   9. INTERACTIVE 3D TILT & GLASS SHINE ENGINE
   ========================================================================== */
function initIPhone3DTilt() {
    const mockups = document.querySelectorAll('.iphone-mockup, .phone-skewed');
    
    mockups.forEach(mockup => {
        mockup.addEventListener('mousemove', (e) => {
            const rect = mockup.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate normalized coordinate percentages (-0.5 to 0.5)
            const normX = (x / rect.width) - 0.5;
            const normY = (y / rect.height) - 0.5;
            
            // Limit degrees of rotation (tilt max 8 degrees)
            const rotX = -normY * 8;
            const rotY = normX * 8;
            
            if (mockup.classList.contains('phone-skewed')) {
                // Skewed phone preserves base tilted angles with micro-rotations
                mockup.style.transform = `perspective(1000px) rotateX(${rotX - 10}deg) rotateY(${rotY + 25}deg) rotateZ(-10deg) scale(1.03)`;
            } else {
                mockup.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            }
            
            // Shift specular shine gradient light reflection coordinates
            const shineX = (x / rect.width) * 100;
            const shineY = (y / rect.height) * 100;
            mockup.style.setProperty('--shine-x', `${shineX}%`);
            mockup.style.setProperty('--shine-y', `${shineY}%`);
        });
        
        mockup.addEventListener('mouseleave', () => {
            // Revert gently to baseline state
            if (mockup.classList.contains('phone-skewed')) {
                mockup.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(25deg) rotateZ(-10deg) scale(1)`;
            } else {
                mockup.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            }
            mockup.style.setProperty('--shine-x', `50%`);
            mockup.style.setProperty('--shine-y', `50%`);
        });
    });
}

/* ==========================================================================
   10. INTERACTIVE ANALYTICS CHART OVERLAY DETECTOR
   ========================================================================== */
function initInteractiveAnalyticsChart() {
    const chart = document.querySelector('.analytics-chart');
    if (!chart) return;
    
    let guideLine = chart.querySelector('.chart-guide-line');
    if (!guideLine) {
        guideLine = document.createElement('div');
        guideLine.className = 'chart-guide-line';
        chart.appendChild(guideLine);
    }
    
    let statsCard = chart.querySelector('.chart-active-stats');
    if (!statsCard) {
        statsCard = document.createElement('div');
        statsCard.className = 'chart-active-stats';
        statsCard.innerHTML = `
            <span class="day-label">Lunedì</span>
            <div class="stats-row">
                <span>🧠 Umore: <strong class="wellness-val">6.2/10</strong></span>
                <span>⚡ Produttività: <strong class="output-val">+5%</strong></span>
            </div>
        `;
        chart.appendChild(statsCard);
    }
    
    const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const dataset = [
        { mood: "6.5/10", output: "+8%", desc: "Inizio serie" },
        { mood: "7.2/10", output: "+14%", desc: "Focus attivo" },
        { mood: "8.9/10", output: "+22%", desc: "Picco Stoico" },
        { mood: "7.8/10", output: "+12%", desc: "Equilibrio" },
        { mood: "9.5/10", output: "+28%", desc: "Sintonia totale" },
        { mood: "8.6/10", output: "+19%", desc: "Riflessione" },
        { mood: "8.2/10", output: "+15%", desc: "Pianificazione" }
    ];
    
    chart.addEventListener('mousemove', (e) => {
        const rect = chart.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const pct = x / rect.width;
        let idx = Math.floor(pct * 7);
        if (idx < 0) idx = 0;
        if (idx > 6) idx = 6;
        
        const guideLeft = (idx / 6) * (rect.width - 48) + 24;
        guideLine.style.left = `${guideLeft}px`;
        guideLine.style.opacity = '1';
        
        statsCard.querySelector('.day-label').textContent = `${days[idx]} — ${dataset[idx].desc}`;
        statsCard.querySelector('.wellness-val').textContent = dataset[idx].mood;
        statsCard.querySelector('.output-val').textContent = dataset[idx].output;
        
        statsCard.style.opacity = '1';
        if (idx > 3) {
            statsCard.style.left = `${guideLeft - 200}px`;
        } else {
            statsCard.style.left = `${guideLeft + 20}px`;
        }
    });
    
    chart.addEventListener('mouseleave', () => {
        guideLine.style.opacity = '0';
        statsCard.style.opacity = '0';
    });
}

// 11. AMBIENT GLOW MOUSE TRACKER
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});
