import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import LiveIndicator from '../components/LiveIndicator';
import UpdateNotification from '../components/UpdateNotification';
import { mockSites, calculateKPIs, generateDynamicData } from '../data/mockData';

function Dashboard({ user }) {
  const [dateRange, setDateRange] = useState('30');
  const [siteTypeFilter, setSiteTypeFilter] = useState('All');
  const [dynamicSites, setDynamicSites] = useState(mockSites);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);

  // Real-time data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSites = generateDynamicData(mockSites);
      setDynamicSites(updatedSites);
      setLastUpdate(new Date());
      setShowNotification(true);
      
      // Hide notification after showing
      setTimeout(() => setShowNotification(false), 100);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredSites = useMemo(() => {
    let sites = [...dynamicSites];
    
    // Role-based filtering
    if (user.role === 'Metro/Rail Authority Manager') {
      sites = sites.filter(s => s.type === 'Metro' || s.type === 'Railway');
    }
    
    // Site type filter
    if (siteTypeFilter !== 'All') {
      sites = sites.filter(s => s.type === siteTypeFilter);
    }
    
    return sites;
  }, [dynamicSites, user.role, siteTypeFilter]);

  const kpis = useMemo(() => calculateKPIs(filteredSites), [filteredSites]);

  // Aggregate hourly data for today
  const hourlyData = useMemo(() => {
    return Array.from({ length: 24 }, (_, hour) => {
      const totalEnergy = filteredSites.reduce((sum, site) => 
        sum + (site.hourlyGeneration[hour] || 0), 0
      );
      return { hour: `${hour}:00`, energy: totalEnergy };
    });
  }, [filteredSites]);

  // Aggregate daily data for last 30 days
  const dailyData = useMemo(() => {
    const aggregated = {};
    filteredSites.forEach(site => {
      site.dailyGeneration.forEach(day => {
        if (!aggregated[day.date]) {
          aggregated[day.date] = { date: day.date, energy: 0 };
        }
        aggregated[day.date].energy += day.energy;
      });
    });
    return Object.values(aggregated).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredSites]);

  // Top 5 sites
  const topSites = useMemo(() => {
    return [...filteredSites]
      .sort((a, b) => b.avgWhPerDay - a.avgWhPerDay)
      .slice(0, 5)
      .map(s => ({ name: s.name.split(' - ')[0], energy: s.avgWhPerDay }));
  }, [filteredSites]);

  // Underperforming sites
  const underperformingSites = filteredSites.filter(s => 
    s.status === 'Underperforming' || s.utilization < 28
  );

  return (
    <div className="space-y-6">
      <UpdateNotification show={showNotification} message="Dashboard data updated" />
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <LiveIndicator lastUpdate={lastUpdate} />
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Site Type</label>
            <select
              value={siteTypeFilter}
              onChange={(e) => setSiteTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Metro">Metro</option>
              <option value="Airport">Airport</option>
              <option value="Mall">Mall</option>
              <option value="Railway">Railway</option>
              <option value="Walkway">Walkway</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Showing {filteredSites.length} sites
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-slide-up">
        <KPICard
          label="Total Energy Generated"
          value={kpis.totalEnergy.toLocaleString()}
          unit="Wh/day"
          icon="⚡"
          color="blue"
          trend={Math.round((Math.sin(Date.now() / 10000) * 5))}
        />
        <KPICard
          label="Utilization Rate"
          value={kpis.avgUtilization}
          unit="%"
          icon="📊"
          color="green"
          trend={Math.round((Math.cos(Date.now() / 10000) * 3))}
        />
        <KPICard
          label="Grid Offset"
          value={kpis.avgGridOffset}
          unit="%"
          icon="🔌"
          color="purple"
          trend={Math.round((Math.sin(Date.now() / 8000) * 4))}
        />
        <KPICard
          label="Estimated Savings"
          value={`₹${kpis.monthlySavings.toLocaleString()}`}
          unit="/month"
          icon="💰"
          color="yellow"
          trend={Math.round((Math.cos(Date.now() / 12000) * 6))}
        />
        <KPICard
          label="Active Sites"
          value={kpis.activeSites}
          unit={`/ ${filteredSites.length}`}
          icon="📍"
          color="red"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Energy */}
        <div className="bg-white rounded-xl shadow-md p-6 data-updating">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hourly Energy Generated (Today)</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Sites */}
        <div className="bg-white rounded-xl shadow-md p-6 data-updating">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Sites by Wh/day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSites}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar 
                dataKey="energy" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]}
                animationDuration={500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Trend */}
      <div className="bg-white rounded-xl shadow-md p-6 data-updating">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Wh Trend (Last 30 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="energy" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorEnergy)"
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Underperforming Sites Table */}
      <div className="bg-white rounded-xl shadow-md p-6 data-updating">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Underperforming Sites</h3>
          {underperformingSites.length > 0 && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {underperformingSites.length} sites need attention
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Site Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Zone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Wh/day</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Utilization %</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {underperformingSites.map(site => (
                <tr key={site.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm">{site.name}</td>
                  <td className="py-3 px-4 text-sm">{site.zone}</td>
                  <td className="py-3 px-4 text-sm">{site.type}</td>
                  <td className="py-3 px-4 text-sm font-medium">{site.avgWhPerDay}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`font-medium ${site.utilization < 25 ? 'text-red-600' : 'text-yellow-600'}`}>
                      {site.utilization}%
                    </span>
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={site.status} /></td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/sites/${site.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
