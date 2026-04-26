const realApps = [
  {
    title: "The Guild",
    description: "A full membership-based community hub with profiles, posts, messaging, and a clean dashboard layout.",
    preview: "./assets/real-apps/guild/preview.jpg",
    screenshots: [
      "./assets/real-apps/guild/1.jpg",
      "./assets/real-apps/guild/2.jpg",
      "./assets/real-apps/guild/3.jpg"
    ],
    link: "https://the-guild-855.pages.dev/",
    pwa: "Open the app → Tap the share icon → Tap 'Add to Home Screen'. This installs The Guild as a real app with offline support."
  },
  {
    title: "Keep A Man Cookbook",
    description: "A recipe and lifestyle app with categories, favorites, and a clean swipe-based interface.",
    preview: "./assets/real-apps/cookbook/preview.jpg",
    screenshots: [
      "./assets/real-apps/cookbook/1.jpg",
      "./assets/real-apps/cookbook/2.jpg",
      "./assets/real-apps/cookbook/3.jpg"
    ],
    link: "https://keep-a-man-cookbook.pages.dev/",
    pwa: "Open the cookbook → Tap share → 'Add to Home Screen'. Installs like a real cooking app."
  },
  {
    title: "ITA",
    description: "A personal assistant app with notes, tasks, reminders, and a clean dashboard UI.",
    preview: "./assets/real-apps/ita/preview.jpg",
    screenshots: [
      "./assets/real-apps/ita/1.jpg",
      "./assets/real-apps/ita/2.jpg",
      "./assets/real-apps/ita/3.jpg"
    ],
    link: "https://ita-3wf.pages.dev/",
    pwa: "Open ITA → Share → Add to Home Screen. Works offline and loads instantly."
  },
  {
    title: "Roll Show",
    description: "A dice-based entertainment app with animations, sound, and a clean mobile layout.",
    preview: "./assets/real-apps/rollshow/preview.jpg",
    screenshots: [
      "./assets/real-apps/rollshow/1.jpg",
      "./assets/real-apps/rollshow/2.jpg",
      "./assets/real-apps/rollshow/3.jpg"
    ],
    link: "https://roll-show.pages.dev/",
    pwa: "Open Roll Show → Share → Add to Home Screen. Becomes a full mobile app."
  },
  {
    title: "Real Tree Guy",
    description: "A business app for a tree service company with services, gallery, contact, and booking.",
    preview: "./assets/real-apps/realtree/preview.jpg",
    screenshots: [
      "./assets/real-apps/realtree/1.jpg",
      "./assets/real-apps/realtree/2.jpg",
      "./assets/real-apps/realtree/3.jpg"
    ],
    link: "https://realtreeguy.pages.dev/",
    pwa: "Open the site → Share → Add to Home Screen. Works like a real business app."
  },
  {
    title: "Spice DX5",
    description: "A food and spice discovery app with categories, product pages, and a clean mobile UI.",
    preview: "./assets/real-apps/spice/preview.jpg",
    screenshots: [
      "./assets/real-apps/spice/1.jpg",
      "./assets/real-apps/spice/2.jpg",
      "./assets/real-apps/spice/3.jpg"
    ],
    link: "https://spice-dx5.pages.dev/",
    pwa: "Open Spice DX5 → Share → Add to Home Screen. Installs instantly."
  }
];

function loadRealApps() {
  const grid = document.getElementById("realAppsGrid");

  realApps.forEach((app, index) => {
    const card = document.createElement("div");
    card.className = "real-app-card";
    card.onclick = () => openAppModal(index);

    card.innerHTML = `
      <img src="${app.preview}" class="real-app-preview">
      <h3>${app.title}</h3>
      <p>${app.description}</p>
      <button class="btn-secondary">View Details</button>
    `;

    grid.appendChild(card);
  });
}

function openAppModal(index) {
  const app = realApps[index];

  document.getElementById("modalTitle").innerText = app.title;
  document.getElementById("modalDescription").innerText = app.description;
  document.getElementById("modalPwa").innerText = app.pwa;

  const shots = document.getElementById("modalScreenshots");
  shots.innerHTML = "";
  app.screenshots.forEach(src => {
    shots.innerHTML += `<img src="${src}" class="modal-shot">`;
  });

  const launchBtn = document.getElementById("modalLaunchBtn");
  launchBtn.href = app.link;

  document.getElementById("appModal").classList.remove("hidden");
}

function closeAppModal() {
  document.getElementById("appModal").classList.add("hidden");
}

window.onload = loadRealApps;
