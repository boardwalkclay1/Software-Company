// TODO APP LOGIC

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
  setAppMeta("Todo App", "Simple task manager. Add, complete, and remove tasks. Logic is fully modular.");

  let root = document.getElementById("app-root");
  if (!root && layout === "canvas") {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  if (!root) return;

  root.innerHTML = `
    <div class="todo-app">
      <div class="todo-input-row">
        <input id="todo-input" placeholder="Add a task..." />
        <button id="todo-add">Add</button>
      </div>
      <ul id="todo-list" class="todo-list"></ul>
      <p class="todo-note">
        This app shows how we handle state, events, and DOM updates in a modular way.
      </p>
    </div>
  `;

  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("todo-add");
  const list = document.getElementById("todo-list");

  function addTask(text) {
    if (!text.trim()) return;
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
      <span class="todo-text">${text}</span>
      <button class="todo-complete">✓</button>
      <button class="todo-remove">✕</button>
    `;
    list.appendChild(li);
  }

  addBtn.addEventListener("click", () => {
    addTask(input.value);
    input.value = "";
  });

  input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      addTask(input.value);
      input.value = "";
    }
  });

  list.addEventListener("click", e => {
    const item = e.target.closest(".todo-item");
    if (!item) return;
    if (e.target.classList.contains("todo-complete")) {
      item.classList.toggle("done");
    }
    if (e.target.classList.contains("todo-remove")) {
      item.remove();
    }
  });
});
