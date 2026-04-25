// NOTES APP LOGIC

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
  setAppMeta("Notes App", "Simple notes with titles and content.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="notes-app">
      <input id="note-title" placeholder="Title" />
      <textarea id="note-body" placeholder="Write a note..."></textarea>
      <button id="note-save">Save Note</button>
      <ul id="note-list"></ul>
      <p class="notes-note">
        This demo shows how we handle multi‑field input and list rendering.
      </p>
    </div>
  `;

  const title = document.getElementById("note-title");
  const body = document.getElementById("note-body");
  const save = document.getElementById("note-save");
  const list = document.getElementById("note-list");

  const notes = [];

  function render() {
    list.innerHTML = "";
    notes.forEach(n => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${n.title}</strong><br>${n.body}`;
      list.appendChild(li);
    });
  }

  save.addEventListener("click", () => {
    if (!title.value.trim() || !body.value.trim()) return;
    notes.push({ title: title.value.trim(), body: body.value.trim() });
    title.value = "";
    body.value = "";
    render();
  });
});
