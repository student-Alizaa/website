document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('successMessage');
            clearErrors();
            
            let isValid = true;
            if (!nameField.value.trim()) {
                showError(nameError, 'Name is required');
                addErrorStyle(nameField);
                isValid = false;
            } else if (nameField.value.trim().length < 2) {
                showError(nameError, 'Name must be at least 2 characters long');
                addErrorStyle(nameField);
                isValid = false;
            } else {
                removeErrorStyle(nameField);
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim()) {
                showError(emailError, 'Email is required');
                addErrorStyle(emailField);
                isValid = false;
            } else if (!emailRegex.test(emailField.value.trim())) {
                showError(emailError, 'Please enter a valid email address');
                addErrorStyle(emailField);
                isValid = false;
            } else {
                removeErrorStyle(emailField);
            }
            if (!messageField.value.trim()) {
                showError(messageError, 'Message is required');
                addErrorStyle(messageField);
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                showError(messageError, 'Message must be at least 10 characters long');
                addErrorStyle(messageField);
                isValid = false;
            } else {
                removeErrorStyle(messageField);
            }
            if (isValid) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function addErrorStyle(inputElement) {
        inputElement.style.borderColor = '#ef4444';
        inputElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
    
    function removeErrorStyle(inputElement) {
        inputElement.style.borderColor = '#d1d5db';
        inputElement.style.boxShadow = 'none';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            removeErrorStyle(input);
        });
    }
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
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Only add loading state for form submit buttons
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Sending...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.hero, .about-hero, .contact-hero');
        
        heroElements.forEach(hero => {
            if (hero.getBoundingClientRect().bottom > 0) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    });
});