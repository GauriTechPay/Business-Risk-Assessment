import React, { useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-stack">
      <div
        className={`toast show ${
          toast.type === "error" ? "error" : "success"
        }`}
      >
        {toast.type === "error" ? (
          <AlertCircle size={16} strokeWidth={2.4} />
        ) : (
          <Check size={16} strokeWidth={2.4} />
        )}

        <span>{toast.message}</span>
      </div>
    </div>
  );
}