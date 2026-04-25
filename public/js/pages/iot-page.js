import { IOT_SHOWCASES } from "../data/iot-data.js";

export function renderIoT(root) {
  root.innerHTML = `
    <section class="page-section">
      <h1 class="page-title">Microcontrollers, Sensors & Cameras</h1>
      <p class="page-subtitle">Hardware + software systems built for real-world automation.</p>

      <div class="card-grid" id="iot-grid"></div>

      <section id="iot-preview" class="iot-preview hidden">
        <img id="iot-preview-img" />
        <div id="iot-preview-info"></div>
      </section>
    </section>
  `;

  const grid = root.querySelector("#iot-grid");
  const preview = root.querySelector("#iot-preview");
  const previewImg = root.querySelector("#iot-preview-img");
  const previewInfo = root.querySelector("#iot-preview-info");

  IOT_SHOWCASES.forEach(item => {
    const card = document.createElement("article");
    card.className = "card iot-card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="tag-row">
        ${item.stack.map(s => `<span class="tag">${s}</span>`).join("")}
      </div>
    `;

    grid.appendChild(card);
  });

  grid.addEventListener("click", e => {
    const card = e.target.closest(".iot-card");
    if (!card) return;

    const item = IOT_SHOWCASES.find(i => i.id === card.dataset.id);

    previewImg.src = item.preview;
    previewInfo.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <div class="tag-row">
        ${item.stack.map(s => `<span class="tag">${s}</span>`).join("")}
      </div>
    `;

    preview.classList.remove("hidden");
  });
}
