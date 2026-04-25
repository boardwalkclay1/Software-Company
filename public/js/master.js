// ======================================================
//  GO TIME SOFTWARE — MASTER JS CONTROLLER
//  Controls:
//   - Page loading
//   - Navigation
//   - Template viewer routing
//   - Global bubble effects
//   - Page transitions
//   - Intro → Site handoff
// ======================================================

// ------------------------------
// Load CSS dynamically
// ------------------------------
function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

// Global CSS for the whole site
loadCSS("./css/base.css");
loadCSS("./css/intro.css");

// ------------------------------
// Intro → Site Shell Handoff
// ------------------------------
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");
  const shell = document.getElementById("site-shell");

  setTimeout(() => {
    intro.classList.add("fade-out");
    setTimeout(() => {
      intro.remove();
      shell.classList.remove("hidden");
      shell.classList.add("fade-in");
    }, 800);
  }, 1800);
});

// ------------------------------
// Global Bubble Engine
// ------------------------------
function spawnBubble() {
  const b = document.createElement("div");
  b.className = "bubble";

  const size = Math.floor(Math.random() * 70) + 40;
  b.style.width = size + "px";
  b.style.height = size + "px";

  b.style.left = Math.random() * 100 + "vw";
  b.style.top = Math.random() * 100 + "vh";

  b.style.animationDuration = (Math.random() * 8 + 6) + "s";

  b.addEventListener("click", () => {
    b.classList.add("bubble-pop");
    setTimeout(() => b.remove(), 300);
  });

  document.body.appendChild(b);
  setTimeout(() => b.remove(), 15000);
}

setInterval(spawnBubble, 1200);

// ------------------------------
// Page Loader (SPA-style)
// ------------------------------
const pageRoot = document.getElementById("page-root");

async function loadPage(page) {
  pageRoot.classList.add("page-transition-out");

  setTimeout(async () => {
    const res = await fetch(`./pages/${page}.html`);
    const html = await res.text();
    pageRoot.innerHTML = html;

    pageRoot.classList.remove("page-transition-out");
    pageRoot.classList.add("page-transition-in");

    setTimeout(() => {
      pageRoot.classList.remove("page-transition-in");
    }, 400);
  }, 250);
}

// ------------------------------
// Navigation Handler
// ------------------------------
document.querySelectorAll("[data-nav]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // If it's a template viewer page
    if (href.includes("templates.html")) {
      loadPage("templates");
      return;
    }

    // If it's a dashboard page
    if (href.includes("dashboards.html")) {
      loadPage("dashboards");
      return;
    }

    // If it's an apps page
    if (href.includes("apps.html")) {
      loadPage("apps");
      return;
    }

    // If it's IoT
    if (href.includes("iot.html")) {
      loadPage("iot");
      return;
    }

    // Contact
    if (href.includes("contact.html")) {
      loadPage("contact");
      return;
    }
  });
});

// ------------------------------
// Template Viewer Logic
// ------------------------------
window.openTemplate = function (name) {
  // Load the full template page
  window.location.href = `./templates/web/pages/${name}.html`;
};

// ------------------------------
// Horizontal Template Scroller
// ------------------------------
window.initTemplateScroller = function () {
  const scroller = document.getElementById("templateScroller");
  if (!scroller) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  scroller.addEventListener("mousedown", e => {
    isDown = true;
    scroller.classList.add("active");
    startX = e.pageX - scroller.offsetLeft;
    scrollLeft = scroller.scrollLeft;
  });

  scroller.addEventListener("mouseleave", () => {
    isDown = false;
    scroller.classList.remove("active");
  });

  scroller.addEventListener("mouseup", () => {
    isDown = false;
    scroller.classList.remove("active");
  });

  scroller.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroller.offsetLeft;
    const walk = (x - startX) * 2;
    scroller.scrollLeft = scrollLeft - walk;
  });
};

// ------------------------------
// Auto-init when templates page loads
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("templateScroller")) {
    window.initTemplateScroller();
  }
});
