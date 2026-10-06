import React from "react";
import Badge from "../common/Badge";
export default function WorkQueue({ role, items, onOpen, onAssign }) {
  if (!items.length)
    return (
      <div className="empty-state">Nothing is waiting here right now.</div>
    );
  return (
    <div>
      {items.slice(0, 5).map((item, i) => (
        <React.Fragment key={item.id || item.entity || item.name}>
          <button
            className={role === "preparer" ? "queue-row" : "review-row"}
            onClick={() =>
              role === "admin" ? onAssign(item.id) : onOpen(item)
            }
          >
            {role === "preparer" ? (
              <>
                <div className="queue-main">
                  <div className="queue-name">{item.entity}</div>
                  <div className="queue-meta">
                    {item.answered} of {item.total} answered
                  </div>
                </div>
                <div className="queue-progress">
                  <span className="queue-bar-track">
                    <span
                      className="queue-bar-fill"
                      style={{
                        width: `${Math.round((item.answered / item.total) * 100)}%`,
                      }}
                    />
                  </span>
                  <span className="queue-pct">
                    {Math.round((item.answered / item.total) * 100)}%
                  </span>
                </div>
              </>
            ) : role === "approver" ? (
              <>
                <div className="queue-main">
                  <div className="queue-name">{item.entity}</div>
                  <div className="queue-meta">
                    {item.period} · Submitted by {item.preparer} ·{" "}
                    {item.updated}
                  </div>
                </div>
                <div className="review-foot">
                  <Badge level={item.overall}/>
                  <span className="review-link">Review →</span>
                </div>
              </>
            ) : (
              <>
                <div className="queue-main">
                  <div className="queue-name">{item.name}</div>
                  <div className="queue-meta">
                    {item.isNew
                      ? `Joined the platform · ${item.joined}`
                      : "No approver assigned yet"}
                  </div>
                </div>
                <div className="review-foot">
                  <span className="unassigned-pill">Unassigned</span>
                  <span className="review-link">Assign →</span>
                </div>
              </>
            )}
          </button>
          {i < items.length - 1 && <div className="queue-sep" />}
        </React.Fragment>
      ))}
    </div>
  );
}
