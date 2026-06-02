// PRICE TABLE (High-end + $60 drive fee)
const laptopPrices = {
  screen: {
    macbook: 360,     // high-end + 60
    windows: 260,
    gaming: 320
  },
  battery: {
    macbook: 220,
    windows: 180,
    gaming: 200
  },
  keyboard: {
    macbook: 260,
    windows: 180,
    gaming: 200
  },
  water: {
    macbook: 420,
    windows: 320,
    gaming: 380
  },
  diagnostic: {
    macbook: 120,
    windows: 100,
    gaming: 120
  }
};

// IMAGES
const imgPath = "public/assets/img/laptop/";

const images = {
  screen: {
    symptom: imgPath + "broken-screen.jpg",
    result: imgPath + "fixed-screen.jpg"
  },
  battery: {
    symptom: imgPath + "dead-battery.jpg",
    result: imgPath + "full-battery.jpg"
  },
  keyboard: {
    symptom: imgPath + "broken-keyboard.jpg",
    result: imgPath + "fixed-keyboard.jpg"
  },
  water: {
    symptom: imgPath + "water-damage.jpg",
    result: imgPath + "water-fixed.jpg"
  },
  diagnostic: {
    symptom: imgPath + "slow-laptop.jpg",
    result: imgPath + "optimized-laptop.jpg"
  }
};

// SYMPTOMS
const symptomData = {
  screen: [
    "Cracked display",
    "Lines across screen",
    "Black spots",
    "Flickering",
    "No image"
  ],
  battery: [
    "Laptop dies fast",
    "Battery not charging",
    "Overheating",
    "Swollen battery",
    "Random shutdowns"
  ],
  keyboard: [
    "Keys not responding",
    "Sticky keys",
    "Missing keys",
    "Keyboard backlight dead"
  ],
  water: [
    "Laptop won't turn on",
    "Liquid spilled on keyboard",
    "Corrosion",
    "Short circuits"
  ],
  diagnostic: [
    "Slow performance",
    "Overheating",
    "Software issues",
    "Unknown problems"
  ]
};

// RESULTS
const resultData = {
  screen: [
    "Brand-new display",
    "Full clarity",
    "No lines or flicker",
    "Factory-level finish"
  ],
  battery: [
    "All-day battery life",
    "Cooler performance",
    "Fast charging",
    "Stable power"
  ],
  keyboard: [
    "Fully working keys",
    "Smooth typing",
    "Backlight restored"
  ],
  water: [
    "Deep cleaning",
    "Corrosion removal",
    "Component restoration",
    "Full diagnostics"
  ],
  diagnostic: [
    "Full system scan",
    "Performance optimization",
    "Hardware testing",
    "Repair recommendations"
  ]
};

// DOM
const laptopBrand = document.getElementById("laptopBrand");
const repairType = document.getElementById("repairType");
const explainBox = document.getElementById("explainBox");
const priceBox = document.getElementById("priceBox");

const repairTitle = document.getElementById("repairTitle");
const symptomImg = document.getElementById("symptomImg");
const resultImg = document.getElementById("resultImg");
const symptoms = document.getElementById("symptoms");
const results = document.getElementById("results");

const totalPrice = document.getElementById("totalPrice");
const depositPrice = document.getElementById("depositPrice");
const formLink = document.getElementById("formLink");

// MAIN LOGIC
function updatePage() {
  const brand = laptopBrand.value;
  const type = repairType.value;

  if (!brand || !type) return;

  explainBox.classList.remove("hidden");

  repairTitle.textContent =
    type.charAt(0).toUpperCase() + type.slice(1) + " Repair";

  // Images
  symptomImg.src = images[type].symptom;
  resultImg.src = images[type].result;

  // Symptoms
  symptoms.innerHTML = "";
  symptomData[type].forEach(s => {
    symptoms.innerHTML += `<li>${s}</li>`;
  });

  // Results
  results.innerHTML = "";
  resultData[type].forEach(r => {
    results.innerHTML += `<li>${r}</li>`;
  });

  // Pricing
  let price = laptopPrices[type][brand];

  totalPrice.textContent = `$${price}`;
  depositPrice.textContent = `$${price / 2}`;

  // Link to form
  formLink.href = `/laptop-repair-form.html?brand=${brand}&type=${type}&price=${price}`;

  priceBox.classList.remove("hidden");
}

laptopBrand.addEventListener("change", updatePage);
repairType.addEventListener("change", updatePage);
