import React from "react";
export default function StatCard({ label, value, sub }) {
  return (
    <article className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value num">{value}</div>
      <div className="stat-sub">{sub}</div>
    </article>
  );
}
