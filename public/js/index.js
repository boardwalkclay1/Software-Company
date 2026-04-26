/* ============================
   GO TIME SOFTWARE – NEW INDEX JS
   Cinematic + Clean + No Bubbles
   ============================ */

// INTRO REMOVAL
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.remove();
  }, 2500);
});

// PAGE NAVIGATION
function goTo(page) {
  if (page === "sites") window.location.href = "./sites.html";
  if (page === "apps") window.location.href = "./apps.html";
  if (page === "iot") window.location.href = "./iot.html";
}

// SMOOTH SCROLL HELPERS (if needed)
function scrollToTemplates() {
  const el = document.getElementById("templates");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function scrollToOrder() {
  const el = document.getElementById("order");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
