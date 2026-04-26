/* ============================
   GO TIME SOFTWARE – INDEX JS
   Cinematic • Real Data • IoT Integration
   ============================ */

// INTRO REMOVAL
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.remove();
  }, 2500);

  loadIotModules();
});

// BASIC NAVIGATION
function goTo(page) {
  window.location.href = `./${page}.html`;
}

function goToApp(name) {
  window.location.href = `./apps.html#${name}`;
}

function openTemplate(name) {
  window.location.href = `./templates/web/pages/${name}.html`;
}

/* ============================
   LOAD IoT MODULE JSON
   ============================ */

async function loadIotModules() {
  try {
    const res = await fetch("./data/iot-modules.json");
    const data = await res.json();

    buildIotStrip(data);
  } catch (err) {
    console.error("Failed to load IoT JSON:", err);
  }
}

/* ============================
   BUILD IoT STRIP
   ============================ */

function buildIotStrip(data) {
  const strip = document.querySelector(".iot-scroll");
  if (!strip) return;

  const allItems = [
    ...data.microcontrollers,
    ...data.sensors,
    ...data.modules
  ];

  allItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "iot-item";

    div.innerHTML = `
      <img src="${item.photo}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <button class="btn-secondary iot-more-btn">More Info</button>
    `;

    // Show integration info on click
    div.querySelector(".iot-more-btn").addEventListener("click", () => {
      showIotInfo(item);
    });

    strip.appendChild(div);
  });
}

/* ============================
   SHOW INTEGRATION INFO (MODAL)
   ============================ */

function showIotInfo(item) {
  let modal = document.getElementById("iotModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "iotModal";
    modal.className = "app-modal";

    modal.innerHTML = `
      <div class="app-modal-content">
        <span class="app-modal-close" onclick="closeIotModal()">×</span>
        <h2 id="iotTitle"></h2>
        <img id="iotPhoto" style="width:100%;border-radius:8px;margin:10px 0;">
        <p id="iotDescription"></p>
        <h3>Integration</h3>
        <p id="iotIntegration"></p>
      </div>
    `;

    document.body.appendChild(modal);
  }

  document.getElementById("iotTitle").textContent = item.name;
  document.getElementById("iotPhoto").src = item.photo;
  document.getElementById("iotDescription").textContent = item.description;
  document.getElementById("iotIntegration").textContent = item.integration;

  modal.classList.remove("hidden");
}

function closeIotModal() {
  const modal = document.getElementById("iotModal");
  if (modal) modal.classList.add("hidden");
}
