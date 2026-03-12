/**
 * Schmittl's Cocktailbar - Main JavaScript
 * Core functionality for the website
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initForms();
});

/**
 * Initialize navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navbarToggle?.addEventListener('click', () => {
        navbarMenu?.classList.toggle('active');

        // Animate hamburger
        const spans = navbarToggle.querySelectorAll('span');
        if (navbarMenu?.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu?.classList.remove('active');
            const spans = navbarToggle?.querySelectorAll('span');
            spans?.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.navbar-link').forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/**
 * Initialize form handling
 */
function initForms() {
    const forms = document.querySelectorAll('form:not([onsubmit])'); // Exclude forms with inline onsubmit (like login)

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            // Add loading state
            const originalText = submitBtn.textContent;
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                // Success state
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Gesendet! ✓';
                submitBtn.classList.add('success');

                showNotification('Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.', 'success');
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Add stagger animation to grid items
    const gridItems = document.querySelectorAll('.grid > *');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Render content from ContentManager
 */
function renderContent(elementId, contentPath, defaultValue = '') {
    const element = document.getElementById(elementId);
    if (element && window.contentManager) {
        const content = window.contentManager.get(contentPath);
        element.textContent = content || defaultValue;
    }
}

/**
 * Render HTML content from ContentManager
 */
function renderHTML(elementId, contentPath, defaultValue = '') {
    const element = document.getElementById(elementId);
    if (element && window.contentManager) {
        const content = window.contentManager.get(contentPath);
        element.innerHTML = content || defaultValue;
    }
}

/**
 * Render image from ContentManager
 */
function renderImage(elementId, contentPath, defaultSrc = '') {
    const element = document.getElementById(elementId);
    if (element && window.contentManager) {
        const src = window.contentManager.get(contentPath);
        element.src = src || defaultSrc;
    }
}

/**
 * Format price
 */
function formatPrice(price) {
    return `${parseFloat(price).toFixed(2).replace('.', ',')} €`;
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Smooth scroll to element
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: var(--spacing-lg) var(--spacing-xl);
        background: rgba(31, 31, 58, 0.95);
        backdrop-filter: blur(10px);
        border-radius: var(--radius-lg);
        color: var(--color-text);
        box-shadow: var(--shadow-xl);
        z-index: var(--z-tooltip);
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
      }
      
      .notification-success {
        border-left: 4px solid var(--color-success);
      }
      
      .notification-error {
        border-left: 4px solid var(--color-error);
      }
      
      .notification-warning {
        border-left: 4px solid var(--color-warning);
      }
      
      .notification-info {
        border-left: 4px solid var(--color-accent-neon);
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Export functions to global scope for use in inline scripts
window.renderContent = renderContent;
window.renderHTML = renderHTML;
window.renderImage = renderImage;
window.formatPrice = formatPrice;
window.formatDate = formatDate;
window.showNotification = showNotification;
