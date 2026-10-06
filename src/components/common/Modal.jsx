import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  width = 560,
  children,
  footer,
}) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose?.();
    if (open) {
      document.addEventListener("keydown", fn);
      return () => document.removeEventListener("keydown", fn);
    }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="modal-overlay show"
      // onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={{ width }}>
        <div className="modal-head">
          <div>
            <h3>{title}</h3>
            {subtitle && <div className="msub">{subtitle}</div>}
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
                {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}
