import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";

function EditableQuestion({ qid, text, editing, onEdit, onSave, onCancel, onDelete }) {
  const [draft, setDraft] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      setDraft(text);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const save = () => {
    const val = draft.trim();
    if (!val) return;
    onSave(val);
  };

  if (editing) {
    return (
      <div className="admin-q-row">
        <span className="qid">{qid}</span>
        <input
          type="text"
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") onCancel();
          }}
        />
        <button
          className="q-save-btn"
          style={{ display: "flex" }}
          title="Save change"
          onClick={save}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>
        <button className="icon-btn" title="Cancel" onClick={onCancel}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="admin-q-row">
      <span className="qid">{qid}</span>
      <span className="admin-q-text" onClick={onEdit} title="Click to edit">
        {text}
      </span>
      <button className="icon-btn" title="Edit question" onClick={onEdit}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
      <button
        className="q-del-btn"
        title="Delete question"
        onClick={() => {
          if (window.confirm("Delete this question?")) onDelete();
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
}

export function SectionPreview({ id, name, qs }) {
  return (
    <div className="preview-pane">
      <div className="pp-label">Preview - how this looks to the user</div>
      <div className="card" style={{ margin: 0 }}>
        <div className="eyebrow dim">Dimension {id || "?"}</div>
        <div className="dim-title-row">
          <h2>
            {id || "?"}. {name ? name : <i style={{ color: "var(--muted)" }}>Untitled section</i>}
          </h2>
        </div>
        {qs && qs.length ? (
          qs.map((q, qi) => (
            <div className="q" key={qi}>
              <div className="q-head">
                <span className="qid">
                  {id || "?"}
                  {qi + 1}
                </span>
                <span className="qtext">
                  {q ? q : <i style={{ color: "var(--muted)" }}>Untitled question</i>}
                </span>
                <span className="q-mini">
                  <span className="mini-badge b-none">ML -</span>
                  <span className="mini-badge b-none">TF -</span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">No questions yet.</div>
        )}
      </div>
    </div>
  );
}

export default function SectionEditor({
  section,
  index,
  editing,
  setEditing,
  onChange,
  onDelete,
}) {
  const { notify } = useApp();
  const [nameDraft, setNameDraft] = useState(section.name);
  const nameInputRef = useRef(null);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQText, setNewQText] = useState("");
  const update = (next) => onChange(index, next);

  const isEditingName = editing?.type === "section" && editing.si === index;

  useEffect(() => {
    if (isEditingName) {
      setNameDraft(section.name);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
        nameInputRef.current.select();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingName]);

  const saveName = () => {
    const val = nameDraft.trim();
    if (!val) return;
    update({ ...section, name: val });
    setEditing(null);
  };
  const cancelName = () => setEditing(null);

  const openAddQuestion = () => {
    setNewQText("");
    setAddingQuestion(true);
  };
  const closeAddQuestion = () => {
    setAddingQuestion(false);
    setNewQText("");
  };
  const confirmAddQuestion = () => {
    if (!newQText.trim()) {
      notify("Please enter a question.", "error");
      return;
    }
    update({ ...section, qs: [...section.qs, newQText.trim()] });
    closeAddQuestion();
    notify("Question added.", "success");
  };

  const handleDeleteSection = () => {
    if (
      window.confirm(
        `Delete section "${section.id}. ${section.name}" and all its questions?`
      )
    ) {
      onDelete(index);
    }
  };

  return (
    <div className="card admin-sec-card">
      <div className="dim-title-row">
        {isEditingName ? (
          <>
            <input
              type="text"
              className="admin-sec-name"
              ref={nameInputRef}
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") cancelName();
              }}
            />
            <div className="admin-sec-actions">
              <button
                className="btn-primary"
                style={{ padding: "8px 14px", fontSize: 12 }}
                onClick={saveName}
              >
                Save
              </button>
              <button
                className="btn-ghost"
                style={{ padding: "8px 14px", fontSize: 12 }}
                onClick={cancelName}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="admin-sec-name"
              style={{ cursor: "pointer" }}
              onClick={() => setEditing({ type: "section", si: index })}
              title="Click to edit"
            >
              {section.name}
            </div>
            <div className="admin-sec-actions">
              <button
                className="btn-ghost"
                style={{ padding: "8px 13px", fontSize: 12 }}
                onClick={openAddQuestion}
              >
                + Add question
              </button>
              <button className="btn-outline-danger" onClick={handleDeleteSection}>
                Delete section
              </button>
            </div>
          </>
        )}
      </div>

      <div className="eyebrow" style={{ marginBottom: 12 }}>
        Section {section.id} · {section.qs.length} question
        {section.qs.length === 1 ? "" : "s"}
      </div>

      {section.qs.length ? (
        section.qs.map((q, qi) => {
          const isEditingQ =
            editing?.type === "question" && editing.si === index && editing.qi === qi;
          return (
            <EditableQuestion
              key={`${section.id}-${qi}`}
              qid={`${section.id}${qi + 1}`}
              text={q}
              editing={isEditingQ}
              onEdit={() => setEditing({ type: "question", si: index, qi })}
              onSave={(val) => {
                update({
                  ...section,
                  qs: section.qs.map((x, j) => (j === qi ? val : x)),
                });
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
              onDelete={() => {
                update({ ...section, qs: section.qs.filter((_, j) => j !== qi) });
                setEditing(null);
              }}
            />
          );
        })
      ) : (
        <div className="empty-state">No questions in this section yet.</div>
      )}

      <Modal
        open={addingQuestion}
        onClose={closeAddQuestion}
        title={`Add Question - Section ${section.id}`}
        width={640}
        footer={
          <>
            <button className="btn-ghost" onClick={closeAddQuestion}>
              Cancel
            </button>
            <button className="btn-primary" onClick={confirmAddQuestion}>
              OK - Add Question
            </button>
          </>
        }
      >
        <div className="field">
          <label>Question Text</label>
          <textarea
            autoFocus
            placeholder="Enter the question…"
            value={newQText}
            onChange={(e) => setNewQText(e.target.value)}
          />
        </div>
        <SectionPreview id={section.id} name={section.name} qs={[...section.qs, newQText]} />
      </Modal>
    </div>
  );
}