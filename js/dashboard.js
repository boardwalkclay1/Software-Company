async function loadDashboard() {
  const container = document.getElementById("entries");

  try {
    const res = await fetch("/api/dashboard");
    const data = await res.json();

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<p>No submissions yet.</p>";
      return;
    }

    data.reverse().forEach(entry => {
      const div = document.createElement("div");
      div.className = "entry";

      div.innerHTML = `
        <h3>${entry.type}</h3>
        <small>${new Date(entry.timestamp).toLocaleString()}</small>

        <div class="details-block">
          ${Object.entries(entry.details).map(([label, value]) => `
            <p><strong>${label}:</strong> ${value || "—"}</p>
          `).join("")}
        </div>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Dashboard load error:", err);
    container.innerHTML = "<p>Error loading dashboard.</p>";
  }
}

loadDashboard();
