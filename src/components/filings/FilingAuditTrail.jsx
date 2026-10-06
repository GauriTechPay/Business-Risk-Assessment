import React from "react";
export default function FilingAuditTrail({ audit = [] }) {
  return (
    <div className="timeline">
      {audit.map((a, i) => (
        <div className="timeline-item" key={`${a.title}-${i}`}>
          <span className={`timeline-dot ${a.status}`} />
          <div className="tt">{a.title}</div>
          {a.note && <div className="tnote">{a.note}</div>}
          <div className="ttime">{a.time}</div>
        </div>
      ))}
    </div>
  );
}
