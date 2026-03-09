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
    animateSection("#solucoes .grid > div", 80, 0.15, "top 85%");

    // --- 4. METHODOLOGY HEADER & PARALLAX ---
    animateSection("#metodologia .sticky", 40, 0, "top 85%");
    animateSection("#metodologia .relative.animate-on-scroll", 50, 0.15, "top 85%");

    // --- 5. ABOUT SECTION ---
    animateSection("#sobre .animate-on-scroll", 50, 0.2, "top 85%");

    // --- 6. PARTNERS HEADER ---
    animateSection("#parceiros .animate-on-scroll", 30, 0, "top 85%");

    // --- 7. CASOS DE SUCESSO HEADER & CARDS ---
    animateSection("#casos .text-center", 40, 0, "top 85%");

    gsap.from("#casos .grid > div", {
        scrollTrigger: {
            trigger: "#casos .grid",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        y: 80,
        autoAlpha: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        clearProps: "all"
    });

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
});
