import React from "react";
import { IMPACT, PROB } from "../../data/riskData";
import { qEV } from "../../utils/risk";
import Badge from "../common/Badge";

export default function RiskControls({
  dimId,
  qi,
  q,
  side,
  label,
  onChange,
  errors = {},
}) {
  const ev = qEV(q, side);

  const opts = (list) => {
    const fieldKey = `${side}${list === IMPACT ? "Imp" : "Prob"}`;
    const hasError = !!errors[fieldKey];

    return (
      <>
        <select
          className={hasError ? "field-error" : undefined}
          value={q[fieldKey] ?? ""}
          onChange={(e) =>
            onChange({
              [fieldKey]: e.target.value
                ? Number(e.target.value)
                : null,
            })
          }
        >
          <option value="">—</option>

          {list.map(([v, t]) => (
            <option key={v} value={v}>
              {v} - {t}
            </option>
          ))}
        </select>

        {hasError && (
          <div className="field-error-msg">
            This field is required.
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`block ${side}`}>
      <div className="tag">{label}</div>

      <div className="row">
        <div>
          <span className="lab">Impact</span>
          {opts(IMPACT)}
        </div>

        <div>
          <span className="lab">Probability</span>
          {opts(PROB)}
        </div>

        <div>
          <span className="lab">EV</span>
          <div className="ev-chip num">
            {ev ?? "—"}
          </div>
        </div>

        <div>
          <span className="lab">Level</span>
          <Badge value={ev} />
        </div>
      </div>
    </div>
  );
}