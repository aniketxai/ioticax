import React from 'react';

const ProgressCircle = ({ value, size = 120, strokeWidth = 8, color = 'var(--primary)', label = 'Progress' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="background"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            stroke: color,
            strokeDasharray,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease'
          }}
        />
      </svg>
      <div className="progress-text">
        <div className="progress-value">{value}%</div>
        <div className="progress-label">{label}</div>
      </div>
    </div>
  );
};

export default ProgressCircle;