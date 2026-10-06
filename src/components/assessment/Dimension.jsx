import { Expand, Info, Check } from "lucide-react";
import { DIMS } from "../../data/riskData";
import { dimCalc, isQComplete, overallCalc, band } from "../../utils/risk";
import { useApp } from "../../context/AppContext";
import QuestionCard from "./QuestionCard";
import Gauge from "./Gauge";

function Navigator({ dim }) {
  const { dims, updateQ } = useApp();
  const st = dims[dim.id];

  return (
    <nav className="l3-nav-col">
      {dim.qs.map((_, qi) => {
        const active = !st.l2Expanded && st.activeQ === qi;

        return (
          <button
            key={qi}
            className={`l3-nav-item ${active ? "active" : ""}`}
            onClick={() =>
              updateQ(dim.id, qi, {
                activeQ: qi,
                l2Expanded: false,
              })
            }
          >
            {dim.id}
            {qi + 1}

            {isQComplete(st.q[qi]) && <Check size={12} />}
          </button>
        );
      })}
    </nav>
  );
}

export default function Dimension({ dim, errors = {} }) {
  const { dims, updateQ } = useApp();

  const st = dims[dim.id];
  const c = dimCalc(st);

  // Check whether all questions are currently open
  const allExpanded = dim.qs.every((_, qi) => st.q[qi].open);

  const toggleAll = () => {
    // If all are open -> collapse all
    // Otherwise -> open all
    const shouldOpen = !allExpanded;

    dim.qs.forEach((_, qi) => {
      updateQ(dim.id, qi, {
        open: shouldOpen,
      });
    });
  };

  return (
    <section className="card">
      <div className="dim-title-row">
        <div>
          <div className="eyebrow dim">
            Dimension {dim.id} ·{" "}
            <span className="num">
              ML {c.mlDone}/{c.n} · TF {c.tfDone}/{c.n}
            </span>
          </div>

          <h2>
            {dim.id}. {dim.name}{" "}
            <span className="info-tip">
              <Info size={13} />

              <span className="tip">
                Expand a question to rate ML and TF separately (Impact ×
                Probability = EV 1–25) and complete the three comment boxes.
              </span>
            </span>
          </h2>
        </div>

        <button className="btn-expand" onClick={toggleAll}>
          <Expand size={15} />
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div>
        {dim.qs.map((_, i) => (
          <QuestionCard
            key={i}
            dim={dim}
            qi={i}
            errors={errors}
          />
        ))}
      </div>
    </section>
  );
}

export function LiveRail() {
  const { dims } = useApp();

  const O = overallCalc(
    DIMS.map((d) => dims[d.id])
  );

  const overallBand = band(O.overall);

  return (
    <aside className="rail">
      <h3>Live summary</h3>

      <div className="rail-gauges">
        <Gauge
          value={O.mlTotal}
          title="ML"
        />

        <Gauge
          value={O.tfTotal}
          title="TF"
        />
      </div>

      <div className="rail-overall">
        <span>Overall Entity Risk</span>

        <span className={`badge ${overallBand.c}`}>
          {O.overall.toFixed(1)} · {overallBand.t}
        </span>
      </div>

      <div>
        {DIMS.map((d) => {
          const c = dimCalc(dims[d.id]);

          const mlBand = band(c.mlAgg);
          const tfBand = band(c.tfAgg);

          return (
            <div
              className="dim"
              key={d.id}
            >
              <div className="name">
                <span className="dname">
                  {d.id}. {d.name}
                </span>

                <span className="num">
                  {c.mlDone + c.tfDone}/{c.n * 2}
                </span>
              </div>

              <div className="mini">
                <span
                  className="dot"
                  style={{
                    background: mlBand.v,
                  }}
                />

                <span className="num">
                  ML {c.mlEV} · {mlBand.t}
                </span>

                <span
                  className="dot"
                  style={{
                    background: tfBand.v,
                    marginLeft: 6,
                  }}
                />

                <span className="num">
                  TF {c.tfEV} · {tfBand.t}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}