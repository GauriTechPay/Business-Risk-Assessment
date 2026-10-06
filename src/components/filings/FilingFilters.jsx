import React from "react";
import SearchInput from "../common/SearchInput";
import FilterPills from "../common/FilterPills";
export default function FilingFilters({ search, onSearch, status, onStatus }) {
  return (
    <div className="filings-toolbar">
      <SearchInput
        value={search}
        onChange={onSearch}
        placeholder="Search by entity name…"
      />
      <FilterPills
        options={[
          "All",
          "Draft",
          "Under Review",
          // "Changes Requested",
          "Approved",
          "Rejected",
        ]}
        value={status}
        onChange={onStatus}
      />
    </div>
  );
}
