// MARKETPLACE APP LOGIC

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

const ITEMS = [
  { id: 1, name: "Landing Template", price: 29 },
  { id: 2, name: "Dashboard Template", price: 39 },
  { id: 3, name: "App Shell", price: 49 }
];

document.addEventListener("DOMContentLoaded", () => {
  const layout = detectLayout();
  setAppMeta("Marketplace App", "Simple marketplace feed with add‑to‑cart behavior.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="market-app">
      <div class="market-list" id="market-list"></div>
      <div class="market-cart">
        <h3>Cart</h3>
        <ul id="market-cart-list"></ul>
        <p id="market-total">Total: $0</p>
      </div>
      <p class="market-note">
        This demo shows how we handle lists, selection, and derived totals.
      </p>
    </div>
  `;

  const list = document.getElementById("market-list");
  const cartList = document.getElementById("market-cart-list");
  const totalEl = document.getElementById("market-total");
  const cart = [];

  ITEMS.forEach(item => {
    const div = document.createElement("div");
    div.className = "market-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button data-id="${item.id}">Add</button>
    `;
    list.appendChild(div);
  });

  list.addEventListener("click", e => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const item = ITEMS.find(i => i.id === id);
    if (!item) return;
    cart.push(item);
    renderCart();
  });

  function renderCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach(i => {
      total += i.price;
      const li = document.createElement("li");
      li.textContent = `${i.name} - $${i.price}`;
      cartList.appendChild(li);
    });
    totalEl.textContent = `Total: $${total}`;
  }
});
