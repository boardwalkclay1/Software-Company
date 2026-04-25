// TIMER APP LOGIC (GOOD FOR CANVAS LAYOUT TOO)

function detectLayout() {
  const hasCanvas = document.getElementById("app-canvas");
  const hasFeed = document.getElementById("app-root") && document.body.classList.contains("app-layout") && document.querySelector(".app-feed");
  const hasSidebar = document.getElementById("sidebar-root");
  const hasCardStack = document.getElementById("app-root") && document.querySelector(".card-stack");
  if (hasCanvas) return "canvas";
  if (hasFeed) return "feed";
  if (hasSidebar) return "split";
  if (hasCardStack) return "cards";
  return "blocks";
}

function setAppMeta(title, description) {
  const t = document.getElementById("app-title");
  const d = document.getElementById("app-description");
  if (t) t.textContent = title;
  if (d) d.textContent = description;
}

document.addEventListener("DOMContentLoaded", () => {
  const layout = detectLayout();
  setAppMeta("Timer App", "Simple countdown timer. Good for canvas or block layouts.");

  if (layout === "canvas") {
    const canvas = document.getElementById("app-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let remaining = 30;
    let interval = null;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Timer: ${remaining}s`, canvas.width / 2, canvas.height / 2);
    }

    function start() {
      if (interval) return;
      interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearInterval(interval);
          interval = null;
          remaining = 0;
        }
        draw();
      }, 1000);
    }

    draw();
    canvas.addEventListener("click", () => {
      if (!interval) {
        remaining = 30;
        start();
      }
    });
  } else {
    let root = document.getElementById("app-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "app-root";
      document.body.appendChild(root);
    }

    root.innerHTML = `
      <div class="timer-app">
        <p id="timer-display">30</p>
        <button id="timer-start">Start</button>
        <p class="timer-note">
          This demo shows how we handle intervals and state updates.
        </p>
      </div>
    `;

    const display = document.getElementById("timer-display");
    const startBtn = document.getElementById("timer-start");
    let remaining = 30;
    let interval = null;

    startBtn.addEventListener("click", () => {
      if (interval) return;
      remaining = 30;
      display.textContent = remaining;
      interval = setInterval(() => {
        remaining--;
        display.textContent = remaining;
        if (remaining <= 0) {
          clearInterval(interval);
          interval = null;
        }
      }, 1000);
    });
  }
});
