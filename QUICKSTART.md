# PiezoPulse - Quick Start Guide

## 🚀 Installation (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to: **http://localhost:5173**

## 🔐 Login

You'll see the login page with:
- **Role Selector**: Choose from 3 roles
- **City**: Chennai (default)

### Available Roles:

1. **Municipal Energy Officer** (Recommended for first try)
   - Full access to everything
   - Can optimize and export

2. **Metro/Rail Authority Manager**
   - Only sees Metro and Railway sites
   - Can optimize their sites

3. **Auditor/Viewer**
   - Read-only access
   - Cannot optimize or export

Click **"Enter Dashboard"** to proceed.

## 📊 Exploring the Dashboard

### Main Dashboard
- View 5 KPI cards showing energy metrics
- See hourly and daily energy trends
- Identify top performing sites
- Check underperforming sites table

### Sites Page
- Browse all 12 Chennai installations
- Use filters to narrow down by Zone, Type, or Status
- Click any site to view detailed analytics

### Site Detail Page (The Core Feature!)
Navigate through 5 tabs:

**Overview** - Site summary and KPIs
**Generation Analytics** - Hourly and daily charts
**Utilization** - Energy allocation breakdown
**Optimization Simulator** ⭐ - The main feature!
**Audit Log** - History of recommendations

### 🎯 Using the Optimization Simulator

1. Go to any site detail page
2. Click the **"Optimization Simulator"** tab
3. Configure:
   - Available Energy (Wh/day)
   - Storage Level (%)
   - Objective (Max Grid Offset / Max Utilization / Balanced)
   - Peak Hours
4. Click **"Generate Recommendation"**
5. View AI-powered allocation strategy
6. See projected savings and improvements

**How it works:**
- **Max Grid Offset** → Prioritizes Lighting (55%)
- **Max Utilization** → Prioritizes IoT Sensors (50%)
- **Balanced** → Even distribution (40/30/20/10)
- Low storage? Automatically reserves backup power

### Map View
- Interactive Chennai map
- Color-coded markers (Green/Orange/Red)
- Click markers for quick site info
- Filter by zone, type, or status

### Reports
- Generate comprehensive energy reports
- Filter by date range and location
- Export as CSV or PDF (if you have permission)

## 🎨 Design Highlights

- **Blue + Green Theme**: Represents sustainability (SDG 7)
- **Clean Layout**: Government/enterprise style
- **Responsive**: Works on desktop and tablets
- **Interactive Charts**: Hover for details
- **Role Badges**: Always visible in header

## 📍 Mock Data Overview

**12 Sites across Chennai:**
- 4 Metro stations
- 3 Railway stations
- 2 Airports
- 2 Malls
- 1 Walkway

**Zones:**
- North Chennai (3 sites)
- Central Chennai (5 sites)
- South Chennai (4 sites)

**Energy Range:** 38-120 Wh/day
**Utilization:** 25-35% (Target: 55%)
**Grid Offset:** 7-15%

## 🔒 Testing RBAC

Try logging in with different roles to see how access changes:

1. **Municipal Energy Officer**
   - See all 12 sites
   - Access optimization tab
   - Export buttons enabled

2. **Metro/Rail Authority Manager**
   - See only 7 sites (Metro + Railway)
   - Access optimization
   - Export enabled

3. **Auditor/Viewer**
   - See all sites
   - Optimization tab disabled
   - Export buttons disabled

## 💡 Key Features to Try

1. **Dashboard Filters**: Change date range and site type
2. **Site Search**: Search for "Metro" or "Airport"
3. **Optimization**: Try different objectives and compare results
4. **Map Interaction**: Click markers and explore Chennai
5. **Report Generation**: Create a custom report
6. **Peak Hours**: Check which hours generate most energy

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS
- Recharts (charts)
- Leaflet (maps)
- React Router (navigation)

## 📚 Documentation

- **README.md** - Project overview
- **SETUP.md** - Detailed feature documentation
- **FEATURES.md** - Complete feature checklist
- **QUICKSTART.md** - This guide

## 🌍 SDG 7: Affordable & Clean Energy

This prototype demonstrates how municipalities can:
- Monitor piezoelectric energy harvesting
- Optimize energy allocation
- Reduce grid dependency
- Track sustainability metrics
- Make data-driven decisions

## 🎯 Next Steps

1. Explore all pages
2. Try the optimization simulator
3. Test different user roles
4. Generate reports
5. Interact with the map

**Enjoy exploring PiezoPulse!** ⚡

---

Need help? Check SETUP.md for detailed documentation.
