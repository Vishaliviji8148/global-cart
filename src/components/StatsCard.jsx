
import React from "react";

function StatsCard({ title, value, icon, color, change }) {
  return (
    <div className="stats-card">
      <div className="stats-top">
        <span>{title}</span>
        <div className="stats-icon" style={{ background: color }}>
          {icon}
        </div>
      </div>

      <h2>{value}</h2>
      <p className="stats-change">{change}</p>
    </div>
  );
}

export default StatsCard;
