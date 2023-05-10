import React from "react";

export default function Stats({ stats }: any) {
  const formattedStats = stats.map(({ title, value, button, onClick }: any) => (
    <div key={title} className="stat">
      <div className="stat-title">{title}</div>
      {value && <div className="stat-value">{value}</div>}
      <div className="stat-actions">
        {button && (
          <button className="btn btn-sm btn-success" onClick={onClick}>
            {button}
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      {formattedStats}
    </div>
  );
}
