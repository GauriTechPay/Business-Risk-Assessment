import React, { useState } from "react";
import { ADMIN_APPROVERS } from "../../data/riskData";
import Modal from "../common/Modal";

export default function AssignApproverModal({
  preparer,
  filings,
  onClose,
  onSave,
}) {
  const [value, setValue] = useState(preparer?.assignedApprover || "");
    const [approverError, setApproverError] = useState(false);

  if (!preparer) return null;

  const filingCount = filings.filter(
    (f) => f.preparer === preparer.name && f.reviewStage !== "Draft",
  ).length;

const save = () => {
    if (!value) {
      setApproverError(true);
      return;
    }

    onSave(preparer.id, value);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Assign Approver"
      subtitle={`${preparer.name} · ${filingCount} filings`}
      footer={
        <>
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={save}>
            {preparer.assignedApprover ? "Reassign" : "Assign"}
          </button>
        </>
      }
    >
      <div className="field">
        <label>Approver</label>
        <select  className={approverError ? "field-error" : undefined} value={value} onChange={(e) => {
            setValue(e.target.value);

            if (approverError) {
              setApproverError(false);
            }
          }}>
          <option value="">- Choose an approver -</option>
          {ADMIN_APPROVERS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

         {approverError && (
          <div className="field-error-msg">
            This field is required.
          </div>
        )}
      </div>
      <div className="sub-note" style={{ marginTop: 10 }}>
        All of {preparer.name}'s current and future filings will route to this
        approver.
      </div>
    </Modal>
  );
}
