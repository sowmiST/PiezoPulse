import React, { useState, useMemo, useEffect } from 'react';
import { mockSites, calculateKPIs, generateDynamicData } from '../data/mockData';

function Reports({ user }) {
  const [startDate, setStartDate] = useState('2026-01-20');
  const [endDate, setEndDate] = useState('2026-02-19');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [dynamicSites, setDynamicSites] = useState(mockSites);

  // Real-time data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSites = generateDynamicData(mockSites);
      setDynamicSites(updatedSites);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const canExport = user.role !== 'Auditor/Viewer';

  const filteredSites = useMemo(() => {
    let sites = [...dynamicSites];
    
    if (user.role === 'Metro/Rail Authority Manager') {
      sites = sites.filter(s => s.type === 'Metro' || s.type === 'Railway');
    }
    
    if (zoneFilter !== 'All') {
      sites = sites.filter(s => s.zone === zoneFilter);
    }
    
    if (typeFilter !== 'All') {
      sites = sites.filter(s => s.type === typeFilter);
    }
    
    return sites;
  }, [dynamicSites, user.role, zoneFilter, typeFilter]);

  const reportData = useMemo(() => {
    if (!reportGenerated) return null;
    return calculateKPIs(filteredSites);
  }, [filteredSites, reportGenerated]);

  const handleGenerateReport = () => {
    setReportGenerated(true);
  };

  const handleExport = (format) => {
    if (!canExport) {
      alert('You do not have permission to export reports');
      return;
    }
    alert(`Exporting report as ${format}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports Generation</h2>
        <p className="text-gray-600 mt-1">Generate comprehensive energy reports for analysis and auditing</p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Infrastructure Type</label>
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
        </div>

        <button
          onClick={handleGenerateReport}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700"
        >
          Generate Report
        </button>
      </div>

      {/* Report Preview */}
      {reportGenerated && reportData && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
            <div className="text-sm text-gray-600">
              {startDate} to {endDate}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Total Energy Generated</div>
              <div className="text-2xl font-bold text-blue-600">{reportData.totalEnergy.toLocaleString()} Wh</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Avg Utilization Rate</div>
              <div className="text-2xl font-bold text-green-600">{reportData.avgUtilization}%</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Avg Grid Offset</div>
              <div className="text-2xl font-bold text-purple-600">{reportData.avgGridOffset}%</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Estimated Savings</div>
              <div className="text-2xl font-bold text-yellow-600">₹{reportData.monthlySavings.toLocaleString()}</div>
            </div>
          </div>

          {/* Site Details Table */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Site-wise Breakdown</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Site Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Zone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Wh/day</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Utilization %</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Grid Offset %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map(site => (
                    <tr key={site.id} className="border-b">
                      <td className="py-3 px-4 text-sm">{site.name}</td>
                      <td className="py-3 px-4 text-sm">{site.zone}</td>
                      <td className="py-3 px-4 text-sm">{site.type}</td>
                      <td className="py-3 px-4 text-sm font-medium">{site.avgWhPerDay}</td>
                      <td className="py-3 px-4 text-sm">{site.utilization}%</td>
                      <td className="py-3 px-4 text-sm">{site.gridOffset}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleExport('CSV')}
              disabled={!canExport}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                canExport
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              📊 Export CSV
            </button>
            <button
              onClick={() => handleExport('PDF')}
              disabled={!canExport}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                canExport
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              📄 Export PDF
            </button>
          </div>

          {!canExport && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ You do not have permission to export reports. Contact your administrator for access.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Monthly Energy Summary - January 2026', date: '2026-02-01', format: 'PDF' },
            { name: 'Site Performance Analysis - Q4 2025', date: '2026-01-15', format: 'Excel' },
            { name: 'Optimization Recommendations - December', date: '2026-01-05', format: 'PDF' }
          ].map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div>
                <div className="font-medium text-gray-900">{report.name}</div>
                <div className="text-sm text-gray-600">Generated on {report.date}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{report.format}</span>
                <button
                  onClick={() => handleExport(report.format)}
                  disabled={!canExport}
                  className={`text-sm ${
                    canExport ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;
