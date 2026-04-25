import { renderGitGallery } from "../shared/git-gallery.js";

export function renderApps(root) {
  root.innerHTML = `
    <section class="page-section">
      <h1 class="page-title">Apps & Tools</h1>
      <p class="page-subtitle">Real apps with real code. Explore the repos.</p>
      <div id="apps-gallery"></div>
    </section>
  `;

  const gallery = root.querySelector("#apps-gallery");
  renderGitGallery(gallery);
}
