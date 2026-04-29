/* ============================================================
   GO TIME SOFTWARE — INDEX.JS (FINAL CLEAN VERSION)
   Handles:
   - Burger Menu
   - Section Reveal Animations
   - Dropdown Categories
   - Dropdown Iframe Descriptions
   - Click Tracking (Dashboard Ready)
   - Iframe Interaction Tracking
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     BURGER MENU
  ----------------------------- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main-nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* -----------------------------
     SECTION REVEAL ON SCROLL
  ----------------------------- */
  const sections = document.querySelectorAll(".section");

  function revealSections() {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < trigger) sec.classList.add("visible");
    });
  }

  window.addEventListener("scroll", revealSections);
  window.addEventListener("load", revealSections);
  revealSections();

  /* -----------------------------
     CATEGORY DROPDOWNS
  ----------------------------- */
  document.querySelectorAll(".category-title").forEach(title => {
    title.addEventListener("click", () => {
      const parent = title.parentElement;
      if (parent) parent.classList.toggle("open");
    });
  });

  /* -----------------------------
     IFRAME DESCRIPTION DROPDOWNS
  ----------------------------- */
  document.querySelectorAll(".frame-desc").forEach(desc => {
    desc.addEventListener("click", () => {
      desc.classList.toggle("open");
    });
  });

  /* -----------------------------
     CLICK TRACKING (ADMIN READY)
  ----------------------------- */
  function trackClick(type, value) {
    const payload = {
      event: type,
      value,
      page: "index",
      timestamp: new Date().toISOString()
    };

    const ENDPOINT = "https://your-admin-endpoint.com/api/track";

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  /* Track CTA buttons */
  document.querySelectorAll(".cta-btn, .nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      trackClick("cta_click", btn.textContent.trim());
    });
  });

  /* Track nav link clicks */
  document.querySelectorAll('a[href^="/pages"]').forEach(link => {
    link.addEventListener("click", () => {
      trackClick("nav_link", link.getAttribute("href"));
    });
  });

  /* -----------------------------
     IFRAME INTERACTION TRACKING
  ----------------------------- */
  const iframes = document.querySelectorAll(".preview-card iframe");

  iframes.forEach((frame, index) => {
    frame.addEventListener("load", () => {
      trackClick("iframe_loaded", `iframe_${index}`);
    });

    frame.addEventListener("mouseenter", () => {
      trackClick("iframe_hover", `iframe_${index}`);
    });
  });
});
