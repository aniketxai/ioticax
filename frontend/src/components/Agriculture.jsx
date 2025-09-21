import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplet, 
  Cloud, 
  Sun, 
  CloudRain,
  Wind,
  Settings,
  Zap,
  Activity,
  Gauge
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Agriculture.css';

const Agriculture = () => {
  const [irrigationMode, setIrrigationMode] = useState('auto');
  const [irrigationActive, setIrrigationActive] = useState(true);
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Water Pump #1',
      type: 'irrigation',
      icon: Droplet,
      status: true,
      flowRate: '45 L/min',
      location: 'Zone A',
      lastMaintenance: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Soil Sensor Hub',
      type: 'monitoring',
      icon: Activity,
      status: true,
      batteryLevel: 87,
      location: 'Zone B',
      lastMaintenance: '1 month ago'
    },
    {
      id: 3,
      name: 'Weather Station',
      type: 'monitoring',
      icon: Cloud,
      status: true,
      signalStrength: 'Strong',
      location: 'Central',
      lastMaintenance: '3 weeks ago'
    },
    {
      id: 4,
      name: 'Fertilizer Pump',
      type: 'irrigation',
      icon: Zap,
      status: false,
      flowRate: '0 L/min',
      location: 'Zone C',
      lastMaintenance: '1 week ago'
    },
    {
      id: 5,
      name: 'pH Monitor',
      type: 'monitoring',
      icon: Gauge,
      status: true,
      currentReading: '6.8 pH',
      location: 'Zone A',
      lastMaintenance: '2 weeks ago'
    },
    {
      id: 6,
      name: 'Drip System',
      type: 'irrigation',
      icon: Droplet,
      status: true,
      flowRate: '12 L/min',
      location: 'Zone D',
      lastMaintenance: '1 week ago'
    }
  ]);

  const toggleIrrigation = () => {
    setIrrigationActive(!irrigationActive);
  };

  const toggleDevice = (deviceId) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            status: !device.status,
            flowRate: !device.status && device.type === 'irrigation' ? device.flowRate : '0 L/min'
          }
        : device
    ));
  };

  const sensorData = [
    {
      id: 1,
      name: 'Soil Moisture',
      value: 68,
      unit: '%',
      icon: Droplet,
      color: 'var(--secondary)',
      status: 'optimal',
      lastUpdate: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Temperature',
      value: 24.5,
      unit: '°C',
      icon: Thermometer,
      color: 'var(--accent)',
      status: 'good',
      lastUpdate: '1 minute ago'
    },
    {
      id: 3,
      name: 'Humidity',
      value: 72,
      unit: '%',
      icon: Cloud,
      color: 'var(--primary)',
      status: 'optimal',
      lastUpdate: '3 minutes ago'
    },
    {
      id: 4,
      name: 'Light Intensity',
      value: 850,
      unit: 'lux',
      icon: Sun,
      color: 'var(--warning)',
      status: 'high',
      lastUpdate: '1 minute ago'
    }
  ];

  const weatherForecast = [
    { day: 'Today', temp: '24°C', condition: 'sunny', icon: Sun, precipitation: '0%' },
    { day: 'Tomorrow', temp: '22°C', condition: 'cloudy', icon: Cloud, precipitation: '20%' },
    { day: 'Wed', temp: '19°C', condition: 'rainy', icon: CloudRain, precipitation: '80%' },
    { day: 'Thu', temp: '21°C', condition: 'cloudy', icon: Cloud, precipitation: '40%' },
    { day: 'Fri', temp: '25°C', condition: 'sunny', icon: Sun, precipitation: '10%' }
  ];

  const waterUsageData = [
    { day: 'Mon', usage: 45 },
    { day: 'Tue', usage: 38 },
    { day: 'Wed', usage: 52 },
    { day: 'Thu', usage: 41 },
    { day: 'Fri', usage: 48 },
    { day: 'Sat', usage: 55 },
    { day: 'Sun', usage: 43 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'var(--success)';
      case 'good': return 'var(--primary)';
      case 'warning': return 'var(--warning)';
      case 'high': return 'var(--accent)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'optimal': return 'Optimal';
      case 'good': return 'Good';
      case 'warning': return 'Warning';
      case 'high': return 'High';
      default: return 'Unknown';
    }
  };

  const getDeviceIcon = (device) => {
    const Icon = device.icon;
    return <Icon size={24} />;
  };

  const getDeviceStatusColor = (status) => {
    return status ? 'var(--success)' : 'var(--text-tertiary)';
  };

  return (
    <div className="agriculture animate-fade-in">
      <div className="agriculture-header">
        <h2>Smart Agriculture</h2>
        <p>Monitor and optimize your crop growing environment</p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-4 mb-6">
        {sensorData.map((sensor) => {
          const Icon = sensor.icon;
          return (
            <div key={sensor.id} className="card sensor-card">
              <div className="card-content">
                <div className="sensor-header">
                  <div className="sensor-icon" style={{ backgroundColor: `${sensor.color}20` }}>
                    <Icon size={24} style={{ color: sensor.color }} />
                  </div>
                  <div 
                    className="sensor-status"
                    style={{ backgroundColor: `${getStatusColor(sensor.status)}20`, color: getStatusColor(sensor.status) }}
                  >
                    {getStatusText(sensor.status)}
                  </div>
                </div>
                <div className="sensor-reading">
                  <h3>{sensor.value}{sensor.unit}</h3>
                  <p className="sensor-name">{sensor.name}</p>
                  <span className="sensor-update">Updated {sensor.lastUpdate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Weather Forecast */}
        <div className="card weather-section">
          <div className="card-header">
            <h3 className="card-title">Weather Forecast</h3>
            <span className="card-subtitle">5-day weather outlook</span>
          </div>
          <div className="card-content">
            <div className="weather-grid">
              {weatherForecast.map((day, index) => {
                const Icon = day.icon;
                return (
                  <div key={index} className="weather-card">
                    <div className="weather-day">{day.day}</div>
                    <div className="weather-icon">
                      <Icon size={32} style={{ color: day.condition === 'sunny' ? 'var(--accent)' : day.condition === 'rainy' ? 'var(--secondary)' : 'var(--text-secondary)' }} />
                    </div>
                    <div className="weather-temp">{day.temp}</div>
                    <div className="weather-precipitation">
                      <Droplet size={14} />
                      <span>{day.precipitation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Irrigation Control */}
        <div className="card irrigation-section">
          <div className="card-header">
            <h3 className="card-title">Irrigation Control</h3>
            <span className="card-subtitle">Smart watering system</span>
          </div>
          <div className="card-content">
            <div className="irrigation-controls">
              <div className="mode-selector">
                <label>Mode</label>
                <div className="mode-buttons">
                  <button 
                    className={`btn ${irrigationMode === 'auto' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setIrrigationMode('auto')}
                  >
                    Auto
                  </button>
                  <button 
                    className={`btn ${irrigationMode === 'manual' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setIrrigationMode('manual')}
                  >
                    Manual
                  </button>
                </div>
              </div>

              <div className="irrigation-status">
                <div className="status-item">
                  <span className="status-label">Current Status</span>
                  <div className="status-value">
                    <div className={`toggle-switch ${irrigationActive ? 'active' : ''}`} onClick={toggleIrrigation}>
                      <div className="toggle-slider">
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                    <span style={{ marginLeft: '8px' }}>{irrigationActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
                
                <div className="status-item">
                  <span className="status-label">Next Schedule</span>
                  <span className="status-value">Tomorrow 6:00 AM</span>
                </div>

                <div className="status-item">
                  <span className="status-label">Duration</span>
                  <span className="status-value">15 minutes</span>
                </div>
              </div>

              {irrigationMode === 'manual' && (
                <div className="manual-controls">
                  <button className="btn btn-secondary">
                    <Droplet size={16} />
                    Start Irrigation
                  </button>
                  <button className="btn btn-outline">
                    <Settings size={16} />
                    Configure
                  </button>
                </div>
              )}

              <div className="ai-recommendation">
                <div className="recommendation-header">
                  <span className="recommendation-icon">🧠</span>
                  <span>AI Recommendation</span>
                </div>
                <p>Based on weather forecast, skip tomorrow's morning irrigation. Rain expected at 60%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agriculture Devices */}
      <div className="card mb-6">
        <div className="card-header">
          <h3 className="card-title">Agriculture Devices</h3>
          <span className="card-subtitle">Monitor and control your farming equipment</span>
        </div>
        <div className="card-content">
          <div className="agriculture-devices-grid">
            {devices.map((device) => (
              <div key={device.id} className={`agriculture-device-card ${device.status ? 'active' : 'inactive'}`}>
                <div className="device-header">
                  <div className="device-icon" style={{ color: getDeviceStatusColor(device.status) }}>
                    {getDeviceIcon(device)}
                  </div>
                  <div className="device-toggle">
                    <div className={`toggle-switch ${device.status ? 'active' : ''}`} onClick={() => toggleDevice(device.id)}>
                      <div className="toggle-slider">
                        <div className="toggle-knob"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="device-info">
                  <h4 className="device-name">{device.name}</h4>
                  <p className="device-location">{device.location}</p>
                  <div className="device-stats">
                    {device.flowRate && (
                      <div className="device-stat">
                        <span className="stat-label">Flow Rate</span>
                        <span className="stat-value">{device.flowRate}</span>
                      </div>
                    )}
                    {device.batteryLevel && (
                      <div className="device-stat">
                        <span className="stat-label">Battery</span>
                        <span className="stat-value">{device.batteryLevel}%</span>
                      </div>
                    )}
                    {device.signalStrength && (
                      <div className="device-stat">
                        <span className="stat-label">Signal</span>
                        <span className="stat-value">{device.signalStrength}</span>
                      </div>
                    )}
                    {device.currentReading && (
                      <div className="device-stat">
                        <span className="stat-label">Reading</span>
                        <span className="stat-value">{device.currentReading}</span>
                      </div>
                    )}
                  </div>
                  <div className="device-maintenance">
                    <span className="maintenance-label">Last Maintenance:</span>
                    <span className="maintenance-value">{device.lastMaintenance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Water Usage Chart */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Water Usage History</h3>
          <span className="card-subtitle">Weekly consumption pattern</span>
        </div>
        <div className="card-content">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={waterUsageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  dataKey="day" 
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
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="var(--secondary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsage)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="usage-summary">
            <div className="usage-stat">
              <span className="usage-label">This Week</span>
              <span className="usage-value">322L</span>
            </div>
            <div className="usage-stat">
              <span className="usage-label">Average Daily</span>
              <span className="usage-value">46L</span>
            </div>
            <div className="usage-stat">
              <span className="usage-label">Efficiency</span>
              <span className="usage-value">89%</span>
            </div>
            <div className="usage-stat">
              <span className="usage-label">Water Saved</span>
              <span className="usage-value">156L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agriculture;