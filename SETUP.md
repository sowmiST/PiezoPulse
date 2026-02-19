# PiezoPulse Dashboard - Setup Instructions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to: http://localhost:5173

## Login

Select one of three roles:
- **Municipal Energy Officer** - Full access to all features
- **Metro/Rail Authority Manager** - Limited to metro and railway sites
- **Auditor/Viewer** - Read-only access, cannot export or optimize

## Features Overview

### Dashboard (/)
- 5 KPI cards showing total energy, utilization, grid offset, savings, and active sites
- Hourly energy generation chart (today)
- Daily energy trend (30 days)
- Top 5 performing sites bar chart
- Underperforming sites table
- Filters: Date range and site type

### Sites (/sites)
- Searchable and filterable table of all installations
- Filters: Zone, Type, Status
- Click any row to view site details

### Site Detail (/sites/:id)
5 tabs with comprehensive analytics:

**Tab A - Overview**
- Site summary with KPIs
- Location and installation details

**Tab B - Generation Analytics**
- Hourly generation chart (24 hours)
- Daily generation chart (30 days)
- Peak hours analysis

**Tab C - Utilization**
- Energy allocation pie chart (Lighting, IoT, Backup, Display)
- Piezo vs Grid comparison bar chart
- Load demand estimate table

**Tab D - Optimization Simulator** (CORE FEATURE)
- Input: Available energy, storage level, objective, peak hours
- AI-powered allocation recommendations
- Outputs: Allocation %, grid offset %, utilization uplift, monthly savings
- Logic:
  - Max Grid Offset → Prioritizes Lighting (55%)
  - Max Utilization → Prioritizes IoT (50%)
  - Balanced → Even distribution
  - Low storage (<30%) → Reserves 20%+ for Backup
- Export and compare strategies

**Tab E - Audit Log**
- History of optimization recommendations
- Status tracking (Approved/Pending/Rejected)

### Map View (/map)
- Interactive Leaflet map of Chennai
- Color-coded markers:
  - Green = Active
  - Orange = Underperforming
  - Red = Maintenance
- Click markers for site cards with quick stats
- Filters: Zone, Type, Status

### Reports (/reports)
- Configure date range, zone, and infrastructure type
- Generate comprehensive reports with:
  - Total energy, utilization, grid offset, savings
  - Site-wise breakdown table
- Export as CSV or PDF (disabled for Auditor/Viewer)
- Recent reports history

## Role-Based Access Control (RBAC)

### Municipal Energy Officer
✅ Full access to all pages
✅ Can access optimization simulator
✅ Can export reports

### Metro/Rail Authority Manager
✅ View only Metro and Railway sites (auto-filtered)
✅ Can access optimization for their sites
✅ Can export reports

### Auditor/Viewer
✅ Read-only access to all pages
❌ Cannot access optimization tab
❌ Cannot export reports (buttons disabled)

## Mock Data

- 12 sites across Chennai (North, Central, South zones)
- Types: Metro, Airport, Mall, Railway, Walkway
- Realistic energy values (20-120 Wh/day)
- Utilization baseline: 25-35%
- Grid offset: 7-15%
- Tariff rate: ₹8 per kWh

## Tech Stack

- React 18
- Tailwind CSS
- Recharts (charts)
- Leaflet + React-Leaflet (maps)
- React Router (navigation)
- Vite (build tool)

## Design Theme

- Corporate government dashboard
- Blue + green sustainability colors
- Clean typography
- Minimal clutter
- Responsive layout (desktop-first)
- Icons for energy/analytics

## SDG 7: Affordable & Clean Energy

This prototype demonstrates how municipalities can monitor and optimize piezoelectric energy harvesting to reduce grid dependency and promote sustainable energy solutions.
