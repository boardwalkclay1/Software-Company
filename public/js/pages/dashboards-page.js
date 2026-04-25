import { DASHBOARD_TEMPLATES } from "../data/dashboards-data.js";

export function renderDashboards(root) {
  root.innerHTML = `
    <section class="page-section">
      <h1 class="page-title">Dashboard Templates</h1>
      <p class="page-subtitle">Interactive dashboards built for real operations.</p>

      <div class="card-grid" id="dash-grid"></div>

      <section id="dash-preview" class="dash-preview hidden">
        <img id="dash-preview-img" />
        <div id="dash-preview-info"></div>
      </section>
    </section>
  `;

  const grid = root.querySelector("#dash-grid");
  const preview = root.querySelector("#dash-preview");
  const previewImg = root.querySelector("#dash-preview-img");
  const previewInfo = root.querySelector("#dash-preview-info");

  DASHBOARD_TEMPLATES.forEach(d => {
    const card = document.createElement("article");
    card.className = "card dash-card";
    card.dataset.id = d.id;

    card.innerHTML = `
      <h3>${d.name}</h3>
      <p>${d.description}</p>
      <div class="tag-row">
        ${d.stack.map(s => `<span class="tag">${s}</span>`).join("")}
      </div>
    `;

    grid.appendChild(card);
  });

  grid.addEventListener("click", e => {
    const card = e.target.closest(".dash-card");
    if (!card) return;

    const dash = DASHBOARD_TEMPLATES.find(d => d.id === card.dataset.id);

    previewImg.src = dash.preview;
    previewInfo.innerHTML = `
      <h2>${dash.name}</h2>
      <p>${dash.description}</p>
      <div class="tag-row">
        ${dash.stack.map(s => `<span class="tag">${s}</span>`).join("")}
      </div>
    `;

    preview.classList.remove("hidden");
  });
}
