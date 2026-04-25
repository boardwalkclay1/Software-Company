document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro-screen");
  const site = document.getElementById("site-shell");

  setTimeout(() => {
    // Set final background image
    document.body.style.backgroundImage = "url('../assets/your-photo.jpg')";

    // Hide intro
    intro.classList.add("hidden");

    // Reveal site
    site.classList.remove("hidden");

    // Allow scrolling again
    document.body.style.overflow = "auto";
  }, 4200);
});
