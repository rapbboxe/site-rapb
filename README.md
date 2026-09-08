# Site du Ring Athlétique du Petit-Bard

Projet Vite en HTML, CSS et JavaScript. `npm run build` génère le site statique dans `dist/`.

## Utilisation

```bash
npm install
npm run dev
```

Les actualités, horaires, tarifs et coordonnées se modifient dans `src/contenu.json`. Pour masquer le bandeau d’actualités, mettez `"actualites": []`.

## GitHub Pages

Dans **Settings → Pages → Build and deployment**, sélectionnez **GitHub Actions**. Chaque push sur `main` construira et publiera automatiquement le site sur `rapb-boxe.fr`.
