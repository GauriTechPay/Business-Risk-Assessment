import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import FullReport from "../../components/assessment/Reports/FullReport";

export default function ReviewPage() {
  const { reviewFilingId, filings, setFilings, navigate, notify } = useApp();
  const [action, setAction] = useState(null),
    [comment, setComment] = useState(""),
    [commentError, setCommentError] = useState(false);

  const f = filings.find((x) => x.id === reviewFilingId);
  if (!f) return <div />;

  const decided = ["Approved", "Rejected"].includes(f.reviewStage);

  const update = (stage) => {
    setFilings((prev) =>
      prev.map((x) =>
        x.id === f.id
          ? {
              ...x,
              reviewStage: stage,
              status: stage,
              audit: [
                {
                  status:
                    stage === "Rejected"
                      ? "rejected"
                      : stage === "Changes Requested"
                        ? "stuck"
                        : "done",
                  title: `${stage} by Kiran Alvarez`,
                  note: comment || undefined,
                  time: "Just now",
                },
                ...x.audit,
              ],
            }
          : x,
      ),
    );
    setAction(null);
    setComment("");
    setCommentError(false);
    notify(`${f.entity} ${stage.toLowerCase()}.`);
    navigate("filings");
  };
  return (
    <div className="app-page show" id="page-reviewForm">
      <div className="controls-row" style={{ justifyContent: "flex-start" }}>
        <button className="btn-link" onClick={() => navigate("filings")}>
          ← Back to Review Queue
        </button>
      </div>
      <div className="review-scroll">
        <div className="review-layout">
          <main>
            <FullReport />
          </main>
          <aside className="rail">
            <h3>Audit Trail</h3>
            <div className="timeline rail-timeline-wrap">
              {f.audit.map((a, i) => (
                <div className="timeline-item" key={i}>
                  <span className={`timeline-dot ${a.status}`} />
                  <div className="tt">{a.title}</div>
                  {a.note && <div className="tnote">{a.note}</div>}
                  <div className="ttime">{a.time}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
      <div className="footbar review-footbar">
        <button
          className="btn-ghost"
          style={{ marginRight: "auto" }}
          onClick={() => navigate("filings")}
        >
          ← Back to Review Queue
        </button>
        {!decided && (
          <>
            <button
              className="btn-warn"
              onClick={() => {
                setAction("changes");
                setCommentError(false);
              }}
            >
              Request Changes
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                setAction("reject");
                setCommentError(false);
              }}
            >
              Reject
            </button>
            <button
              className="btn-success"
              onClick={() => {
                update("Approved");
                setCommentError(false);
              }}
            >
              Approve
            </button>
          </>
        )}
      </div>
      <Modal
        open={!!action}
        onClose={() => setAction(null)}
        title={action === "reject" ? "Reject Assessment" : "Request Changes"}
        footer={
          <>
            <button className="btn-ghost" onClick={() => setAction(null)}>
              Cancel
            </button>
            {/* <button
              className={action === "reject" ? "btn-danger" : "btn-warn"}
              onClick={() => {
                if (!comment.trim()) {
                  notify("Please add a comment before submitting.", "error");
                  return;
                }
                update(action === "reject" ? "Rejected" : "Changes Requested");
              }}
            > */}
            <button
              className={action === "reject" ? "btn-danger" : "btn-warn"}
              onClick={() => {
                if (!comment.trim()) {
                  setCommentError(true);
                  return;
                }
                update(action === "reject" ? "Rejected" : "Changes Requested");
              }}
            >
              {action === "reject" ? "Reject Assessment" : "Send Request"}
            </button>
          </>
        }
      >
        <div className="action-context">
          {`${f.entity} - ${f.type} Assessment · ${f.period}`}
        </div>
                <div className="action-field">
          <label className="field-required">
            {action === "reject"
              ? "Reason for rejection"
              : "What needs to change?"}
          </label>
          <textarea
            className={commentError ? "field-error" : undefined}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (commentError) setCommentError(false);
            }}
            placeholder={
              action === "reject"
                ? "Explain why this assessment cannot be approved…"
                : "Describe what the preparer needs to revise…"
            }
          />
          {commentError && (
            <div className="field-error-msg">This field is required.</div>
          )}
        </div>
      </Modal>
    </div>
  );
}
