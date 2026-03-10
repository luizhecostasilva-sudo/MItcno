// Init Lenis smooth scroll - highly fluid configuration
const lenis = new Lenis({
    lerp: 0.1, // Snappier response
    wheelMultiplier: 1.1,
    smoothWheel: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Init GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Make navigation buttons work smoothly using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                lenis.scrollTo(targetId, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            }
        });
    });

    // --- 1. HERO ENTRANCE ---
    const heroTl = gsap.timeline();
    heroTl.from("header", { y: -50, autoAlpha: 0, duration: 1, ease: "power3.out" }, 0);
    heroTl.from("#hero .animate-on-scroll > *", {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out"
    }, 0.2);
    heroTl.from("#hero-visual", {
        x: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out"
    }, 0.4);

    // Reusable animation utility for all main scroll sections
    const animateSection = (selector, yOffset, staggerTime, triggerPoint = "top 85%") => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            // First ensure elements are visible for GSAP to manipulate
            gsap.set(elements, { autoAlpha: 1 });

            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].closest('section') || elements[0].parentElement,
                    start: triggerPoint,
                    toggleActions: "play reverse play reverse"
                },
                y: yOffset,
                autoAlpha: 0,
                duration: 1.2,
                stagger: staggerTime,
                ease: "expo.out",
                clearProps: "all" // Cleans up inline styles when done to avoid conflicts
            });
        }
    };

    // --- 2. METRICS BAR ---
    // Custom animation for metrics to guarantee fluidity
    const metricsBlocks = document.querySelectorAll("#metricas .metric-item");
    if (metricsBlocks.length > 0) {
        gsap.set(metricsBlocks, { autoAlpha: 1 }); // Ensure visibility first
        gsap.from(metricsBlocks, {
            scrollTrigger: {
                trigger: "#metricas",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 80,
            autoAlpha: 0,
            duration: 1.5,
            stagger: 0.2, // increased stagger for elegant sequence
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 3. SOLUTIONS HEADER & CARDS ---
    animateSection("#solucoes .animate-on-scroll", 40, 0, "top 85%");

    const solutionCards = document.querySelectorAll("#solucoes .solution-card");
    if (solutionCards.length > 0) {
        gsap.set(solutionCards, { autoAlpha: 1 });
        gsap.from(solutionCards, {
            scrollTrigger: {
                trigger: "#solucoes .grid",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 80,
            autoAlpha: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 4. METHODOLOGY HEADER & PARALLAX ---
    animateSection("#metodologia .sticky", 40, 0, "top 85%");

    const methodologySteps = document.querySelectorAll("#metodologia .methodology-step");
    if (methodologySteps.length > 0) {
        gsap.set(methodologySteps, { autoAlpha: 1 });
        gsap.from(methodologySteps, {
            scrollTrigger: {
                trigger: "#metodologia",
                start: "top 75%",
                toggleActions: "play reverse play reverse"
            },
            x: 50, // Slide in from the right to match the timeline design
            autoAlpha: 0,
            duration: 1.5,
            stagger: 0.2, // Generous stagger for sequential reveal
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 5. ABOUT SECTION ---
    const aboutElements = document.querySelectorAll("#sobre .about-anim");
    if (aboutElements.length > 0) {
        gsap.set(aboutElements, { autoAlpha: 1 });
        gsap.from(aboutElements, {
            scrollTrigger: {
                trigger: "#sobre",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 50,
            autoAlpha: 0,
            duration: 1.5,
            stagger: 0.2, // Generous stagger for text and stats
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 6. PARTNERS HEADER ---
    const partnerElements = document.querySelectorAll("#parceiros .partner-anim");
    if (partnerElements.length > 0) {
        gsap.set(partnerElements, { autoAlpha: 1 });
        gsap.from(partnerElements, {
            scrollTrigger: {
                trigger: "#parceiros",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 30,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 7. CASOS DE SUCESSO HEADER & CARDS ---
    const casesHeader = document.querySelectorAll("#casos .cases-header-anim");
    if (casesHeader.length > 0) {
        gsap.set(casesHeader, { autoAlpha: 1 });
        gsap.from(casesHeader, {
            scrollTrigger: {
                trigger: "#casos",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 40,
            autoAlpha: 0,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "all"
        });
    }

    const caseCards = document.querySelectorAll("#casos .case-card");
    if (caseCards.length > 0) {
        gsap.set(caseCards, { autoAlpha: 1 });
        gsap.from(caseCards, {
            scrollTrigger: {
                trigger: "#casos .grid",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 80,
            autoAlpha: 0,
            scale: 0.95,
            duration: 1.5,
            stagger: 0.15, // Smooth sequential card reveal
            ease: "expo.out",
            clearProps: "all"
        });
    }

    // --- 8. BACKGROUND GLOW PARALLAX ---
    gsap.utils.toArray(".blur-\\[120px\\], .blur-\\[100px\\]").forEach(glow => {
        gsap.to(glow, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: glow.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // --- 9. MOUSE MOVE EFFECT ON HERO ABTRACT BOX ---
    const visualBox = document.querySelector("#hero-visual > div");
    if (visualBox) {
        window.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(visualBox, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    // --- 10. MOBILE MENU TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMobileMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        const toggleMenu = () => {
            isMobileMenuOpen = !isMobileMenuOpen;

            // Toggle menu visibility
            if (isMobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');

                // Animate hamburger to X
                mobileMenuBtn.children[0].classList.add('translate-y-[8px]', 'rotate-45');
                mobileMenuBtn.children[1].classList.add('opacity-0');
                mobileMenuBtn.children[2].classList.add('-translate-y-[8px]', '-rotate-45');

                // Animate menu links
                gsap.fromTo(mobileLinks,
                    { y: 20, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
                );
            } else {
                // Animate X back to hamburger
                mobileMenuBtn.children[0].classList.remove('translate-y-[8px]', 'rotate-45');
                mobileMenuBtn.children[1].classList.remove('opacity-0');
                mobileMenuBtn.children[2].classList.remove('-translate-y-[8px]', '-rotate-45');

                gsap.to(mobileLinks, {
                    y: -20, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: "power2.in",
                    onComplete: () => {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('flex');
                    }
                });
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobileMenuOpen) toggleMenu();
            });
        });
    }

    // --- 11. HIDE WHATSAPP BUTTON ON FOOTER ---
    const whatsappBtn = document.getElementById('whatsapp-fab');
    const footer = document.getElementById('contato');

    if (whatsappBtn) {
        // Faster organic floating animation in all directions
        const floatAnimation = () => {
            gsap.to(whatsappBtn, {
                x: () => gsap.utils.random(-8, 8),
                y: () => gsap.utils.random(-12, 12),
                rotation: () => gsap.utils.random(-5, 5),
                duration: () => gsap.utils.random(0.8, 1.5),
                ease: "sine.inOut",
                onComplete: floatAnimation
            });
        };
        floatAnimation(); // Start the loop

        if (footer) {
            ScrollTrigger.create({
                trigger: footer,
                start: "top bottom", // When the top of the footer hits the bottom of the viewport
                onEnter: () => gsap.to(whatsappBtn, { autoAlpha: 0, scale: 0.5, duration: 0.3, ease: "power2.in" }),
                onLeaveBack: () => gsap.to(whatsappBtn, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }),
            });
        }
    }
});
