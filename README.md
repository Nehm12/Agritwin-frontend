# AgriTwin Frontend

<div align="center">

![AgriTwin Logo](https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=AgriTwin)

**Jumeau Numérique Intelligent pour l'Agriculture Africaine**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Démo en ligne](#) · [Documentation](#) · [Signaler un bug](../../issues) · [Demander une fonctionnalité](../../issues)

</div>

---

## À propos

**AgriTwin Frontend** est l'interface utilisateur moderne de la plateforme AgriTwin, conçue pour transformer la gestion agricole en Afrique grâce à des jumeaux numériques intelligents. L'application permet aux agriculteurs, agronomes et organisations de :

- Visualiser leurs exploitations agricoles en temps réel via des cartes interactives
- Analyser les données satellites (NDVI, humidité, climat) avec des graphiques intuitifs
- Simuler différents scénarios agricoles (irrigation, fertilisation, impacts climatiques)
- Accéder depuis n'importe quel appareil (desktop, tablette, mobile)
- Naviguer dans plusieurs langues (FR, EN, adaptable)

---

## Fonctionnalités principales

### Cartographie Interactive
- Visualisation géospatiale des parcelles agricoles avec Leaflet
- Affichage temps réel des indices NDVI et santé des cultures
- Marqueurs personnalisés et couches de données satellites
- Support multi-parcelles avec clustering intelligent

### Tableaux de Bord & Analytics
- Graphiques dynamiques avec Chart.js et Recharts
- Indicateurs clés de performance (KPIs) agricoles
- Comparaisons temporelles et inter-parcelles
- Exports de rapports PDF/Excel

### Simulations "What If"
- Scénarios d'irrigation optimisée
- Calculs de fertilisation NPK personnalisés
- Prévisions d'impact climatique (sécheresse, inondations)
- Estimations de rendement en temps réel

### Interface Moderne & Responsive
- Design adaptatif mobile-first avec Tailwind CSS
- Mode sombre/clair automatique
- Animations fluides et micro-interactions
- Accessibilité WCAG 2.1 AA

### Internationalisation
- Support multilingue avec i18next
- Adaptation culturelle et formats locaux
- Traductions dynamiques des contenus

---

## Démarrage rapide

### Prérequis

```bash
Node.js >= 18.0.0
npm >= 9.0.0  # ou yarn >= 1.22.0
```

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/agritwin-frontend.git
cd agritwin-frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API

