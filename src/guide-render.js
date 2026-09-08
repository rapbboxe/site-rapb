export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

export function renderGuide(content) {
  const guide = content.guideInscription;
  const text = escapeHtml;

  function renderLink(link, className = 'guide-link') {
    const url = link.reference
      ? link.reference.split('.').reduce((value, key) => value[key], content)
      : link.url;
    if (typeof url !== 'string' || !/^(https?:\/\/|\.\/|#)/.test(url)) {
      throw new Error(`Invalid guide URL: ${url}`);
    }
    return `<a class="${className}" href="${text(url)}">${text(link.libelle)}</a>`;
  }

  function renderDetails(item) {
    return `
      ${item.introduction ? `<p class="guide-introduction">${text(item.introduction)}</p>` : ''}
      ${(item.paragraphes || []).map((paragraph) => `<p>${text(paragraph)}</p>`).join('\n')}
      ${item.liste ? `<ul>${item.liste.map((entry) => `<li>${text(entry)}</li>`).join('\n')}</ul>` : ''}
      ${item.liens ? `<div class="guide-links">${item.liens.map((link) => renderLink(link)).join('\n')}</div>` : ''}
      ${item.note ? `<p class="guide-note">${text(item.note)}</p>` : ''}
    `;
  }

  const sections = guide.sections
    .map(
      (section) => `
    <section class="guide-section" id="${text(section.id)}" aria-labelledby="${text(section.id)}-title">
      <h2 id="${text(section.id)}-title">${text(section.titre)}</h2>
      ${renderDetails(section)}
      ${
        section.etapes
          ? `<ol class="guide-steps">${section.etapes
              .map(
                (step) => `
        <li>
          <h3>${text(step.titre)}</h3>
          ${renderDetails(step)}
        </li>`
              )
              .join('\n')}</ol>`
          : ''
      }
    </section>`
    )
    .join('\n');

  return `
    <header class="guide-header">
      <a class="guide-brand" href="${text(guide.retour.url)}">
        <img src="./logo-rapb.png" alt="${text(content.accessibilite.logo)}" width="64" height="64" />
        <span>${text(content.identite.nom)}</span>
      </a>
      ${renderLink(guide.retour, 'guide-back')}
    </header>
    <main class="guide-main">
      <div class="guide-heading">
        <p class="guide-season">${text(guide.saison)}</p>
        <h1>${text(guide.titre)}</h1>
        <p>${text(guide.introduction)}</p>
        <p class="guide-trial">${text(guide.essai)}</p>
      </div>
      <div class="guide-layout">
        <aside class="guide-sidebar">
          <nav aria-label="${text(guide.sommaire)}">
            <h2>${text(guide.sommaire)}</h2>
            <ul>${guide.sections.map((section) => `<li><a href="#${text(section.id)}">${text(section.titre)}</a></li>`).join('\n')}</ul>
          </nav>
          <section class="guide-prices" aria-labelledby="guide-prices-title">
            <h2 id="guide-prices-title">${text(guide.tarifsTitre)}</h2>
            <dl>${content.tarifs.map((price) => `<div><dt>${text(price.public)}<small>${text(price.details)}</small></dt><dd>${text(price.prix)}</dd></div>`).join('\n')}</dl>
            <p>${text(guide.tarifsNote)}</p>
          </section>
        </aside>
        <div class="guide-sections">${sections}</div>
      </div>
      <section class="guide-help" aria-labelledby="guide-help-title">
        <h2 id="guide-help-title">${text(guide.aideTitre)}</h2>
        <p>${text(guide.aideTexte)}</p>
        ${renderLink(guide.contact, 'guide-contact')}
      </section>
    </main>
    <footer class="guide-footer">
      <span>${text(content.identite.nom)}</span>
      ${renderLink(guide.retour, 'guide-back')}
    </footer>
  `;
}
