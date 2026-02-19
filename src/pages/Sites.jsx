import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { mockSites, generateDynamicData } from '../data/mockData';

function Sites({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dynamicSites, setDynamicSites] = useState(mockSites);

  // Real-time data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSites = generateDynamicData(mockSites);
      setDynamicSites(updatedSites);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredSites = useMemo(() => {
    let sites = [...dynamicSites];
    
    // Role-based filtering
    if (user.role === 'Metro/Rail Authority Manager') {
      sites = sites.filter(s => s.type === 'Metro' || s.type === 'Railway');
    }
    
    // Search filter
    if (searchTerm) {
      sites = sites.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.zone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Zone filter
    if (zoneFilter !== 'All') {
      sites = sites.filter(s => s.zone === zoneFilter);
    }
    
    // Type filter
    if (typeFilter !== 'All') {
      sites = sites.filter(s => s.type === typeFilter);
    }
    
    // Status filter
    if (statusFilter !== 'All') {
      sites = sites.filter(s => s.status === statusFilter);
    }
    
    return sites;
  }, [dynamicSites, user.role, searchTerm, zoneFilter, typeFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">All Installations</h2>
        <div className="text-sm text-gray-600">
          {filteredSites.length} sites found
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Zones</option>
              <option value="North Chennai">North Chennai</option>
              <option value="Central Chennai">Central Chennai</option>
              <option value="South Chennai">South Chennai</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Metro">Metro</option>
              <option value="Airport">Airport</option>
              <option value="Mall">Mall</option>
              <option value="Railway">Railway</option>
              <option value="Walkway">Walkway</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Underperforming">Underperforming</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sites Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Site Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Zone</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Installed Tiles</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Avg Wh/day</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Utilization %</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Grid Offset %</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Last Updated</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map(site => (
                <tr
                  key={site.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => window.location.href = `/sites/${site.id}`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{site.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{site.zone}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {site.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{site.tilesInstalled}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">{site.avgWhPerDay}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{site.utilization}%</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{site.gridOffset}%</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(site.lastUpdated).toLocaleString('en-IN', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={site.status} />
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/sites/${site.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details →
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

export default Sites;
