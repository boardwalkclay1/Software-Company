const gameArea = document.getElementById("game-area");

document.querySelectorAll(".game-card").forEach(card => {
  card.addEventListener("click", () => {
    const game = card.dataset.game;
    loadGame(game);
  });
});

function loadGame(game) {
  const base = "../games/";

  const paths = {
    snake: `${base}snake/index.html`,
    pong: `${base}pong/index.html`,
    tetris: `${base}tetris/index.html`
  };

  if (!paths[game]) return;

  gameArea.innerHTML = `
    <iframe src="${paths[game]}" class="game-frame"></iframe>
  `;
}
