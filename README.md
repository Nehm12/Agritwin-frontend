# 🌾 AgriTwin – Digital Twin for Agriculture

> **Smart Digital Twin Platform for African Agriculture**  
> Web Interface for AgriTwin — an intelligent decision-support tool for farmers, agronomists, and agricultural organizations.

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

🔗 **Backend Repository:** [AgriTwin Backend](https://github.com/Nehm12/AgriTwin-backend)  
🌐 **Deployed Frontend:** [https://agritwin.vercel.app](https://agritwin.vercel.app)

</div>

---

## 📘 Overview

**AgriTwin** is a comprehensive digital twin platform combining satellite data, weather forecasts, and agronomic intelligence to optimize crop yields and reduce agricultural risks. This repository contains the frontend application built with React and TypeScript.

### Key Capabilities

- 🌍 Real-time visualization of farm fields and satellite data (NDVI, rainfall, humidity)
- 📊 Advanced data analytics dashboards and predictive forecasting
- 🌱 Interactive agricultural simulations (irrigation, fertilization, yield estimation)
- 🌐 Multi-language support and cross-device compatibility (desktop, tablet, mobile)
- 📈 Smart decision-support tools for precision agriculture

---

## 🚀 Features

### 🗺️ Interactive Mapping
- Dynamic maps powered by **Leaflet** and **React-Leaflet**
- Real-time NDVI, crop health, and environmental data overlays
- Multi-field clustering and custom map layer management
- Geospatial analysis and field boundary tracking

### 📊 Analytics Dashboard
- Real-time KPIs and historical trend analysis
- Custom charts via **Chart.js** and **Recharts**
- Export reports to **PDF** or **Excel**
- Comparative analysis across multiple growing seasons

### 🌾 Simulation Tools
- Irrigation and fertilization scenario testing
- Climate impact projections (drought, flood, heat stress)
- Dynamic yield predictions based on environmental factors
- Risk assessment and mitigation recommendations

### 💡 Modern UI/UX
- Fully responsive design with **Tailwind CSS**
- Light/Dark theme support
- Smooth micro-interactions and animations
- WCAG 2.1 AA accessibility compliance

### 🌐 Internationalization (i18n)
- Dynamic language switching (English/French)
- Configurable date, time, and number formats
- Extensible translation architecture

---

## 🧰 Tech Stack

| Layer | Technology | Version | Description |
|-------|------------|---------|-------------|
| **Frontend Framework** | React | 19.2.0 | Modern UI library with hooks |
| **Language** | TypeScript | 4.9.5 | Static type checking |
| **Styling** | Tailwind CSS | 3.4.18 | Utility-first CSS framework |
| **Charts** | Chart.js / Recharts | 4.5.0 / 3.2.1 | Data visualization |
| **Mapping** | Leaflet / React-Leaflet | 1.9.4 / 5.0.0 | Interactive maps |
| **HTTP Client** | Axios | 1.12.2 | API communication |
| **State Management** | React Context / Redux | - | Global state |
| **Testing** | Jest / React Testing Library | 27.5.1 | Unit & integration tests |
| **Icons** | Lucide React | 0.544.0 | Modern SVG icons |

---

## ⚙️ Installation & Setup

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x  # or yarn >= 1.22.x
```

### 1. Clone the Repository

```bash
git clone https://github.com/Nehm12/agritwin-frontend.git
cd agritwin-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file at the root of your project:

```env
# API Configuration
REACT_APP_API_URL=https://agritwin-backend.onrender.com
REACT_APP_API_TIMEOUT=10000

# External API Keys
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_SENTINEL_HUB_KEY=your_sentinel_hub_key

# Mapbox Configuration
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_DEFAULT_CENTER_LAT=6.3654
REACT_APP_DEFAULT_CENTER_LNG=2.4183

# Application Settings
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENV=production
```

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

Your application will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

Production files will be generated in the `/build` directory.

---

## 🪄 Tailwind Configuration

**tailwind.config.js**

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'agri-green': '#4CAF50',
        'agri-blue': '#2196F3',
        'agri-brown': '#8D6E63',
        'agri-yellow': '#FFC107',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
```

---

## 📁 Project Structure

```
agritwin-frontend/
├── public/
│   ├── index.html              # HTML entry point
│   ├── favicon.ico             # App icon
│   └── assets/                 # Static assets
│       ├── images/
│       └── logos/
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Shared components (Button, Card, etc.)
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── maps/              # Map-related components
│   │   └── simulations/       # Simulation UI components
│   │
│   ├── pages/                 # Page-level components
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Simulations.tsx
│   │   └── Analytics.tsx
│   │
│   ├── services/              # API integration layer
│   │   ├── api.ts            # Axios configuration
│   │   ├── weatherService.ts
│   │   ├── satelliteService.ts
│   │   └── simulationService.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useWeather.ts
│   │   └── useSimulation.ts
│   │
│   ├── contexts/              # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── utils/                 # Utility functions
│   │   ├── dateUtils.ts
│   │   ├── mathUtils.ts
│   │   └── validationUtils.ts
│   │
│   ├── i18n/                  # Internationalization
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── config.ts
│   │
│   ├── styles/                # Global styles
│   │   ├── index.css
│   │   └── tailwind.css
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── api.types.ts
│   │   └── domain.types.ts
│   │
│   ├── App.tsx               # Main app component
│   ├── index.tsx             # React entry point
│   └── setupTests.ts         # Test configuration
│
├── .env.example              # Environment variables template
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Launch development server |
| `npm run build` | Compile for production |
| `npm test` | Run test suite |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type checking |

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Deploy on Netlify

```bash
npm run build
netlify deploy --prod --dir=build
```

### Deploy with Docker

**Dockerfile**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

**Build and run:**

```bash
docker build -t agritwin-frontend .
docker run -p 3000:3000 agritwin-frontend
```

---

## 📊 Methodologies & Algorithms

### 1. Agricultural Yield Prediction Model

**File:** `backend/routes/simulation.py → calculate_yield()`

**Type:** Parametric model based on FAO agronomic knowledge

**Input Variables:**
- 🌡️ Temperature (°C)
- 🌧️ Precipitation (mm)
- 💧 Humidity (%)
- 🌱 NDVI (Normalized Difference Vegetation Index)
- 🌾 Crop type (15 parameterized types)

**Formula:**

```python
# Temperature factor → Gaussian distribution
temp_factor = exp(-((T - T_optimal)² / (2 * σ²)))

# Precipitation factor → Sigmoid function
prec_factor = 1 / (1 + exp(-0.01 * (P - P_optimal)))

# NDVI factor → Normalization
ndvi_factor = (NDVI - NDVI_min) / (0.9 - NDVI_min)

# Humidity factor → Distance from optimal (70%)
humidity_factor = 1 - abs(H - 70) / 70

# Final weighted yield
Yield = base_yield × (0.35×T_f + 0.30×P_f + 0.25×N_f + 0.10×H_f)
```

**Weighting:**

| Factor | Weight |
|--------|--------|
| Temperature | 35% |
| Precipitation | 30% |
| NDVI | 25% |
| Humidity | 10% |

**Advantages:**
- ✅ Agronomically interpretable
- ✅ Based on FAO standards
- ✅ No need for massive datasets

**Limitations:**
- ⚠️ Fixed parameters
- ⚠️ No machine learning adaptation

---

### 2. Agricultural Risk Assessment

**File:** `backend/routes/simulation.py → calculate_risk_score()`

**Type:** Expert system based on rules

**Risk Scoring:**

| Condition | Score | Risk Type |
|-----------|-------|-----------|
| Precipitation < 50mm | +30 | High drought |
| Precipitation < 100mm | +15 | Moderate drought |
| Temperature > 35°C | +25 | Severe heat stress |
| Temperature > 32°C | +10 | Moderate heat stress |
| NDVI < 0.3 | +30 | Poor crop health |
| NDVI < 0.5 | +15 | Vegetation stress |

**Final Score:** `min(100, Σ scores)`

**Risk Levels:**

| Level | Score Range |
|-------|-------------|
| Low | < 25 |
| Moderate | 25–50 |
| High | > 50 |

---

### 3. Time-Series Weather Forecasting

**File:** `backend/routes/forecast.py → simple_forecast()`

**Algorithm:**

```python
# 1. Linear regression on last 30 days
y = ax + b  # using np.polyfit

# 2. Trend extrapolation
forecast[i] = last_value + trend × i

# 3. Stochastic noise
noise = N(0, σ²)  # σ = 0.1 × std(historical_data)
```

**Limitations:**
- ⚠️ No seasonality detection
- ⚠️ Linear assumption only
- ⚠️ Artificial noise

---

### 4. Prophet (Facebook) — Available but Not Currently Used

**File:** `backend/utils/forecast_utils.py`

**Usage Example:**

```python
from prophet import Prophet

model = Prophet(daily_seasonality=True)
model.fit(df)
future = model.make_future_dataframe(periods=30)
forecast = model.predict(future)
```

**Advantages:**
- ✅ Trend/seasonality decomposition
- ✅ Confidence intervals
- ✅ Handles missing values

---

### 5. Geospatial Data Pipeline

**File:** `backend/utils/raster_utils.py`

**Processing Steps:**

1. **Read GeoTIFF** (using `rasterio`)
2. **Reproject to WGS84** (using `pyproj`)
3. **Extract pixel values** by coordinates
4. **Support EPSG:4326** standard

**Data Sources:**
- Local `.tif` files
- Organized folders by type:
  - Temperature
  - Precipitation
  - Humidity
  - NDVI (Sentinel-2)

---

## 🧑‍💻 Team

| Role | Member |
|------|--------|
| **Project Lead** | [Your Name] |
| **Frontend Lead** | [Developer Name] |
| **Backend Lead** | [Developer Name] |
| **UI/UX Designer** | [Designer Name] |
| **Data Scientist** | [Data Scientist Name] |
| **Support** | support@agritwin.com |

---

## 🗺️ Roadmap

### ✅ v1.0 (MVP) — Completed
- Field management system
- Interactive mapping
- Basic simulation tools
- Analytics dashboard

### 🚧 v1.5 (In Progress)
- Progressive Web App (PWA) with offline support
- Web push notifications
- Marketplace integration for seeds/fertilizers
- Advanced risk assessment

### 🔮 v2.0 (Planned)
- AI-powered predictive analytics
- Drone imagery integration
- Blockchain-based traceability
- Native mobile applications (iOS/Android)
- IoT sensor integration
- Real-time alerts and recommendations

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 🐛 Bug Reports & Feature Requests

Use GitHub Issues to report bugs or request features:
- [Report a Bug](https://github.com/Nehm12/agritwin-frontend/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/Nehm12/agritwin-frontend/issues/new?template=feature_request.md)

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **FAO** for agricultural best practices and standards
- **European Space Agency (ESA)** for Sentinel satellite data
- **OpenWeather** for meteorological data
- **Mapbox** for mapping infrastructure
- **African Development Bank** for supporting agricultural innovation

---

## 📞 Contact & Support

- **Website:** [https://agritwin.vercel.app](https://agritwin.vercel.app)
- **Email:** contact@agritwin.com
- **Support:** support@agritwin.com
- **Twitter:** [@AgriTwinAfrica](https://twitter.com/AgriTwinAfrica)
- **LinkedIn:** [AgriTwin](https://linkedin.com/company/agritwin)

---

<div align="center">

### 🌍 Made with ❤️ for Sustainable African Agriculture

**⭐ Star us on GitHub** | **🔗 Share this project** | **💚 Support sustainable farming**

![Footer](https://via.placeholder.com/800x2/4CAF50/4CAF50)

© 2025 AgriTwin – All Rights Reserved

</div>
