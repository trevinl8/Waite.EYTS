document.addEventListener('DOMContentLoaded', function() {
    // Update navigation links to use smooth scrolling
    setupSmoothScrolling();
    
    // Setup animations for elements when they come into view
    setupAnimations();
    
    // Update active navigation link on scroll
    setupScrollSpy();
    
    // Setup scroll-to-top button
    setupScrollToTop();
});

/**
 * Setup smooth scrolling for all navigation links
 */
function setupSmoothScrolling() {
    // Get all links that have a hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            
            // Skip if the link is just "#" (often used for buttons)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            // If the target element exists, scroll to it
            if (targetElement) {
                // Get the navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate the position to scroll to (accounting for navbar height)
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update the URL hash (optional)
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Update navigation links to point to the correct sections
    updateNavigationLinks();
}

/**
 * Update navigation links to point to the correct sections
 */
function updateNavigationLinks() {
    // Update main navigation links
    const homeLink = document.querySelector('.navbar-nav .nav-item:nth-child(1) .nav-link');
    const aboutLink = document.querySelector('.navbar-nav .nav-item:nth-child(2) .nav-link');
    const servicesLink = document.querySelector('.navbar-nav .nav-item:nth-child(3) .nav-link');
    const contactLink = document.querySelector('.navbar-nav .nav-item:nth-child(5) .nav-link');
    
    if (homeLink) homeLink.setAttribute('href', '#home');
    if (aboutLink) aboutLink.setAttribute('href', '#about');
    if (servicesLink) servicesLink.setAttribute('href', '#services');
    if (contactLink) contactLink.setAttribute('href', '#contact');
    
    // Update CTA buttons
    const exploreCta = document.querySelector('.hero-section .btn-cta');
    if (exploreCta) exploreCta.setAttribute('href', '#services');
}

/**
 * Setup animations for elements when they come into view
 */
function setupAnimations() {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Create an Intersection Observer to detect when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in view
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger the animation
                entry.target.classList.add('active');
                // Unobserve the element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options for the observer
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-up, .zoom-in').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Add animation classes to elements
 */
function addAnimationClasses() {
    // Section titles and subtitles
    document.querySelectorAll('.section-title').forEach(element => {
        element.classList.add('zoom-in');
    });
    
    document.querySelectorAll('.section-subtitle').forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Hero section elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButton = document.querySelector('.hero-section .btn-cta');
    const heroImage = document.querySelector('.hero-img');
    
    if (heroTitle) heroTitle.classList.add('zoom-in');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in');
    if (heroButton) heroButton.classList.add('slide-up');
    if (heroImage) heroImage.classList.add('slide-in-right');
    
    // About section elements
    const aboutBox = document.querySelector('.container-box');
    const aboutPoints = document.querySelectorAll('.about-point');
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    
    if (aboutBox) aboutBox.classList.add('slide-in-left');
    aboutPoints.forEach((point, index) => {
        point.classList.add('slide-up');
        // Add a delay to stagger the animations
        point.style.transitionDelay = `${index * 0.1}s`;
    });
    
    aboutParagraphs.forEach((paragraph, index) => {
        paragraph.classList.add('fade-in');
        paragraph.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('zoom-in');
        // Add a delay to stagger the animations
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Service icons and titles
    document.querySelectorAll('.learn-icon, .people-icon, .digital-icon').forEach(icon => {
        icon.classList.add('slide-up');
    });
    
    document.querySelectorAll('.service-title').forEach(title => {
        title.classList.add('fade-in');
    });
    
    // Why choose us cards
    document.querySelectorAll('.trans-card').forEach((card, index) => {
        card.classList.add('slide-up');
        // Add a delay to stagger the animations
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Contact section elements
    const contactBox = document.querySelector('.contact-box');
    if (contactBox) contactBox.classList.add('zoom-in');
    
    // Contact form elements
    document.querySelectorAll('.contact-form').forEach((input, index) => {
        input.classList.add('fade-in');
        input.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Footer elements
    const footerColumns = document.querySelectorAll('.footer-section .col-lg-4, .footer-section .col-lg-2, .footer-section .col-lg-3');
    footerColumns.forEach((column, index) => {
        column.classList.add('fade-in');
        // Add a delay to stagger the animations
        column.style.transitionDelay = `${index * 0.1}s`;
    });
}

/**
 * Setup scroll spy to update active navigation link on scroll
 */
function setupScrollSpy() {
    // Get all sections
    const sections = document.querySelectorAll('section[id]');
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        // Get current scroll position
        const scrollY = window.pageYOffset;
        
        // Loop through sections to find the one in view
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Adjust for navbar height
            const sectionId = section.getAttribute('id');
            
            // If the section is in view
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all navigation links
                document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to the corresponding navigation link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}


/**
 * Setup scroll-to-top button functionality
 */
function setupScrollToTop() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when the button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}