// Tariff rate constant
export const TARIFF_RATE = 8; // ₹8 per kWh

// Generate hourly data for 24 hours with dynamic variation
const generateHourlyData = (baseValue, seed = 0) => {
  return Array.from({ length: 24 }, (_, i) => {
    const peakMultiplier = (i >= 7 && i <= 10) || (i >= 17 && i <= 21) ? 1.5 : 1;
    const randomFactor = 0.8 + (Math.sin(seed + i) * 0.2 + 0.2);
    return Math.round(baseValue * peakMultiplier * randomFactor);
  });
};

// Dynamic data generator for real-time updates
export const generateDynamicData = (sites, timestamp = Date.now()) => {
  const seed = timestamp / 10000; // Changes every 10 seconds
  
  return sites.map(site => {
    const variation = Math.sin(seed + site.id) * 0.15; // ±15% variation
    const utilizationVariation = Math.sin(seed * 2 + site.id) * 5; // ±5% variation
    const gridOffsetVariation = Math.sin(seed * 1.5 + site.id) * 3; // ±3% variation
    
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

// Generate daily data for 30 days
const generateDailyData = (baseValue) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2026, 1, i - 29);
    return {
      date: date.toISOString().split('T')[0],
      energy: Math.round(baseValue * (0.85 + Math.random() * 0.3))
    };
  });
};

export const mockSites = [
  {
    id: 1,
    name: 'Chennai Metro - Koyambedu Station',
    zone: 'Central Chennai',
    type: 'Metro',
    tilesInstalled: 500,
    avgWhPerDay: 95,
    utilization: 32,
    gridOffset: 14,
    status: 'Active',
    lastUpdated: '2026-02-19T08:30:00',
    lat: 13.0719,
    lng: 80.1948,
    hourlyGeneration: generateHourlyData(4),
    dailyGeneration: generateDailyData(95),
    allocation: { lighting: 40, iot: 30, backup: 20, display: 10 }
  },
  {
    id: 2,
    name: 'Chennai Airport - Terminal 1',
    zone: 'South Chennai',
    type: 'Airport',
    tilesInstalled: 800,
    avgWhPerDay: 120,
    utilization: 28,
    gridOffset: 12,
    status: 'Active',
    lastUpdated: '2026-02-19T09:15:00',
    lat: 12.9941,
    lng: 80.1709,
    hourlyGeneration: generateHourlyData(5),
    dailyGeneration: generateDailyData(120),
    allocation: { lighting: 35, iot: 25, backup: 25, display: 15 }
  },
  {
    id: 3,
    name: 'Express Avenue Mall',
    zone: 'Central Chennai',
    type: 'Mall',
    tilesInstalled: 350,
    avgWhPerDay: 68,
    utilization: 30,
    gridOffset: 11,
    status: 'Active',
    lastUpdated: '2026-02-19T07:45:00',
    lat: 13.0569,
    lng: 80.2602,
    hourlyGeneration: generateHourlyData(2.8),
    dailyGeneration: generateDailyData(68),
    allocation: { lighting: 45, iot: 20, backup: 20, display: 15 }
  },
  {
    id: 4,
    name: 'Chennai Central Railway Station',
    zone: 'Central Chennai',
    type: 'Railway',
    tilesInstalled: 600,
    avgWhPerDay: 105,
    utilization: 35,
    gridOffset: 15,
    status: 'Active',
    lastUpdated: '2026-02-19T08:00:00',
    lat: 13.0827,
    lng: 80.2707,
    hourlyGeneration: generateHourlyData(4.4),
    dailyGeneration: generateDailyData(105),
    allocation: { lighting: 38, iot: 28, backup: 22, display: 12 }
  },
  {
    id: 5,
    name: 'Marina Beach Walkway',
    zone: 'Central Chennai',
    type: 'Walkway',
    tilesInstalled: 250,
    avgWhPerDay: 45,
    utilization: 26,
    gridOffset: 8,
    status: 'Underperforming',
    lastUpdated: '2026-02-19T06:30:00',
    lat: 13.0499,
    lng: 80.2824,
    hourlyGeneration: generateHourlyData(1.9),
    dailyGeneration: generateDailyData(45),
    allocation: { lighting: 50, iot: 15, backup: 25, display: 10 }
  },
  {
    id: 6,
    name: 'Metro - Alandur Station',
    zone: 'South Chennai',
    type: 'Metro',
    tilesInstalled: 450,
    avgWhPerDay: 82,
    utilization: 29,
    gridOffset: 13,
    status: 'Active',
    lastUpdated: '2026-02-19T08:45:00',
    lat: 13.0025,
    lng: 80.2011,
    hourlyGeneration: generateHourlyData(3.4),
    dailyGeneration: generateDailyData(82),
    allocation: { lighting: 42, iot: 28, backup: 18, display: 12 }
  },
  {
    id: 7,
    name: 'Phoenix Marketcity Mall',
    zone: 'South Chennai',
    type: 'Mall',
    tilesInstalled: 400,
    avgWhPerDay: 75,
    utilization: 31,
    gridOffset: 12,
    status: 'Active',
    lastUpdated: '2026-02-19T09:00:00',
    lat: 13.0097,
    lng: 80.2109,
    hourlyGeneration: generateHourlyData(3.1),
    dailyGeneration: generateDailyData(75),
    allocation: { lighting: 40, iot: 25, backup: 20, display: 15 }
  },
  {
    id: 8,
    name: 'Tambaram Railway Station',
    zone: 'South Chennai',
    type: 'Railway',
    tilesInstalled: 380,
    avgWhPerDay: 70,
    utilization: 27,
    gridOffset: 10,
    status: 'Active',
    lastUpdated: '2026-02-19T07:20:00',
    lat: 12.9250,
    lng: 80.1167,
    hourlyGeneration: generateHourlyData(2.9),
    dailyGeneration: generateDailyData(70),
    allocation: { lighting: 38, iot: 30, backup: 20, display: 12 }
  },
  {
    id: 9,
    name: 'Metro - Thirumangalam Station',
    zone: 'North Chennai',
    type: 'Metro',
    tilesInstalled: 420,
    avgWhPerDay: 78,
    utilization: 30,
    gridOffset: 11,
    status: 'Active',
    lastUpdated: '2026-02-19T08:10:00',
    lat: 13.0897,
    lng: 80.2015,
    hourlyGeneration: generateHourlyData(3.3),
    dailyGeneration: generateDailyData(78),
    allocation: { lighting: 40, iot: 28, backup: 20, display: 12 }
  },
  {
    id: 10,
    name: 'Citi Centre Mall',
    zone: 'North Chennai',
    type: 'Mall',
    tilesInstalled: 300,
    avgWhPerDay: 55,
    utilization: 25,
    gridOffset: 9,
    status: 'Underperforming',
    lastUpdated: '2026-02-19T07:00:00',
    lat: 13.1067,
    lng: 80.2206,
    hourlyGeneration: generateHourlyData(2.3),
    dailyGeneration: generateDailyData(55),
    allocation: { lighting: 45, iot: 20, backup: 25, display: 10 }
  },
  {
    id: 11,
    name: 'Perambur Railway Station',
    zone: 'North Chennai',
    type: 'Railway',
    tilesInstalled: 320,
    avgWhPerDay: 58,
    utilization: 26,
    gridOffset: 9,
    status: 'Maintenance',
    lastUpdated: '2026-02-18T18:30:00',
    lat: 13.1127,
    lng: 80.2424,
    hourlyGeneration: generateHourlyData(2.4),
    dailyGeneration: generateDailyData(58),
    allocation: { lighting: 40, iot: 25, backup: 22, display: 13 }
  },
  {
    id: 12,
    name: 'Besant Nagar Beach Walkway',
    zone: 'South Chennai',
    type: 'Walkway',
    tilesInstalled: 200,
    avgWhPerDay: 38,
    utilization: 25,
    gridOffset: 7,
    status: 'Active',
    lastUpdated: '2026-02-19T06:45:00',
    lat: 13.0001,
    lng: 80.2668,
    hourlyGeneration: generateHourlyData(1.6),
    dailyGeneration: generateDailyData(38),
    allocation: { lighting: 48, iot: 18, backup: 24, display: 10 }
  }
];

