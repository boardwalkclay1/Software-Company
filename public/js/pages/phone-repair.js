// PRICE TABLE (High-end + $60 drive fee)
const screenPrices = {
  se: 160,
  12: 230,
  13: 230,
  14: 260,
  15: 270,
  15pm: 330,
  16: 280,
  16pm: 360,
  17pm: 459
};

// BATTERY PRICE (120 base + 50 convenience)
const batteryPrice = 170;

// IMAGES
const imgPath = "public/assets/img/phone/";

const images = {
  screen: {
    symptom: imgPath + "go-broke-phone.jpg",
    result: imgPath + "go-fixed-phone.jpg"
  },
  battery: {
    symptom: imgPath + "go-dead-phone.jpg",
    result: imgPath + "go-full-phone.jpg"
  }
};

// SYMPTOMS
const symptomData = {
  screen: [
    "Cracked screen",
    "Ghost touches",
    "Black spots",
    "Lines across display",
    "Touch not responding"
  ],
  battery: [
    "Phone dies fast",
    "Drops from 30% to 0%",
    "Gets hot",
    "Slow charging",
    "Battery health below 80%"
  ]
};

// RESULTS
const resultData = {
  screen: [
    "Brand-new display",
    "Full touch responsiveness",
    "No dead zones",
    "No flicker",
    "Looks factory fresh"
  ],
  battery: [
    "All-day battery life",
    "Faster charging",
    "Cooler phone",
    "No shutdowns",
    "Phone feels new again"
  ]
};

// DOM
const phoneModel = document.getElementById("phoneModel");
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
  const model = phoneModel.value;
  const type = repairType.value;

  if (!model || !type) return;

  // Show explanation
  explainBox.classList.remove("hidden");

  repairTitle.textContent =
    type === "screen" ? "Screen Replacement" : "Battery Replacement";

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
  let price = type === "screen" ? screenPrices[model] : batteryPrice;

  totalPrice.textContent = `$${price}`;
  depositPrice.textContent = `$${price / 2}`;

  // Link to form
  formLink.href = `/repair-form.html?model=${model}&type=${type}&price=${price}`;

  priceBox.classList.remove("hidden");
}

phoneModel.addEventListener("change", updatePage);
repairType.addEventListener("change", updatePage);
