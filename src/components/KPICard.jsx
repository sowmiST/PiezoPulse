import React from 'react';

function KPICard({ label, value, unit, icon, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 data-updating">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-3xl font-bold text-gray-900 transition-all duration-500">{value}</h3>
            {unit && <span className="text-lg text-gray-500">{unit}</span>}
          </div>
          {trend !== undefined && trend !== 0 && (
            <p className={`text-sm mt-2 flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{trend > 0 ? '↑' : '↓'}</span>
              {Math.abs(trend)}% from last period
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white text-2xl animate-pulse-slow`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default KPICard;
