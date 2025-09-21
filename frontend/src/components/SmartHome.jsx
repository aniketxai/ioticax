import React, { useState } from 'react';
import { 
  Tv, 
  Wind, 
  Lightbulb, 
  Refrigerator,
  Thermometer,
  Volume2,
  Wifi,
  Battery
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SmartHome.css';

const SmartHome = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Living Room TV',
      type: 'entertainment',
      icon: Tv,
      status: true,
      consumption: '120W',
      room: 'Living Room',
      lastUsed: '2 hours ago',
      suggestion: null
    },
    {
      id: 2,
      name: 'Bedroom AC',
      type: 'climate',
      icon: Wind,
      status: false,
      consumption: '0W',
      room: 'Bedroom',
      lastUsed: '6 hours ago',
      suggestion: null
    },
    {
      id: 3,
      name: 'Kitchen Lights',
      type: 'lighting',
      icon: Lightbulb,
      status: true,
      consumption: '45W',
      room: 'Kitchen',
      lastUsed: 'Active',
      suggestion: null
    },
    {
      id: 4,
      name: 'Smart Refrigerator',
      type: 'appliance',
      icon: Refrigerator,
      status: true,
      consumption: '150W',
      room: 'Kitchen',
      lastUsed: 'Always on',
      suggestion: null
    },
    {
      id: 5,
      name: 'Living Room AC',
      type: 'climate',
      icon: Wind,
      status: true,
      consumption: '850W',
      room: 'Living Room',
      lastUsed: '30 minutes ago',
      suggestion: 'Turn off - idle for 30 mins'
    },
    {
      id: 6,
      name: 'Smart Speaker',
      type: 'entertainment',
      icon: Volume2,
      status: true,
      consumption: '15W',
      room: 'Living Room',
      lastUsed: 'Active',
      suggestion: null
    }
  ]);

  const energyData = [
    { time: '00:00', consumption: 2.1 },
    { time: '04:00', consumption: 1.8 },
    { time: '08:00', consumption: 3.2 },
    { time: '12:00', consumption: 4.5 },
    { time: '16:00', consumption: 5.1 },
    { time: '20:00', consumption: 6.8 },
    { time: '24:00', consumption: 3.4 }
  ];

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            status: !device.status,
            consumption: !device.status ? device.consumption : '0W',
            lastUsed: !device.status ? 'Active' : 'Just turned off'
          }
        : device
    ));
  };

  const getDeviceIcon = (device) => {
    const Icon = device.icon;
    return <Icon size={24} />;
  };

  const getStatusColor = (status) => {
    return status ? 'var(--success)' : 'var(--text-tertiary)';
  };

  const totalConsumption = devices
    .filter(device => device.status)
    .reduce((total, device) => {
      const consumption = parseInt(device.consumption);
      return total + (isNaN(consumption) ? 0 : consumption);
    }, 0);

  return (
    <div className="smart-home animate-fade-in">
      <div className="smart-home-header">
        <h2>Smart Home Control</h2>
        <p>Monitor and control your connected devices</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 mb-6">
        <div className="card stat-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <Wifi size={24} style={{ color: 'var(--success)' }} />
            </div>
            <div className="stat-info">
              <h3>{devices.length}</h3>
              <p>Connected Devices</p>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
              <Battery size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="stat-info">
              <h3>{totalConsumption}W</h3>
              <p>Current Usage</p>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}>
              <Thermometer size={24} style={{ color: 'var(--secondary)' }} />
            </div>
            <div className="stat-info">
              <h3>22°C</h3>
              <p>Average Temp</p>
            </div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <Lightbulb size={24} style={{ color: 'var(--error)' }} />
            </div>
            <div className="stat-info">
              <h3>{devices.filter(d => d.status).length}</h3>
              <p>Active Devices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Device Controls */}
        <div className="card devices-section">
          <div className="card-header">
            <h3 className="card-title">Device Control</h3>
            <span className="card-subtitle">Toggle and monitor your smart devices</span>
          </div>
          <div className="card-content">
            <div className="devices-grid">
              {devices.map((device) => (
                <div key={device.id} className={`device-card ${device.status ? 'active' : 'inactive'}`}>
                  <div className="device-header">
                    <div className="device-icon" style={{ color: getStatusColor(device.status) }}>
                      {getDeviceIcon(device)}
                    </div>
                    <div className="toggle-switch" onClick={() => toggleDevice(device.id)}>
                      <input 
                        type="checkbox" 
                        checked={device.status} 
                        onChange={() => {}}
                        className="toggle-input"
                      />
                      <div className={`toggle-slider ${device.status ? 'active' : ''}`}>
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="device-info">
                    <h4 className="device-name">{device.name}</h4>
                    <p className="device-room">{device.room}</p>
                    <div className="device-stats">
                      <span className="consumption">{device.consumption}</span>
                      <span className="last-used">{device.lastUsed}</span>
                    </div>
                    
                    {device.suggestion && (
                      <div className="ai-suggestion">
                        <span className="suggestion-icon">💡</span>
                        <span className="suggestion-text">{device.suggestion}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Energy Consumption Chart */}
        <div className="card energy-chart-section">
          <div className="card-header">
            <h3 className="card-title">Energy Consumption</h3>
            <span className="card-subtitle">24-hour usage pattern</span>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--text-secondary)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--text-secondary)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'var(--primary)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="energy-summary">
              <div className="energy-stat">
                <span className="energy-label">Today's Total</span>
                <span className="energy-value">24.8 kWh</span>
              </div>
              <div className="energy-stat">
                <span className="energy-label">Avg. This Week</span>
                <span className="energy-value">22.3 kWh</span>
              </div>
              <div className="energy-stat">
                <span className="energy-label">Cost Today</span>
                <span className="energy-value">$3.72</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHome;