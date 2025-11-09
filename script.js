// Wedding Invitation - JavaScript

// Smooth scroll function
function scrollTo(selector) {
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

// Navigation active state on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all event cards, family cards, and gallery items
    document.querySelectorAll('.event-card, .family-card, .gallery-item').forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });

    // Countdown to wedding
    const weddingDate = new Date('February 8, 2026 11:15:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
        }
    }
    
    // Initial countdown
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);

    // Add scroll event for navbar animation
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
        }
        
        lastScroll = currentScroll;
    });

    // Gallery hover effect enhancement
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add 'coming-soon' click handler for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            alert('Photo gallery coming soon! Check back later for beautiful wedding moments.');
        });
    });

    // Log website loaded message
    console.log('🎉 Welcome to Abhilash & Sruthi\'s Wedding Invitation!');
    console.log('Wedding Date: February 8, 2026');
    console.log('Muhurtham: 11:15 AM - 11:45 AM');
    console.log('Reception: From 6:00 PM onwards');
});

// Add fade-in animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-on-scroll {
        opacity: 0;
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease-out forwards !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu styles
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            gap: 0;
        }

        .nav-menu.active {
            left: 0;
        }

        .nav-menu li {
            margin: 10px 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyle);