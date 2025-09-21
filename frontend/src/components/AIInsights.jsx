import React from 'react';
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  AlertCircle,
  Target,
  Leaf,
  Zap,
  Droplet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './AIInsights.css';

const AIInsights = () => {
  const predictions = [
    {
      id: 1,
      title: 'Energy Wastage Prediction',
      subtitle: 'Next 24 hours',
      value: '18%',
      trend: 'down',
      icon: Zap,
      color: 'var(--warning)',
      description: 'Predicted energy waste based on current usage patterns',
      recommendation: 'Schedule AC to turn off during peak hours to save 12% energy'
    },
    {
      id: 2,
      title: 'Irrigation Forecast',
      subtitle: 'Next watering cycle',
      value: '2.5L',
      trend: 'optimal',
      icon: Droplet,
      color: 'var(--secondary)',
      description: 'Optimized water requirement for next irrigation',
      recommendation: 'Reduce watering by 30% due to expected rainfall tomorrow'
    },
    {
      id: 3,
      title: 'Carbon Footprint',
      subtitle: 'Monthly reduction',
      value: '240kg',
      trend: 'up',
      icon: Leaf,
      color: 'var(--success)',
      description: 'CO2 reduction achieved through smart optimizations',
      recommendation: 'Continue current efficiency patterns to maintain reduction'
    }
  ];

  const energyWastageData = [
    { hour: '00:00', wastage: 5, potential: 12 },
    { hour: '04:00', wastage: 3, potential: 8 },
    { hour: '08:00', wastage: 15, potential: 25 },
    { hour: '12:00', wastage: 22, potential: 35 },
    { hour: '16:00', wastage: 18, potential: 30 },
    { hour: '20:00', wastage: 25, potential: 40 },
    { hour: '24:00', wastage: 12, potential: 20 }
  ];

  const efficiencyData = [
    { name: 'Optimized', value: 73, fill: 'var(--success)' },
    { name: 'Can Improve', value: 18, fill: 'var(--warning)' },
    { name: 'Inefficient', value: 9, fill: 'var(--error)' }
  ];

  const recommendations = [
    {
      id: 1,
      priority: 'high',
      category: 'Energy',
      title: 'Smart AC Scheduling',
      description: 'Your living room AC has been idle for extended periods. Implementing smart scheduling could reduce energy consumption by 15%.',
      impact: '15% energy saving',
      effort: 'Low',
      icon: Zap
    },
    {
      id: 2,
      priority: 'medium',
      category: 'Water',
      title: 'Moisture-Based Irrigation',
      description: 'Soil moisture levels indicate optimal conditions. Adjust watering schedule to prevent over-irrigation.',
      impact: '25% water saving',
      effort: 'Medium',
      icon: Droplet
    },
    {
      id: 3,
      priority: 'low',
      category: 'Environment',
      title: 'Lighting Optimization',
      description: 'LED bulbs in kitchen consume 40% less energy. Consider upgrading remaining fixtures.',
      impact: '8% energy saving',
      effort: 'High',
      icon: Lightbulb
    },
    {
      id: 4,
      priority: 'high',
      category: 'Automation',
      title: 'Smart Scheduling',
      description: 'Enable automated schedules for appliances to optimize usage during off-peak hours.',
      impact: '20% cost saving',
      effort: 'Low',
      icon: Target
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--error)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'rgba(239, 68, 68, 0.1)';
      case 'medium': return 'rgba(245, 158, 11, 0.1)';
      case 'low': return 'rgba(16, 185, 129, 0.1)';
      default: return 'var(--bg-secondary)';
    }
  };

  return (
    <div className="ai-insights animate-fade-in">
      <div className="ai-insights-header">
        <div className="header-content">
          <div className="header-icon">
            <Brain size={32} color="var(--primary)" />
          </div>
          <div className="header-text">
            <h2>AI Insights & Predictions</h2>
            <p>Smart recommendations powered by machine learning</p>
          </div>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-3 mb-6">
        {predictions.map((prediction) => {
          const Icon = prediction.icon;
          return (
            <div key={prediction.id} className="card prediction-card">
              <div className="card-content">
                <div className="prediction-header">
                  <div className="prediction-icon" style={{ backgroundColor: `${prediction.color}20` }}>
                    <Icon size={24} style={{ color: prediction.color }} />
                  </div>
                  <div className="prediction-trend">
                    <TrendingUp size={16} style={{ color: prediction.color }} />
                  </div>
                </div>
                <div className="prediction-content">
                  <h3 className="prediction-value">{prediction.value}</h3>
                  <h4 className="prediction-title">{prediction.title}</h4>
                  <p className="prediction-subtitle">{prediction.subtitle}</p>
                  <div className="prediction-description">
                    <p>{prediction.description}</p>
                  </div>
                  <div className="ai-recommendation-inline">
                    <span className="ai-icon">🤖</span>
                    <p>{prediction.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Energy Wastage Prediction */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Energy Wastage Prediction</h3>
            <span className="card-subtitle">24-hour forecast vs potential savings</span>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyWastageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  dataKey="hour" 
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
                <Bar dataKey="wastage" fill="var(--error)" name="Current Wastage" />
                <Bar dataKey="potential" fill="var(--warning)" name="Potential Saving" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Breakdown */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">System Efficiency</h3>
            <span className="card-subtitle">Overall performance analysis</span>
          </div>
          <div className="card-content">
            <div className="efficiency-container">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={efficiencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="efficiency-legend">
                {efficiencyData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: item.fill }}></span>
                    <span className="legend-label">{item.name}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Panel */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Smart Recommendations</h3>
          <span className="card-subtitle">AI-powered optimization suggestions</span>
        </div>
        <div className="card-content">
          <div className="recommendations-grid">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <div key={rec.id} className="recommendation-card">
                  <div className="recommendation-header">
                    <div className="recommendation-icon">
                      <Icon size={20} />
                    </div>
                    <div className="recommendation-meta">
                      <span 
                        className="priority-badge"
                        style={{ 
                          backgroundColor: getPriorityBg(rec.priority),
                          color: getPriorityColor(rec.priority)
                        }}
                      >
                        {rec.priority} priority
                      </span>
                      <span className="category-badge">{rec.category}</span>
                    </div>
                  </div>
                  
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">{rec.title}</h4>
                    <p className="recommendation-description">{rec.description}</p>
                    
                    <div className="recommendation-metrics">
                      <div className="metric">
                        <span className="metric-label">Impact</span>
                        <span className="metric-value impact">{rec.impact}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Effort</span>
                        <span className="metric-value effort">{rec.effort}</span>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-sm recommendation-action">
                      Implement
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;