import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sites from './pages/Sites';
import SiteDetail from './pages/SiteDetail';
import MapView from './pages/MapView';
import Reports from './pages/Reports';
import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('piezopulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSetUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('piezopulse_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('piezopulse_user');
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={handleSetUser} />} />
        <Route path="/" element={user ? <Layout user={user} setUser={handleSetUser} /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard user={user} />} />
          <Route path="sites" element={<Sites user={user} />} />
          <Route path="sites/:id" element={<SiteDetail user={user} />} />
          <Route path="map" element={<MapView user={user} />} />
          <Route path="reports" element={<Reports user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
