import React from "react";
import Modal from "../common/Modal";
import Badge from "../common/Badge";
import FilingAuditTrail from "./FilingAuditTrail";
import { useApp } from "../../context/AppContext";

export default function FilingDetailsModal({ filing, onClose }) {

  const {role, setReviewFilingId,navigate}= useApp();

  const handleOpenFiling = () => {
  if (!filing) return;

  if (role === "approver") {
    setReviewFilingId(filing.id);
    onClose();
    navigate("reviewForm");
    return;
  }

  // existing user behavior
};

  return (
    <Modal
      open={!!filing}
      onClose={onClose}
      title={filing?.entity}
      subtitle={filing ? `${filing.period} · ${filing.preparer}` : ""}
      footer={
        <div className="modal-foot">
          {/* <button className="btn-ghost" onclick="closeFilingModal()"> */}
                    <button className="btn-ghost" onClick={onClose}>

            Close
          </button>
          {/* <button
            className="btn-primary"
            title="Full report view is not yet available in this demo"
            onClick={()=>navigate('assessment')}
          >
            Open full report →
          </button> */}
          <button
  className="btn-primary"
  onClick={handleOpenFiling}
>
  {role === "approver"
    ? "See Filing →"
    : "Open full report →"}
</button>
        </div>
      }
    >
      {filing && (
        <>
          <div className="risk-summary">
            <div className="rs-item">
              <div className="rs-lab">ML</div>
              <Badge level={filing.ml} />
            </div>
            <div className="rs-item">
              <div className="rs-lab">TF</div>
              <Badge level={filing.tf} />
            </div>
            <div className="rs-item">
              <div className="rs-lab">Overall</div>
              <Badge level={filing.overall} />
            </div>
          </div>
          <h4 className="mh">Audit trail</h4>
          <FilingAuditTrail audit={filing.audit} />
        </>
      )}
    </Modal>
  );
}
