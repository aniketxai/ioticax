import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Smartphone, 
  Sprout, 
  Brain, 
  Settings, 
  Menu,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Overview', color: 'var(--primary)' },
    { path: '/smart-home', icon: Smartphone, label: 'Smart Home', color: 'var(--secondary)' },
    { path: '/agriculture', icon: Sprout, label: 'Agriculture', color: 'var(--success)' },
    { path: '/ai-insights', icon: Brain, label: 'AI Insights', color: 'var(--accent)' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'var(--text-secondary)' },
  ];

  return (
    <>
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Sprout size={32} color="var(--primary)" />
            </div>
            <div className="logo-text">
              <h2>Ioticax</h2>
              <span>IoT + AI Platform</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} style={{ color: isActive ? item.color : 'currentColor' }} />
                    <span>{item.label}</span>
                    {isActive && <div className="active-indicator" style={{ backgroundColor: item.color }}></div>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="status-card">
            <div className="status-indicator">
              <div className="status-dot status-online"></div>
              <span>System Online</span>
            </div>
            <div className="device-count">
              <span className="text-xs text-secondary">12 devices connected</span>
            </div>
          </div>
        </div>
      </aside>
      
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;