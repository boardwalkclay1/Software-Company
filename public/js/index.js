/* ============================
   GO TIME SOFTWARE – NEW INDEX JS
   Clean, Cinematic, No Bubbles
   ============================ */

// INTRO REMOVAL
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.remove();
  }, 2500);
});

// NAVIGATION
function goTo(page) {
  window.location.href = `./${page}.html`;
}

function goToApp(name) {
  window.location.href = `./apps.html#${name}`;
}

function openTemplate(name) {
  window.location.href = `./templates/web/pages/${name}.html`;
}
