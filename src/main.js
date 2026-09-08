import './style.css';
import './partners.css';
import content from './contenu.json';

const q = (selector) => document.querySelector(selector);

const setText = (selector, value) => {
  q(selector).textContent = value;
};

const setLines = (selector, lines) => {
  const element = q(selector);

  lines.forEach((line, index) => {
    if (index > 0) {
      element.append(document.createElement('br'));
    }

    element.append(document.createTextNode(line));
  });
};

document.title = content.meta.title;
q('meta[name="description"]').content = content.meta.description;

q('#home-link').setAttribute('aria-label', content.accessibilite.accueil);
q('#main-navigation').setAttribute('aria-label', content.accessibilite.navigationPrincipale);
q('#social-navigation').setAttribute('aria-label', content.accessibilite.reseauxSociaux);
q('#instagram-top').setAttribute('aria-label', content.accessibilite.instagram);
q('#facebook-top').setAttribute('aria-label', content.accessibilite.facebook);
q('#announcements').setAttribute('aria-label', content.accessibilite.informationsClub);
q('#quick-links').setAttribute('aria-label', content.accessibilite.accesRapides);
q('#pricing').setAttribute('aria-label', content.accessibilite.tarifs);
q('#map-frame').title = content.accessibilite.carte;
q('#brand-logo').alt = content.accessibilite.logo;
q('#footer-logo').alt = content.accessibilite.logo;

setLines('#brand-name', [content.identite.nomCourtLigne1, content.identite.nomCourtLigne2]);

setText('#nav-schedule', content.menu.horaires);
setText('#nav-access', content.menu.acces);
setText('#nav-contact', content.menu.contact);
setText('#nav-registration', content.menu.inscription);

setText('#announcement-title', content.actualitesTitre);

if (!content.actualites.length) {
  q('#announcements').hidden = true;
}

content.actualites.forEach((message) => {
  const element = document.createElement('span');
  element.textContent = message;
  q('#announcement-list').append(element);
});

setText('#hero-eyebrow', content.accueil.surtitre);
setText('#hero-title', content.accueil.titre);
setText('#hero-highlight', content.accueil.miseEnAvant);
setText('#hero-description', content.accueil.description);
setText('#hero-schedule-button', content.accueil.boutonHoraires);
setText('#hero-registration-button', content.accueil.boutonInscription);
setText('#hero-audiences', content.accueil.publics);

setText('#quick-schedule-title', content.accesRapides.horaires.titre);
setText('#quick-schedule-description', content.accesRapides.horaires.description);
setText('#quick-registration-title', content.accesRapides.inscription.titre);
setText('#quick-registration-description', content.accesRapides.inscription.description);
setText('#quick-access-title', content.accesRapides.acces.titre);
setText('#quick-access-description', content.accesRapides.acces.description);

setText('#schedule-kicker', content.sectionHoraires.surtitre);
setText('#schedule-title', content.sectionHoraires.titre);
setText('#schedule-description', content.sectionHoraires.description);
setText('#schedule-public-label', content.sectionHoraires.colonnePublic);
setText('#schedule-day-label', content.sectionHoraires.colonneJour);
setText('#schedule-time-label', content.sectionHoraires.colonneHoraire);

content.horaires.forEach((item) => {
  const row = document.createElement('div');
  const publicCell = document.createElement('span');
  const publicName = document.createElement('b');
  const publicDetails = document.createElement('small');
  const day = document.createElement('span');
  const time = document.createElement('span');

  row.className = 'schedule-row';
  publicName.textContent = item.public;
  publicDetails.textContent = item.details;
  day.textContent = item.jour;
  time.textContent = item.heure;

  publicCell.append(publicName, publicDetails);
  row.append(publicCell, day, time);
  q('#schedule-list').append(row);
});

setText('#registration-kicker', content.sectionInscription.surtitre);
setText('#registration-title', content.sectionInscription.titre);
setText('#registration-description', content.sectionInscription.description);
setText('#registration-button', content.sectionInscription.bouton);

content.tarifs.forEach((item) => {
  const price = document.createElement('div');
  const publicName = document.createElement('span');
  const amount = document.createElement('strong');
  const details = document.createElement('small');

  publicName.textContent = item.public;
  amount.textContent = item.prix;
  details.textContent = item.details;

  price.append(publicName, amount, details);
  q('#pricing').append(price);
});

setText('#access-kicker', content.sectionAcces.surtitre);
setText('#access-title', content.sectionAcces.titre);
setText('#address-label', content.sectionAcces.adresseLibelle);
setLines('#address', content.sectionAcces.adresse);
setText('#transport', content.sectionAcces.transport);
setText('#maps-button', content.sectionAcces.bouton);

setText('#contact-title', content.piedDePage.contactTitre);
setText('#contact-name', content.piedDePage.contactNom);
setText('#instagram-message-link', content.piedDePage.instagramMessage);
setText('#facebook-message-link', content.piedDePage.facebookMessage);
setText('#documents-title', content.documents.titre);
setText('#charter-link', content.documents.charte.libelle);
setText('#follow-title', content.piedDePage.suivreTitre);
setText('#instagram-link', content.piedDePage.instagram);
setText('#facebook-link', content.piedDePage.facebook);
setText('#copyright-name', content.identite.nom);

q('#registration-link').href = content.guideInscription.lienAccueil.url;
q('#maps-link').href = content.maps;

const email = q('#email-link');
email.textContent = content.contact.email;
email.href = `mailto:${content.contact.email}`;

const phone = q('#phone-link');
phone.textContent = content.contact.telephone;
phone.href = `tel:${content.contact.telephone.replace(/\s/g, '')}`;

q('#instagram-top').href = content.contact.instagram;
q('#facebook-top').href = content.contact.facebook;
q('#instagram-link').href = content.contact.instagram;
q('#facebook-link').href = content.contact.facebook;
q('#instagram-message-link').href = content.contact.instagramMessage;
q('#facebook-message-link').href = content.contact.facebookMessage;
q('#charter-link').href = content.documents.charte.url;

q('#year').textContent = new Date().getFullYear();

const partnersSection = q('#partenaires');
const partners = content.partenaires;

if (!partners?.elements?.length) {
  partnersSection.hidden = true;
} else {
  setText('#partners-title', partners.titre);

  partners.elements.forEach((partner) => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.className = 'partner-link';
    link.href = partner.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    if (partner.logo) {
      const logo = document.createElement('img');
      logo.className = 'partner-logo';
      logo.alt = partner.nom;
      logo.width = 180;
      logo.height = 90;
      logo.loading = 'lazy';
      logo.decoding = 'async';

      logo.addEventListener('error', () => {
        logo.remove();
      });
      const siteBaseUrl = new URL(import.meta.env.BASE_URL, document.baseURI);
      logo.src = new URL(partner.logo, siteBaseUrl).href;
      link.append(logo);
    }

    item.append(link);
    q('#partners-list').append(item);
  });
}
