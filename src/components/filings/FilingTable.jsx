import React, { useEffect, useMemo, useState } from "react";
import StatusBadge from "../common/StatusBadge";

export default function FilingTable({ filings, onSelect }) {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const totalPages = Math.ceil(
    filings.length / rowsPerPage
  );

  // Reset pagination when filters/data change
  useEffect(() => {
    setCurrentPage(1);
  }, [filings]);

  // Records for current page
  const currentFilings = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;

    return filings.slice(
      startIndex,
      startIndex + rowsPerPage
    );
  }, [filings, currentPage]);

  return (
    <div className="filing-table-container">
      <div className="table-wrap">
        <div className="table-scroll">
          <table className="filings-table">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Period</th>
                <th>Status</th>
                <th>Overall Risk</th>
                <th>Last Updated</th>
                <th>Prepared By</th>
              </tr>
            </thead>

            <tbody>
              {currentFilings.length ? (
                currentFilings.map((f) => (
                  <tr
                    key={f.id}
                    onClick={() => onSelect(f)}
                  >
                    <td>
                      <b>{f.entity}</b>
                    </td>

                    <td>{f.period}</td>

                    <td>
                      <StatusBadge
                        status={f.reviewStage}
                      />
                    </td>

                    <td className="risk-inline">
                      ML: <b>{f.ml}</b> · TF:{" "}
                      <b>{f.tf}</b>
                    </td>

                    <td>{f.updated}</td>

                    <td>{f.preparer}</td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan="6">
                    No filings match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="filings-pagination">
          <div className="pagination-info">
            Showing{" "}
            <b>
              {(currentPage - 1) * rowsPerPage + 1}
            </b>{" "}
            -{" "}
            <b>
              {Math.min(
                currentPage * rowsPerPage,
                filings.length
              )}
            </b>{" "}
            of <b>{filings.length}</b>
          </div>

          <div className="pagination-controls">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  currentPage === page ? "active" : ""
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}