import React from "react";

export default function Comments({
  dimId,
  qi,
  q,
  onChange,
  errors = {},
}) {
  const fields = [
    [
      "inherent",
      "Inherent Risk Description",
      "Inherent ML/TF risk…",
    ],
    [
      "obs",
      "Observation and Implication",
      "What was observed and what it implies…",
    ],
    [
      "reco",
      "Recommendation",
      "Recommended mitigating actions…",
    ],
  ];

  return (
    <div className="q-obs">
      <div className="q-obs-title">
        Comments - {dimId}
        {qi + 1}
      </div>

      <div className="grid-obs">
        {fields.map(([key, label, placeholder], i) => {
          const hasError = !!errors[key];

          return (
            <div key={key}>
              <div className="ob-label">
                <span className="n">{i + 1}</span>
                {label}
              </div>

              <textarea
                className={hasError ? "field-error" : undefined}
                value={q[key] || ""}
                placeholder={placeholder}
                onChange={(e) =>
                  onChange({
                    [key]: e.target.value,
                  })
                }
              />

              {hasError && (
                <div className="field-error-msg">
                  This field is required.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}