import { useState } from "react";
import "../../components/assessment/assessment.css";
import { BookOpenText } from "lucide-react";

import {
  DIMS,
  IMPACT,
  LICENSE_OPTIONS,
  PROB,
  SECTOR_OPTIONS,
  STEP_NAMES,
} from "../../data/riskData";

import { useApp } from "../../context/AppContext";
import { dimCalc, overallCalc } from "../../utils/risk";
import useAssessment from "../../hooks/useAssessment";

import Dimension, {
  LiveRail,
} from "../../components/assessment/Dimension";

import Badge from "../../components/common/Badge";
import ReviewSubmitModal from "../../components/assessment/ReviewSubmitModal";
import Conclusion from "../../components/assessment/Conclusion";
import LockedReport from "../../components/assessment/Reports/LockedReport";
import FullReport from "../../components/assessment/Reports/FullReport";


/* =========================================================
   Report
========================================================= */

function Report() {
  const { status } = useApp();

  if (status !== "approved") {
    return <LockedReport />;
  }

  return <FullReport />;
}


/* =========================================================
   Guidance
========================================================= */

export function Guidance() {
  const getCellClass = (ev) => {
    if (ev >= 20) return "matrix-c5";
    if (ev >= 11) return "matrix-c4";
    if (ev >= 8) return "matrix-c3";
    if (ev >= 4) return "matrix-c2";
    return "matrix-c1";
  };

  const getImpactName = (value) => {
    const item = IMPACT.find(([score]) => score === value);
    return item ? item[1] : "";
  };

  const getProbabilityName = (value) => {
    const item = PROB.find(([score]) => score === value);
    return item ? item[1] : "";
  };

  return (
    <div className="card">
      <div className="eyebrow">Reference</div>

      <h2>Calculation Matrix and NRA Framework</h2>

      <div className="sub">
        Methodology and legal basis, as per the BRA template guidance notes.
      </div>

      <h2 style={{ fontSize: 15, margin: "14px 0 8px" }}>
        1 · Calculation methodology
      </h2>

      <div style={{ fontSize: 13, lineHeight: 1.8 }}>
        Every question is rated <b>twice</b> - once for Money Laundering, once
        for Terrorism Financing - each with its own{" "}
        <b>Impact (1–5) × Probability (1–5) = EV (1–25)</b>, plus three comment
        boxes per question.
        <br />

        <b>ML Total</b> = sum of all ML EVs ÷ 25, rounded down.
        <br />

        <b>TF Total</b> = sum of all TF EVs ÷ 25, rounded down.
        <br />

        <b>Overall Entity Risk = (ML Total × 90%) + (TF Total × 10%)</b> →
        risk level.
        <br />

        Per dimension, the aggregated level is the average EV per question
        (rounded down) → risk band.
        <br />

        See the <b>Impact × Probability Matrix &amp; Risk Bands</b> sections
        below for the full lookup table.
      </div>

      <h2 style={{ fontSize: 15, margin: "18px 0 8px" }}>
        2 · Impact x Probability Matrix
      </h2>

      <div className="bra-matrix-table-wrap">
        <table className="bra-matrix-table">
          <thead>
            <tr>
              <th>Impact ↓ / Probability →</th>

              {[1, 2, 3, 4, 5].map((probability) => (
                <th key={probability}>
                  <span className="matrix-number">{probability}</span>

                  <span className="matrix-label">
                    {getProbabilityName(probability)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[5, 4, 3, 2, 1].map((impact) => (
              <tr key={impact}>
                <th>
                  <span className="matrix-number">{impact}</span>

                  <span className="matrix-label">
                    {getImpactName(impact)}
                  </span>
                </th>

                {[1, 2, 3, 4, 5].map((probability) => {
                  const ev = impact * probability;

                  return (
                    <td
                      key={probability}
                      className={getCellClass(ev)}
                    >
                      {ev}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bra-matrix-note">
        Rate <strong>ML</strong> and <strong>TF</strong> independently for
        every question - each with its own Impact (1–5) × Probability (1–5) =
        EV (1–25) - and complete the three comment boxes per question.
      </div>

      <div className="bra-matrix-note bra-matrix-formula">
        <strong>ML Total</strong> = Σ ML EVs ÷ 25 (rounded down)
        <br />

        <strong>TF Total</strong> = Σ TF EVs ÷ 25 (rounded down)
        <br />

        <strong>Overall Entity Risk</strong> = (ML Total × 90%) + (TF Total ×
        10%).
      </div>

      <h2 style={{ fontSize: 15, margin: "18px 0 8px" }}>
        3 · Risk level bands
      </h2>

      <table className="rep">
        <thead>
          <tr>
            <th>Score</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {[
            ["20 – 25", "High"],
            ["11 – 19.9", "Medium-High"],
            ["8 – 10.9", "Medium"],
            ["4 – 7.9", "Low-Medium"],
            ["0 – 3.9", "Low"],
          ].map((x) => (
            <tr key={x[1]}>
              <td>{x[0]}</td>

              <td>
                <Badge level={x[1]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


/* =========================================================
   Assessment Page
========================================================= */

export default function AssessmentPage() {
  const {
    step,
    setStep,
    status,
    setStatus,

    dims,

    company,
    setCompany,

    from,
    setFrom,

    to,
    setTo,

    sector,
    setSector,

    license,
    setLicense,

    nra,
    setNra,

    conclusion,

    navigate,
    notify,

    validationErrors,
    setQuestionValidationErrors,
  } = useApp();

  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const {
    goToStep,
    validateDimension,
    validateAll,
  } = useAssessment();

  const overallCalValue = overallCalc(
    DIMS.map((d) => dims[d.id]),
  );

  const current =
    step >= 1 && step <= 6
      ? DIMS[step - 1]
      : null;

  const go = goToStep;


/* =========================================================
   Setup validation
========================================================= */

  const validateSetup = () => {
    const errors = {};

    if (!company || !company.trim()) {
      errors.company = true;
    }

    if (!from) {
      errors.from = true;
    }

    if (!to) {
      errors.to = true;
    }

    if (!sector || !sector.trim()) {
      errors.sector = true;
    }

    if (!license || license === "- Select license -") {
      errors.license = true;
    }

    if (!nra || !nra.trim()) {
      errors.nra = true;
    }

    setQuestionValidationErrors((prev) => ({
      ...prev,
      setup: errors,
    }));

    return Object.keys(errors).length === 0;
  };


/* =========================================================
   Clear setup field error
========================================================= */

  const clearSetupError = (field) => {
    setQuestionValidationErrors((prev) => {
      if (!prev.setup?.[field]) {
        return prev;
      }

      const setupErrors = {
        ...prev.setup,
      };

      delete setupErrors[field];

      const updated = {
        ...prev,
      };

      if (Object.keys(setupErrors).length === 0) {
        delete updated.setup;
      } else {
        updated.setup = setupErrors;
      }

      return updated;
    });
  };


/* =========================================================
   Conclusion validation
========================================================= */

  const validateConclusion = () => {
    const missing = !conclusion || !conclusion.trim();

    setQuestionValidationErrors((prev) => {
      const updated = {
        ...prev,
      };

      if (missing) {
        updated.conclusion = true;
      } else {
        delete updated.conclusion;
      }

      return updated;
    });

    return !missing;
  };


/* =========================================================
   Continue
========================================================= */

  const handleContinue = () => {
  /*
   * -------------------------------------------------------
   * Setup
   * -------------------------------------------------------
   */
  if (step === 0) {
    if (!validateSetup()) {
      notify(
        "Please complete all required fields before continuing.",
        "error",
      );

      return;
    }

    go(1);
    return;
  }

  /*
   * -------------------------------------------------------
   * Dimensions A-F
   * -------------------------------------------------------
   */
  if (step >= 1 && step <= 6) {
    const result = validateDimension(current.id);

    if (!result.valid) {
      notify(
        "Please complete all required fields before continuing.",
        "error",
      );

      return;
    }

    go(step + 1);
    return;
  }

  /*
   * -------------------------------------------------------
   * Conclusion / Submit
   *
   * IMPORTANT:
   * Do NOT open the review modal yet.
   *
   * First validate EVERYTHING.
   * -------------------------------------------------------
   */
  if (step === 7) {
    const setupValid = validateSetup();

    const assessmentResult = validateAll();

    const conclusionValid = validateConclusion();

    /*
     * If anything anywhere is missing:
     *
     * - don't open Review & Submit
     * - don't submit
     * - go to the first invalid section
     */
    if (
      !setupValid ||
      !assessmentResult.valid ||
      !conclusionValid
    ) {
      let firstInvalidStep = null;

      /*
       * Setup has highest priority.
       */
      if (!setupValid) {
        firstInvalidStep = 0;
      }

      /*
       * Otherwise first invalid A-F section.
       */
      else if (assessmentResult.firstInvalidStep !== null) {
        firstInvalidStep =
          assessmentResult.firstInvalidStep;
      }

      /*
       * Otherwise Conclusion is the first invalid section.
       */
      else if (!conclusionValid) {
        firstInvalidStep = 7;
      }

      if (firstInvalidStep !== null) {
        setStep(firstInvalidStep);
      }

      notify(
        "Please complete all required fields before submitting.",
        "error",
      );

      return;
    }

    /*
     * EVERYTHING is valid.
     *
     * Only now open Review & Submit.
     */
    setSubmitModalOpen(true);
  }
};


/* =========================================================
   Submit
========================================================= */

 const confirmSubmit = () => {
  const setupValid = validateSetup();

  const assessmentResult = validateAll();

  const conclusionValid = validateConclusion();

  if (
    !setupValid ||
    !assessmentResult.valid ||
    !conclusionValid
  ) {
    setSubmitModalOpen(false);

    let firstInvalidStep = null;

    if (!setupValid) {
      firstInvalidStep = 0;
    } else if (assessmentResult.firstInvalidStep !== null) {
      firstInvalidStep = assessmentResult.firstInvalidStep;
    } else if (!conclusionValid) {
      firstInvalidStep = 7;
    }

    if (firstInvalidStep !== null) {
      setStep(firstInvalidStep);
    }

    notify(
      "Please complete all required fields before submitting.",
      "error",
    );

    return;
  }

  /*
   * Only submit after every mandatory field has passed.
   */
  setStatus("pending");
  setSubmitModalOpen(false);

  notify(
    "Assessment submitted for approval.",
    "success",
  );

  navigate("dashboard");
};

/* =========================================================
   Render
========================================================= */

  return (
    <div
      className="react-page"
      id="page-assessment"
    >

      {/* =================================================
          Top navigation
      ================================================= */}

      <div className="controls-row">

        <div className="steps">

          {STEP_NAMES.map((s, i) =>
            i >= 9 ? null : (
              <button
                key={s}
                className={`step-pill ${
                  i === step ? "active" : ""
                } ${
                  i < step ? "done" : ""
                }`}
                onClick={() => go(i)}
              >
                {s}
              </button>
            ),
          )}

        </div>

        <div className="controls-right">

          <button
            className="guidance-btn"
            onClick={() => go(9)}
          >
            <BookOpenText size={20} />
            Guidance
          </button>

        </div>

      </div>


      {/* =================================================
          Body
      ================================================= */}

      <div className="body-area">

        <main className="main">

          {/* =================================================
              Setup
          ================================================= */}

          {step === 0 ? (

            <div className="card">

              <div className="eyebrow">
                Assessment setup
              </div>

              <h2>
                Company Information
              </h2>

              <div className="sub">
                The assessment covers the business as a whole for
                the stated period.
              </div>


              {/* ---------------------------------------------
                  Company / Period
              --------------------------------------------- */}

              <div className="grid3">

                <div className="field">

                  <label>
                    Company Name
                  </label>

                  <input
                    type="text"
                    className={
                      validationErrors?.setup?.company
                        ? "field-error"
                        : undefined
                    }
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);

                      if (e.target.value.trim()) {
                        clearSetupError("company");
                      }
                    }}
                  />

                  {validationErrors?.setup?.company && (
                    <div className="field-error-msg">
                      This field is required.
                    </div>
                  )}

                </div>


                <div className="field">

                  <label>
                    Period From
                  </label>

                  <input
                    type="date"
                    className={
                      validationErrors?.setup?.from
                        ? "field-error"
                        : undefined
                    }
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);

                      if (e.target.value) {
                        clearSetupError("from");
                      }
                    }}
                  />

                  {validationErrors?.setup?.from && (
                    <div className="field-error-msg">
                      This field is required.
                    </div>
                  )}

                </div>


                <div className="field">

                  <label>
                    Period To
                  </label>

                  <input
                    type="date"
                    className={
                      validationErrors?.setup?.to
                        ? "field-error"
                        : undefined
                    }
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);

                      if (e.target.value) {
                        clearSetupError("to");
                      }
                    }}
                  />

                  {validationErrors?.setup?.to && (
                    <div className="field-error-msg">
                      This field is required.
                    </div>
                  )}

                </div>

              </div>


              {/* ---------------------------------------------
                  Sector / License
              --------------------------------------------- */}

              <div
                className="grid3"
                style={{ marginTop: "14px" }}
              >

                <div className="field">

                  <label>
                    Sector
                  </label>

                  <select
                    className={
                      validationErrors?.setup?.sector
                        ? "field-error"
                        : undefined
                    }
                    value={sector}
                    onChange={(e) => {
                      setSector(e.target.value);

                      if (e.target.value.trim()) {
                        clearSetupError("sector");
                      }
                    }}
                  >

                    <option value="">
                      - Select sector -
                    </option>

                    {SECTOR_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}

                  </select>

                  {validationErrors?.setup?.sector && (
                    <div className="field-error-msg">
                      This field is required.
                    </div>
                  )}

                </div>


                <div className="field">

                  <label>
                    License
                  </label>

                  <select
                    className={
                      validationErrors?.setup?.license
                        ? "field-error"
                        : undefined
                    }
                    value={license}
                    onChange={(e) => {
                      setLicense(e.target.value);

                      if (
                        e.target.value &&
                        e.target.value !== "- Select license -"
                      ) {
                        clearSetupError("license");
                      }
                    }}
                  >

                    <option value="">
                      - Select license -
                    </option>

                    {LICENSE_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}

                  </select>

                  {validationErrors?.setup?.license && (
                    <div className="field-error-msg">
                      This field is required.
                    </div>
                  )}

                </div>

              </div>


              {/* ---------------------------------------------
                  NRA
              --------------------------------------------- */}

              <div
                className="field"
                style={{ marginTop: "14px" }}
              >

                <label>
                  National Risk Assessment
                </label>

                <textarea
                  className={
                    validationErrors?.setup?.nra
                      ? "field-error"
                      : undefined
                  }
                  style={{
                    minHeight: "90px",
                    color: "#9ca3af",
                    opacity: 1,
                  }}
                  placeholder="Reference or notes on the National Risk Assessment (NRA)…"
                  value={nra}
                  onChange={(e) => {
                    setNra(e.target.value);

                    if (e.target.value.trim()) {
                      clearSetupError("nra");
                    }
                  }}
                />

                {validationErrors?.setup?.nra && (
                  <div className="field-error-msg">
                    This field is required.
                  </div>
                )}

              </div>

            </div>

          ) : step >= 1 && step <= 6 ? (

            <Dimension
              dim={current}
              errors={validationErrors}
            />

          ) : step === 7 ? (

            <Conclusion />

          ) : step === 8 ? (

            <Report />

          ) : step === 9 ? (

            <Guidance />

          ) : null}

        </main>

        <LiveRail />

      </div>


      {/* =================================================
          Footer
      ================================================= */}

      <div className="footbar">

        <div className="foot-left">

          {step > 0 && (
            <button
              className="btn-ghost"
              onClick={() => go(step - 1)}
            >
              ← Back
            </button>
          )}

        </div>


        {/* -----------------------------------------------
            Footer risk information
        ----------------------------------------------- */}

        <div className="foot-dims">

          {current ? (

            <>

              <div className="foot-cell">

                <span>
                  ML level · avg EV{" "}
                  {dimCalc(dims[current.id]).mlAgg}
                </span>

                <Badge
                  value={dimCalc(dims[current.id]).mlAgg}
                />

              </div>


              <div className="foot-cell">

                <span>
                  TF level · avg EV{" "}
                  {dimCalc(dims[current.id]).tfAgg}
                </span>

                <Badge
                  value={dimCalc(dims[current.id]).tfAgg}
                />

              </div>

            </>

          ) : step === 8 && status === "approved" ? (

            <>

              <div className="foot-cell">

                <span>
                  ML total {overallCalValue.mlTotal}
                </span>

                <Badge
                  value={overallCalValue.mlTotal}
                />

              </div>


              <div className="foot-cell">

                <span>
                  TF total {overallCalValue.tfTotal}
                </span>

                <Badge
                  value={overallCalValue.tfTotal}
                />

              </div>


              <div className="foot-cell">

                <span>
                  Overall{" "}
                  {overallCalValue.overall.toFixed(1)}
                </span>

                <Badge
                  value={overallCalValue.overall}
                />

              </div>

            </>

          ) : step === 8 ? (

            <div
              className="foot-cell"
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "var(--muted)",
              }}
            >
              {status === "pending"
                ? "Awaiting approval."
                : "Submit the assessment to generate this report."}
            </div>

          ) : step === 7 ? (

            <div
              className="foot-cell"
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "var(--muted)",
              }}
            >
              {status === "pending"
                ? "Awaiting approval."
                : status === "approved"
                  ? "Assessment approved."
                  : "Provide your conclusion, then submit for approval."}
            </div>

          ) : (

            <div
              className="foot-cell"
              style={{
                background: "transparent",
                borderColor: "transparent",
                color: "var(--muted)",
              }}
            >
              Complete each step, then continue.
            </div>

          )}

        </div>


        {/* -----------------------------------------------
            Footer action
        ----------------------------------------------- */}

        <div className="foot-right">

          {step === 7 ? (

            <button
              className="btn-primary"
              onClick={handleContinue}
            >
              Submit
            </button>

          ) : step === 8 && status === "approved" ? (

            <button
              className="btn-ghost"
              onClick={() => window.print()}
            >
              Print / PDF
            </button>

          ) : step === 8 ? null : step < 8 ? (

            <button
              className="btn-primary"
              onClick={handleContinue}
            >
              Continue →
            </button>

          ) : null}

        </div>

      </div>


      {/* =================================================
          Submit confirmation modal
      ================================================= */}

      <ReviewSubmitModal
        open={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmit={confirmSubmit}
      />

    </div>
  );
}