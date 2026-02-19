import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { mockSites, mockAuditLog, TARIFF_RATE, generateDynamicData } from '../data/mockData';

function SiteDetail({ user }) {
  const { id } = useParams();
  const [dynamicSites, setDynamicSites] = useState(mockSites);
  const [activeTab, setActiveTab] = useState('overview');

  // Real-time data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSites = generateDynamicData(mockSites);
      setDynamicSites(updatedSites);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const site = dynamicSites.find(s => s.id === parseInt(id));

  // Optimization simulator state
  const [availableEnergy, setAvailableEnergy] = useState(site?.avgWhPerDay || 100);
  const [storageLevel, setStorageLevel] = useState(75);
  const [objective, setObjective] = useState('balanced');
  const [peakHours, setPeakHours] = useState('full');
  const [optimizationResult, setOptimizationResult] = useState(null);

  if (!site) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Site not found</p>
        <Link to="/sites" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          ← Back to Sites
        </Link>
      </div>
    );
  }

  // Check RBAC for optimization tab
  const canAccessOptimization = user.role !== 'Auditor/Viewer';

  // Hourly data
  const hourlyData = site.hourlyGeneration.map((energy, hour) => ({
    hour: `${hour}:00`,
    energy
  }));

  // Peak hours
  const peakHoursData = [...site.hourlyGeneration]
    .map((energy, hour) => ({ hour, energy }))
    .sort((a, b) => b.energy - a.energy)
    .slice(0, 3);

  // Allocation pie chart data
  const allocationData = [
    { name: 'Lighting', value: site.allocation.lighting, color: '#3b82f6' },
    { name: 'IoT Sensors', value: site.allocation.iot, color: '#10b981' },
    { name: 'Backup', value: site.allocation.backup, color: '#f59e0b' },
    { name: 'Display Panels', value: site.allocation.display, color: '#8b5cf6' }
  ];

  // Piezo vs Grid comparison
  const piezoVsGridData = [
    { category: 'Piezo Energy', value: site.avgWhPerDay, fill: '#10b981' },
    { category: 'Grid Energy', value: Math.round(site.avgWhPerDay * (100 - site.gridOffset) / site.gridOffset), fill: '#ef4444' }
  ];

  // Audit log for this site
  const siteAuditLog = mockAuditLog.filter(log => log.siteId === site.id);

  // Optimization logic
  const handleOptimize = () => {
    let allocation = {};
    let gridOffset = 0;
    let utilizationUplift = 0;
    let confidence = 0;
    let schedule = '';

    if (objective === 'max_grid_offset') {
      allocation = { lighting: 55, iot: 20, backup: 15, display: 10 };
      gridOffset = site.gridOffset + 6;
      utilizationUplift = 3;
      confidence = 87;
      schedule = 'Peak hours: 7-10 AM, 5-9 PM';
    } else if (objective === 'max_utilization') {
      allocation = { lighting: 25, iot: 50, backup: 15, display: 10 };
      gridOffset = site.gridOffset + 2;
      utilizationUplift = 12;
      confidence = 92;
      schedule = 'Continuous 24/7 operation';
    } else {
      allocation = { lighting: 40, iot: 30, backup: 20, display: 10 };
      gridOffset = site.gridOffset + 4;
      utilizationUplift = 7;
      confidence = 89;
      schedule = 'Balanced: 6 AM - 10 PM';
    }

    // Adjust for storage level
    if (storageLevel < 30) {
      allocation.backup = Math.min(allocation.backup + 10, 30);
      allocation.lighting -= 5;
      allocation.iot -= 5;
    }

    // Calculate savings
    const monthlySavings = Math.round((availableEnergy * gridOffset / 100) * TARIFF_RATE / 1000 * 30);

    setOptimizationResult({
      allocation,
      gridOffset,
      utilizationUplift,
      monthlySavings,
      confidence,
      schedule
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'generation', label: 'Generation Analytics', icon: '⚡' },
    { id: 'utilization', label: 'Utilization', icon: '📈' },
    { id: 'optimization', label: 'Optimization Simulator', icon: '🎯', disabled: !canAccessOptimization },
    { id: 'audit', label: 'Audit Log', icon: '📋' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/sites" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Sites
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">{site.name}</h2>
          <p className="text-gray-600">{site.zone} • {site.type}</p>
        </div>
        <StatusBadge status={site.status} />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : tab.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* TAB A: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                  label="Installed Tiles"
                  value={site.tilesInstalled}
                  icon="🔲"
                  color="blue"
                />
                <KPICard
                  label="Avg Wh/day"
                  value={site.avgWhPerDay}
                  unit="Wh"
                  icon="⚡"
                  color="green"
                />
                <KPICard
                  label="Utilization"
                  value={site.utilization}
                  unit="%"
                  icon="📊"
                  color="purple"
                />
                <KPICard
                  label="Grid Offset"
                  value={site.gridOffset}
                  unit="%"
                  icon="🔌"
                  color="yellow"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Site Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium">{site.zone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <span className="ml-2 font-medium">{site.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="ml-2 font-medium">
                      {new Date(site.lastUpdated).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="ml-2 font-medium">{site.lat.toFixed(4)}, {site.lng.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB B: Generation Analytics */}
          {activeTab === 'generation' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Hourly Generation (24 Hours)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Daily Generation (30 Days)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={site.dailyGeneration}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Peak Hours</h4>
                <div className="grid grid-cols-3 gap-4">
                  {peakHoursData.map((peak, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{peak.hour}:00</div>
                      <div className="text-sm text-gray-600 mt-1">{peak.energy} Wh</div>
                      <div className="text-xs text-gray-500 mt-1">Rank #{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB C: Utilization */}
          {activeTab === 'utilization' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Energy Allocation Split</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Piezo vs Grid Contribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={piezoVsGridData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                        {piezoVsGridData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Load Demand Estimate</h4>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Load Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Allocation %</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Energy (Wh/day)</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocationData.map(item => (
                      <tr key={item.name} className="border-b">
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4">{item.value}%</td>
                        <td className="py-3 px-4 font-medium">
                          {Math.round(site.avgWhPerDay * item.value / 100)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.value > 35 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.value > 35 ? 'High' : 'Moderate'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB D: Optimization Simulator */}
          {activeTab === 'optimization' && canAccessOptimization && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">⚙️ Optimization Simulator</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Configure parameters to generate AI-powered allocation recommendations
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Harvested Energy (Wh/day)
                    </label>
                    <input
                      type="number"
                      value={availableEnergy}
                      onChange={(e) => setAvailableEnergy(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Level: {storageLevel}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={storageLevel}
                      onChange={(e) => setStorageLevel(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Optimization Objective
                    </label>
                    <select
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="max_grid_offset">Maximize Grid Offset</option>
                      <option value="max_utilization">Maximize Utilization</option>
                      <option value="balanced">Balanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peak Hours
                    </label>
                    <select
                      value={peakHours}
                      onChange={(e) => setPeakHours(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="morning">Morning (7-10 AM)</option>
                      <option value="evening">Evening (5-9 PM)</option>
                      <option value="full">Full Day</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleOptimize}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700"
                >
                  Generate Recommendation
                </button>
              </div>

              {optimizationResult && (
                <div className="bg-white border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">✅ Optimization Results</h4>
                    <div className="text-sm">
                      <span className="text-gray-600">Confidence Score: </span>
                      <span className="font-bold text-green-600">{optimizationResult.confidence}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Recommended Allocation</h5>
                      <div className="space-y-2">
                        {Object.entries(optimizationResult.allocation).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <span className="capitalize">{key}</span>
                            <span className="font-bold text-blue-600">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <KPICard
                        label="Projected Grid Offset"
                        value={optimizationResult.gridOffset}
                        unit="%"
                        color="green"
                      />
                      <KPICard
                        label="Utilization Uplift"
                        value={`+${optimizationResult.utilizationUplift}`}
                        unit="%"
                        color="blue"
                      />
                      <KPICard
                        label="Monthly Savings"
                        value={`₹${optimizationResult.monthlySavings}`}
                        color="yellow"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Recommended Schedule</h5>
                    <p className="text-sm text-gray-700">{optimizationResult.schedule}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Export Recommendation
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Compare Strategies
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB E: Audit Log */}
          {activeTab === 'audit' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Optimization History</h4>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Timestamp</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Objective</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Allocation Summary</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Projected Grid Offset</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {siteAuditLog.length > 0 ? (
                    siteAuditLog.map(log => (
                      <tr key={log.id} className="border-b">
                        <td className="py-3 px-4 text-sm">
                          {new Date(log.timestamp).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-sm">{log.objective}</td>
                        <td className="py-3 px-4 text-sm">{log.allocation}</td>
                        <td className="py-3 px-4 text-sm font-medium">{log.projectedGridOffset}%</td>
                        <td className="py-3 px-4">
                          <StatusBadge status={log.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No optimization history available for this site
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SiteDetail;