// Calculate aggregate KPIs
export const calculateKPIs = (sites) => {
  const totalEnergy = sites.reduce((sum, site) => sum + site.avgWhPerDay, 0);
  const avgUtilization = Math.round(sites.reduce((sum, site) => sum + site.utilization, 0) / sites.length);
  const avgGridOffset = Math.round(sites.reduce((sum, site) => sum + site.gridOffset, 0) / sites.length);
  const activeSites = sites.filter(s => s.status === 'Active').length;
  
  // Estimated savings: (total energy * grid offset %) * tariff rate / 1000 (Wh to kWh) * 30 days
  const monthlySavings = Math.round((totalEnergy * avgGridOffset / 100) * TARIFF_RATE / 1000 * 30);
  
  return {
    totalEnergy,
    avgUtilization,
    avgGridOffset,
    activeSites,
    monthlySavings
  };
};

// Audit log mock data
export const mockAuditLog = [
  {
    id: 1,
    timestamp: '2026-02-19T08:30:00',
    siteId: 1,
    siteName: 'Chennai Metro - Koyambedu Station',
    objective: 'Max Grid Offset',
    allocation: 'Lighting: 55%, IoT: 20%, Backup: 15%, Display: 10%',
    projectedGridOffset: 18,
    status: 'Approved'
  },
  {
    id: 2,
    timestamp: '2026-02-18T14:20:00',
    siteId: 2,
    siteName: 'Chennai Airport - Terminal 1',
    objective: 'Balanced',
    allocation: 'Lighting: 40%, IoT: 30%, Backup: 20%, Display: 10%',
    projectedGridOffset: 15,
    status: 'Pending'
  },
  {
    id: 3,
    timestamp: '2026-02-17T11:15:00',
    siteId: 4,
    siteName: 'Chennai Central Railway Station',
    objective: 'Max Utilization',
    allocation: 'Lighting: 25%, IoT: 50%, Backup: 15%, Display: 10%',
    projectedGridOffset: 12,
    status: 'Rejected'
  }
];
