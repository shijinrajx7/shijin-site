# Atmos — Weather Dashboard

A responsive weather dashboard built with React, Vite, TypeScript, Tailwind CSS v4 and Recharts. Weather, geocoding and air-quality data are provided by [Open-Meteo](https://open-meteo.com/) — no API key required.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Set **Root Directory** to `weather-dashboard`.
4. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
5. Click **Deploy**. No environment variables are needed.

If the project is already linked through Vercel Git integration, each push to the production branch triggers a new deployment.

## Features

- City autocomplete and browser geolocation
- Current conditions, hourly and seven-day forecasts
- Temperature and precipitation charts
- European AQI with pollutant readings
- Saved cities and preferences stored in localStorage
- Celsius/Fahrenheit and light/dark themes
- Weather-responsive gradients, cached weather and retry states
- Keyboard-friendly search and reduced-motion support

## Data and attribution

Forecast and geocoding: Open-Meteo. Air quality: Open-Meteo Air Quality API. Data refreshes when a city is selected or the refresh control is used.
