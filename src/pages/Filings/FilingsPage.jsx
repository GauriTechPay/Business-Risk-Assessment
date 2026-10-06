import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import useFilings from "../../hooks/useFilings";
import FilingFilters from "../../components/filings/FilingFilters";
import FilingTable from "../../components/filings/FilingTable";
import FilingDetailsModal from "../../components/filings/FilingDetailsModal";
export default function FilingsPage() {
  const { role, navigate, setReviewFilingId } = useApp();
  const {
    filteredFilings,
    search,
    setSearch,
    filingsStatus,
    setFilingsStatus,
  } = useFilings();
  const [selected, setSelected] = useState(null);
  const title = role === "approver" ? "Review Queue" : "Filings";
  return (
    <div className="app-page show">

      <FilingFilters
        search={search}
        onSearch={setSearch}
        status={filingsStatus}
        onStatus={setFilingsStatus}
      />
      <FilingTable
        filings={filteredFilings}
        // onSelect={(f) => {
        //   if (role === "approver" && f.reviewStage !== "Draft") {
        //     setReviewFilingId(f.id);
        //     navigate("reviewForm");
        //   } else setSelected(f);
        // }}
         onSelect={(f) => setSelected(f)}
      />
      <FilingDetailsModal filing={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
