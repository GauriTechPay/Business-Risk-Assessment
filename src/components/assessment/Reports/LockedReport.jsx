
import { useApp } from "../../../context/AppContext";
import "./Reports.css";


function LockedReport() {
  const { status, setStatus, notify } = useApp();

  const pending = status === "pending";

  const simulateApproval = () => {
    setStatus("approved");
    notify("Assessment approved (demo).", "success");
  };

  return (
    <div
      className="card report-locked"
      style={{ padding:'56px 24px'}}
    >
      <div className="eyebrow">
        Final output
      </div>

      <h2>Report Locked</h2>

      <div className="sub report-locked-sub">
        {pending
          ? "This assessment has been submitted and is awaiting approval. The full report will be available here once an approver has signed off."
          : "Complete the Conclusion step and submit the assessment for approval to generate this report."}
      </div>

      {pending && (
        <button
          className="btn-ghost"
          onClick={simulateApproval}
        >
          Simulate approval (demo)
        </button>
      )}
    </div>
  );
}
export default LockedReport;