import React from "react";
import Badge from "../common/Badge";

export default function PreparerAssignmentTable({
  preparers,
  filings,
  onAssign,
}) {
  return (
    <div className="table-wrap">
      <table className="filings-table">
        <thead>
          <tr>
            <th>Preparer</th>
            <th>Filings</th>
            <th>Assigned Approver</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {preparers.map((p) => (
            <tr key={p.id} onClick={() => onAssign(p.id)}>
              <td>
                {p.name}{" "}
                {p.isNew && <span className="unassigned-pill">New</span>}
              </td>
              <td>
                {
                  filings.filter(
                    (f) => f.preparer === p.name && f.reviewStage !== "Draft",
                  ).length
                }
              </td>
              <td>
                {p.assignedApprover || (
                  <span className="unassigned-pill">Unassigned</span>
                )}
              </td>
              <td>
                <button
                  className="btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssign(p.id);
                  }}
                >
                  {p.assignedApprover ? "Reassign" : "Assign"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
