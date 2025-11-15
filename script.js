// Wedding Invitation - JavaScript

// Smooth scroll function
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and gallery items
    document.querySelectorAll('.event-card, .family-card, .gallery-item').forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });

    // ============================================
    // Countdown Timer
    // ============================================
    const weddingDateTime = new Date('February 8, 2026 11:15:00').getTime();
    const ceremonyEndTime = new Date('February 8, 2026 11:45:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDateTime - now;
        const distanceFromEnd = ceremonyEndTime - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const countdownDisplay = document.getElementById('countdown-display');
        const marriedMessage = document.getElementById('married-message');
        
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
        
        if (distanceFromEnd < 0) {
            // After 11:45 AM - Show "We Got Married"
            if (countdownDisplay) countdownDisplay.style.display = 'none';
            if (marriedMessage) {
                marriedMessage.style.display = 'block';
                marriedMessage.innerHTML = '<h2>🎉 We Got Married! 🎉</h2>';
            }
        } else if (distance > 0) {
            // Before wedding - Show countdown
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
            
            if (countdownDisplay) countdownDisplay.style.display = 'flex';
            if (marriedMessage) marriedMessage.style.display = 'none';
        } else {
            // Between 11:15 AM and 11:45 AM - Show ceremony in progress
            if (countdownDisplay) countdownDisplay.style.display = 'none';
            if (marriedMessage) {
                marriedMessage.style.display = 'block';
                marriedMessage.innerHTML = '<h2>🎊 Ceremony in Progress! 🎊</h2>';
            }
        }
    }
    
    // Initial countdown update
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);

    // ============================================
    // Navbar Scroll Animation
    // ============================================
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // Gallery Items Click Handler
    // ============================================
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            showGalleryMessage();
        });
    });

    // Gallery message function
    function showGalleryMessage() {
        // You can replace this with your own logic (modal, lightbox, etc.)
        console.log('Gallery item clicked - Coming soon!');
    }

    // ============================================
    // Log Website Loaded
    // ============================================
    console.log('🎉 Welcome to Abhilash & Sruthi\'s Wedding Invitation!');
    console.log('Wedding Date: February 8, 2026');
    console.log('Muhurtham: 11:15 AM - 11:45 AM');
    console.log('Reception: From 6:00 PM onwards');
    console.log('Location: Aryad Community Hall');

});

// ============================================
// Fade-in animation styles (fallback CSS-in-JS)
// ============================================
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

// ============================================
// Accessibility: Keyboard Navigation
// ============================================
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});
