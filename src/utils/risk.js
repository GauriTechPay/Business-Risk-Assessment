import { BAND_META } from "../data/riskData";
// export const bandKey = (v) =>
//   v < 4
//     ? "low"
//     : v < 8
//       ? "lowmed"
//       : v < 11
//         ? "med"
//         : v < 20
//           ? "medhigh"
//           : "high";



// export const band = (v) => {
//   const k = bandKey(Number(v) || 0);
//   return { key: k, ...BAND_META[k] };
// };
export function bandKey(v) {
  if (v < 4) return "low";
  if (v < 8) return "lowmed";
  if (v < 11) return "med";
  if (v < 20) return "medhigh";
  return "high";
}

// export function band(v) {
//   const key = bandKey(v);

//   return {
//     t: BAND_META[key].t,
//     c: BAND_META[key].c,
//     v: BAND_META[key].v,
//   };
// }

export function band(v) {
  if (v == null || Number.isNaN(Number(v))) {
    return {
      t: "-",
      c: "b-none",
      v: "var(--muted)",
    };
  }

  const key = bandKey(Number(v));

  return {
    t: BAND_META[key].t,
    c: BAND_META[key].c,
    v: BAND_META[key].v,
  };
}

export const qEV = (q, side) =>
  q?.[`${side}Imp`] != null && q?.[`${side}Prob`] != null
    ? q[`${side}Imp`] * q[`${side}Prob`]
    : null;
export function dimCalc(dim) {
  let mlEV = 0,
    tfEV = 0,
    mlDone = 0,
    tfDone = 0;
  dim.q.forEach((q) => {
    const m = qEV(q, "ml"),
      t = qEV(q, "tf");
    if (m != null) {
      mlEV += m;
      mlDone++;
    }
    if (t != null) {
      tfEV += t;
      tfDone++;
    }
  });
  const n = dim.q.length;
  return {
    mlEV,
    tfEV,
    mlAgg: Math.floor(mlEV / n),
    tfAgg: Math.floor(tfEV / n),
    mlDone,
    tfDone,
    n,
  };
}
export function overallCalc(dims) {
  let mlEV = 0,
    tfEV = 0;
  dims.forEach((d) => {
    const c = dimCalc(d);
    mlEV += c.mlEV;
    tfEV += c.tfEV;
  });
  const mlTotal = Math.floor(mlEV / 25),
    tfTotal = Math.floor(tfEV / 25);
  return {
    mlEV,
    tfEV,
    mlTotal,
    tfTotal,
    overall: mlTotal * 0.9 + tfTotal * 0.1,
  };
}
export const isQComplete = (q) =>
  qEV(q, "ml") != null &&
  qEV(q, "tf") != null &&
  !!q.inherent &&
  !!q.obs &&
  !!q.reco;
export const fmtDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};
