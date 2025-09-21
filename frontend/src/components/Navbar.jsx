import React, { useState } from 'react';
import { Bell, Sun, Moon, Download, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [language, setLanguage] = useState('en');

  const notifications = [
    { id: 1, type: 'warning', message: 'Living room AC idle for 45 minutes', time: '5m ago' },
    { id: 2, type: 'success', message: 'Smart irrigation completed successfully', time: '1h ago' },
    { id: 3, type: 'info', message: 'Energy usage 15% below average today', time: '2h ago' },
  ];

  const handleExportData = (format) => {
    // Mock export functionality
    console.log(`Exporting data as ${format}`);
    alert(`Data exported as ${format.toUpperCase()}`);
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <h1>Dashboard</h1>
          <span className="subtitle">Monitor and control your smart environment</span>
        </div>

        <div className="navbar-actions">
          {/* Export buttons */}
          <div className="export-buttons">
            <button 
              className="btn btn-outline"
              onClick={() => handleExportData('pdf')}
              title="Export as PDF"
            >
              <Download size={16} />
              PDF
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleExportData('csv')}
              title="Export as CSV"
            >
              <Download size={16} />
              CSV
            </button>
          </div>

          {/* Language selector */}
          <div className="language-selector">
            <button className="btn btn-outline">
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>

          {/* Theme toggle */}
          <button 
            className="btn btn-outline theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Notifications */}
          <div className="notifications-container">
            <button 
              className="btn btn-outline notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={16} />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button className="text-sm text-primary">Mark all read</button>
                </div>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <div className={`notification-indicator ${notification.type}`}></div>
                    </div>
                  ))}
                </div>
                <div className="notifications-footer">
                  <button className="text-sm text-secondary">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="user-avatar">
            <div className="avatar">
              <span>AN</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;