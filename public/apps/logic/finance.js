// FINANCE APP LOGIC

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
  setAppMeta("Finance Tracker", "Track income and expenses with a running balance.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="finance-app">
      <div class="finance-input-row">
        <input id="fin-label" placeholder="Label" />
        <input id="fin-amount" type="number" placeholder="Amount (+/-)" />
        <button id="fin-add">Add</button>
      </div>
      <ul id="fin-list"></ul>
      <p id="fin-balance"></p>
      <p class="finance-note">
        This demo shows how we handle numeric input and derived state (balance).
      </p>
    </div>
  `;

  const label = document.getElementById("fin-label");
  const amount = document.getElementById("fin-amount");
  const add = document.getElementById("fin-add");
  const list = document.getElementById("fin-list");
  const balanceEl = document.getElementById("fin-balance");

  const entries = [];

  function render() {
    list.innerHTML = "";
    let balance = 0;
    entries.forEach(e => {
      balance += e.amount;
      const li = document.createElement("li");
      li.textContent = `${e.label}: ${e.amount > 0 ? "+" : ""}${e.amount}`;
      list.appendChild(li);
    });
    balanceEl.textContent = `Balance: ${balance}`;
  }

  add.addEventListener("click", () => {
    const lbl = label.value.trim();
    const amt = Number(amount.value);
    if (!lbl || !amt) return;
    entries.push({ label: lbl, amount: amt });
    label.value = "";
    amount.value = "";
    render();
  });
});
