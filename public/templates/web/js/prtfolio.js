// PORTFOLIO / AGENCY TEMPLATE JS
// - Loads 3 CSS files
// - Handles case study detail display
// - Handles contact form submit demo

function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/portfolio-layout.css");
loadCSS("../css/portfolio-theme.css");
loadCSS("../css/portfolio-effects.css");

document.addEventListener("DOMContentLoaded", () => {
  const caseDetail = document.getElementById("case-detail");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const contactForm = document.getElementById("contact-form");

  const CASES = {
    case1: {
      title: "Property Management Dashboard",
      text:
        "A custom dashboard for property managers showing occupancy, rent status, and maintenance tickets."
    },
    case2: {
      title: "News Platform UI",
      text:
        "A responsive news interface with zones, breaking ticker, and editorial tools."
    },
    case3: {
      title: "Meal Planner App",
      text:
        "A modular meal planning app with grocery integration and recipe templates."
    }
  };

  portfolioItems.forEach(item => {
    item.addEventListener("click", () => {
      const key = item.dataset.case;
      const data = CASES[key];
      if (!data) return;
      caseDetail.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <p>This section would normally include screenshots, metrics, and a breakdown of the work.</p>
      `;
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const project = formData.get("project");
      alert(
        `This would send an inquiry.\n\nName: ${name}\nEmail: ${email}\nProject: ${project}`
      );
      contactForm.reset();
    });
  }
});
