import React, { useState } from "react";
import './SettingsPage.css'
import { useApp } from "../../context/AppContext";

export default function SettingsPage() {
  const { role, navigate } = useApp();

  const [notifications, setNotifications] = useState({
    filingSubmitted: true,
    filingDecision: true,
    weeklyDigest: false,
  });

  const roleLabel =
    role === "preparer"
      ? "Compliance Preparer"
      : role === "approver"
        ? "Compliance Approver"
        : "Administrator";

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="settings-page">
      {/* Profile */}
      <section className="settings-card">
        <div className="settings-eyebrow">ACCOUNT</div>

        <h2>Profile</h2>

        <p className="settings-description">
          Your account details for this workspace.
        </p>

        <div className="settings-profile-grid">
          <div className="settings-field">
            <label>Full Name</label>
            <div className="settings-input">
              Kiran Alvarez
            </div>
          </div>

          <div className="settings-field">
            <label>Email</label>
            <div className="settings-input">
              kiran.alvarez@juristax.mu
            </div>
          </div>

          <div className="settings-field">
            <label>Role</label>
            <div className="settings-input">
              {roleLabel}
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-card">
        <div className="settings-eyebrow">PREFERENCES</div>

        <h2>Notifications</h2>

        <p className="settings-description">
          Choose what you want to be notified about.
        </p>

        <div className="settings-options">

          <label className="settings-checkbox-row">
            <input
              type="checkbox"
              checked={notifications.filingSubmitted}
              onChange={() =>
                toggleNotification("filingSubmitted")
              }
            />

            <span>
              Notify me when a filing is submitted for review
            </span>
          </label>

          <label className="settings-checkbox-row">
            <input
              type="checkbox"
              checked={notifications.filingDecision}
              onChange={() =>
                toggleNotification("filingDecision")
              }
            />

            <span>
              Notify me when a filing is approved, rejected,
              or sent back for changes
            </span>
          </label>

          <label className="settings-checkbox-row">
            <input
              type="checkbox"
              checked={notifications.weeklyDigest}
              onChange={() =>
                toggleNotification("weeklyDigest")
              }
            />

            <span>
              Send a weekly summary digest by email
            </span>
          </label>

        </div>
      </section>

      {/* Appearance */}

      {/* <section className="settings-card">
        <div className="settings-eyebrow">APPEARANCE</div>

        <h2>Theme &amp; Badge Style</h2>

        <p className="settings-description">
          Visual theme, colors, and badge style are managed in
          the Configure tab of the assessment wizard.
        </p>

        <button
          className="settings-configure-btn"
          onClick={() => navigate("assessment")}
        >
          Open Configure
        </button>
      </section> */}
    </div>
  );
}