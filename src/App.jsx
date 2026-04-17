import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'chartjs-adapter-date-fns';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import FetchData from './components/FetchData';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="hero-section">
          <div className="hero-overlay">
            <p className="hero-tag">SMART MONITORING PLATFORM</p>
            <h1 className="main-title">IoT Sensors Dashboard</h1>
            <p className="sub-title">
              Monitor sensor trends, explore datasets, and analyse correlations
              through a cleaner and more modern dashboard interface.
            </p>
          </div>
        </div>

        <div className="page-content">
          <Routes>
            <Route path="/sensorData1" element={<FetchData />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/:id" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;