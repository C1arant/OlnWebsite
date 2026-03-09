document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const nav = document.querySelector(".nav");
  const navMenu = document.querySelector(".site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  body.classList.add("js-enabled");

  // Nav scroll state
  const updateNavOnScroll = () => {
    if (!nav) return;
    nav.classList.toggle("nav-scrolled", window.scrollY > 24);
  };

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll, { passive: true });

  // Auto year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("menu-open", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Reveal on scroll
  const revealItems = document.querySelectorAll(
    ".section-head, .card, .package, .member, .featured-media, .featured-copy, .booking-note, .embed-card"
  );

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });
});