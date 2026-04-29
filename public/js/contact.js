// -----------------------------
// CONTACT FORM LOGIC
// -----------------------------
const form = document.getElementById("contactForm");
const successBox = document.getElementById("successBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    category: document.getElementById("category").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    business: document.getElementById("business").value,
    message: document.getElementById("message").value,
    timestamp: new Date().toISOString()
  };

  // -----------------------------
  // SEND TO YOUR BACKEND
  // -----------------------------
  const ENDPOINT = "/api/form"; // <-- THIS IS CORRECT NOW

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    successBox.style.display = "block";
    form.reset();

  } catch (err) {
    alert("There was an issue sending your message.");
    console.error(err);
  }
});
