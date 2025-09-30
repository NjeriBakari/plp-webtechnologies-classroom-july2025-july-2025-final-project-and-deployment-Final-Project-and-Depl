// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== IMAGE SLIDER FUNCTIONALITY =====
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to show a specific slide
function showSlide(index) {
    // Ensure index wraps around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Function to change slides (next/previous)
function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Function to go to a specific slide
function currentSlide(index) {
    showSlide(index);
}

// Auto-advance slides every 5 seconds
if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// ===== FORM VALIDATION =====
const form = document.getElementById('orderForm');

if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const orderInput = document.getElementById('order');
    const successMessage = document.getElementById('successMessage');

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation regex (allows various formats)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;

    // Validate individual field
    function validateField(input, validationFn, errorMsg) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (validationFn(input.value.trim())) {
            formGroup.classList.remove('error');
            return true;
        } else {
            formGroup.classList.add('error');
            if (errorMsg && errorElement) {
                errorElement.textContent = errorMsg;
            }
            return false;
        }
    }

    // Validation functions
    const isNotEmpty = (value) => value.length > 0;
    
    const isValidEmail = (value) => {
        return value.length > 0 && emailRegex.test(value);
    };
    
    const isValidPhone = (value) => {
        return value.length > 0 && phoneRegex.test(value) && value.replace(/\D/g, '').length >= 9;
    };

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, isNotEmpty, 'Please enter your name');
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, isValidEmail, 'Please enter a valid email address');
    });

    phoneInput.addEventListener('blur', () => {
        validateField(phoneInput, isValidPhone, 'Please enter a valid contact number');
    });

    orderInput.addEventListener('blur', () => {
        validateField(orderInput, isNotEmpty, 'Please describe your order');
    });

    // Remove error on input
    [nameInput, emailInput, phoneInput, orderInput].forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.parentElement;
            if (input.value.trim().length > 0) {
                formGroup.classList.remove('error');
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField(nameInput, isNotEmpty, 'Please enter your name');
        const isEmailValid = validateField(emailInput, isValidEmail, 'Please enter a valid email address');
        const isPhoneValid = validateField(phoneInput, isValidPhone, 'Please enter a valid contact number');
        const isOrderValid = validateField(orderInput, isNotEmpty, 'Please describe your order');

        // If all fields are valid
        if (isNameValid && isEmailValid && isPhoneValid && isOrderValid) {
            // Show success message
            successMessage.classList.add('show');
            successMessage.style.display = 'block';

            // Log form data (in real application, this would be sent to a server)
            console.log('Order submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                order: orderInput.value,
                timestamp: new Date().toISOString()
            });

            // Reset form
            form.reset();

            // Remove error classes
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });

            // Scroll to success message
            successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Focus on the input field with error
                const errorInput = firstError.querySelector('input, textarea');
                if (errorInput) {
                    setTimeout(() => errorInput.focus(), 500);
                }
            }
        }
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== ADD SCROLL EFFECT TO NAVBAR =====
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== ANIMATE ELEMENTS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.feature-card, .cake-card, .faq-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== KEYBOARD NAVIGATION FOR SLIDER =====
document.addEventListener('keydown', (e) => {
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// ===== PREVENT FORM RESUBMISSION ON PAGE REFRESH =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== LOG PAGE LOAD (FOR DEBUGGING) =====
console.log('Kipepeo Delights website loaded successfully!');
console.log('Current page:', document.title);