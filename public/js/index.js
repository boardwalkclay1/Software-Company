/* ============================================================
   GO TIME SOFTWARE — INDEX.JS
   Handles:
   - Burger Menu
   - Section Reveal Animations
   - Smooth Scroll
   - Click Tracking (Dashboard Ready)
   - Iframe Interaction Tracking
   ============================================================ */

/* -----------------------------
   BURGER MENU
----------------------------- */
const burger = document.querySelector(".burger");
const nav = document.querySelector(".main-nav");

if (burger) {
  burger.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";
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

/* -----------------------------
   SMOOTH SCROLL FOR CTA BUTTONS
----------------------------- */
document.querySelectorAll('a[href^="/pages"]').forEach(link => {
  link.addEventListener("click", (e) => {
    // Let normal navigation happen — this hook is for analytics
    trackClick("nav_link", link.getAttribute("href"));
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

  // Replace with your admin endpoint later
  const ENDPOINT = "https://your-admin-endpoint.com/api/track";

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {
    // Fail silently — user experience first
  });
}

/* Track CTA buttons */
document.querySelectorAll(".cta-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    trackClick("cta_click", btn.textContent.trim());
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

/* -----------------------------
   OPTIONAL: PARALLAX BACKGROUND
----------------------------- */
window.addEventListener("scroll", () => {
  const y = window.scrollY * 0.2;
  document.body.style.backgroundPosition = `center calc(50% + ${y}px)`;
});
