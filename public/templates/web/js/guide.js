// GUIDE / KNOWLEDGE BASE TEMPLATE JS
// - Loads 3 CSS files
// - Handles chapter switching in the sidebar

function loadCSS(file) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
}

loadCSS("../css/guide-layout.css");
loadCSS("../css/guide-theme.css");
loadCSS("../css/guide-effects.css");

document.addEventListener("DOMContentLoaded", () => {
  const chapterList = document.getElementById("chapter-list");
  const chapters = document.querySelectorAll(".chapter");

  if (!chapterList) return;

  chapterList.addEventListener("click", e => {
    const li = e.target.closest("li[data-chapter]");
    if (!li) return;

    const key = li.dataset.chapter;

    chapterList.querySelectorAll("li").forEach(item => {
      item.classList.toggle("active", item === li);
    });

    chapters.forEach(ch => {
      const id = ch.id.replace("chapter-", "");
      ch.classList.toggle("active", id === key);
    });
  });
});
