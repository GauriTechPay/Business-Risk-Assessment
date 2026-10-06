import React from "react";

const map = {
  Draft: "st-draft",
  "Under Review": "st-review",
  Approved: "st-approved",
  Rejected: "st-rejected",
  "Changes Requested": "st-changes",
  "Pending Review": "st-review",
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${map[status] || ""}`}>{status}</span>;
}
