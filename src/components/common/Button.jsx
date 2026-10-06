import React from "react";
export default function Button({
  variant = "ghost",
  children,
  className = "",
  ...props
}) {
  return (
    <button className={`btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
