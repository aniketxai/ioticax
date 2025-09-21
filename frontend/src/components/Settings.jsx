import React, { useState } from 'react';
import { 
  User, 
  Smartphone, 
  Cloud, 
  Globe, 
  Bell, 
  Shield,
  Plus,
  Trash2,
  Settings as SettingsIcon,
  CheckCircle,
  AlertCircle,
  Wifi
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Smart Thermostat',
      type: 'Climate Control',
      status: 'online',
      lastSeen: '2 minutes ago',
      battery: 85
    },
    {
      id: 2,
      name: 'Garden Sensor Hub',
      type: 'Agriculture',
      status: 'online',
      lastSeen: '5 minutes ago',
      battery: 92
    },
    {
      id: 3,
      name: 'Living Room Hub',
      type: 'Smart Home',
      status: 'offline',
      lastSeen: '2 hours ago',
      battery: 45
    },
    {
      id: 4,
      name: 'Kitchen Display',
      type: 'Information',
      status: 'online',
      lastSeen: '1 minute ago',
      battery: 78
    }
  ]);

  const [notifications, setNotifications] = useState({
    energy: true,
    water: true,
    security: false,
    maintenance: true,
    weather: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'devices', label: 'Devices', icon: Smartphone },
    { id: 'cloud', label: 'Cloud Sync', icon: Cloud },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language', icon: Globe }
  ];

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleToggleClick = (type, currentValue, onChange) => {
    onChange(type);
  };

  const removeDevice = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircle size={16} color="var(--success)" />;
      case 'offline': return <AlertCircle size={16} color="var(--error)" />;
      default: return <AlertCircle size={16} color="var(--text-tertiary)" />;
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return 'var(--success)';
    if (level > 30) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="settings animate-fade-in">
      <div className="settings-header">
        <h2>Settings & Cloud Access</h2>
        <p>Manage your profile, devices, and system preferences</p>
      </div>

      <div className="settings-layout">
        {/* Settings Tabs */}
        <div className="settings-sidebar">
          <div className="settings-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>User Profile</h3>
                <p>Manage your personal information</p>
              </div>
              
              <div className="card">
                <div className="card-content">
                  <div className="profile-avatar">
                    <div className="avatar-large">
                      <span>JD</span>
                    </div>
                    <button className="btn btn-outline btn-sm">Change Photo</button>
                  </div>

                  <div className="profile-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button className="btn btn-primary">Save Changes</button>
                      <button className="btn btn-outline">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Device Management */}
          {activeTab === 'devices' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Device Management</h3>
                <p>Add, remove, and configure your IoT devices</p>
                <button className="btn btn-primary">
                  <Plus size={16} />
                  Add Device
                </button>
              </div>

              <div className="devices-list">
                {devices.map((device) => (
                  <div key={device.id} className="card device-item">
                    <div className="card-content">
                      <div className="device-info">
                        <div className="device-header">
                          <div className="device-icon">
                            <Wifi size={20} />
                          </div>
                          <div className="device-details">
                            <h4>{device.name}</h4>
                            <p>{device.type}</p>
                          </div>
                        </div>

                        <div className="device-status">
                          <div className="status-item">
                            <span className="status-label">Status</span>
                            <div className="status-value">
                              {getStatusIcon(device.status)}
                              <span className={device.status}>{device.status}</span>
                            </div>
                          </div>

                          <div className="status-item">
                            <span className="status-label">Last Seen</span>
                            <span className="status-value">{device.lastSeen}</span>
                          </div>

                          <div className="status-item">
                            <span className="status-label">Battery</span>
                            <div className="battery-indicator">
                              <div 
                                className="battery-level"
                                style={{ 
                                  width: `${device.battery}%`,
                                  backgroundColor: getBatteryColor(device.battery)
                                }}
                              ></div>
                              <span>{device.battery}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="device-actions">
                        <button className="btn btn-outline btn-sm">
                          <SettingsIcon size={16} />
                          Configure
                        </button>
                        <button 
                          className="btn btn-outline btn-sm danger"
                          onClick={() => removeDevice(device.id)}
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cloud Sync */}
          {activeTab === 'cloud' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Cloud Synchronization</h3>
                <p>Manage your cloud storage and sync settings</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="card">
                  <div className="card-header">
                    <h4>AWS Integration</h4>
                  </div>
                  <div className="card-content">
                    <div className="cloud-status">
                      <div className="status-indicator">
                        <CheckCircle size={20} color="var(--success)" />
                        <span className="status-text">Connected</span>
                      </div>
                      <p className="cloud-info">Last sync: 5 minutes ago</p>
                    </div>
                    
                    <div className="cloud-stats">
                      <div className="stat">
                        <span className="stat-label">Storage Used</span>
                        <span className="stat-value">2.4 GB</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Available</span>
                        <span className="stat-value">12.6 GB</span>
                      </div>
                    </div>

                    <button className="btn btn-outline">Manage AWS</button>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h4>Firebase Integration</h4>
                  </div>
                  <div className="card-content">
                    <div className="cloud-status">
                      <div className="status-indicator">
                        <CheckCircle size={20} color="var(--success)" />
                        <span className="status-text">Connected</span>
                      </div>
                      <p className="cloud-info">Real-time sync enabled</p>
                    </div>
                    
                    <div className="cloud-stats">
                      <div className="stat">
                        <span className="stat-label">Documents</span>
                        <span className="stat-value">1,247</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Last Update</span>
                        <span className="stat-value">Now</span>
                      </div>
                    </div>

                    <button className="btn btn-outline">Manage Firebase</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h4>Sync Preferences</h4>
                </div>
                <div className="card-content">
                  <div className="sync-options">
                    <div className="sync-option">
                      <div className="option-info">
                        <h5>Automatic Sync</h5>
                        <p>Sync data automatically every 5 minutes</p>
                      </div>
                      <div className="toggle-switch active">
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="sync-option">
                      <div className="option-info">
                        <h5>Backup Device Configurations</h5>
                        <p>Backup device settings to cloud storage</p>
                      </div>
                      <div className="toggle-switch active">
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="sync-option">
                      <div className="option-info">
                        <h5>Historical Data Retention</h5>
                        <p>Keep 6 months of historical sensor data</p>
                      </div>
                      <div className="toggle-switch">
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Notification Preferences</h3>
                <p>Choose which notifications you want to receive</p>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="notification-options">
                    <div className="notification-option">
                      <div className="option-info">
                        <h5>Energy Alerts</h5>
                        <p>Get notified about high energy consumption and savings opportunities</p>
                      </div>
                      <div 
                        className={`toggle-switch ${notifications.energy ? 'active' : ''}`}
                        onClick={() => handleToggleClick('energy', notifications.energy, handleNotificationChange)}
                      >
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="notification-option">
                      <div className="option-info">
                        <h5>Water Management</h5>
                        <p>Receive alerts about irrigation schedules and water usage</p>
                      </div>
                      <div 
                        className={`toggle-switch ${notifications.water ? 'active' : ''}`}
                        onClick={() => handleToggleClick('water', notifications.water, handleNotificationChange)}
                      >
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="notification-option">
                      <div className="option-info">
                        <h5>Security Alerts</h5>
                        <p>Important security notifications and device status changes</p>
                      </div>
                      <div 
                        className={`toggle-switch ${notifications.security ? 'active' : ''}`}
                        onClick={() => handleToggleClick('security', notifications.security, handleNotificationChange)}
                      >
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="notification-option">
                      <div className="option-info">
                        <h5>Maintenance Reminders</h5>
                        <p>Reminders for device maintenance and system updates</p>
                      </div>
                      <div 
                        className={`toggle-switch ${notifications.maintenance ? 'active' : ''}`}
                        onClick={() => handleToggleClick('maintenance', notifications.maintenance, handleNotificationChange)}
                      >
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>

                    <div className="notification-option">
                      <div className="option-info">
                        <h5>Weather Updates</h5>
                        <p>Weather forecasts that might affect your devices</p>
                      </div>
                      <div 
                        className={`toggle-switch ${notifications.weather ? 'active' : ''}`}
                        onClick={() => handleToggleClick('weather', notifications.weather, handleNotificationChange)}
                      >
                        <div className="toggle-slider">
                          <div className="toggle-knob"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language Settings */}
          {activeTab === 'language' && (
            <div className="settings-section">
              <div className="section-header">
                <h3>Language & Region</h3>
                <p>Choose your preferred language and regional settings</p>
              </div>

              <div className="card">
                <div className="card-content">
                  <div className="form-group">
                    <label>Language</label>
                    <select className="form-input">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Time Zone</label>
                    <select className="form-input">
                      <option value="america/new_york">Eastern Time (ET)</option>
                      <option value="america/chicago">Central Time (CT)</option>
                      <option value="america/denver">Mountain Time (MT)</option>
                      <option value="america/los_angeles">Pacific Time (PT)</option>
                      <option value="europe/london">Greenwich Mean Time (GMT)</option>
                      <option value="europe/paris">Central European Time (CET)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Date Format</label>
                    <select className="form-input">
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Temperature Unit</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" name="temperature" value="celsius" defaultChecked />
                        <span className="radio-custom"></span>
                        Celsius (°C)
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="temperature" value="fahrenheit" />
                        <span className="radio-custom"></span>
                        Fahrenheit (°F)
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-primary">Save Preferences</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;