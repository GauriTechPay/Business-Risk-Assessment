import React from "react";
import { useApp } from "../../context/AppContext";

export default function Conclusion() {
  const {
    company,
    from,
    to,
    conclusion,
    setConclusion,
    validationErrors,
    setQuestionValidationErrors,
  } = useApp();

  const hasError = !!validationErrors?.conclusion;

  const handleChange = (e) => {
    const value = e.target.value;

    setConclusion(value);

    // Remove the error as soon as the user provides a value.
    if (value.trim()) {
      setQuestionValidationErrors((prev) => {
        const updated = {
          ...prev,
        };

        delete updated.conclusion;

        return updated;
      });
    }
  };

  return (
    <div className="card">
      <div className="eyebrow">
        Final output
      </div>

      <h2>
        Conclusion
      </h2>

      <div className="sub">
        {company || "-"} · Period{" "}
        {from || "-"} to {to || "-"}
      </div>

      <div
        className="field conclusion-field"
      >
        <label>
          Overall Conclusion
        </label>

        <textarea
          className={hasError ? "field-error" : undefined}
          style={{
            minHeight: "220px",
          }}
          placeholder="Summarise the overall findings, risk rationale and any final remarks for this assessment…"
          value={conclusion || ""}
          onChange={handleChange}
        />

        {hasError && (
          <div className="field-error-msg">
            This field is required.
          </div>
        )}
      </div>
    </div>
  );
}