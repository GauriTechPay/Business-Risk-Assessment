import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import SearchInput from "../../components/common/SearchInput";
import FilingManagementTable from "../../components/admin/FilingManagementTable";

export default function AdminFilingsPage() {
  const { filings } = useApp();
  const [search, setSearch] = useState("");

  const filteredFilings = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return filings;
    return filings.filter((f) => f.entity.toLowerCase().includes(q));
  }, [filings, search]);

  return (
    <div className="app-page show">
      <div className="sub-note" style={{ marginBottom: 14 }}>
        Read-only - each filing's approver follows from its preparer's
        assignment.
      </div>
      <div className="filings-toolbar">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by entity name…"
        />
      </div>
      <FilingManagementTable filings={filteredFilings} />
    </div>
  );
}