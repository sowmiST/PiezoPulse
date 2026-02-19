# What's Dynamic in PiezoPulse? 🔴

## Quick Visual Guide

### ✅ Elements That Update Every 5 Seconds

#### Dashboard Page
```
┌─────────────────────────────────────────────────────┐
│ 🟢 Live | Updated 10:30:45                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ⚡ Total Energy    📊 Utilization   🔌 Grid Offset │
│  12,450 Wh/day ↑   78% ↑            34% ↓          │
│  [UPDATES LIVE]    [UPDATES LIVE]   [UPDATES LIVE] │
│                                                      │
│  📈 Hourly Chart   📊 Top 5 Sites                   │
│  [ANIMATES]        [BARS CHANGE]                    │
│                                                      │
│  📉 Daily Trend    ⚠️ Underperforming Sites         │
│  [AREA UPDATES]    [VALUES CHANGE]                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### Sites Page
```
┌─────────────────────────────────────────────────────┐
│ Site Name          | Wh/day | Utilization | Status │
├─────────────────────────────────────────────────────┤
│ Koyambedu Metro   | 95 ⬆️  | 32% ⬆️      | 🟢     │
│ [UPDATES]          [LIVE]   [LIVE]        [LIVE]   │
│                                                      │
│ Airport Terminal  | 120 ⬇️  | 28% ⬆️      | 🟢     │
│ [UPDATES]          [LIVE]   [LIVE]        [LIVE]   │
└─────────────────────────────────────────────────────┘
```

#### Site Detail Page
```
┌─────────────────────────────────────────────────────┐
│ Chennai Metro - Koyambedu Station                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Avg Wh/day: 95 ⬆️  | Utilization: 32% ⬆️          │
│  [UPDATES LIVE]      [UPDATES LIVE]                 │
│                                                      │
│  📈 Hourly Generation Chart                         │
│  [ANIMATES WITH NEW DATA]                           │
│                                                      │
│  📊 Allocation Pie Chart                            │
│  [VALUES UPDATE]                                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### Map View
```
┌─────────────────────────────────────────────────────┐
│                  Chennai Map                         │
│                                                      │
│         🟢 ← Marker (click to see live data)        │
│         │                                            │
│         └─ Wh/day: 95 ⬆️ [UPDATES]                  │
│            Utilization: 32% ⬆️ [UPDATES]            │
│                                                      │
│         🟡 ← Another marker                         │
│         🔴 ← Maintenance site                       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 🎯 What You'll See

### Every 5 Seconds:
1. **Numbers change** - Energy values go up and down
2. **Charts animate** - Smooth transitions to new data
3. **Timestamp updates** - Shows current time
4. **Green notification** - Brief "Data updated" toast
5. **Trend arrows** - ↑ or ↓ based on changes

### Visual Indicators:
- 🟢 **Pulsing green dot** = Live updates active
- ⚡ **Animated icons** = Data is dynamic
- 📊 **Smooth transitions** = Professional feel
- ✅ **Update toast** = Confirmation of refresh

## 🔄 How It Works

```
Time: 0s  → Data: [100, 32%, 14%]
Time: 5s  → Data: [105, 33%, 15%] ← Updated!
Time: 10s → Data: [98, 31%, 13%]  ← Updated!
Time: 15s → Data: [103, 34%, 14%] ← Updated!
```

### Variation Patterns:
- **Energy**: ±15% variation (realistic fluctuation)
- **Utilization**: ±5% variation (gradual changes)
- **Grid Offset**: ±3% variation (stable with minor shifts)

### Peak Hours Effect:
- **7-10 AM**: 50% higher energy generation
- **5-9 PM**: 50% higher energy generation
- **Other hours**: Normal baseline levels

## 🎨 Animations You'll Notice

1. **Slide-up** - New content enters smoothly
2. **Pulse** - Icons gently pulse to show activity
3. **Fade** - Transitions between values
4. **Scale** - Charts resize smoothly
5. **Color shift** - Status badges change color

## 📱 On Every Page

| Page | What Updates |
|------|-------------|
| **Dashboard** | KPIs, all charts, table values |
| **Sites** | Table data, utilization %, status |
| **Site Detail** | All metrics, charts, allocations |
| **Map** | Marker popups, site data |
| **Reports** | Generated report values |

## 🚀 Try This!

1. Open the dashboard
2. Watch the timestamp in the top bar
3. See it change every 5 seconds
4. Notice the green "Data updated" notification
5. Watch KPI values change
6. See charts animate smoothly
7. Check trend arrows (↑ ↓)

## 💡 Pro Tips

- **Leave it running** - Watch patterns emerge over time
- **Compare pages** - All update simultaneously
- **Check timestamps** - Verify sync across pages
- **Watch trends** - See realistic energy patterns
- **Notice smoothness** - No jarring jumps

## 🎓 Technical Details

### Update Frequency
```javascript
setInterval(() => {
  updateData();
}, 5000); // 5 seconds
```

### Data Algorithm
```javascript
// Sine wave for smooth variation
const variation = Math.sin(timestamp / 10000 + siteId) * 0.15;
const newValue = baseValue * (1 + variation);
```

### Why 5 Seconds?
- Fast enough to feel live
- Slow enough to observe changes
- Optimal for demonstrations
- Realistic for energy monitoring

## ✨ The Result

A dashboard that feels **alive** and **professional**, perfect for:
- 🎯 Demonstrations
- 📊 Presentations
- 🧪 Testing
- 🎓 Learning
- 🚀 Showcasing

---

**Everything updates automatically. Just open and watch!** 🔴⚡
