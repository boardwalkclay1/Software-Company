const chapters = document.querySelectorAll("#chapter-list li");
const contentSections = document.querySelectorAll(".chapter");

chapters.forEach(ch => {
  ch.addEventListener("click", () => {
    const target = ch.dataset.chapter;

    // Sidebar active state
    chapters.forEach(c => c.classList.remove("active"));
    ch.classList.add("active");

    // Content switching
    contentSections.forEach(sec => {
      sec.classList.remove("active");
      if (sec.id === `chapter-${target}`) {
        sec.classList.add("active");
      }
    });
  });
});
