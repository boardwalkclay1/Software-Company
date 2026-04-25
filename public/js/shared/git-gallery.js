import { REPOS } from "../data/git-data.js";

export function renderGitGallery(container, { type = null } = {}) {
  const filtered = type ? REPOS.filter(r => r.type === type) : REPOS;

  container.innerHTML = `
    <div class="card-grid">
      ${filtered.map(repo => `
        <article class="card repo-card">
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>

          <div class="tag-row">
            ${repo.stack.map(s => `<span class="tag">${s}</span>`).join("")}
          </div>

          <div class="repo-links">
            ${repo.liveUrl ? `<a href="${repo.liveUrl}" target="_blank" class="btn btn-primary">Live</a>` : ""}
            <a href="${repo.repoUrl}" target="_blank" class="btn">Code</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}
