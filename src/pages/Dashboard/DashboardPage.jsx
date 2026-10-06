import React, { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import {
  STAT_CARDS,
  DRAFTS,
  RECENT_ACTIVITY,
  APPROVER_ACTIVITY,
} from "../../data/riskData";
import StatCard from "../../components/dashboard/StatCard";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import WorkQueue from "../../components/dashboard/WorkQueue";

export default function DashboardPage() {
  const {
    role,
    navigate,
    filings,
    preparers,
    setAssignModal,
    setReviewFilingId,
    setFilingsStatus,
  } = useApp();

  const pending = useMemo(
    () => filings.filter((f) => f.reviewStage === "Pending Review"),
    [filings],
  );

  const cards = useMemo(
    () =>
      role === "approver"
        ? [
            {
              label: "Pending My Review",
              value: pending.length,
              sub: "Awaiting your decision",
            },
            {
              label: "Changes Requested",
              value: filings.filter(
                (f) => f.reviewStage === "Changes Requested",
              ).length,
              sub: "Sent back to preparers",
            },
            {
              label: "Approved",
              value: filings.filter((f) => f.reviewStage === "Approved").length,
              sub: "This filing set",
            },
            {
              label: "Rejected",
              value: filings.filter((f) => f.reviewStage === "Rejected").length,
              sub: "This filing set",
            },
          ]
        : role === "admin"
          ? [
              {
                label: "Total Filings",
                value: filings.filter((f) => f.reviewStage !== "Draft").length,
                sub: "Excludes drafts",
              },
              {
                label: "Preparers",
                value: preparers.length,
                sub: "Across the platform",
              },
              {
                label: "Awaiting Assignment",
                value: preparers.filter((p) => !p.assignedApprover).length,
                sub: "Preparers without an approver",
              },
              {
                label: "Approved",
                value: filings.filter((f) => f.reviewStage === "Approved")
                  .length,
                sub: "This filing set",
              },
            ]
          : STAT_CARDS,
    [role, pending, filings, preparers],
  );

  const queue =
    role === "preparer"
      ? DRAFTS
      : role === "approver"
        ? pending
        : preparers.filter((p) => !p.assignedApprover);

  const visibleQueue = queue.slice(0, 5);

  const activity = role === "approver" ? APPROVER_ACTIVITY : RECENT_ACTIVITY;
  const visibleActivity = activity.slice(0, 5);

  return (
    <div className="app-page show">
      <div className="stat-grid">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>
      <div className="dash-columns">
        <section className="dash-section">
          <div className="dash-section-head">
            <h2>
              {role === "admin"
                ? "Awaiting assignment"
                : role === "approver"
                  ? "Awaiting your review"
                  : "Continue working"}
            </h2>

            <button
              className="view-all-link"
              onClick={() => {
                if (role === "preparer") {
                  setFilingsStatus("Draft");
                  navigate("filings");
                } else if (role === "admin") {
                  navigate("admin-mappings");
                } else {
                  setFilingsStatus("Pending Review");
                  navigate("filings");
                }
              }}
            >
              View all ({queue.length})
            </button>
          </div>
          <div className="dash-activity-sep-left"></div>
          <WorkQueue
            role={role}
            items={queue}
            onOpen={(item) => {
              if (role === "approver") {
                setReviewFilingId(item.id);
                navigate("reviewForm");
              } else navigate("assessment");
            }}
            onAssign={setAssignModal}
          />
        </section>
        <section className="dash-section dash-activity">
          <div className="dash-section-head">
            <h2>Recent activity</h2>
            <button
              className="view-all-link"
              onClick={() => {
                if (role === "admin") {
                  navigate("admin-mappings");
                } else {
                  setFilingsStatus("All");
                  navigate("filings");
                }
              }}
            >
              View all ({activity.length})
            </button>
          </div>
          <div className="dash-activity-sep-right"></div>

          <ActivityFeed items={visibleActivity} />
        </section>
      </div>
    </div>
  );
}
