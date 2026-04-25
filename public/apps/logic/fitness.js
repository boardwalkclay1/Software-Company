// FITNESS APP LOGIC

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
  setAppMeta("Fitness Tracker", "Log workouts and see a simple summary.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="fitness-app">
      <div class="fitness-input-row">
        <input id="fit-activity" placeholder="Activity (e.g. Run)" />
        <input id="fit-minutes" type="number" placeholder="Minutes" />
        <button id="fit-add">Log</button>
      </div>
      <ul id="fit-list"></ul>
      <p id="fit-summary"></p>
      <p class="fitness-note">
        This demo shows how we aggregate data (total minutes) from user input.
      </p>
    </div>
  `;

  const activity = document.getElementById("fit-activity");
  const minutes = document.getElementById("fit-minutes");
  const addBtn = document.getElementById("fit-add");
  const list = document.getElementById("fit-list");
  const summary = document.getElementById("fit-summary");

  const entries = [];

  function render() {
    list.innerHTML = "";
    let total = 0;
    entries.forEach(e => {
      total += e.minutes;
      const li = document.createElement("li");
      li.textContent = `${e.activity} — ${e.minutes} min`;
      list.appendChild(li);
    });
    summary.textContent = `Total: ${total} minutes logged.`;
  }

  addBtn.addEventListener("click", () => {
    const act = activity.value.trim();
    const mins = Number(minutes.value);
    if (!act || !mins) return;
    entries.push({ activity: act, minutes: mins });
    activity.value = "";
    minutes.value = "";
    render();
  });
});
