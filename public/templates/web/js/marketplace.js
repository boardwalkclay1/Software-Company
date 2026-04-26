// Basic product data
const PRODUCTS = [
  {
    id: "dash-01",
    name: "Client Ops Dashboard",
    category: "dashboard",
    description: "A modular dashboard layout for client operations, with cards, filters, and KPIs.",
    price: 49,
    tag: "Web app shell"
  },
  {
    id: "dash-02",
    name: "Agency Control Center",
    category: "dashboard",
    description: "Multi-panel layout for agencies managing multiple brands and campaigns.",
    price: 79,
    tag: "Multi-tenant"
  },
  {
    id: "tmpl-01",
    name: "Landing Page Template",
    category: "template",
    description: "Hero, feature grid, pricing, and FAQ — wired for any SaaS or product.",
    price: 29,
    tag: "Conversion-focused"
  },
  {
    id: "tmpl-02",
    name: "Course Portal Template",
    category: "template",
    description: "Lesson list, progress tracking UI, and student dashboard layout.",
    price: 39,
    tag: "Education"
  },
  {
    id: "svc-01",
    name: "Implementation Sprint",
    category: "service",
    description: "Done-with-you implementation sprint for one of the templates.",
    price: 299,
    tag: "Service"
  },
  {
    id: "svc-02",
    name: "Dashboard Wiring Session",
    category: "service",
    description: "Live session to wire your data into a dashboard template.",
    price: 199,
    tag: "Service"
  },
  {
    id: "bundle-01",
    name: "Starter Bundle",
    category: "bundle",
    description: "Landing page + dashboard + wiring session at a bundled rate.",
    price: 349,
    tag: "Bundle"
  }
];

let cart = [];
let currentTheme = "dark";

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheEls();
  loadTheme();
  loadCartFromStorage();
  renderProducts(PRODUCTS);
  renderCart();
  wireEvents();
});

function cacheEls() {
  els.productGrid = document.getElementById("product-grid");
  els.searchInput = document.getElementById("search-input");
  els.searchBtn = document.getElementById("search-btn");
  els.chips = document.querySelectorAll(".chip");
  els.cartEmpty = document.getElementById("cart-empty");
  els.cartList = document.getElementById("cart-list");
  els.cartCount = document.getElementById("cart-count");
  els.cartSubtotal = document.getElementById("cart-subtotal");
  els.cartFee = document.getElementById("cart-fee");
  els.cartTotal = document.getElementById("cart-total");
  els.checkoutBtn = document.getElementById("checkout-btn");
  els.themeToggle = document.getElementById("theme-toggle");

  // Modal
  els.modal = document.getElementById("product-modal");
  els.modalTitle = document.getElementById("modal-title");
  els.modalDescription = document.getElementById("modal-description");
  els.modalCategory = document.getElementById("modal-category");
  els.modalPrice = document.getElementById("modal-price");
  els.modalAdd = document.getElementById("modal-add");
  els.modalClose = document.getElementById("modal-close");
}

function wireEvents() {
  // Search
  els.searchBtn.addEventListener("click", handleSearch);
  els.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Category chips
  els.chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      els.chips.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      filterProducts();
    });
  });

  // Checkout simulation
  els.checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
      alert("Cart is empty. Add something first.");
      return;
    }
    alert("Checkout simulated. In a real build, this would hit Stripe or another provider.");
  });

  // Theme toggle
  els.themeToggle.addEventListener("click", toggleTheme);

  // Modal
  els.modalClose.addEventListener("click", closeModal);
  els.modalAdd.addEventListener("click", () => {
    const id = els.modalAdd.dataset.productId;
    if (id) {
      addToCart(id);
      closeModal();
    }
  });

  els.modal.addEventListener("click", (e) => {
    if (e.target === els.modal) {
      closeModal();
    }
  });
}

function handleSearch() {
  filterProducts();
}

function filterProducts() {
  const query = els.searchInput.value.trim().toLowerCase();
  const activeChip = document.querySelector(".chip.chip-active");
  const category = activeChip ? activeChip.dataset.filter : "all";

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tag.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  renderProducts(filtered);
}

function renderProducts(list) {
  els.productGrid.innerHTML = "";

  if (!list.length) {
    els.productGrid.innerHTML =
      '<div class="product-empty">No products match that search. Try another term or category.</div>';
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="product-title-row">
        <div class="product-title">${product.name}</div>
        <div class="product-category">${capitalize(product.category)}</div>
      </div>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-meta">${product.tag}</div>
      </div>
    `;

    card.addEventListener("click", () => openModal(product));
    els.productGrid.appendChild(card);
  });
}

function openModal(product) {
  els.modalTitle.textContent = product.name;
  els.modalDescription.textContent = product.description;
  els.modalCategory.textContent = capitalize(product.category);
  els.modalPrice.textContent = `$${product.price.toFixed(2)}`;
  els.modalAdd.dataset.productId = product.id;
  els.modal.classList.remove("hidden");
}

function closeModal() {
  els.modal.classList.add("hidden");
  els.modalAdd.dataset.productId = "";
}

// Cart logic

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCartToStorage();
  renderCart();
}

function removeFromCart(productId) {
  const idx = cart.findIndex((item) => item.id === productId);
  if (idx === -1) return;

  if (cart[idx].qty > 1) {
    cart[idx].qty -= 1;
  } else {
    cart.splice(idx, 1);
  }
  saveCartToStorage();
  renderCart();
}

function renderCart() {
  els.cartList.innerHTML = "";

  if (!cart.length) {
    els.cartEmpty.style.display = "block";
  } else {
    els.cartEmpty.style.display = "none";
  }

  let count = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    count += item.qty;
    subtotal += item.price * item.qty;

    const li = document.createElement("li");
    li.className = "cart-item";

    li.innerHTML = `
      <div class="cart-item-main">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-meta">Qty: ${item.qty}</div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="cart-remove" data-id="${item.id}">Remove</button>
      </div>
    `;

    const removeBtn = li.querySelector(".cart-remove");
    removeBtn.addEventListener("click", () => removeFromCart(item.id));

    els.cartList.appendChild(li);
  });

  const fee = subtotal * 0.05;
  const total = subtotal + fee;

  els.cartCount.textContent = count;
  els.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  els.cartFee.textContent = `$${fee.toFixed(2)}`;
  els.cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Storage

function saveCartToStorage() {
  try {
    localStorage.setItem("gtm_market_cart", JSON.stringify(cart));
  } catch (e) {
    // ignore
  }
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("gtm_market_cart");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cart = parsed;
    }
  } catch (e) {
    cart = [];
  }
}

// Theme

function loadTheme() {
  try {
    const stored = localStorage.getItem("gtm_market_theme");
    if (stored === "light" || stored === "dark") {
      currentTheme = stored;
    }
  } catch (e) {
    currentTheme = "dark";
  }
  applyTheme();
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme();
  try {
    localStorage.setItem("gtm_market_theme", currentTheme);
  } catch (e) {
    // ignore
  }
}

function applyTheme() {
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

// Utils

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
