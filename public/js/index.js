// Load CSS files
function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("./css/index-layout.css");
loadCSS("./css/index-theme.css");
loadCSS("./css/index-effects.css");

// Intro removal
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro-screen").remove();
  }, 2500);
});

// Bubble generator
function spawnBubble() {
  const b = document.createElement("div");
  b.className = "bubble";
  const size = Math.floor(Math.random() * 70) + 40;
  b.style.width = size + "px";
  b.style.height = size + "px";
  b.style.left = Math.random() * 100 + "vw";
  b.style.top = Math.random() * 100 + "vh";
  b.style.animationDuration = (Math.random() * 8 + 6) + "s";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 15000);
}
setInterval(spawnBubble, 1200);

// Scroll helpers
function scrollToTemplates() {
  document.getElementById("templates").scrollIntoView({ behavior: "smooth" });
}

function scrollToOrder() {
  document.getElementById("order").scrollIntoView({ behavior: "smooth" });
}

// Open template
function openTemplate(name) {
  window.location.href = `./templates/web/pages/${name}.html`;
}
