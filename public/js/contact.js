const selector = document.getElementById("projectType");
const forms = document.querySelectorAll("#formsContainer form");
const successBox = document.getElementById("successBox");

selector.addEventListener("change", () => {
  forms.forEach(f => f.classList.add("hidden"));
  if (!selector.value) return;

  const form = document.querySelector(`form[data-type="${selector.value}"]`);
  if (form) form.classList.remove("hidden");
});

forms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = form.dataset.type;
    const inputs = form.querySelectorAll("input, textarea, select");

    const details = {};
    inputs.forEach(i => {
      const key = i.placeholder || i.name || "Field";
      details[key] = i.value;
    });

    const payload = {
      type,
      details,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      successBox.style.display = "block";
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  });
});
