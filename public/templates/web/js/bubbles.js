// Creates bouncing clickable bubbles
function spawnBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.floor(Math.random() * 80) + 40;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  bubble.style.left = Math.random() * window.innerWidth + "px";
  bubble.style.top = Math.random() * window.innerHeight + "px";

  bubble.style.animationDuration = (Math.random() * 6 + 4) + "s";

  bubble.addEventListener("click", () => {
    alert("Bubble clicked! This is a UI effect demo.");
  });

  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 15000);
}

setInterval(spawnBubble, 1200);
