import React, { useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import { ROLE_LABELS } from "../../data/riskData";
import { useApp } from "../../context/AppContext";
export default function ProbabilityMatrixBandPanel({ open, onClose }) {
  const ref = useRef(null);
  const { role } = useApp();
  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="settings-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="settings-panel"
        tabIndex="-1"
        ref={ref}
        aria-label="Settings"
      >
        <div className="settings-head">
          <div>
            <div className="eyebrow">Impact × Probability Matrix & Risk Bands</div>
            {/*<h2>Settings</h2>*/}
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="settings-section">
          <h3>Profile</h3>
          <div className="settings-grid">
            <label>
              Full name
              <input value="Kiran Alvarez" readOnly />
            </label>
            <label>
              Email
              <input value="kiran.alvarez@juristax.mu" readOnly />
            </label>
            <label>
              Role
              <input value={ROLE_LABELS[role]} readOnly />
            </label>
          </div>
        </div>
        <div className="settings-section">
          <h3>Notifications</h3>
          <label className="setting-check">
            <input type="checkbox" defaultChecked />
            <span>
              <Check size={14} /> Filing submitted for review
            </span>
          </label>
          <label className="setting-check">
            <input type="checkbox" defaultChecked />
            <span>
              <Check size={14} /> Approval, rejection or change request
            </span>
          </label>
          <label className="setting-check">
            <input type="checkbox" />
            <span>
              <Check size={14} /> Weekly summary digest
            </span>
          </label>
        </div>
        <div className="settings-section">
          <h3>Appearance</h3>
          <div className="setting-row">
            <span>Compact navigation</span>
            <input type="checkbox" />
          </div>
          <div className="setting-row">
            <span>High contrast status badges</span>
            <input type="checkbox" />
          </div>
        </div>
      </aside>
    </div>
  );
}
