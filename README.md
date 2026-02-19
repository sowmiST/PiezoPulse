# PiezoPulse Dashboard Prototype

Web-based dashboard for Municipal Energy Departments to monitor and optimize piezoelectric energy harvesting installations in Chennai.

## SDG 7: Affordable & Clean Energy

This software-only prototype helps municipalities track energy generation from piezo tiles deployed across metro stations, airports, malls, railway platforms, and walkways.

## 🔴 NEW: Real-Time Dynamic Updates!

The dashboard now features **live data updates every 5 seconds** with:
- ⚡ Real-time energy metrics
- 📊 Dynamic charts and graphs
- 🔄 Smooth animations and transitions
- 🟢 Live status indicators
- 📈 Realistic data fluctuations

See [DYNAMIC_FEATURES.md](DYNAMIC_FEATURES.md) for complete details!

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 and watch the dashboard come alive!

## Login Roles

1. **Municipal Energy Officer** - Full access
2. **Metro/Rail Authority Manager** - Limited to metro/railway sites
3. **Auditor/Viewer** - Read-only access

Select any role and click "Enter Dashboard"

## Features

- **Dashboard**: Live KPIs, energy trends, charts, underperforming sites
- **Sites**: Real-time searchable/filterable table of all installations
- **Site Detail**: 5 tabs with live analytics and optimization simulator
- **Map View**: Interactive Chennai map with live color-coded markers
- **Reports**: Generate and export comprehensive energy reports

## Optimization Simulator

The core feature allows energy officers to:
- Input available energy and storage levels
- Select optimization objective (Max Grid Offset / Max Utilization / Balanced)
- Get AI-powered allocation recommendations
- View projected savings and utilization improvements

## Tech Stack

- React 18 + Tailwind CSS
- Recharts (charts)
- Leaflet (maps)
- React Router
- Vite

## Documentation

- [DYNAMIC_FEATURES.md](DYNAMIC_FEATURES.md) - **NEW!** Real-time update documentation
- [SETUP.md](SETUP.md) - Detailed feature documentation and RBAC rules
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [INSTALL.md](INSTALL.md) - Installation and troubleshooting

---

**Fully offline prototype with live updates** - No backend required, runs on dynamic mock data.
