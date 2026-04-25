// HABIT TRACKER APP LOGIC

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
  setAppMeta("Habit Tracker", "Track daily habits with simple checkboxes.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="habit-app">
      <input id="habit-input" placeholder="New habit..." />
      <button id="habit-add">Add Habit</button>
      <ul id="habit-list"></ul>
      <p id="habit-summary"></p>
      <p class="habit-note">
        This demo shows how we handle boolean state (done / not done).
      </p>
    </div>
  `;

  const input = document.getElementById("habit-input");
  const add = document.getElementById("habit-add");
  const list = document.getElementById("habit-list");
  const summary = document.getElementById("habit-summary");

  const habits = [];

  function render() {
    list.innerHTML = "";
    let doneCount = 0;
    habits.forEach((h, idx) => {
      if (h.done) doneCount++;
      const li = document.createElement("li");
      li.innerHTML = `
        <label>
          <input type="checkbox" data-idx="${idx}" ${h.done ? "checked" : ""} />
          ${h.label}
        </label>
      `;
      list.appendChild(li);
    });
    summary.textContent = `Completed: ${doneCount}/${habits.length}`;
  }

  add.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    habits.push({ label: text, done: false });
    input.value = "";
    render();
  });

  list.addEventListener("change", e => {
    const idx = e.target.dataset.idx;
    if (idx === undefined) return;
    habits[idx].done = e.target.checked;
    render();
  });
});
