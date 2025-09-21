import React from 'react';
import { 
  Zap, 
  Droplet, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb 
} from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import './Overview.css';

const Overview = () => {
  const summaryCards = [
    {
      title: 'Energy Saved',
      value: '1,247 kWh',
      change: '+23%',
      icon: Zap,
      color: 'var(--accent)',
      trend: 'up'
    },
    {
      title: 'Water Saved',
      value: '2,150 L',
      change: '+18%',
      icon: Droplet,
      color: 'var(--secondary)',
      trend: 'up'
    },
    {
      title: 'Cost Reduced',
      value: '$324',
      change: '+15%',
      icon: DollarSign,
      color: 'var(--success)',
      trend: 'up'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Living Room AC Idle',
      message: 'Air conditioner has been idle for 45 minutes. Consider turning it off to save energy.',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      icon: Lightbulb,
      title: 'Smart Suggestion',
      message: 'Irrigation scheduled for tomorrow morning based on weather forecast.',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="overview animate-fade-in">
      <div className="overview-header">
        <h2>System Overview</h2>
        <p>Real-time insights from your smart environment</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 mb-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card summary-card">
              <div className="card-content">
                <div className="summary-header">
                  <div className="summary-icon" style={{ backgroundColor: `${card.color}20` }}>
                    <Icon size={24} style={{ color: card.color }} />
                  </div>
                  <div className="summary-trend">
                    <TrendingUp size={16} style={{ color: card.color }} />
                    <span style={{ color: card.color }}>{card.change}</span>
                  </div>
                </div>
                <div className="summary-content">
                  <h3 className="summary-value">{card.value}</h3>
                  <p className="summary-label">{card.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Electricity Usage */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Electricity Usage</h3>
            <span className="card-subtitle">Current month efficiency</span>
          </div>
          <div className="card-content">
            <div className="progress-container">
              <ProgressCircle 
                value={73} 
                size={120} 
                strokeWidth={8}
                color="var(--accent)"
                label="Efficiency"
              />
              <div className="progress-details">
                <div className="progress-item">
                  <span className="progress-dot" style={{ backgroundColor: 'var(--accent)' }}></span>
                  <span>Used: 1,850 kWh</span>
                </div>
                <div className="progress-item">
                  <span className="progress-dot" style={{ backgroundColor: 'var(--border-color)' }}></span>
                  <span>Saved: 680 kWh</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Water Efficiency */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Water Efficiency</h3>
            <span className="card-subtitle">Smart irrigation performance</span>
          </div>
          <div className="card-content">
            <div className="progress-container">
              <ProgressCircle 
                value={89} 
                size={120} 
                strokeWidth={8}
                color="var(--secondary)"
                label="Efficiency"
              />
              <div className="progress-details">
                <div className="progress-item">
                  <span className="progress-dot" style={{ backgroundColor: 'var(--secondary)' }}></span>
                  <span>Used: 3,240 L</span>
                </div>
                <div className="progress-item">
                  <span className="progress-dot" style={{ backgroundColor: 'var(--border-color)' }}></span>
                  <span>Saved: 2,150 L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">System Alerts</h3>
          <span className="card-subtitle">Recent notifications and suggestions</span>
        </div>
        <div className="card-content">
          <div className="alerts-list">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  <div className="alert-icon">
                    <Icon size={20} />
                  </div>
                  <div className="alert-content">
                    <h4 className="alert-title">{alert.title}</h4>
                    <p className="alert-message">{alert.message}</p>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <button className="btn btn-outline btn-sm">Action</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;