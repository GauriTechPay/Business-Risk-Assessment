import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Toast from "../components/common/Toast";
import { routes } from "./routes";
import { ROLE_LABELS } from "../data/riskData";
import AssignApproverModal from "../components/admin/AssignApproverModal";

export default function App() {
  const ctx = useApp();

  const { page, role, assignModal, setAssignModal } = ctx;

  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (
      role === "admin" &&
      ["assessment", "filings", "reviewForm"].includes(page)
    )
      ctx.navigate("dashboard");
    if (
      role === "approver" &&
      [
        "assessment",
        "admin-mappings",
        "admin-filings",
        "admin-sections",
        "admin-guidance",
        "admin-mapping",
      ].includes(page)
    )
      ctx.navigate("dashboard");
    if (
      role === "preparer" &&
      [
        "reviewForm",
        "admin-mappings",
        "admin-filings",
        "admin-sections",
        "admin-guidance",
        "admin-mapping",
      ].includes(page)
    )
      ctx.navigate("dashboard");
  }, [role, page]);

  const Page = routes[page] || routes.dashboard;

  const preparer = ctx.preparers.find((p) => p.id === assignModal);

  const saveAssignment = (id, value) => {
    const p = ctx.preparers.find((x) => x.id === id);
    if (!p || !value) {
      ctx.notify("Please choose an approver.", "error");
      return;
    }
    ctx.setPreparers((prev) =>
      prev.map((x) =>
        x.id === id ? { ...x, assignedApprover: value, isNew: false } : x,
      ),
    );
    ctx.setFilings((prev) =>
      prev.map((f) =>
        f.preparer === p.name && f.reviewStage !== "Draft"
          ? {
              ...f,
              assignedApprover: value,
              audit: [
                {
                  status: "done",
                  title: `Assigned to ${value} by Admin`,
                  time: "Just now",
                },
                ...f.audit,
              ],
            }
          : f,
      ),
    );
    setAssignModal(null);
    ctx.notify(`${p.name} assigned to ${value}.`);
  };

  const changeRole = (r) => {
    if (r === role) return;
    setSwitching(true);
    ctx.setRole(r);
    ctx.navigate("dashboard");
    setTimeout(() => setSwitching(false), 350);
  };

  return (
    <>
    <div
      className={`app ${ctx.badgeStyle === "outlined" ? "badges-outlined" : ""}`}
    >
      <Sidebar onChangeRole={changeRole} />
      <div className="content">
        <Topbar />
        <Page />
      </div>
      {assignModal && (
        <AssignApproverModal
          preparer={preparer}
          filings={ctx.filings}
          onClose={() => setAssignModal(null)}
          onSave={saveAssignment}
        />
      )}{" "}
      {switching && (
        <div className="rs-overlay show">
          <div className="rs-spinner" />
          <div className="rs-text">Switching to {ROLE_LABELS[role]}…</div>
        </div>
      )}
    </div>
          <Toast toast={ctx.toast} onClose={() => ctx.setToast(null)} />
            </>

  );
}
