import React, { useState } from "react";
import { IMPACT, PROB, ADMIN_GUIDANCE, ADMIN_MAPPING } from "../../data/riskData";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/common/Modal";
import Badge from "../../components/common/Badge";

function ImpactProbabilityMatrix() {
  return (
    <table className="mx">
      <tbody>
        <tr>
          <th>Impact ↓ / Probability →</th>
          {PROB.map((p) => (
            <th key={p[0]}>
              {p[0]} - {p[1]}
            </th>
          ))}
        </tr>
        {[5, 4, 3, 2, 1].map((i) => (
          <tr key={i}>
            <th>
              {i} - {IMPACT.find((x) => x[0] === i)[1]}
            </th>
            {[1, 2, 3, 4, 5].map((p) => {
              const ev = i * p;
              const cl = ev >= 20 ? "c5" : ev >= 11 ? "c4" : ev >= 8 ? "c3" : ev >= 4 ? "c2" : "c1";
              return (
                <td key={p} className={`${cl} num`}>
                  {ev}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ScaleNote() {
  return (
    <div className="scale-note">
      Rate <b>ML and TF independently</b> for every question - each with its own
      Impact (1–5) × Probability (1–5) = EV (1–25) - and complete the three
      comment boxes per question.
      <br />
      <br />
      <b>ML Total</b> = Σ ML EVs ÷ 25 (rounded down) · <b>TF Total</b> = Σ TF
      EVs ÷ 25 (rounded down)
      <br />
      <b>Overall Entity Risk</b> = (ML Total × 90%) + (TF Total × 10%).
    </div>
  );
}

export default function AdminGuidancePage() {
  const { notify } = useApp();
  const [intro, setIntro] = useState(ADMIN_GUIDANCE.intro);
  const [mapping, setMapping] = useState(ADMIN_MAPPING);

  const [editingIntro, setEditingIntro] = useState(false);
  const [introDraft, setIntroDraft] = useState(intro);

  const [editingRow, setEditingRow] = useState(null);
  const [rowDraft, setRowDraft] = useState({ label: "", min: 0, max: 0 });

  const openEditIntro = () => {
    setIntroDraft(intro);
    setEditingIntro(true);
  };
  const closeEditIntro = () => setEditingIntro(false);
  const saveIntro = () => {
    setIntro(introDraft.trim());
    setEditingIntro(false);
    notify("Intro text updated.", "success");
  };

  const openEditRow = (mi) => {
    const m = mapping[mi];
    setRowDraft({ label: m.label, min: m.min, max: m.max });
    setEditingRow(mi);
  };
  const closeEditRow = () => setEditingRow(null);
  const saveRow = () => {
    setMapping((rows) =>
      rows.map((r, i) =>
        i === editingRow
          ? {
              ...r,
              label: rowDraft.label,
              min: parseFloat(rowDraft.min),
              max: parseFloat(rowDraft.max),
            }
          : r
      )
    );
    setEditingRow(null);
    notify("Risk band updated.", "success");
  };

  return (
    <div className="app-page show">
      <div className="card">
        <div className="eyebrow">Methodology</div>
        <h2>Guidance Intro Text</h2>
        <div className="sub">
          Shown at the top of the Guidance step. Static - editing here does
          not change the real Guidance content.
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "var(--ink)" }}>
          {intro}
        </div>
        <button className="btn-ghost" style={{ marginTop: 12 }} onClick={openEditIntro}>
          Edit intro text
        </button>
      </div>

      <div className="card">
        <div className="eyebrow">Reference</div>
        <h2>Impact × Probability Matrix</h2>
        <div className="sub">
          Now shown directly on the Guidance step (previously a separate side
          panel). Read-only - edit the level labels and score ranges below.
        </div>
        <ImpactProbabilityMatrix />
        <ScaleNote />
      </div>

      <div className="card">
        <div className="eyebrow">Verified</div>
        <h2>Calculation Formula</h2>
        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
          Rate ML and TF independently for every question - each with its own
          comment boxes per question.
          <br />
          <br />
          <b>ML Total</b> = Σ ML EVs ÷ 25, rounded down · <b>TF Total</b> = Σ
          TF EVs ÷ 25, rounded down
          <br />
          <b>Overall Entity Risk</b> = (ML Total × 90%) + (TF Total × 10%).
        </div>
      </div>

      <div className="card">
        <div className="eyebrow">Score vs Level</div>
        <h2>Risk Band Mapping</h2>
        <div className="sub">
          Static admin copy of the band table. Editing here does not change
          the live scoring engine used by preparers or approvers.
        </div>
        <table className="rep">
          <thead>
            <tr>
              <th>Level</th>
              <th>Min Score</th>
              <th>Max Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mapping.map((m, mi) => (
              <tr key={m.key}>
                <td>
                  <Badge level={m.label} />
                </td>
                <td className="num">{m.min}</td>
                <td className="num">{m.max}</td>
                <td>
                  <button
                    className="btn-ghost"
                    style={{ padding: "6px 12px", fontSize: 12 }}
                    onClick={() => openEditRow(mi)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={editingIntro}
        onClose={closeEditIntro}
        title="Edit Guidance Intro Text"
        width={640}
        footer={
          <>
            <button className="btn-ghost" onClick={closeEditIntro}>
              Cancel
            </button>
            <button className="btn-primary" onClick={saveIntro}>
              OK - Save
            </button>
          </>
        }
      >
        <div className="field">
          <label>Intro Text</label>
          <textarea
            autoFocus
            style={{ minHeight: 110 }}
            value={introDraft}
            onChange={(e) => setIntroDraft(e.target.value)}
          />
        </div>
        <div className="preview-pane">
          <div className="pp-label">Preview - how this looks to the user</div>
          <div style={{ fontSize: 13, lineHeight: 1.8 }}>{introDraft}</div>
        </div>
      </Modal>

      <Modal
        open={editingRow !== null}
        onClose={closeEditRow}
        title={editingRow !== null ? `Edit Band - ${mapping[editingRow].label}` : ""}
        width={560}
        footer={
          <>
            <button className="btn-ghost" onClick={closeEditRow}>
              Cancel
            </button>
            <button className="btn-primary" onClick={saveRow}>
              Save
            </button>
          </>
        }
      >
        <div className="grid3" style={{ marginBottom: 6 }}>
          <div className="field">
            <label>Level Label</label>
            <input
              type="text"
              value={rowDraft.label}
              onChange={(e) => setRowDraft({ ...rowDraft, label: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Min Score</label>
            <input
              type="text"
              value={rowDraft.min}
              onChange={(e) => setRowDraft({ ...rowDraft, min: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Max Score</label>
            <input
              type="text"
              value={rowDraft.max}
              onChange={(e) => setRowDraft({ ...rowDraft, max: e.target.value })}
            />
          </div>
        </div>
        <div className="preview-pane">
          <div className="pp-label">Preview - how this looks to the user</div>
          <Badge level={rowDraft.label} />
          <span style={{ marginLeft: 10, fontSize: 12.5, color: "var(--muted)" }}>
            Score range {rowDraft.min} – {rowDraft.max}
          </span>
        </div>
      </Modal>
    </div>
  );
}