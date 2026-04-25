// APP TEMPLATES VIEWER
// - Shows combinations of layouts + app logic
// - Scrollable row
// - Click → opens the chosen layout+app combo

const COMBINATIONS = [
  { id: "c1", layout: "layout1", app: "todo", label: "Card Stack + Todo App" },
  { id: "c2", layout: "layout2", app: "chat", label: "Split Panel + Chat App" },
  { id: "c3", layout: "layout3", app: "rideshare", label: "Blocks + Rideshare App" },
  { id: "c4", layout: "layout4", app: "timer", label: "Canvas + Timer App" },
  { id: "c5", layout: "layout5", app: "chat", label: "Chat Layout + Chat App" },
  { id: "c6", layout: "layout1", app: "finance", label: "Card Stack + Finance App" },
  { id: "c7", layout: "layout2", app: "notes", label: "Split Panel + Notes App" },
  { id: "c8", layout: "layout3", app: "habit", label: "Blocks + Habit Tracker" },
  { id: "c9", layout: "layout4", app: "tracker", label: "Canvas + Activity Tracker" },
  { id: "c10", layout: "layout5", app: "marketplace", label: "Chat Layout + Marketplace Feed" }
];

document.addEventListener("DOMContentLoaded", () => {
  const row = document.getElementById("apps-combos-row");
  if (!row) return;

  COMBINATIONS.forEach(combo => {
    const card = document.createElement("div");
    card.className = "apps-combo-card";
    card.dataset.layout = combo.layout;
    card.dataset.app = combo.app;

    card.innerHTML = `
      <div class="apps-combo-title">${combo.label}</div>
      <div class="apps-combo-meta">
        <span>Layout: ${combo.layout}</span>
        <span>Logic: ${combo.app}</span>
      </div>
      <button class="btn-primary">Open Demo</button>
    `;

    card.addEventListener("click", () => {
      const url = `./apps/layouts/${combo.layout}.html?app=${combo.app}`;
      window.location.href = url;
    });

    row.appendChild(card);
  });
});
