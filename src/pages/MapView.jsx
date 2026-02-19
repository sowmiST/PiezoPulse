import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import StatusBadge from '../components/StatusBadge';
import { mockSites, generateDynamicData } from '../data/mockData';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ user }) {
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
    
    if (zoneFilter !== 'All') {
      sites = sites.filter(s => s.zone === zoneFilter);
    }
    
    if (typeFilter !== 'All') {
      sites = sites.filter(s => s.type === typeFilter);
    }
    
    if (statusFilter !== 'All') {
      sites = sites.filter(s => s.status === statusFilter);
    }
    
    return sites;
  }, [dynamicSites, user.role, zoneFilter, typeFilter, statusFilter]);

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10b981';
      case 'Underperforming':
        return '#f59e0b';
      case 'Maintenance':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Chennai center coordinates
  const chennaiCenter = [13.0827, 80.2707];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Chennai Map View</h2>
        <div className="text-sm text-gray-600">
          {filteredSites.length} sites displayed
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Underperforming">Underperforming</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">Underperforming</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">Maintenance</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ height: '600px' }}>
        <MapContainer
          center={chennaiCenter}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredSites.map(site => (
            <CircleMarker
              key={site.id}
              center={[site.lat, site.lng]}
              radius={12}
              fillColor={getMarkerColor(site.status)}
              color="#fff"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-semibold text-gray-900 mb-2">{site.name}</h4>
                  <div className="space-y-1 text-sm mb-3">
                    <div><span className="text-gray-600">Zone:</span> {site.zone}</div>
                    <div><span className="text-gray-600">Type:</span> {site.type}</div>
                    <div><span className="text-gray-600">Wh/day:</span> <strong>{site.avgWhPerDay}</strong></div>
                    <div><span className="text-gray-600">Utilization:</span> {site.utilization}%</div>
                    <div className="pt-1">
                      <StatusBadge status={site.status} />
                    </div>
                  </div>
                  <Link
                    to={`/sites/${site.id}`}
                    className="inline-block w-full text-center px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
