import "./assessment.css";
import { ChevronRight } from "lucide-react";
import { qEV, band } from "../../utils/risk";
import RiskControls from "./RiskControls";
import Comments from "./Comments";
import { useApp } from "../../context/AppContext";

export default function QuestionCard({
  dim,
  qi,
  compact = false,
  errors = {},
}) {
  const { dims, updateQ } = useApp();

  const q = dims[dim.id].q[qi];

  const mEV = qEV(q, "ml");
  const tEV = qEV(q, "tf");

  const mB =
    mEV === null
      ? { t: "ML -", c: "b-none" }
      : {
          t: "ML " + band(mEV).t,
          c: band(mEV).c,
        };

  const tB =
    tEV === null
      ? { t: "TF -", c: "b-none" }
      : {
          t: "TF " + band(tEV).t,
          c: band(tEV).c,
        };

  const patch = (p) => updateQ(dim.id, qi, p);

  /*
   * Errors for this particular question.
   *
   * Example:
   * {
   *   mlImp: true,
   *   mlProb: true,
   *   reco: true
   * }
   */
  const questionErrors = errors?.[dim.id]?.[qi] || {};

  if (compact) {
    return (
      <div className="q2-card">
        <div className="q2-head">
          <span className="qid">
            {dim.id}
            {qi + 1}
          </span>

          <span className="qtext">
            {dim.qs[qi]}
          </span>
        </div>

        <div className="l3-risk-grid">
          <RiskControls
            dimId={dim.id}
            qi={qi}
            q={q}
            side="ml"
            label="Money Laundering"
            onChange={patch}
            errors={questionErrors}
          />

          <RiskControls
            dimId={dim.id}
            qi={qi}
            q={q}
            side="tf"
            label="Terrorism Financing"
            onChange={patch}
            errors={questionErrors}
          />
        </div>

        <Comments
          dimId={dim.id}
          qi={qi}
          q={q}
          onChange={patch}
          errors={questionErrors}
        />
      </div>
    );
  }

  return (
    <div className={`q ${q.open ? "open" : ""}`}>
      <button
        className="q-head"
        onClick={() => patch({ open: !q.open })}
      >
        <span className="qid">
          {dim.id}
          {qi + 1}
        </span>

        <span className="qtext">
          {dim.qs[qi]}
        </span>

        <span className="q-mini">
          <span className={`mini-badge ${mB.c}`}>
            {mB.t}
          </span>

          <span className={`mini-badge ${tB.c}`}>
            {tB.t}
          </span>
        </span>

        <ChevronRight
          className="chev"
          size={16}
        />
      </button>

      {q.open && (
        <div className="q-body">
          <div className="mltf">
            <RiskControls
              dimId={dim.id}
              qi={qi}
              q={q}
              side="ml"
              label="Money Laundering"
              onChange={patch}
              errors={questionErrors}
            />

            <RiskControls
              dimId={dim.id}
              qi={qi}
              q={q}
              side="tf"
              label="Terrorism Financing"
              onChange={patch}
              errors={questionErrors}
            />
          </div>

          <Comments
            dimId={dim.id}
            qi={qi}
            q={q}
            onChange={patch}
            errors={questionErrors}
          />
        </div>
      )}
    </div>
  );
}