# Lancer le serveur de développement
npm start
```

L'application sera accessible sur **http://localhost:3000**

### Build de production

```bash
npm run build
# Les fichiers optimisés seront dans le dossier /build
```

---

## Technologies & Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" />
      <br>React 19
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="48" height="48" alt="Tailwind" />
      <br>Tailwind CSS
    </td>
    <td align="center" width="96">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="48" height="48" alt="JavaScript" />
      <br>JavaScript
    </td>
  </tr>
</table>

### Dépendances principales

| Catégorie | Package | Version | Usage |
|-----------|---------|---------|-------|
| **Core** | React | 19.2.0 | Bibliothèque UI |
| | React Router DOM | 7.9.3 | Routage SPA |
| | TypeScript | 4.9.5 | Typage statique |
| **UI/Styling** | Tailwind CSS | 3.4.18 | Framework CSS |
| | Lucide React | 0.544.0 | Icônes SVG |
| **Visualisation** | Chart.js | 4.5.0 | Graphiques |
| | Recharts | 3.2.1 | Charts React |
| | Three.js | 0.180.0 | Visualisations 3D |
| **Cartes** | Leaflet | 1.9.4 | Cartographie |
| | React-Leaflet | 5.0.0 | Intégration React |
| **I18n** | i18next | 24.2.1 | Internationalisation |
| | react-i18next | 15.2.3 | Bindings React |
| **Utilitaires** | Axios | 1.12.2 | Requêtes HTTP |
| | AJV | 6.12.6 | Validation JSON |
| **Tests** | Jest | 27.5.1 | Framework de tests |
| | Testing Library | 13.4.0 | Tests composants |

---

## Structure du projet

```
agritwin-frontend/
├── public/                     # Fichiers statiques publics
│   ├── index.html             # Point d'entrée HTML
│   ├── manifest.json          # PWA manifest
│   └── assets/                # Images, icônes, fonts
│
├── src/                        # Code source principal
│   ├── components/            # Composants React réutilisables
│   │   ├── FieldMap.jsx       # Carte interactive champs
│   │   ├── SimulationPanel.jsx # Interface simulations
│   │   ├── Dashboard.jsx      # Tableau de bord analytics
│   │   └── ...
│   │
│   ├── pages/                 # Pages/vues principales
│   │   ├── Home.jsx           # Page d'accueil
│   │   ├── Fields.jsx         # Gestion des champs
│   │   ├── Simulations.jsx    # Interface simulations
│   │   └── Analytics.jsx      # Analyses et rapports
│   │
│   ├── services/              # Services & API clients
│   │   ├── api.js             # Configuration Axios
│   │   ├── fieldsService.js   # API champs
│   │   ├── satelliteService.js # API satellites
│   │   └── weatherService.js  # API météo
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useFields.js       # Hook gestion champs
│   │   ├── useSimulations.js  # Hook simulations
│   │   └── useWeather.js      # Hook données météo
│   │
│   ├── contexts/              # Context API
│   │   ├── AuthContext.jsx    # Contexte authentification
│   │   └── AppContext.jsx     # État global application
│   │
│   ├── utils/                 # Fonctions utilitaires
│   │   ├── formatters.js      # Formatage données
│   │   ├── validators.js      # Validations
│   │   └── constants.js       # Constantes globales
│   │
│   ├── styles/                # Styles & CSS
│   │   ├── tailwind.css       # Config Tailwind
│   │   ├── globals.css        # Styles globaux
│   │   └── components/        # Styles composants
│   │
│   ├── i18n/                  # Internationalisation
│   │   ├── config.js          # Config i18next
│   │   └── locales/
│   │       ├── fr.json        # Traductions français
│   │       └── en.json        # Traductions anglais
│   │
│   ├── __tests__/             # Tests unitaires
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── App.jsx                # Composant racine
│   ├── index.jsx              # Point d'entrée React
│   └── setupTests.js          # Configuration tests
│
├── .env.example               # Template variables env
├── .gitignore                 # Fichiers ignorés Git
├── package.json               # Dépendances npm
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── README.md                  # Ce fichier
```

---

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```bash
# API Backend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000

# APIs externes
REACT_APP_OPENWEATHER_API_KEY=votre_cle_openweathermap
REACT_APP_SENTINEL_HUB_KEY=votre_cle_sentinel_hub

# Configuration cartes
REACT_APP_MAPBOX_TOKEN=votre_token_mapbox
REACT_APP_DEFAULT_CENTER_LAT=6.3654
REACT_APP_DEFAULT_CENTER_LNG=2.4183

# Notifications
REACT_APP_ENABLE_NOTIFICATIONS=true

# Environnement
REACT_APP_ENV=development
```

### Configuration Tailwind CSS

Le fichier `tailwind.config.js` inclut :

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'agri-green': '#4CAF50',
        'agri-brown': '#8D6E63',
        'agri-blue': '#2196F3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
```

---

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur de développement sur http://localhost:3000 |
| `npm run build` | Crée une build optimisée pour la production |
| `npm test` | Lance les tests avec Jest en mode watch |
| `npm run test:coverage` | Génère un rapport de couverture de code |
| `npm run lint` | Vérifie la qualité du code avec ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run eject` | Éjecte la configuration Create React App (irréversible) |

---

## Tests

### Lancer les tests

```bash
# Mode watch (développement)
npm test

# Test unique
npm test -- --watchAll=false

# Avec couverture
npm run test:coverage
```

### Structure des tests

```javascript
// Exemple: __tests__/components/FieldMap.test.jsx
import { render, screen } from '@testing-library/react';
import FieldMap from '../../components/FieldMap';

