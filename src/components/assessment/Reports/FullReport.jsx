import { useApp } from "../../../context/AppContext";
import { dimCalc, overallCalc } from "../../../utils/risk";
import Gauge from "../../../components/assessment/Gauge";
import Badge from "../../../components/common/Badge";
import { DIMS } from "../../../data/riskData";
import "./Reports.css";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FullReport() {
  const {
    dims,
    company,
    from,
    to,

    // These are used by the report when available in AppContext.
    // Defaults prevent the report from crashing if they are not yet
    // part of the context.
    sector = "",
    license = "",
    nra = "",
    conclusion = "",
  } = useApp();

  const O = overallCalc(DIMS.map((d) => dims[d.id]));

  /*
   * Same logic as the original HTML:
   *
   * missingRatings:
   *   ML or TF cannot produce an EV because Impact/Probability
   *   has not been provided.
   *
   * missingObs:
   *   one or more of the three comment boxes is empty.
   */
  const missingRatings = [];
  const missingObs = [];

  DIMS.forEach((d) => {
    dims[d.id].q.forEach((q, i) => {
      const id = d.id + (i + 1);

      const mlComplete =
        q.mlImp != null &&
        q.mlProb != null;

      const tfComplete =
        q.tfImp != null &&
        q.tfProb != null;

      if (!mlComplete || !tfComplete) {
        missingRatings.push(id);
      }

      if (!q.inherent || !q.obs || !q.reco) {
        missingObs.push(id);
      }
    });
  });

  return (
    <div className="card">
      {/* =========================================================
          REPORT HEADER
      ========================================================== */}

      <div className="eyebrow">Final output</div>

      <h2>Business Risk Assessment Report</h2>

      <div className="sub">
        {company || "-"} · Period {formatDate(from)} to {formatDate(to)}
      </div>

      {/* =========================================================
          REPORT META
      ========================================================== */}

      <div
        className="rep-meta"
        style={{
          display: "flex",
          gap: 22,
          flexWrap: "wrap",
          margin: "8px 0 2px",
          fontSize: 12.5,
          color: "var(--muted)",
        }}
      >
        <span>
          <b style={{ color: "var(--ink)" }}>Sector:</b>{" "}
          {sector || "-"}
        </span>

        <span>
          <b style={{ color: "var(--ink)" }}>License:</b>{" "}
          {license || "-"}
        </span>
      </div>

      {/* =========================================================
          NATIONAL RISK ASSESSMENT
      ========================================================== */}

      <div style={{ margin: "10px 0 4px" }}>
        <h4
          style={{
            fontSize: 12.5,
            marginBottom: 4,
          }}
        >
          National Risk Assessment
        </h4>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {nra || (
            <i style={{ color: "var(--muted)" }}>
              Not provided
            </i>
          )}
        </p>
      </div>

      {/* =========================================================
          WARNINGS
      ========================================================== */}

      {missingRatings.length > 0 && (
        <div className="warn">
          ⚠ Unrated ML/TF entries:{" "}
          {missingRatings.join(", ")} - treated as 0.
        </div>
      )}

      {missingObs.length > 0 && (
        <div className="warn">
          ⚠ Comment boxes incomplete for:{" "}
          {missingObs.join(", ")} - required before submission.
        </div>
      )}

      {/* =========================================================
          OVERALL RISK SUMMARY
      ========================================================== */}

      <div className="rep-summary">
        {/* ---------------- ML ---------------- */}

        <div className="rep-card mlc">
          <div className="lab">Money Laundering</div>

          <Gauge
            value={O.mlTotal}
            compact
          />

          <Badge value={O.mlTotal} />

          <div className="formula">
            ΣEV {O.mlEV} ÷ 25, rounded down
          </div>
        </div>

        {/* ---------------- TF ---------------- */}

        <div className="rep-card tfc">
          <div className="lab">Terrorism Financing</div>

          <Gauge
            value={O.tfTotal}
            compact
          />

          <Badge value={O.tfTotal} />

          <div className="formula">
            ΣEV {O.tfEV} ÷ 25, rounded down
          </div>
        </div>

        {/* ---------------- OVERALL ---------------- */}

        <div className="rep-card">
          <div className="lab">Overall Entity Risk</div>

          <Gauge
            value={O.overall}
            compact
          />

          <Badge value={O.overall} />

          <div className="formula">
            (ML {O.mlTotal} × 90%) + (TF {O.tfTotal} × 10%)
          </div>
        </div>
      </div>

      {/* =========================================================
          PER-DIMENSION SUMMARY
      ========================================================== */}

      <h2
        style={{
          fontSize: 15,
          marginTop: 20,
        }}
      >
        Per-dimension summary
      </h2>

      <table className="rep">
        <thead>
          <tr>
            <th>Dimension</th>
            <th className="r">ML ΣEV</th>
            <th className="r">ML level</th>
            <th className="r">TF ΣEV</th>
            <th className="r">TF level</th>
          </tr>
        </thead>

        <tbody>
          {DIMS.map((d) => {
            const c = dimCalc(dims[d.id]);

            return (
              <tr key={d.id}>
                <td>
                  <b>{d.id}.</b> {d.name}
                </td>

                <td className="r num">
                  {c.mlEV}
                </td>

                <td className="r">
                  <Badge value={c.mlAgg} />
                </td>

                <td className="r num">
                  {c.tfEV}
                </td>

                <td className="r">
                  <Badge value={c.tfAgg} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* =========================================================
          PER-QUESTION COMMENTS
      ========================================================== */}

      <h2
        style={{
          fontSize: 15,
          marginTop: 22,
        }}
      >
        Per-question comments
      </h2>

      {DIMS.map((d) => (
        <div key={d.id}>
          <h3
            style={{
              fontSize: 13,
              margin: "14px 0 6px",
              color: "var(--brand)",
            }}
          >
            {d.id}. {d.name}
          </h3>

          {dims[d.id].q.map((q, qi) => {
            const mlEV =
              q.mlImp != null && q.mlProb != null
                ? q.mlImp * q.mlProb
                : null;

            const tfEV =
              q.tfImp != null && q.tfProb != null
                ? q.tfImp * q.tfProb
                : null;

            return (
              <div
                className="obs-report"
                key={`${d.id}-${qi}`}
                style={{border: "none"}}
              >
                {/* Question */}

                <h4
                  style={{
                    fontSize: 12.5,
                    marginBottom: 7,
                  }}
                >
                  {d.id}
                  {qi + 1} - {d.qs[qi]}

                  <span
                    className="num"
                    style={{
                      color: "var(--muted)",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    · ML EV {mlEV ?? "-"} · TF EV{" "}
                    {tfEV ?? "-"}
                  </span>
                </h4>

                {/* 1 */}

                <h4>
                  1 · Inherent Risk Description
                </h4>

                <p>
                  {q.inherent || (
                    <i
                      style={{
                        color: "var(--muted)",
                      }}
                    >
                      Not provided
                    </i>
                  )}
                </p>

                {/* 2 */}

                <h4>
                  2 · Observation and Implication
                </h4>

                <p>
                  {q.obs || (
                    <i
                      style={{
                        color: "var(--muted)",
                      }}
                    >
                      Not provided
                    </i>
                  )}
                </p>

                {/* 3 */}

                <h4>
                  3 · Recommendation
                </h4>

                <p>
                  {q.reco || (
                    <i
                      style={{
                        color: "var(--muted)",
                      }}
                    >
                      Not provided
                    </i>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      ))}

      {/* =========================================================
          CONCLUSION
      ========================================================== */}

      <div
        style={{
          marginTop: 22,
        }}
      >
        <h2
          style={{
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          Conclusion
        </h2>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {conclusion || (
            <i
              style={{
                color: "var(--muted)",
              }}
            >
              Not provided
            </i>
          )}
        </p>
      </div>
    </div>
  );
}

export default FullReport;