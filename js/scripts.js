/**
 * Waite.EYTS - Custom JavaScript
 * This file contains all the custom JavaScript for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScroll();
    initNavbarScroll();
    initAnimations();
    initFormSubmission();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .footer-links a, a.btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for navbar
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

/**
 * Change navbar background on scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize animations for elements
 */
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.service-card, .article-card, .feature-card, .timeline-item, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-btns .btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('animate-pulse');
    });
}

/**
 * Handle form submissions
 */
function initFormSubmission() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form data
            if (!name || !email || !message) {
                showFormMessage(contactForm, 'Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            showFormMessage(contactForm, 'Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('input[type="email"]').value;
            
            // Validate form data
            if (!email) {
                showFormMessage(newsletterForm, 'Please enter your email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            showFormMessage(newsletterForm, 'Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

/**
 * Show form submission message
 */
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message', `form-message-${type}`);
    messageElement.textContent = message;
    
    // Add message to form
    form.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

/**
 * Add CSS class for form message styling
 */
(function addFormMessageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            padding: 10px;
            margin-top: 15px;
            border-radius: 5px;
            font-weight: 500;
        }
        .form-message-success {
            background-color: rgba(23, 212, 146, 0.1);
            color: #17d492;
        }
        .form-message-error {
            background-color: rgba(220, 53, 69, 0.1);
            color: #dc3545;
        }
    `;
    document.head.appendChild(style);
})();