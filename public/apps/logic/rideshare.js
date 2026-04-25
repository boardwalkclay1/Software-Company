// RIDESHARE APP LOGIC

function detectLayout() {
  const hasCanvas = document.getElementById("app-canvas");
  const hasFeed = document.getElementById("app-root") && document.body.classList.contains("app-layout") && document.querySelector(".app-feed");
  const hasSidebar = document.getElementById("sidebar-root");
  const hasCardStack = document.getElementById("app-root") && document.querySelector(".card-stack");
  if (hasCanvas) return "canvas";
  if (hasFeed) return "feed";
  if (hasSidebar) return "split";
  if (hasCardStack) return "cards";
  return "blocks";
}

function setAppMeta(title, description) {
  const t = document.getElementById("app-title");
  const d = document.getElementById("app-description");
  if (t) t.textContent = title;
  if (d) d.textContent = description;
}

document.addEventListener("DOMContentLoaded", () => {
  const layout = detectLayout();
  setAppMeta("Rideshare App", "Simulated ride request flow with driver status and trip log.");

  let root = document.getElementById("app-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  root.innerHTML = `
    <div class="ride-app">
      <button id="ride-request" class="btn-primary">Request Ride</button>
      <div class="ride-status">
        <p id="ride-phase">No ride in progress.</p>
        <p id="ride-driver"></p>
      </div>
      <ul id="ride-history" class="ride-history"></ul>
      <p class="ride-note">
        This demo shows how we simulate state transitions (requested → accepted → arriving → in progress → completed).
      </p>
    </div>
  `;

  const btn = document.getElementById("ride-request");
  const phase = document.getElementById("ride-phase");
  const driver = document.getElementById("ride-driver");
  const history = document.getElementById("ride-history");

  let current = null;

  function logRide(ride) {
    const li = document.createElement("li");
    li.textContent = `${ride.from} → ${ride.to} (${ride.status})`;
    history.appendChild(li);
  }

  function simulateRide() {
    current = { from: "Pickup", to: "Destination", status: "requested" };
    phase.textContent = "Ride requested.";
    driver.textContent = "Finding driver...";

    setTimeout(() => {
      current.status = "accepted";
      phase.textContent = "Driver accepted.";
      driver.textContent = "Driver: Jordan • Black Sedan";
    }, 1000);

    setTimeout(() => {
      current.status = "arriving";
      phase.textContent = "Driver arriving.";
    }, 2500);

    setTimeout(() => {
      current.status = "in-progress";
      phase.textContent = "Ride in progress.";
    }, 4000);

    setTimeout(() => {
      current.status = "completed";
      phase.textContent = "Ride completed.";
      driver.textContent = "";
      logRide(current);
      current = null;
    }, 6000);
  }

  btn.addEventListener("click", () => {
    if (current) {
      alert("A ride is already in progress in this demo.");
      return;
    }
    simulateRide();
  });
});
