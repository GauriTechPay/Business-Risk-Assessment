import React from "react";
import { band } from "../../utils/risk";

export default function Badge({ level, value, className = "" }) {

  if (level === "-" || (level == null && value == null))

    return <span className={`badge b-none ${className}`}>-</span>;

  const b = level
    ? {
        t: level,
        c:
          {
            Low: "b-low",
            "Low-Medium": "b-lowmed",
            Medium: "b-med",
            "Medium-High": "b-medhigh",
            High: "b-high",
          }[level] || "b-none",
      }
    : band(value);
  return <span className={`badge ${b.c} ${className}`} style={{padding:"4px 6px"}}>{b.t}</span>;
}
