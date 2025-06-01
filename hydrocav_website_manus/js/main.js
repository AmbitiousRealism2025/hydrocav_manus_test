// HydroCav Inc. Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Water drop animation
    function createWaterDrops() {
        const waterAnimation = document.getElementById('water-animation');
        const numberOfDrops = 20;
        
        for (let i = 0; i < numberOfDrops; i++) {
            const drop = document.createElement('span');
            const size = Math.random() * 5 + 5;
            const posX = Math.floor(Math.random() * window.innerWidth);
            const delay = Math.random() * 20;
            const duration = Math.random() * 10 + 10;
            
            drop.style.width = `${size}px`;
            drop.style.height = `${size}px`;
            drop.style.left = `${posX}px`;
            drop.style.animationDelay = `${delay}s`;
            drop.style.animationDuration = `${duration}s`;
            
            waterAnimation.appendChild(drop);
        }
    }
    
    // Initialize water drops animation
    createWaterDrops();

    // Parallax effect for images
    const parallaxImages = document.querySelectorAll('.parallax-image');
    window.addEventListener('scroll', function() {
        parallaxImages.forEach(image => {
            const speed = 0.5;
            const rect = image.getBoundingClientRect();
            const isInView = (
                rect.top <= window.innerHeight &&
                rect.bottom >= 0
            );
            
            if (isInView) {
                const yPos = (window.scrollY - rect.top) * speed;
                image.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Reveal animations on scroll
    const productCards = document.querySelectorAll('.product-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const revealElements = function() {
        const windowHeight = window.innerHeight;
        
        // Reveal product cards
        productCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.classList.add('visible');
            }
        });
        
        // Animate stat numbers
        statNumbers.forEach(stat => {
            const statTop = stat.getBoundingClientRect().top;
            if (statTop < windowHeight - 100 && !stat.classList.contains('visible')) {
                stat.classList.add('visible');
                animateCounter(stat);
            }
        });
    };
    
    // Counter animation for statistics
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
                clearInterval(timer);
            } else {
                element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }
        }, 16);
    }
    
    // Initial check for elements in view
    revealElements();
    
    // Check for elements on scroll
    window.addEventListener('scroll', revealElements);

    // Mouseover effects for application items
    const applicationItems = document.querySelectorAll('.application-item');
    applicationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Create success message
                const formGroups = this.querySelectorAll('.form-group');
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
                successMessage.style.color = '#4CAF50';
                successMessage.style.padding = '20px';
                successMessage.style.textAlign = 'center';
                successMessage.style.fontSize = '1.2rem';
                
                // Clear form and show success message
                this.reset();
                this.innerHTML = '';
                this.appendChild(successMessage);
            }, 2000);
        });
    }

    // Cursor effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const xPos = e.clientX / window.innerWidth - 0.5;
            const yPos = e.clientY / window.innerHeight - 0.5;
            
            hero.style.backgroundPosition = `calc(50% + ${xPos * 20}px) calc(50% + ${yPos * 20}px)`;
        });
    }

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        }
    });
});
