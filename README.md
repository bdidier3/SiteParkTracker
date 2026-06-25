# ParkTracker — Site vitrine + assistance

Site statique (HTML/CSS/JS natif), prêt à héberger sur **GitHub Pages**.

## Pages
- `index.html` — Landing (hero, fonctionnalités, Premium, parcs, footer)
- `assistance.html` — Support + FAQ
- `confidentialite.html` — Politique de confidentialité (RGPD + Apple)
- `cgu.html` — Conditions d'utilisation + conditions d'abonnement

## Structure
```
css/style.css     → styles partagés (thème sombre, animations)
js/main.js        → header au scroll, parallax, reveals, FAQ, menu mobile
assets/logo.svg   → logo placeholder (œil) — REMPLACER par le logo définitif
```

## Logo
Remplace `assets/logo.svg` par ton logo (SVG ou PNG). Si tu utilises un PNG,
mets-le dans `assets/` et change `assets/logo.svg` par `assets/logo.png` dans
les `<img>` (header + footer) et dans la balise `<link rel="icon">` des 4 pages.

## Déployer sur GitHub Pages
1. Crée un dépôt et pousse ces fichiers à la racine :
   ```bash
   git init
   git add .
   git commit -m "Site ParkTracker"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. Dans le dépôt : **Settings → Pages → Source : Deploy from a branch**,
   branche `main`, dossier `/ (root)`.
3. Le site est en ligne sous quelques minutes.

## Personnalisation rapide
Les couleurs sont des variables CSS en haut de `css/style.css` (`:root`) :
fond `#0F1115`, surfaces `#181B22`, bordures `#262A33`, accent `#FF5A36`.
