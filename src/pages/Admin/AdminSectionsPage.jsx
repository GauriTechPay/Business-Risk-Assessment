import React, { useState } from "react";
import { DIMS } from "../../data/riskData";
import { useApp } from "../../context/AppContext";
import SectionEditor, { SectionPreview } from "../../components/admin/SectionEditor";
import Modal from "../../components/common/Modal";

export default function AdminSectionsPage() {
  const { notify } = useApp();
  const [sections, setSections] = useState(() =>
    DIMS.map((d) => ({ id: d.id, name: d.name, qs: [...d.qs] }))
  );
  const [editing, setEditing] = useState(null);
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const update = (i, next) =>
    setSections((s) => s.map((x, j) => (j === i ? next : x)));

  const deleteSection = (idx) => {
    setSections((s) => s.filter((_, j) => j !== idx));
    setEditing(null);
  };

  const nextSectionId = String.fromCharCode(65 + sections.length);

  const openAddSection = () => {
    setNewSectionName("");
    setAddingSection(true);
  };
  const closeAddSection = () => {
    setAddingSection(false);
    setNewSectionName("");
  };
  const confirmAddSection = () => {
    if (!newSectionName.trim()) {
      notify("Please name the section.", "error");
      return;
    }
    setSections((s) => [
      ...s,
      { id: nextSectionId, name: newSectionName.trim(), qs: [] },
    ]);
    closeAddSection();
    notify(`Section ${nextSectionId} added.`, "success");
  };

  return (
    <div className="app-page show">
      <div className="admin-toolbar">
        <div className="sub-note">
          Editing here builds admin's own copy of the form. It never changes
          what preparers or approvers currently see.
        </div>
      </div>

      {sections.map((sec, i) => (
        <SectionEditor
          key={sec.id}
          section={sec}
          index={i}
          editing={editing}
          setEditing={setEditing}
          onChange={update}
          onDelete={deleteSection}
        />
      ))}

      <div className="card admin-sec-card">
        <div className="dim-title-row">
          <div className="admin-sec-name" style={{ cursor: "default" }}>
            Conclusion
          </div>
        </div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Final step · free-text field
        </div>
        <div className="empty-state">
          Overall conclusion, entered by the preparer after Section F and
          before submission. Fixed field - no questions to configure here.
        </div>
      </div>

      <button className="add-row-btn" onClick={openAddSection}>
        + Add Section
      </button>

      <Modal
        open={addingSection}
        onClose={closeAddSection}
        title="Add Section"
        width={640}
        footer={
          <>
            <button className="btn-ghost" onClick={closeAddSection}>
              Cancel
            </button>
            <button className="btn-primary" onClick={confirmAddSection}>
              OK - Add Section
            </button>
          </>
        }
      >
        <div className="field">
          <label>Section Name</label>
          <input
            type="text"
            autoFocus
            placeholder="e.g. Digital Assets Exposure"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
        </div>
        <SectionPreview id={nextSectionId} name={newSectionName} qs={[]} />
      </Modal>
    </div>
  );
}