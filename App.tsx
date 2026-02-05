
import React, { useState, useEffect } from 'react';
import { SocietyData, View } from './types';
import { INITIAL_DATA } from './constants';
import Home from './pages/Home';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('HOME');
  const [data, setData] = useState<SocietyData>(INITIAL_DATA);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('society_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Save data whenever it changes
  const updateData = (newData: SocietyData) => {
    setData(newData);
    localStorage.setItem('society_data', JSON.stringify(newData));
  };

  const renderView = () => {
    switch (view) {
      case 'HOME':
        return <Home data={data} setView={setView} />;
      case 'ADMIN_AUTH':
        return <AdminAuth setView={setView} />;
      case 'ADMIN_DASHBOARD':
        return <AdminDashboard data={data} updateData={updateData} setView={setView} />;
      default:
        return <Home data={data} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
