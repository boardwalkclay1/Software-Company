// ===============================
//  GAMING TEMPLATE – FULL JS
//  Loads 3 CSS files
//  Loads real free HTML5 games
//  Handles game selection + random game
// ===============================

// Load CSS files for this template
function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/gaming-layout.css");
loadCSS("../css/gaming-theme.css");
loadCSS("../css/gaming-effects.css");

// REAL FREE EMBEDDABLE GAMES
const GAMES = [
  {
    id: "hextris",
    name: "Hextris",
    url: "https://hextris.github.io/hextris/",
    description: "Fast‑paced Tetris‑style rotation game."
  },
  {
    id: "2048",
    name: "2048",
    url: "https://play2048.co/",
    description: "Classic sliding tile puzzle game."
  },
  {
    id: "dino",
    name: "Dino Run",
    url: "https://chromedino.com/",
    description: "Jump over obstacles in this Chrome Dino clone."
  },
  {
    id: "breakout",
    name: "Breakout",
    url: "https://games.construct.net/2048/",
    description: "Break the bricks. Classic arcade gameplay."
  },
  {
    id: "asteroids",
    name: "Asteroids",
    url: "https://asteroids.glitch.me/",
    description: "Shoot asteroids in this open‑source remake."
  },
  {
    id: "snake",
    name: "Snake",
    url: "https://playsnake.org/",
    description: "Eat apples, grow longer, avoid walls."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.getElementById("game-grid");
  const playArea = document.getElementById("game-play-area");
  const randomBtn = document.getElementById("random-game-btn");

  // Build game cards dynamically
  function renderGameCards() {
    gameGrid.innerHTML = "";
    GAMES.forEach(game => {
      const card = document.createElement("article");
      card.className = "game-card";
      card.dataset.id = game.id;

      card.innerHTML = `
        <div class="game-thumb">${game.name}</div>
        <p class="game-desc">${game.description}</p>
        <button class="btn-secondary">Play</button>
      `;

      gameGrid.appendChild(card);
    });
  }

  // Load a game into the play area
  function loadGame(game) {
    playArea.innerHTML = `
      <div class="game-frame">
        <h3>${game.name}</h3>
        <iframe 
          src="${game.url}" 
          class="game-iframe"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  // Handle clicking a game card
  gameGrid.addEventListener("click", e => {
    const card = e.target.closest(".game-card");
    if (!card) return;

    const id = card.dataset.id;
    const game = GAMES.find(g => g.id === id);
    if (!game) return;

    loadGame(game);
  });

  // Random game button
  if (randomBtn) {
    randomBtn.addEventListener("click", () => {
      const random = GAMES[Math.floor(Math.random() * GAMES.length)];
      loadGame(random);
    });
  }

  // Initial render
  renderGameCards();
});
