// Init Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Init GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

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
        ease: "power4.out"
    }, 0.2);

    // Hero Abstract Visual Box
    heroTl.from(".hidden.md\\:flex .relative", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, 0.4);

    // --- 2. METRICS BAR ---
    gsap.from(".border-y.bg-\\[\\#0D0D15\\] > div > div", {
        scrollTrigger: {
            trigger: ".border-y.bg-\\[\\#0D0D15\\]",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
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

    // --- 5. CASOS DE SUCESSO ---
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

    // --- 6. BACKGROUND GLOW PARALLAX ---
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

    // --- 7. MOUSE MOVE EFFECT ON HERO ABTRACT BOX ---
    const visualBox = document.querySelector(".hidden.md\\:flex.w-full.md\\:w-\\[40\\%\\].justify-end > div");
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

    // Keep the basic intersection observer for anything else with .animate-on-scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll:not(#hero .animate-on-scroll)').forEach(el => observer.observe(el));
});
