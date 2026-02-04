// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation loop
function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX += distX * 0.1; // Ease factor
    cursorY += distY * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover interactions for cursor
const links = document.querySelectorAll('a, button, .project-item');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '1px solid currentColor';
        cursor.style.mixBlendMode = 'normal';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'var(--text-color)';
        cursor.style.border = 'none';
        cursor.style.mixBlendMode = 'difference';
    });
});

// Hero Animation
const heroTimeline = gsap.timeline();

heroTimeline.from('.hero-title .line', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 0.5
})
    .to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        y: 0,
        ease: 'power2.out'
    }, '-=0.5');

// Parallax Effect for Hero Image
gsap.to('.hero-image', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    scale: 1.1
});

// Work Section Animations
const projects = document.querySelectorAll('.project-item');

projects.forEach((project, index) => {
    // Fade up text
    gsap.from(project.querySelector('.project-info'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Reveal image
    gsap.from(project.querySelector('.project-image-wrapper'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out'
    });
});

// Studio Text Reveal
gsap.from('.studio-title', {
    scrollTrigger: {
        trigger: '.studio',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.studio-text', {
    scrollTrigger: {
        trigger: '.studio',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

// Marquee Animation
gsap.to('.marquee-inner', {
    xPercent: -50,
    ease: 'none',
    duration: 15,
    repeat: -1
});

// Services Stagger
gsap.from('.service-item', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top 70%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
});

// Magnetic Buttons (Simple implementation)
const magneticBtns = document.querySelectorAll('.btn-arrow, .nav-link, .menu-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3
        });
    });
});

// Card Stack Animation
// Cards are now positioned absolute in a sticky wrapper.
// We animate them to rotate and spread out as the user scrolls through the 300vh section.

const cardSection = document.querySelector('.card-stack-section');
const cards = document.querySelectorAll('.card');

if (cardSection && cards.length > 0) {
    // Animate each card
    cards.forEach((card, index) => {
        // Calculate spread
        // Index 0: left, Index 3: right
        const rotation = (index - 1.5) * 12; // -18deg to +18deg
        const xOffset = (index - 1.5) * 60;  // Spread horizontally
        const yOffset = (index - 1.5) * 10;  // Classic fanning curve (middle higher) comes from abs()

        gsap.to(card, {
            scrollTrigger: {
                trigger: '.card-stack-section',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            rotation: rotation,
            x: xOffset,
            y: Math.abs(index - 1.5) * 15, // Slight arc
            ease: 'none'
        });
    });
}


