/* ============================================================
   GO TIME SOFTWARE — INDEX.JS (CLEAN 2026 VERSION)
   Handles:
   - Burger Menu
   - Section Reveal Animations
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
});
