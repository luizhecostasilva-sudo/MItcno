// Init Lenis smooth scroll - faster and less stiff
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

    // Remove fallback opacity classes set by HTML since GSAP will handle all inline styles
    gsap.set(".animate-on-scroll", { opacity: 1, y: 0 });

    // --- 1. HERO ENTRANCE ---
    const heroTl = gsap.timeline();

    // Header fade-in
    heroTl.from("header", { y: -50, opacity: 0, duration: 1, ease: "power3.out" }, 0);

    // Hero Text Stagger
    heroTl.from("#hero .animate-on-scroll > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out"
    }, 0.2);

    // Hero Abstract Visual Box
    heroTl.from(".hidden.md\\:flex .relative", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, 0.4);

    // --- 2. METRICS BAR ---
    gsap.from("#metricas > div > div", {
        scrollTrigger: {
            trigger: "#metricas",
            start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "expo.out"
    });

    // --- 3. SOLUTIONS CARDS ---
    gsap.from("#solucoes .grid > div", {
        scrollTrigger: {
            trigger: "#solucoes .grid",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
    });

    // --- 4. METHODOLOGY PARALLAX & REVEAL ---
    gsap.from("#metodologia .sticky", {
        scrollTrigger: {
            trigger: "#metodologia",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    const steps = gsap.utils.toArray("#metodologia .relative.animate-on-scroll");
    steps.forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // --- 5. ABOUT SECTION ---
    gsap.from("#sobre .animate-on-scroll", {
        scrollTrigger: {
            trigger: "#sobre",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });

    // --- 6. PARTNERS HEADER ---
    gsap.from("#parceiros .animate-on-scroll", {
        scrollTrigger: {
            trigger: "#parceiros",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // --- 7. CASOS DE SUCESSO ---
    gsap.from("#casos .text-center", {
        scrollTrigger: {
            trigger: "#casos",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from("#casos .grid > div", {
        scrollTrigger: {
            trigger: "#casos .grid",
            start: "top 85%",
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.2,
        ease: "expo.out"
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
