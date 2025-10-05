AgriTwin Frontend
Description

AgriTwin Frontend est une application web moderne développée avec React pour la gestion et visualisation de données agricoles. L'application intègre des fonctionnalités avancées de cartographie, de visualisation de données et d'interface utilisateur responsive.
Fonctionnalités principales

    📊 Tableaux de bord et visualisations avec Chart.js et Recharts

    🗺️ Cartographie interactive avec Leaflet et React-Leaflet

    🎨 Interface moderne avec Tailwind CSS

    🌐 Internationalisation avec i18next

    📱 Design responsive avec conteneur queries

    🧪 Tests complets avec React Testing Library

    ⚡ Performances optimisées avec React 19

Technologies utilisées
Frontend

    React 19.2.0 - Bibliothèque UI moderne

    React Router DOM 7.9.3 - Navigation

    React i18next - Internationalisation

    Tailwind CSS 3.4.18 - Framework CSS utilitaire

    TypeScript 4.9.5 - Typage statique

Visualisation & Cartes

    Chart.js 4.5.0 - Graphiques et visualisations

    Recharts 3.2.1 - Composants de graphiques React

    Leaflet 1.9.4 - Cartes interactives

    React-Leaflet 5.0.0 - Intégration Leaflet avec React

Utilitaires

    Axios 1.12.2 - Requêtes HTTP

    Lucide React 0.544.0 - Icônes

    Three.js 0.180.0 - Graphiques 3D

    AJV 6.12.6 - Validation de schémas JSON

Développement & Tests

    React Scripts 5.0.1 - Outils de build

    Jest & Testing Library - Suite de tests

    Web Vitals 2.1.4 - Métriques de performance

Installation
Prérequis

    Node.js (version recommandée: 18+)

    npm ou yarn

Installation des dépendances
bash

npm install

Développement
bash

npm start

L'application sera accessible sur http://localhost:3000
Build de production
bash

npm run build

Tests
bash

npm test

Linting
bash

npm run lint

Structure du projet
text

agritwin-frontend/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants React
│   ├── pages/            # Pages de l'application
│  
│   ├── styles/           # Styles CSS/Tailwind
│   ├── i18n/             # Fichiers de traduction
│   └── __tests__/        # Tests unitaires
├── package.json
└── tailwind.config.js

Configuration
Variables d'environnement

Créez un fichier .env à la racine du projet :
env

REACT_APP_API_URL=votre_url_api
REACT_APP_MAP_API_KEY=votre_cle_map

Configuration Tailwind

La configuration Tailwind inclut :

    Support des container queries

    Plugin forms pour les styles de formulaires

    Design system personnalisé pour l'agriculture

Scripts disponibles

    npm start - Démarre le serveur de développement

    npm build - Crée une build de production

    npm test - Lance les tests

    npm run eject - Éjecte la configuration (irréversible)

Contribution

    Forkez le projet

    Créez une branche feature (git checkout -b feature/AmazingFeature)

    Committez vos changements (git commit -m 'Add some AmazingFeature')

    Pushez la branche (git push origin feature/AmazingFeature)

    Ouvrez une Pull Request

Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository du projet.
Auteurs

Équipe de développement AgriTwin
