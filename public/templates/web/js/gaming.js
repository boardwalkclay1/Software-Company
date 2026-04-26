const gameArea = document.getElementById("game-area");

document.querySelectorAll(".game-card").forEach(card => {
  card.addEventListener("click", () => {
    const game = card.dataset.game;
    loadGame(game);
  });
});

function loadGame(game) {
  if (game === "snake") {
    gameArea.innerHTML = `<iframe src="../games/snake/index.html" class="game-frame"></iframe>`;
  }
  if (game === "pong") {
    gameArea.innerHTML = `<iframe src="../games/pong/index.html" class="game-frame"></iframe>`;
  }
  if (game === "tetris") {
    gameArea.innerHTML = `<iframe src="../games/tetris/index.html" class="game-frame"></iframe>`;
  }
}
