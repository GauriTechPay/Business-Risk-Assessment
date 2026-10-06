import React from "react";
import { Search } from "lucide-react";
export default function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
}) {
  return (
    <div className="filings-search">
      <Search size={15} />
      <input
      type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
