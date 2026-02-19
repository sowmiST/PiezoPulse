# PiezoPulse - Dynamic Real-Time Features

## 🔴 Live Data Updates

The dashboard now features **real-time dynamic updates** that simulate live energy monitoring from piezoelectric installations.

## ⚡ What's Dynamic

### 1. Automatic Data Refresh
- **Update Interval**: Every 5 seconds
- **Scope**: All pages (Dashboard, Sites, Site Detail, Map, Reports)
- **Algorithm**: Sine wave-based variation for realistic fluctuations

### 2. Dynamic Metrics

All metrics update in real-time with realistic variations:

| Metric | Variation Range | Update Pattern |
|--------|----------------|----------------|
| **Energy (Wh/day)** | ±15% | Sine wave based on timestamp |
| **Utilization (%)** | ±5% | Cosine wave variation |
| **Grid Offset (%)** | ±3% | Sine wave with different frequency |
| **Hourly Generation** | Peak-aware | Higher during 7-10 AM and 5-9 PM |

### 3. Visual Indicators

#### Live Status Badge
- 🟢 Green pulsing dot
- "Live" label with timestamp
- Shows last update time in real-time

#### Update Notifications
- Green toast notification appears on data refresh
- Auto-dismisses after 2 seconds
- Checkmark icon for confirmation

#### Animated Elements
- KPI cards with smooth transitions
- Chart animations on data updates
- Pulsing icons on live data sources
- Slide-up animations for new content

### 4. Page-Specific Features

#### Dashboard
- ✅ Live KPI cards with trend indicators
- ✅ Real-time hourly energy chart
- ✅ Dynamic top 5 sites ranking
- ✅ Daily trend updates
- ✅ Underperforming sites with live status
- ✅ Update timestamp display

#### Sites Page
- ✅ Live table data refresh
- ✅ Real-time utilization percentages
- ✅ Dynamic status badges
- ✅ Updated timestamps per site

#### Site Detail
- ✅ Live site metrics (Wh/day, utilization, grid offset)
- ✅ Real-time hourly generation chart
- ✅ Dynamic daily generation data
- ✅ Live peak hours calculation
- ✅ Updated allocation percentages

#### Map View
- ✅ Real-time marker data
- ✅ Live site information in popups
- ✅ Dynamic energy values
- ✅ Updated utilization rates

#### Reports
- ✅ Live data in generated reports
- ✅ Real-time KPI calculations
- ✅ Dynamic site-wise breakdown

## 🎨 Visual Enhancements

### CSS Animations
```css
.animate-pulse-slow     /* Slow pulsing for icons */
.animate-slide-up       /* Smooth entry animation */
.data-updating          /* Transition effect on updates */
```

### Color Coding
- 🟢 **Green**: Active, good performance
- 🟡 **Yellow**: Warning, underperforming
- 🔴 **Red**: Critical, maintenance needed
- 🔵 **Blue**: Information, neutral

## 📊 Data Generation Algorithm

### Core Function: `generateDynamicData()`

```javascript
// Located in: src/data/mockData.js

export const generateDynamicData = (sites, timestamp = Date.now()) => {
  const seed = timestamp / 10000; // Changes every 10 seconds
  
  return sites.map(site => {
    const variation = Math.sin(seed + site.id) * 0.15; // ±15%
    const utilizationVariation = Math.sin(seed * 2 + site.id) * 5; // ±5%
    const gridOffsetVariation = Math.sin(seed * 1.5 + site.id) * 3; // ±3%
    
    return {
      ...site,
      avgWhPerDay: Math.round(site.avgWhPerDay * (1 + variation)),
      utilization: Math.max(20, Math.min(40, site.utilization + utilizationVariation)),
      gridOffset: Math.max(5, Math.min(20, site.gridOffset + gridOffsetVariation)),
      hourlyGeneration: generateHourlyData(site.avgWhPerDay / 24, seed + site.id),
      lastUpdated: new Date(timestamp).toISOString()
    };
  });
};
```

### Why Sine Waves?
- **Realistic**: Mimics natural energy generation patterns
- **Smooth**: No jarring jumps in values
- **Predictable**: Oscillates within defined ranges
- **Unique**: Each site has different phase (based on site.id)

## 🔧 Technical Implementation

### React Hooks Used
```javascript
// Update interval
useEffect(() => {
  const interval = setInterval(() => {
    const updatedSites = generateDynamicData(mockSites);
    setDynamicSites(updatedSites);
    setLastUpdate(new Date());
  }, 5000);
  
  return () => clearInterval(interval);
}, []);
```

### State Management
- `dynamicSites`: Holds current site data
- `lastUpdate`: Tracks last refresh timestamp
- `showNotification`: Controls update toast

### Performance Optimization
- Memoized calculations with `useMemo`
- Cleanup on component unmount
- Efficient re-renders only when data changes

## 🎯 User Experience

### What Users See
1. **Live Badge**: Always visible, shows system is active
2. **Timestamp**: Updates every 5 seconds
3. **Smooth Transitions**: No jarring changes
4. **Visual Feedback**: Pulsing indicators, animations
5. **Update Notifications**: Brief confirmation of refresh

### Realistic Behavior
- Energy peaks during morning (7-10 AM) and evening (5-9 PM)
- Utilization varies within realistic ranges (20-40%)
- Grid offset changes gradually (5-20%)
- Status badges update based on performance thresholds

## 📈 Benefits

### For Demonstrations
- ✅ Shows live monitoring capability
- ✅ Demonstrates real-time responsiveness
- ✅ Proves system scalability
- ✅ Highlights data visualization

### For Development
- ✅ Easy to test without backend
- ✅ Predictable data patterns
- ✅ Adjustable update frequency
- ✅ Extensible for real API integration

## 🔄 Customization

### Change Update Frequency
```javascript
// In any page component
setInterval(() => {
  // Update logic
}, 5000); // Change 5000 to desired milliseconds
```

### Adjust Variation Range
```javascript
// In src/data/mockData.js
const variation = Math.sin(seed + site.id) * 0.15; // Change 0.15 to adjust ±%
```

### Modify Peak Hours
```javascript
// In generateHourlyData function
const peakMultiplier = (i >= 7 && i <= 10) || (i >= 17 && i <= 21) ? 1.5 : 1;
// Adjust hours and multiplier as needed
```

## 🚀 Future Enhancements

Potential additions for production:
- WebSocket integration for real backend
- Historical data playback
- Predictive analytics overlay
- Alert system for anomalies
- User-configurable refresh rates
- Data export with timestamps
- Comparison mode (before/after)

## 📝 Testing the Dynamic Features

### Quick Test Checklist
1. ✅ Open Dashboard - watch KPI cards update
2. ✅ Check timestamp - should change every 5 seconds
3. ✅ Observe charts - smooth data transitions
4. ✅ Navigate to Sites - table values update
5. ✅ Open Site Detail - metrics refresh
6. ✅ View Map - popup data changes
7. ✅ Generate Report - live data included

### What to Look For
- Green "Live" indicator pulsing
- Timestamp updating every 5 seconds
- Values changing smoothly (no jumps)
- Charts animating on updates
- Update notification appearing briefly
- No console errors

## 🎓 Learning Points

This implementation demonstrates:
- React state management with hooks
- Real-time data simulation
- Performance optimization with memoization
- CSS animations and transitions
- User feedback mechanisms
- Clean code architecture

---

**The dashboard is now fully dynamic and ready for live demonstrations!** 🎉

All pages update automatically every 5 seconds with realistic energy data variations.
