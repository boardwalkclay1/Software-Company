// RIDESHARE TEMPLATE JS
// - Loads 3 CSS files
// - Simulates ride request and status progression
// - Builds simple trip history

function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/rideshare-layout.css");
loadCSS("../css/rideshare-theme.css");
loadCSS("../css/rideshare-effects.css");

document.addEventListener("DOMContentLoaded", () => {
  const requestBtn = document.getElementById("request-ride-btn");
  const driverName = document.getElementById("driver-name");
  const driverCar = document.getElementById("driver-car");
  const driverEta = document.getElementById("driver-eta");
  const timelineSteps = document.querySelectorAll(".timeline-step");
  const tripList = document.getElementById("trip-list");

  let currentRide = null;

  function setTimeline(stepKey) {
    timelineSteps.forEach(step => {
      const key = step.dataset.step;
      step.classList.toggle("active", key === stepKey);
    });
  }

  function simulateRide() {
    currentRide = {
      id: Date.now(),
      from: "Pickup Location",
      to: "Dropoff Location",
      status: "requested"
    };

    driverName.textContent = "Jordan Miles";
    driverCar.textContent = "Black Sedan • GTM‑1234";
    driverEta.textContent = "ETA: 5 min";
    setTimeline("requested");

    setTimeout(() => {
      currentRide.status = "accepted";
      driverEta.textContent = "ETA: 3 min";
      setTimeline("accepted");
    }, 1500);

    setTimeout(() => {
      currentRide.status = "arriving";
      driverEta.textContent = "ETA: 1 min";
      setTimeline("arriving");
    }, 3000);

    setTimeout(() => {
      currentRide.status = "in-progress";
      driverEta.textContent = "In Progress";
      setTimeline("in-progress");
    }, 4500);

    setTimeout(() => {
      currentRide.status = "completed";
      driverEta.textContent = "Completed";
      setTimeline("completed");
      addTripToHistory(currentRide);
      currentRide = null;
    }, 6500);
  }

  function addTripToHistory(ride) {
    if (!tripList) return;
    if (tripList.children.length === 1 && tripList.children[0].tagName === "LI" &&
        tripList.children[0].textContent.includes("No trips")) {
      tripList.innerHTML = "";
    }
    const li = document.createElement("li");
    li.textContent = `${ride.from} → ${ride.to} (${ride.status})`;
    tripList.appendChild(li);
  }

  if (requestBtn) {
    requestBtn.addEventListener("click", () => {
      if (currentRide) {
        alert("A ride is already in progress in this demo.");
        return;
      }
      simulateRide();
    });
  }
});
