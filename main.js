document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay using animate
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effects for links and buttons
        const interactables = document.querySelectorAll('a, button, .portfolio-tile');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('active');
                cursorOutline.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('active');
                cursorOutline.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger to X could be added here
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Initial Hero Animations (Simple JS implementation without GSAP)
    setTimeout(() => {
        const titleWords = document.querySelectorAll('.hero-title .word');
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
                word.style.transform = 'translateY(0)';
                word.style.opacity = '1';
            }, index * 150);
        });

        setTimeout(() => {
            document.querySelector('.hero-subtitle').style.transition = 'all 1s ease';
            document.querySelector('.hero-subtitle').style.opacity = '1';
            document.querySelector('.hero-subtitle').style.transform = 'translateY(0)';

            document.querySelector('.hero-cta').style.transition = 'all 1s ease 0.2s';
            document.querySelector('.hero-cta').style.opacity = '1';
            document.querySelector('.hero-cta').style.transform = 'translateY(0)';

            document.querySelector('.scroll-indicator').style.transition = 'opacity 1s ease 0.5s';
            document.querySelector('.scroll-indicator').style.opacity = '1';
        }, titleWords.length * 150 + 200);
    }, 100);

    // Scroll Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.portfolio-tile');
    cards.forEach((card, index) => {
        // Stagger the apparition of cards slightly
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});
