// import React, { useEffect, useMemo, useState } from "react";
// import Badge from "../common/Badge";

// export default function FilingManagementTable({ filings }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const rowsPerPage = 10;

//   // Remove Draft filings
//   const filteredFilings = useMemo(
//     () => filings.filter((f) => f.reviewStage !== "Draft"),
//     [filings]
//   );

//   const totalPages = Math.ceil(filteredFilings.length / rowsPerPage);

//   // Reset to page 1 when the data/filter changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filings]);

//   // Get only the records for the current page
//   const currentFilings = useMemo(() => {
//     const startIndex = (currentPage - 1) * rowsPerPage;

//     return filteredFilings.slice(
//       startIndex,
//       startIndex + rowsPerPage
//     );
//   }, [filteredFilings, currentPage]);

//   return (
//     <div className="filing-table-container">
//       <div className="table-wrap">
//         <table className="filings-table view-only">
//           <thead>
//             <tr>
//               <th>Entity Name</th>
//               <th>Period</th>
//               <th>Status</th>
//               <th>Overall Risk</th>
//               <th>Prepared By</th>
//               <th>Assigned Approver</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentFilings.length ? (
//               currentFilings.map((f) => (
//                 <tr key={f.id}>
//                   <td>{f.entity}</td>
//                   <td>{f.period}</td>
//                   <td>{f.reviewStage}</td>

//                   <td>
//                     <Badge level={f.overall} />
//                   </td>

//                   <td>{f.preparer}</td>

//                   <td>
//                     {f.assignedApprover || (
//                       <span className="unassigned-pill">
//                         Unassigned
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="empty-row">
//                 <td colSpan="6">
//                   No filings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="filings-pagination">
//           <div className="pagination-info">
//             Showing{" "}
//             <b>
//               {(currentPage - 1) * rowsPerPage + 1}
//             </b>{" "}
//             -{" "}
//             <b>
//               {Math.min(
//                 currentPage * rowsPerPage,
//                 filteredFilings.length
//               )}
//             </b>{" "}
//             of <b>{filteredFilings.length}</b>
//           </div>

//           <div className="pagination-controls">
//             <button
//               type="button"
//               disabled={currentPage === 1}
//               onClick={() =>
//                 setCurrentPage((page) => page - 1)
//               }
//             >
//               Previous
//             </button>

//             {Array.from(
//               { length: totalPages },
//               (_, index) => index + 1
//             ).map((page) => (
//               <button
//                 type="button"
//                 key={page}
//                 className={
//                   currentPage === page ? "active" : ""
//                 }
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               type="button"
//               disabled={currentPage === totalPages}
//               onClick={() =>
//                 setCurrentPage((page) => page + 1)
//               }
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 10;

const STATUS_CLASS = {
  Approved: "st-approved",
  Rejected: "st-rejected",
  "Pending Review": "st-review",
  "Changes Requested": "st-changes",
  "Under Review": "st-review",
  Draft: "st-draft",
};

const SECTOR_BY_ENTITY = {
  "Riverstone Capital": "Securities Sector",
  "Northbridge Holdings Ltd.": "Other Financial Institutions (OFIs)",
  "Halcyon Freight Ltd.": "Designated Non-Financial Businesses and Professions (DNFBPs)",
  "Westfield Corporate Trustees":
    "Trust and Company Service Provider (TCSP) Sector",
  "Blackwood & Partners Fiduciary":
    "Trust and Company Service Provider (TCSP) Sector",
  "Ashcombe Global Markets": "Securities Sector",
  "Ironbridge Settlement Services":
    "Trust and Company Service Provider (TCSP) Sector",
  "Corvus Family Office": "Other Financial Institutions (OFIs)",
  "Thornfield Asset Management": "Securities Sector",
  "Pelican Bay Trustees":
    "Trust and Company Service Provider (TCSP) Sector",
};

function getSector(filing) {
  return filing.sector || SECTOR_BY_ENTITY[filing.entity] || "-";
}

export default function FilingManagementTable({ filings }) {
  const [currentPage, setCurrentPage] = useState(1);

  const rows = useMemo(
    () => filings.filter((f) => f.reviewStage !== "Draft"),
    [filings],
  );

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleRows = rows.slice(startIndex, startIndex + PAGE_SIZE);

  const firstItem = rows.length === 0 ? 0 : startIndex + 1;
  const lastItem = Math.min(startIndex + PAGE_SIZE, rows.length);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="table-wrap admin-filings-table-wrap">
      <div className="table-scroll">
        <table className="filings-table view-only admin-filings-table">
          <thead>
            <tr>
              <th>Entity Name</th>
              <th>Sector</th>
              <th>Period</th>
              <th>Status</th>
              <th>Overall Risk</th>
              <th>Prepared By</th>
              <th>Assigned Approver</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={7}>No filings yet.</td>
              </tr>
            ) : (
              visibleRows.map((f) => (
                <tr key={f.id}>
                  <td>{f.entity}</td>

                  {/* <td className="admin-sector-cell">
                    {getSector(f)}
                  </td> */}
                    <td>{f.sector || "-"}</td>


                  <td>{f.period}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        STATUS_CLASS[f.reviewStage] || ""
                      }`}
                    >
                      {f.reviewStage}
                    </span>
                  </td>

                  {/* <td className="risk-inline"> */}
 <td>
                    ML: <b>{f.ml}</b> · TF: <b>{f.tf}</b>
                  </td>

                  <td>{f.preparer}</td>

                  <td>
                    {f.assignedApprover || (
                      <span className="unassigned-pill">
                        Unassigned
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && (
        <div className="filings-pagination">
          <div className="filings-pagination-info">
            Showing <b>{firstItem}</b> – <b>{lastItem}</b> of{" "}
            <b>{rows.length}</b>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  type="button"
                  key={page}
                  className={`pagination-btn ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}