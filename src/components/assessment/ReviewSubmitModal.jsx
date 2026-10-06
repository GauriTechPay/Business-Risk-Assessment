import React from "react";
import { X } from "lucide-react";

import { DIMS } from "../../data/riskData";
import { useApp } from "../../context/AppContext";
import { dimCalc, overallCalc, qEV } from "../../utils/risk";

import Gauge from "./Gauge";
import Badge from "../common/Badge";
import FullReport from "./Reports/FullReport";

export default function ReviewSubmitModal({ open, onClose, onSubmit }) {
  const { dims, company, from, to } = useApp();

  if (!open) return null;

  const O = overallCalc(DIMS.map((d) => dims[d.id]));

  const missingRisk = [];

  DIMS.forEach((d) => {
    dims[d.id].q.forEach((q, qi) => {
      if (
        q.mlImp == null ||
        q.mlProb == null ||
        q.tfImp == null ||
        q.tfProb == null
      ) {
        missingRisk.push(`${d.id}${qi + 1}`);
      }
    });
  });

  const missingComments = [];

  DIMS.forEach((d) => {
    dims[d.id].q.forEach((q, qi) => {
      if (!q.inherent || !q.obs || !q.reco) {
        missingComments.push(`${d.id}${qi + 1}`);
      }
    });
  });

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="submit-review-overlay">
      <div className="submit-review-modal">
        {/* HEADER */}
        <div className="submit-review-head">
          <div>
            <h3>Review &amp; Submit Assessment</h3>

            <div className="submit-review-sub">
              {company || "-"} · Period {formatDate(from)} to {formatDate(to)}
            </div>
          </div>

          <button
            type="button"
            className="submit-review-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

<div className="submit-review-body">
  <FullReport />
</div>

        {/* FOOTER */}
        <div className="submit-review-foot">
          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}