import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

function Layout({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const getRoleBadgeColor = () => {
    if (user.role === 'Municipal Energy Officer') return 'bg-blue-600';
    if (user.role === 'Metro/Rail Authority Manager') return 'bg-green-600';
    return 'bg-gray-600';
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/sites', label: 'Sites', icon: '📍' },
    { path: '/map', label: 'Map View', icon: '🗺️' },
    { path: '/reports', label: 'Reports', icon: '📄' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">PiezoPulse</h1>
              <p className="text-xs text-blue-300">Chennai</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-blue-700">
          <div className="text-xs text-blue-300 mb-2">SDG 7</div>
          <div className="text-sm">Affordable & Clean Energy</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
              <p className="text-sm text-gray-600">{user.city} Energy Monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getRoleBadgeColor()}`}>
                  {user.role}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
