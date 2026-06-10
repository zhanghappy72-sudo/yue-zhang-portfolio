export const renderStatCards = (items) =>
  items
    .map(
      (item) => `
        <article class="stat-card">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `
    )
    .join('');

export const renderTagList = (items) =>
  items.map((item) => `<li class="tag-chip">${item}</li>`).join('');

export const renderLinkButtons = (items = []) =>
  items
    .filter((item) => item.href)
    .map(
      (item) =>
        `<a class="button button-secondary" href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`
    )
    .join('');
