// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.classList.add('active');
        sunIcon.classList.remove('active');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
}

// Mobile Menu Toggle
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation
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

// Start typing when page loads (after loading screen)
window.addEventListener('load', () => {
    setTimeout(typeText, 2000);
});

// Smooth scroll for all anchor links with offset for navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignore if href is just '#'
        if (!targetId || targetId === '#') return;

        e.preventDefault();

        // Special handling for #home
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

// Scroll reveal animation
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

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .cert-card, .stat-item, .experience-card, .language-card')
    .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

// Contact Form Handling (frontend only)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '✓ Message Sent!';
        button.style.background = 'var(--primary-color)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Active nav link on scroll
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Floating Button
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

// Terminal button effects
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
    });
});

// Animate terminal lines
const terminalLines = document.querySelectorAll('.terminal-body p');
let delay = 0;
terminalLines.forEach(line => {
    setTimeout(() => {
        line.style.opacity = '1';
    }, delay);
    delay += 200;
});

// Simple particle background effect (very lightweight)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--primary-color)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.5';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.zIndex = '-1';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 3000);
}

setInterval(createParticle, 300);

// Console easter egg
console.log('%c👾 Cybersecurity Portfolio Loaded 👾', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c🔒 eCPPTv3 | ENSA Tétouan | HackTheBox 🔒', 'color: #0099ff; font-size: 14px;');
console.log('%c📧 Contact: arjaz.mohamed97@gmail.com', 'color: #9aa0a6; font-size: 12px;');