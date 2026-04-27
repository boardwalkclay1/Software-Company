/* ============================================================
   GO TIME SOFTWARE – INDEX JS
   Cinematic • Modular • Real Systems
   ============================================================ */

/* ============================================================
   INTRO ANIMATION + BACKGROUND SLAM
   ============================================================ */

window.addEventListener("load", () => {
  const body = document.body;
  const intro = document.getElementById("intro-screen");

  // 1. Background slam + fade-in main content
  setTimeout(() => {
    body.classList.add("ready");
  }, 600); // matches slam animation timing

  // 2. Remove intro screen after animation
  setTimeout(() => {
    if (intro) {
      intro.style.opacity = "0";
      intro.style.transition = "opacity 0.4s ease-out";
      setTimeout(() => intro.remove(), 400);
    }
  }, 1200);
});

/* ============================================================
   BASIC NAVIGATION HELPERS
   ============================================================ */

function goTo(page) {
  window.location.href = `/pages/${page}.html`;
}

function goToApp(name) {
  window.location.href = `/pages/apps.html#${name}`;
}

function openTemplate(name) {
  window.location.href = `/templates/web/pages/${name}.html`;
}

/* ============================================================
   BUILD IoT STRIP (LOCAL IMAGES ONLY)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  buildLocalIotStrip();
});

function buildLocalIotStrip() {
  const strip = document.querySelector(".iot-scroll");
  if (!strip) return;

  // Only two real images exist in repo:
  const img1 = "/assets/img/go-time-logo.png";
  const img2 = "/assets/img/go-time-background.jpg";

  const items = [
    {
      name: "Sensor Hubs",
      description: "WiFi-enabled boards that collect data from motion, distance, and environment sensors.",
      photo: img1
    },
    {
      name: "Control Relays",
      description: "Modules that switch lights, pumps, motors, and devices based on your rules.",
      photo: img2
    },
    {
      name: "Live Dashboards",
      description: "Real-time dashboards that show sensor data, alerts, and system status.",
      photo: img1
    }
  ];

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "iot-item";

    div.innerHTML = `
      <img src="${item.photo}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    `;

    strip.appendChild(div);
  });
}

/* ============================================================
   OPTIONAL: SMOOTH SCROLL (if needed later)
   ============================================================ */

function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  window.scrollTo({
    top: el.offsetTop - 40,
    behavior: "smooth"
  });
}
