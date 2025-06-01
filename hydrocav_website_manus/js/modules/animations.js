// Water drop animation
function createWaterDrops() {
    const waterAnimationContainer = document.getElementById('water-animation'); // Assuming a container with this ID exists in HTML
    if (!waterAnimationContainer) return;

    const numberOfDrops = 20;

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('span'); // These spans are styled by components.css
        const size = Math.random() * 5 + 5;
        const posX = Math.floor(Math.random() * window.innerWidth);
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;

        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${posX}px`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        // The 'animate' animation name is defined in components.css

        waterAnimationContainer.appendChild(drop);
    }
}

// Parallax effect for images
function initParallax() {
    const parallaxImages = document.querySelectorAll('.parallax-image'); // Add this class to images in HTML
    if (parallaxImages.length === 0) return;

    window.addEventListener('scroll', function() {
        parallaxImages.forEach(image => {
            const speed = 0.5; // Adjust as needed
            const rect = image.getBoundingClientRect();
            const isInView = (rect.top <= window.innerHeight && rect.bottom >= 0);

            if (isInView) {
                // Calculate Y position based on scroll and element's position
                // This is a common way, but might need adjustment based on exact desired effect
                const scrollY = window.scrollY;
                // Ensure getBoundingClientRect().top gives distance from viewport top
                // The element's original top position relative to document is scrollY + rect.top
                // Parallax effect is stronger if based on viewport scroll vs element scroll past point
                const yPos = (rect.top - window.innerHeight) * speed; // Example calculation
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// Counter animation for statistics
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-count'));
    if (isNaN(target)) return;

    const duration = 2000; // ms
    const stepTime = 16; // roughly 60fps
    const totalSteps = duration / stepTime;
    const stepValue = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, stepTime);
}

// Reveal animations on scroll (for product cards and stat numbers)
function initScrollReveal() {
    const productCards = document.querySelectorAll('.product-card'); // Styled in components.css
    const statNumbers = document.querySelectorAll('.stat-number'); // Styled in components.css

    const elementsToReveal = [...productCards, ...statNumbers];
    if (elementsToReveal.length === 0) return;

    const revealAction = () => {
        const windowHeight = window.innerHeight;
        elementsToReveal.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 100) { // Reveal when 100px from bottom of viewport
                el.classList.add('visible'); // 'visible' class defined in components.css
                if (el.classList.contains('stat-number') && !el.dataset.animated) {
                    animateCounter(el);
                    el.dataset.animated = true; // Prevent re-animating
                }
            }
        });
    };

    window.addEventListener('scroll', revealAction);
    revealAction(); // Initial check
}

// Mouseover effects for application items
function initApplicationItemEffects() {
    const applicationItems = document.querySelectorAll('.application-item'); // Styled in components.css
    if (applicationItems.length === 0) return;

    applicationItems.forEach(item => {
        // The hover effect is primarily CSS driven (.application-item:hover and :before)
        // JS part for transform and shadow was removed as CSS handles it better.
        // If there are specific JS interactions needed on hover, they can be added here.
        // For example, if the text change was more complex than CSS could handle.
    });
}

// Cursor effect for hero section
function initHeroCursorEffect() {
    const hero = document.querySelector('.hero'); // Styled in layout.css
    if (!hero) return;

    hero.addEventListener('mousemove', function(e) {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2; // Normalize to -1 to 1
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2; // Normalize to -1 to 1
        const moveFactor = 10; // Pixels to move background

        // Adjust backgroundPosition. Assumes hero background is set up for this.
        hero.style.backgroundPosition = `calc(50% + ${xPos * moveFactor}px) calc(50% + ${yPos * moveFactor}px)`;
    });
}

// Intersection Observer for general section animations (fade in from bottom)
function initSectionObserver() {
    const sections = document.querySelectorAll('section'); // General sections
    if (sections.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    sections.forEach((section, index) => {
        // Skip hero section (index 0) or sections that should not have this animation
        if (index > 0) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });
}

// Initialize all animation functionalities
export function initAnimations() {
    createWaterDrops();
    initParallax();
    initScrollReveal();
    initApplicationItemEffects(); // Though mostly CSS, calling it here if JS enhancements are added later
    initHeroCursorEffect();
    initSectionObserver();
}
