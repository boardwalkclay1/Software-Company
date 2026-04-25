// CHAT APP LOGIC

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
  setAppMeta("Chat App", "Simulated chat feed. Shows how messages, roles, and timestamps are handled.");

  let root = document.getElementById("app-root");
  let input = document.getElementById("app-input");
  let sendBtn = document.getElementById("app-send");

  if (!root) {
    root = document.createElement("div");
    root.id = "app-root";
    document.body.appendChild(root);
  }

  if (!input || !sendBtn) {
    const bar = document.createElement("div");
    bar.className = "app-input-bar";
    bar.innerHTML = `
      <input id="app-input" placeholder="Type a message..." />
      <button id="app-send">Send</button>
    `;
    document.body.appendChild(bar);
    input = document.getElementById("app-input");
    sendBtn = document.getElementById("app-send");
  }

  root.classList.add("chat-feed");

  function addMessage(text, role = "user") {
    const msg = document.createElement("div");
    msg.className = `chat-message chat-${role}`;
    msg.innerHTML = `
      <div class="chat-bubble">${text}</div>
      <div class="chat-meta">${role === "user" ? "You" : "System"} • ${new Date().toLocaleTimeString()}</div>
    `;
    root.appendChild(msg);
    root.scrollTop = root.scrollHeight;
  }

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
      addMessage("This is a simulated reply. In production, this would hit a backend or AI API.", "system");
    }, 600);
  });

  input.addEventListener("keyup", e => {
    if (e.key === "Enter") sendBtn.click();
  });

  addMessage("Welcome to the Chat App demo. Messages here show how we handle feeds and roles.", "system");
});
