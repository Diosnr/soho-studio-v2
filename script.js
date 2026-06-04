// Smooth scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in-scroll elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Store subscription in localStorage
            const subscribers = JSON.parse(localStorage.getItem('sohoSubscribers') || '[]');
            
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('sohoSubscribers', JSON.stringify(subscribers));
            }
            
            // Show success message
            newsletterSuccess.classList.add('show');
            emailInput.value = '';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                newsletterSuccess.classList.remove('show');
            }, 3000);
        }
    });
}

// Update navigation based on auth status
function updateNavigation() {
    const localAuth = localStorage.getItem('sohoAuth');
    const sessionAuth = sessionStorage.getItem('sohoAuth');
    const authData = localAuth ? JSON.parse(localAuth) : (sessionAuth ? JSON.parse(sessionAuth) : null);
    
    const authLink = document.getElementById('authLink');
    
    if (authLink && authData && authData.loggedIn) {
        authLink.textContent = 'Logout';
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('sohoAuth');
            sessionStorage.removeItem('sohoAuth');
            window.location.href = 'index.html';
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateNavigation);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
});