import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import SmartHome from './components/SmartHome';
import Agriculture from './components/Agriculture';
import AIInsights from './components/AIInsights';
import Settings from './components/Settings';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/smart-home" element={<SmartHome />} />
                <Route path="/agriculture" element={<Agriculture />} />
                <Route path="/ai-insights" element={<AIInsights />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;