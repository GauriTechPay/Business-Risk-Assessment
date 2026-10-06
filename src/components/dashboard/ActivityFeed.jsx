import React from "react";
export default function ActivityFeed({ items }) {
  return (
    <div className="activity-feed">
      {items.slice(0, 6).map((a, i) => (
  <React.Fragment key={`${a.time}-${i}`}>
    <div className="activity-row">
      <span className={`activity-dot ${a.filingStatus}`} />

      <div className="body">
        <div className="headline">{a.html}</div>
        <div className="time">{a.time}</div>
      </div>
    </div>

     {i < Math.min(items.length, 6) - 1 && (
      <div className="queue-sep"></div>
    )}
  </React.Fragment>
))}
    </div>
  );
}

