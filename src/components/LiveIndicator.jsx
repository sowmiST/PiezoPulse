import React from 'react';

function LiveIndicator({ lastUpdate }) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="relative flex items-center">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
      </div>
      <span className="font-medium text-green-600">Live</span>
      {lastUpdate && (
        <span className="text-gray-500 text-xs">
          Updated {lastUpdate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      )}
    </div>
  );
}

export default LiveIndicator;