describe('FieldMap Component', () => {
  it('renders field marker correctly', () => {
    const field = { 
      name: 'Test Field', 
      latitude: 6.3654, 
      longitude: 2.4183 
    };
    
    render(<FieldMap field={field} />);
    expect(screen.getByText('Test Field')).toBeInTheDocument();
  });
});
```

---

## Déploiement

### Déploiement sur Vercel (recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod

# Configuration automatique détectée
```

### Déploiement sur Netlify

```bash
# Build
npm run build

# Déployer le dossier /build via Netlify CLI ou interface web
```

### Déploiement Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

```bash
docker build -t agritwin-frontend .
docker run -p 3000:3000 agritwin-frontend
```

---

## Contribution

Les contributions sont les bienvenues. Voici comment participer :

1. **Forkez** le projet
2. **Créez** votre branche feature
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Committez** vos changements
   ```bash
   git commit -m 'feat: Add amazing new feature'
   ```
4. **Pushez** vers la branche
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Ouvrez** une Pull Request

### Convention de commits

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Mise en forme code
refactor: Refactoring
test: Ajout de tests
perf: Amélioration performance
```

---

## Performance & Optimisation

- **Lazy Loading** : Chargement différé des composants avec `React.lazy()`
- **Code Splitting** : Division automatique du bundle
- **Images optimisées** : Formats WebP et compression
- **Tree Shaking** : Élimination du code mort
- **Service Worker** : Cache intelligent pour mode offline

### Web Vitals

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);  // Cumulative Layout Shift
getFID(console.log);  // First Input Delay
getLCP(console.log);  // Largest Contentful Paint
```

---

## Débogage

### Mode développement

```bash
# Activer les logs détaillés
REACT_APP_DEBUG=true npm start

# Désactiver le cache
REACT_APP_NO_CACHE=true npm start
```

### Outils recommandés

- **React Developer Tools** (Extension Chrome/Firefox)
- **Redux DevTools** (si utilisation Redux)
- **Lighthouse** (audit performance)

---

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License - Copyright (c) 2025 AgriTwin Team
```

---

## Équipe & Support

### Développeurs principaux

- **Chef de projet** : [Votre Nom](mailto:email@example.com)
- **Lead Frontend** : [Nom développeur](mailto:email@example.com)
- **UX/UI Designer** : [Nom designer](mailto:email@example.com)

### Support & Contact

- **Email** : support@agritwin.com
- **Discord** : [Rejoindre la communauté](#)
- **Twitter** : [@AgriTwinApp](#)
- **Documentation** : [docs.agritwin.com](#)
- **Bugs** : [GitHub Issues](../../issues)
- **Suggestions** : [GitHub Discussions](../../discussions)

---

## Remerciements

Un grand merci à :

- La communauté **React** pour l'écosystème incroyable
- **Leaflet** pour la cartographie open-source
- **Tailwind CSS** pour le framework CSS moderne
- Tous les **contributeurs** qui font avancer ce projet
- Les **agriculteurs africains** qui inspirent notre mission

---

## Roadmap

### Version 1.0 (MVP) - Complété
- Interface de gestion des champs
- Cartographie interactive
- Simulations basiques
- Dashboard analytics

### Version 1.5 - En cours
- Mode offline complet (PWA)
- Notifications push web
- Marketplace intégrée
- Support multi-tenants

### Version 2.0 - Planifié
- IA prédictive avancée
- Vision par ordinateur (drone)
- Blockchain pour traçabilité
- Application mobile native

---

<div align="center">

**Fait avec passion pour l'agriculture africaine**

[![Star on GitHub](https://img.shields.io/github/stars/votre-org/agritwin-frontend?style=social)](https://github.com/votre-org/agritwin-frontend)
[![Follow on Twitter](https://img.shields.io/twitter/follow/AgriTwinApp?style=social)](https://twitter.com/AgriTwinApp)

[Retour en haut](#agritwin-frontend)

</div>
