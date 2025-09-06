/* ===============================
   Portfolio – Aurora Theme Scripts
   =============================== */

// Navbar scroll shadow
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when link clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Odometer counters
function animateOdometers() {
  const odometers = document.querySelectorAll(".odometer");
  odometers.forEach((od) => {
    const target = od.getAttribute("data-target");
    if (target) {
      od.innerHTML = target;
    }
  });
}

// Skill bars animation
function animateSkills() {
  const skills = document.querySelectorAll(".skill-progress");
  skills.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (width) {
      bar.style.width = width;
    }
  });
}

// Intersection Observer for reveal effects
const revealElements = document.querySelectorAll(
  ".section-header, .expertise-card, .timeline-item, .fp-card, .contact-item, .contact-form"
);

const observerOptions = {
  threshold: 0.2,
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-visible");

      // Special triggers
      if (entry.target.id === "about") {
        animateOdometers();
        animateSkills();
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply observer
revealElements.forEach((el) => {
  el.classList.add("reveal"); // initial hidden state
  revealObserver.observe(el);
});

// Fallback: Run odometer/skills if already visible
document.addEventListener("DOMContentLoaded", () => {
  const about = document.getElementById("about");
  if (about) {
    const rect = about.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      animateOdometers();
      animateSkills();
    }
  }
});
