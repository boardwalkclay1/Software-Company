// LANDING TEMPLATE JS
// - Loads 3 CSS files
// - Wires feature cards, buttons, and simple scroll behavior
// - Shows how a dashboard preview would behave

function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/landing-layout.css");
loadCSS("../css/landing-theme.css");
loadCSS("../css/landing-effects.css");

document.addEventListener("DOMContentLoaded", () => {
  // Feature cards: explain what each block is for
  document.querySelectorAll(".feature-card").forEach(card => {
    card.addEventListener("click", () => {
      alert(
        `Feature: ${card.textContent}\n\nThis block would describe that feature in detail and link to a deeper section or page.`
      );
    });
  });

  // Dashboard preview: explain how a real dashboard would work
  const preview = document.querySelector(".dashboard-preview");
  if (preview) {
    preview.addEventListener("click", () => {
      alert(
        "This dashboard preview would show live KPIs from your backend (users, MRR, growth, etc.)."
      );
    });
  }

  // Buttons: show what flows they would trigger
  const primaryBtn = document.querySelector(".btn-primary");
  const secondaryBtn = document.querySelector(".btn-secondary");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", () => {
      alert("This would start a free trial signup flow (modal or dedicated page).");
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", () => {
      alert("This would open a full product demo or walkthrough.");
    });
  }

  // Simple smooth scroll for nav links
  document.querySelectorAll(".nav a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
