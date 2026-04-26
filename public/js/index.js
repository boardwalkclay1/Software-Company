/* ============================
   GO TIME SOFTWARE – INDEX LOGIC
   Clean version, no extra CSS files
   ============================ */

// INTRO REMOVAL
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.remove();
  }, 2500);
});

// BUBBLE GENERATOR (SAFE – NO PAGE GROWTH)
function spawnBubble() {
  const b = document.createElement("div");
  b.className = "bubble";

  const size = Math.floor(Math.random() * 70) + 40;
  b.style.width = size + "px";
  b.style.height = size + "px";

  // ONLY spawn inside the visible screen
  b.style.left = Math.random() * window.innerWidth + "px";
  b.style.top = Math.random() * window.innerHeight + "px";

  b.style.animationDuration = (Math.random() * 8 + 6) + "s";

  document.body.appendChild(b);

  setTimeout(() => b.remove(), 15000);
}

setInterval(spawnBubble, 1200);

// SCROLL HELPERS
function scrollToTemplates() {
  const el = document.getElementById("templates");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function scrollToOrder() {
  const el = document.getElementById("order");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// OPEN TEMPLATE (WEB TEMPLATES)
function openTemplate(name) {
  window.location.href = `./templates/web/pages/${name}.html`;
}

// OPEN APP TEMPLATE (FOR APPS PAGE)
function openAppTemplate(name) {
  window.location.href = `./templates/apps/pages/${name}.html`;
}

// ENABLE HORIZONTAL SCROLLING FOR TEMPLATE SCROLLER
document.addEventListener("DOMContentLoaded", () => {
  const scroller = document.getElementById("templateScroller");
  if (!scroller) return;

  scroller.addEventListener("wheel", (e) => {
    e.preventDefault();
    scroller.scrollLeft += e.deltaY;
  });
});
