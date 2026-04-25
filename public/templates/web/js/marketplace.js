const PRODUCTS = [
  { id: 1, name: "Ops Dashboard Template", price: 29, type: "dashboard" },
  { id: 2, name: "SaaS Landing Page", price: 19, type: "template" },
  { id: 3, name: "Implementation Service", price: 199, type: "service" },
  { id: 4, name: "Analytics Dashboard Template", price: 39, type: "dashboard" }
];

const productGrid = document.getElementById("product-grid");
const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const cartSummary = document.getElementById("cart-summary");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const chips = document.querySelectorAll(".chip");

let cart = [];
let activeFilter = "all";

function renderProducts() {
  productGrid.innerHTML = "";
  PRODUCTS.filter(p => activeFilter === "all" || p.type === activeFilter)
    .forEach(p => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image"></div>
        <h3>${p.name}</h3>
        <p class="product-price">$${p.price}</p>
        <button class="btn btn-primary" data-id="${p.id}">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
}

function renderCart() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartSummary.classList.add("hidden");
    return;
  }
  cartEmpty.classList.add("hidden");
  cartSummary.classList.remove("hidden");

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });

  cartCount.textContent = `${cart.length} item(s)`;
  cartTotal.textContent = `Total: $${total}`;
}

productGrid.addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  cart.push(product);
  renderCart();
});

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("chip-active"));
    chip.classList.add("chip-active");
    activeFilter = chip.dataset.filter;
    renderProducts();
  });
});

renderProducts();
renderCart();
