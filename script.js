// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});
// ===== THEME TOGGLE (IMPROVED LOGIC) =====
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (savedTheme === 'dark') {
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
} else {
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
}

const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
    } else {
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }
};

themeToggle.addEventListener('click', switchTheme);
themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchTheme();
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Keyboard accessibility for hamburger menu
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
const textToType = "Mohamed Arjaz";
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 2000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Allow default for external hashes (just in case)
        if (targetId.length === 0 || targetId === '#') return;

        e.preventDefault();
        
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .cert-card, .stat-item, .experience-card, .language-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===== CONTACT FORM HANDLING WITH FORMSPREE =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button[type="submit"]');
        const formStatus = contactForm.querySelector('.form-status');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        formStatus.className = 'form-status'; // reset
        formStatus.textContent = '';

        try {
            // Replace with your Formspree form ID
            const formData = new FormData(contactForm);
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                formStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success show';
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            button.innerHTML = '<i class="fas fa-times"></i> Failed';
            formStatus.textContent = '✗ Failed to send. Please email me directly at arjaz.mohamed97@gmail.com';
            formStatus.className = 'form-status error show';
        }
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 5000);
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});

// ===== FLOATING BUTTON =====
const floatingBtn = document.querySelector('.floating-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingBtn.classList.add('visible');
    } else {
        floatingBtn.classList.remove('visible');
    }
});

floatingBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Keyboard accessibility
floatingBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        floatingBtn.click();
    }
});

// ===== TERMINAL BUTTON EFFECTS =====
const terminalButtons = document.querySelectorAll('.terminal-button');
terminalButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('red')) {
            const terminal = document.querySelector('.terminal');
            terminal.style.opacity = '0';
            setTimeout(() => {
                terminal.style.opacity = '1';
            }, 500);
        }
        // yellow/green could be extended for minimize/maximize
    });
});

// ===== STAT COUNTER ANIMATION (IMPROVED) =====
const animateCount = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // ~60fps
    let current = 0;

    const updateCount = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCount();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            if (h3 && h3.hasAttribute('data-target')) {
                animateCount(h3);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== OPTIMIZED PARTICLE EFFECT (SOFTER) =====
let particleCount = 0;
const MAX_PARTICLES = 15;

function createParticle() {
    if (particleCount >= MAX_PARTICLES) return;
    
    const particle = document.createElement('div');
    const size = 1 + Math.random() * 2; // 1px–3px
    particle.style.position = 'fixed';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = 'var(--primary-color)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.35';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.zIndex = '-1';
    particle.style.animation = 'float 3s ease-in-out';
    
    document.body.appendChild(particle);
    particleCount++;
    
    setTimeout(() => {
        particle.remove();
        particleCount--;
    }, 3000);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateY(-100px) translateX(${Math.random() * 50 - 25}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Create particles with reduced frequency (800ms instead of 300ms)
setInterval(createParticle, 800);

// ===== CONSOLE EASTER EGG =====
console.log('%c👾 Mohamed Arjaz - Cybersecurity Portfolio Loaded! 👾', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c🔒 eCPPTv3 Certified | ENSA Tétouan 🔒', 'color: #0099ff; font-size: 14px;');
console.log('%c📧 Contact: arjaz.mohamed97@gmail.com', 'color: #9aa0a6; font-size: 12px;');
console.log('%c\n🚀 Tech Stack: HTML5, CSS3, Vanilla JavaScript', 'color: #00ff88; font-size: 12px;');
console.log('%c🎨 Design: Cyberpunk Glassmorphism Theme', 'color: #0099ff; font-size: 12px;');
console.log('%c⚡ Looking for security vulnerabilities? Good luck! 😉', 'color: #ff0080; font-size: 12px;');

// ===== LANGUAGE LEVEL BAR ANIMATION =====
const languageLevelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.level-bar');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            languageLevelObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.language-card').forEach(card => {
    languageLevelObserver.observe(card);
});

// ===== PERFORMANCE OPTIMIZATION (Debounce utility, ready if needed) =====
let scrollTimeout;
const debounceScroll = (func, delay) => {
    return function(...args) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => func.apply(this, args), delay);
    };
};



console.log('%c✨ All systems operational!', 'color: #00ff88; font-size: 14px; font-weight: bold;');