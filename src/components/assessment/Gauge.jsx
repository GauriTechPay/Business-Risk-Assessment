import React from "react";
import { band, bandKey } from "../../utils/risk";

const pt = (cx, cy, r, a) => {
  const rad = (a * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const path = (cx, cy, r, a1, a2) => {

  const p1 = pt(cx, cy, r, a1),
    p2 = pt(cx, cy, r, a2);

  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
};

export default function Gauge({ value, max = 25, title, compact = false }) {

  const v = Math.max(0, Math.min(max, Number(value) || 0)),
    bounds = [0, 4, 8, 11, 20, max],
    keys = ["low", "lowmed", "med", "medhigh", "high"];

  const angle = (x) => 180 + (x / max) * 180;

  const b = band(v),
    tip = pt(90, 92, 58, angle(v));

  return (
    <div className={`gauge-box ${compact ? "gauge-mini" : ""}`}>
      <svg
        viewBox="0 0 180 112"
        className="gauge-svg"
        role="img"
        aria-label={`${title || "Risk"} gauge`}
      >
        <g>
          {keys.map((k, i) => (
            <path
              key={k}
              d={path(90, 92, 72, angle(bounds[i]), angle(bounds[i + 1]))}
              fill="none"
              stroke={`var(--${k === "low" ? "low" : k})`}
              strokeWidth="15"
            />
          ))}
        </g>
        <line
          x1="90"
          y1="92"
          x2={tip.x}
          y2={tip.y}
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="90" cy="92" r="5.5" fill="var(--ink)" />
        <text x="90" y="78" textAnchor="middle" className="gauge-value">
          {Number.isInteger(v) ? v : v.toFixed(1)}
        </text>
      </svg>
      {title && (
        <div className="gauge-caption">
          <div className="gauge-title">{title}</div>
          <span className={`badge ${b.c}`} style={{width:10,height:10}}>{b.t}</span>
        </div>
      )}
    </div>
  );
}
