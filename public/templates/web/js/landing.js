// Load the 3 CSS files for this template
function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/landing-layout.css");
loadCSS("../css/landing-theme.css");
loadCSS("../css/landing-effects.css");

// Feature card interactions
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", () => {
      alert(`Feature: ${card.textContent}\n\nThis explains how this feature works in a real product.`);
    });
  });

  // Dashboard preview interaction
  const preview = document.querySelector(".dashboard-preview");
  preview.addEventListener("click", () => {
    alert("This dashboard preview shows how KPIs update in real time.");
  });

  // Buttons
  document.querySelector(".btn-primary").addEventListener("click", () => {
    alert("This would start a free trial flow.");
  });

  document.querySelector(".btn-secondary").addEventListener("click", () => {
    alert("This would open a full demo page.");
  });
});
