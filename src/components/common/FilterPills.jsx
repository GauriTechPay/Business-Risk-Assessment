import React from "react";
export default function FilterPills({ options, value, onChange }) {
  return (
    <div className="filings-pills">
      {options.map((option) => (
        <button
          key={option}
          className={`btn-pill ${value === option ? "active" : ""}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
