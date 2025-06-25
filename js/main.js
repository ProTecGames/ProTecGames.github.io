// Enhanced Dark Mode Toggle with Smooth Transitions
const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Use sessionStorage instead of localStorage for Claude.ai compatibility
const savedTheme = sessionStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  updateToggleIcon(true);
}

// Enhanced toggle functionality with smooth transitions
toggle.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Add transition class for smooth theme switching
  body.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  
  const isDark = body.classList.toggle("dark");
  sessionStorage.setItem("theme", isDark ? "dark" : "light");
  
  // Update toggle icon
  updateToggleIcon(isDark);
  
  // Create ripple effect
  createRippleEffect(e.target, e);
  
  // Remove transition after animation
  setTimeout(() => {
    body.style.transition = "";
  }, 300);
});

function updateToggleIcon(isDark) {
  toggle.innerHTML = isDark ? "🌙" : "☀️";
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Enhanced Mobile Menu with Smooth Animations
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", (e) => {
  e.preventDefault();
  const isOpen = navLinks.classList.toggle("open");
  
  // Update menu icon
  menuToggle.innerHTML = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
  
  // Add body scroll lock when menu is open
  if (isOpen) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
  
  // Create ripple effect
  createRippleEffect(menuToggle, e);
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    if (navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.innerHTML = "☰";
      menuToggle.setAttribute("aria-expanded", false);
      body.style.overflow = "";
    }
  }
});

// Enhanced Scroll Reveal Animation
const fadeEls = document.querySelectorAll(".fade-in");
const appCards = document.querySelectorAll(".app-card");
const cards = document.querySelectorAll(".card");

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      
      // Add staggered animation for grouped elements
      if (entry.target.classList.contains("app-card")) {
        const cards = entry.target.parentElement.querySelectorAll(".app-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add("animate-in");
          }, index * 100);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
fadeEls.forEach(el => observer.observe(el));
appCards.forEach(el => observer.observe(el));
cards.forEach(el => observer.observe(el));

// Ripple Effect Function
function createRippleEffect(element, event) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
  `;
  
  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Enhanced Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.innerHTML = "☰";
        body.style.overflow = "";
      }
    }
  });
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  });
}

// Enhanced Card Hover Effects
cards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
  
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle.innerHTML = "☰";
    menuToggle.setAttribute("aria-expanded", false);
    body.style.overflow = "";
  }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .animate-in {
    animation: cardEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .card {
    position: relative;
    overflow: hidden;
  }
  
  .card::after {
    content: '';
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  .card:hover::after {
    opacity: 1;
  }
`;
document.head.appendChild(style);

// Initialize theme toggle icon
updateToggleIcon(body.classList.contains("dark"));

// Performance optimization: Debounced scroll handler
let ticking = false;
function updateOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Any scroll-based animations go here
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', updateOnScroll);

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
  body.classList.add('loaded');
  
  // Trigger initial animations
  setTimeout(() => {
    fadeEls.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, 500);
});