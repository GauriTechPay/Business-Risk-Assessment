export const IMPACT = [
  [5, "Catastrophic"],
  [4, "Major"],
  [3, "Serious"],
  [2, "Marginal"],
  [1, "Negligible"],
];
export const PROB = [
  [5, "Frequent"],
  [4, "Certain"],
  [3, "Occasional"],
  [2, "Remote"],
  [1, "Unlikely"],
];
export const DIMS = [
  {
    id: "A",
    name: "Nature, Scale and Complexity of Activities",
    qs: [
      "What are the services provided by the business?",
      "To what extent can the services offered by the Company be used to facilitate ML/TF?",
      "To what extent does senior management involve in the determination of risk policies?",
      "Some organisational factors may increase the Company's exposure to ML/TF risks - how are these mitigated?",
      "Does the organisation structure comprise of several layers? To what extent?",
    ],
  },
  {
    id: "B",
    name: "Products and Services Provided",
    qs: [
      "The vulnerabilities of the services offered and how these could be exploited for ML/TF?",
      "To what extent does the Company allow third party payments?",
      "Are the products, services and structure of particular or high-risk nature?",
      "To what extent does the organisation accept clients without face-to-face contact?",
      "What is your reliance and process in place for introduced business?",
    ],
  },
  {
    id: "C",
    name: "Persons and Manner of Service Delivery",
    qs: [
      "Does the company's client portfolio include politically exposed persons (PEP)?",
      "Are CDD documents obtained on high-risk clients prior to processing?",
      "Are there policies and procedures in place to ensure CDD procedures are followed and effective?",
      "Does senior management approve all high-risk relationships and sanctions breaches?",
      "Are the relevant proof of source of funds / source of wealth and beneficial ownership verified?",
    ],
  },
  {
    id: "D",
    name: "Location of Customer Activities",
    qs: [
      "Does the organisation client portfolio include clients who are subject to international sanctions?",
      "Does the customer have any connection with jurisdictions considered high-risk or non-cooperative?",
    ],
  },
  {
    id: "E",
    name: "Third Party Reliance (CDD Elements)",
    qs: [
      "Does the Company rely on third parties to perform customer due diligence?",
      "Do you consider who these third parties are, including any reputational risk they pose?",
      "Do these third parties come from high-risk jurisdictions?",
    ],
  },
  {
    id: "F",
    name: "Technological Developments",
    qs: [
      "Does the organisation use new or developing technologies for both new and existing services?",
      "Does the Company make use of digital information storage including cloud?",
      "Does the Company use electronic verification of documentation?",
      "Does the Company use data and transaction screening systems?",
      "Does the Company use virtual or digital currencies?",
    ],
  },
];
export const THEMES = [
  {
    name: "Warm Orange",
    text: "#0c0704",
    background: "#fcf7f3",
    primary: "#d27e40",
    secondary: "#e9b187",
  },
  {
    name: "DaisyUI Corporate",
    text: "#313044",
    background: "#FFFFFF",
    primary: "#1684A8",
    secondary: "#77787E",
  },
  {
    name: "DaisyUI Lofi",
    text: "#000000",
    background: "#FFFFFF",
    primary: "#292929",
    secondary: "#373333",
  },
];
export const DEFAULT_THEME = {
  text: "#1e293b",
  background: "#f1f5f9",
  primary: "#1e3a5f",
  secondary: "#1e3a5f",
  sidebar: "#1e3a5f",
};
export const BAND_META = {
  low: {
    t: "Low",
    c: "b-low",
    v: "var(--low)",
  },

  lowmed: {
    t: "Low-Medium",
    c: "b-lowmed",
    v: "var(--lowmed)",
  },

  med: {
    t: "Medium",
    c: "b-med",
    v: "var(--med)",
  },

  medhigh: {
    t: "Medium-High",
    c: "b-medhigh",
    v: "var(--medhigh)",
  },

  high: {
    t: "High",
    c: "b-high",
    v: "var(--high)",
  },
};
export const STEP_NAMES = [
  "Setup",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "Conclusion",
  "Report",
  "Guidance",
  //   "Configure",
];
export const STEP_TITLES = [
  "Company Setup",
  "Dimension A",
  "Dimension B",
  "Dimension C",
  "Dimension D",
  "Dimension E",
  "Dimension F",
  "Conclusion",
  "Report",
  "Guidance",
  // "Configure",
];
export const ROLE_LABELS = {
  preparer: "Compliance Preparer",
  approver: "Compliance Approver",
  admin: "Administrator",
};
export const PAGE_META = {
  dashboard: {
    preparer: [
      "Dashboard",
      "Overview of assessment activity and recent filings",
    ],
    approver: [
      "Dashboard",
      "Overview of items awaiting your review and recent decisions",
    ],
    admin: [
      "Dashboard",
      "Overview of filings, assignments, and admin activity",
    ],
  },
  filings: {
    preparer: [
      "Filings",
      "Search and review submitted and in-progress assessments",
    ],
    approver: [
      "Review Queue",
      "Assessments submitted for your review and decision",
    ],
  },
};
export const NOTIFICATIONS = {
  preparer: [
    {
      type: "changes",
      title: "Changes requested",
      desc: "Northbridge Holdings assessment sent back - Dimension C needs revision.",
      time: "1 hour ago",
    },
    {
      type: "approved",
      title: "Assessment approved",
      desc: "Q2 Riverstone Capital assessment was approved by D. Yusuf.",
      time: "Yesterday",
    },
  ],
  approver: [
    {
      type: "pending",
      title: "New submission ready for review",
      desc: "Halcyon Freight Ltd. was submitted for approval by K. Alvarez.",
      time: "2 days ago",
    },
    {
      type: "pending",
      title: "New submission ready for review",
      desc: "Corvus Family Office was submitted for approval by K. Alvarez.",
      time: "6 days ago",
    },
    {
      type: "reminder",
      title: "Review reminder",
      desc: "Corvus Family Office has been awaiting your review for 6 days.",
      time: "6 days ago",
    },
  ],
  admin: [
    {
      type: "pending",
      title: "New preparer joined the platform",
      desc: "T. Okafor has joined BRA - assign them an approver so their filings have somewhere to go.",
      time: "2 hours ago",
    },
    {
      type: "pending",
      title: "New preparer joined the platform",
      desc: "N. Osei has joined BRA - assign them an approver so their filings have somewhere to go.",
      time: "1 day ago",
    },
    {
      type: "approved",
      title: "Preparer assigned",
      desc: "K. Alvarez was assigned to D. Yusuf. Their filings now route to D. Yusuf automatically.",
      time: "6 days ago",
    },
  ],
};
export const RECENT_ACTIVITY = [
  {
    filingStatus: "approved",
    html: (
      <>
        <b>Riverstone Capital</b> - Q2 Assessment approved by D. Yusuf
      </>
    ),
    time: "Yesterday, 4:12 PM",
  },
  {
    filingStatus: "changes",
    html: (
      <>
        <b>Northbridge Holdings</b> - sent back for revision on Dimension C
      </>
    ),
    time: "1 hour ago",
  },
  {
    filingStatus: "pending",
    html: (
      <>
        <b>Halcyon Freight Ltd.</b> - submitted for approval
      </>
    ),
    time: "2 days ago",
  },
  {
    filingStatus: "draft",
    html: (
      <>
        <b>Solace Wealth Partners</b> - Draft created
      </>
    ),
    time: "4 days ago",
  },
];
export const APPROVER_ACTIVITY = [
  {
    filingStatus: "approved",
    html: (
      <>
        You approved <b>Riverstone Capital</b> - Q2 Assessment
      </>
    ),
    time: "Yesterday, 4:12 PM",
  },
  {
    filingStatus: "changes",
    html: (
      <>
        You requested changes on <b>Northbridge Holdings</b> - Dimension C
      </>
    ),
    time: "1 hour ago",
  },
  {
    filingStatus: "rejected",
    html: (
      <>
        You rejected <b>Blackwood & Partners Fiduciary</b> - FY2025 filing
      </>
    ),
    time: "5 weeks ago",
  },
  {
    filingStatus: "approved",
    html: (
      <>
        You approved <b>Westfield Corporate Trustees</b> - FY2025 filing
      </>
    ),
    time: "3 weeks ago",
  },
  {
    filingStatus: "approved",
    html: (
      <>
        You approved <b>Ashcombe Global Markets</b> - FY2025 filing
      </>
    ),
    time: "2 months ago",
  },
];
export const DRAFTS = [
  {
    dim: "Dimension C of F",
    entity: "Northbridge Holdings Ltd. - FY2026 Assessment",
    answered: 9,
    total: 18,
  },
  {
    dim: "Dimension A of F",
    entity: "Solace Wealth Partners - FY2026 Assessment",
    answered: 4,
    total: 34,
  },
  {
    dim: "Dimension E of F",
    entity: "Meridian Trust Services - FY2026 Assessment",
    answered: 27,
    total: 34,
  },
  {
    dim: "Dimension B of F",
    entity: "Riverstone Capital - Q2 Assessment",
    answered: 12,
    total: 34,
  },
  {
    dim: "Dimension D of F",
    entity: "Halcyon Freight Ltd. - FY2026 Assessment",
    answered: 6,
    total: 22,
  },
];
export const STAT_CARDS = [
  { label: "In Progress", value: 4, sub: "Draft assessments" },
  { label: "Pending Approval", value: 3, sub: "Awaiting a reviewer" },
  { label: "Approved", value: 37, sub: "This calendar year" },
  { label: "Overdue", value: 2, sub: "Past their review date" },
];
const audit = (items) => items;
export const FILINGS = [
  {
    id: "f1",
    entity: "Riverstone Capital",
    period: "Q2 2026",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Medium",
    tf: "Low",
    overall: "Medium",
    updated: "Yesterday, 4:12 PM",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "done",
        title: "Approved by D. Yusuf",
        note: "Controls environment adequately mitigates the correspondent banking exposure noted in B3.",
        time: "Yesterday, 4:12 PM",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "Yesterday, 10:03 AM",
      },
      { status: "done", title: "Draft created", time: "3 days ago" },
    ]),
  },
  {
    id: "f2",
    entity: "Northbridge Holdings Ltd.",
    period: "FY2026",
    status: "Under Review",
    reviewStage: "Changes Requested",
    ml: "Medium-High",
    tf: "Medium",
    overall: "Medium-High",
    updated: "1 hour ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "stuck",
        title: "Changes requested by D. Yusuf",
        note: "Dimension C needs revision - CDD evidence for high-risk relationships is incomplete.",
        time: "1 hour ago",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "2 days ago",
      },
      { status: "done", title: "Draft created", time: "6 days ago" },
    ]),
  },
  {
    id: "f3",
    entity: "Halcyon Freight Ltd.",
    period: "FY2026",
    status: "Under Review",
    reviewStage: "Pending Review",
    ml: "Medium",
    tf: "Low-Medium",
    overall: "Medium",
    updated: "2 days ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "stuck",
        title: "Submitted for approval by K. Alvarez",
        time: "2 days ago",
      },
      { status: "done", title: "Draft created", time: "9 days ago" },
    ]),
  },
  {
    id: "f4",
    entity: "Solace Wealth Partners",
    period: "FY2026",
    status: "Draft",
    reviewStage: "Draft",
    ml: "-",
    tf: "-",
    overall: "-",
    updated: "4 days ago",
    preparer: "K. Alvarez",
    audit: audit([
      { status: "untouched", title: "Draft created", time: "4 days ago" },
    ]),
  },
  {
    id: "f5",
    entity: "Meridian Trust Services",
    period: "FY2026",
    status: "Draft",
    reviewStage: "Draft",
    ml: "-",
    tf: "-",
    overall: "-",
    updated: "Yesterday",
    preparer: "K. Alvarez",
    audit: audit([
      { status: "untouched", title: "Draft created", time: "Yesterday" },
    ]),
  },
  {
    id: "f6",
    entity: "Westfield Corporate Trustees",
    period: "FY2025",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Low-Medium",
    tf: "Low",
    overall: "Low-Medium",
    updated: "3 weeks ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "done",
        title: "Approved by D. Yusuf",
        note: "No material findings. Sign-off granted for FY2025 filing.",
        time: "3 weeks ago",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "3 weeks ago",
      },
      { status: "done", title: "Draft created", time: "5 weeks ago" },
    ]),
  },
  {
    id: "f7",
    entity: "Blackwood & Partners Fiduciary",
    period: "FY2025",
    status: "Rejected",
    reviewStage: "Rejected",
    ml: "High",
    tf: "Medium-High",
    overall: "High",
    updated: "5 weeks ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "rejected",
        title: "Rejected by D. Yusuf",
        note: "Sanctions-exposure rationale in Dimension D is insufficient; resubmission required as a new filing.",
        time: "5 weeks ago",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "6 weeks ago",
      },
      { status: "done", title: "Draft created", time: "8 weeks ago" },
    ]),
  },
  {
    id: "f8",
    entity: "Ashcombe Global Markets",
    period: "FY2025",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Medium",
    tf: "Low-Medium",
    overall: "Medium",
    updated: "2 months ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "done",
        title: "Approved by D. Yusuf",
        note: "Risk rating consistent with prior period. No escalation required.",
        time: "2 months ago",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "2 months ago",
      },
      { status: "done", title: "Draft created", time: "2 months ago" },
    ]),
  },
  {
    id: "f9",
    entity: "Ironbridge Settlement Services",
    period: "FY2025",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Low",
    tf: "Low",
    overall: "Low",
    updated: "3 months ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "done",
        title: "Approved by D. Yusuf",
        note: "Low-risk profile confirmed across all six dimensions.",
        time: "3 months ago",
      },
      {
        status: "done",
        title: "Submitted for approval by K. Alvarez",
        time: "3 months ago",
      },
      { status: "done", title: "Draft created", time: "3 months ago" },
    ]),
  },
  {
    id: "f10",
    entity: "Corvus Family Office",
    period: "FY2026",
    status: "Under Review",
    reviewStage: "Pending Review",
    ml: "Medium-High",
    tf: "Low-Medium",
    overall: "Medium",
    updated: "6 days ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "stuck",
        title: "Submitted for approval by K. Alvarez",
        time: "6 days ago",
      },
      { status: "done", title: "Draft created", time: "11 days ago" },
    ]),
  },
  {
    id: "f11",
    entity: "Thornfield Asset Management",
    period: "FY2026",
    status: "Under Review",
    reviewStage: "Pending Review",
    ml: "Medium",
    tf: "Medium",
    overall: "Medium",
    updated: "8 hours ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "stuck",
        title: "Submitted for approval by K. Alvarez",
        time: "8 hours ago",
      },
      { status: "done", title: "Draft created", time: "5 days ago" },
    ]),
  },
  {
    id: "f12",
    entity: "Pelican Bay Trustees",
    period: "FY2025",
    status: "Under Review",
    reviewStage: "Pending Review",
    ml: "Low-Medium",
    tf: "Low",
    overall: "Low-Medium",
    updated: "3 days ago",
    preparer: "K. Alvarez",
    audit: audit([
      {
        status: "stuck",
        title: "Submitted for approval by K. Alvarez",
        time: "3 days ago",
      },
      { status: "done", title: "Draft created", time: "10 days ago" },
    ]),
  },
  {
    id: "f13",
    entity: "Alderney Maritime Holdings",
    period: "FY2025",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Low-Medium",
    tf: "Low",
    overall: "Low-Medium",
    updated: "1 month ago",
    preparer: "A. Whitfield",
    audit: audit([
      {
        status: "done",
        title: "Approved by S. Ong",
        note: "Risk profile consistent with prior filings. No escalation required.",
        time: "1 month ago",
      },
      {
        status: "done",
        title: "Submitted for approval by A. Whitfield",
        time: "1 month ago",
      },
      { status: "done", title: "Draft created", time: "1 month ago" },
    ]),
  },
  {
    id: "f14",
    entity: "Cascade Maritime Trust",
    period: "FY2026",
    status: "Under Review",
    reviewStage: "Pending Review",
    ml: "Medium",
    tf: "Low-Medium",
    overall: "Medium",
    updated: "4 hours ago",
    preparer: "R. Mensah",
    audit: audit([
      {
        status: "stuck",
        title: "Submitted for approval by R. Mensah",
        time: "4 hours ago",
      },
      { status: "done", title: "Draft created", time: "6 days ago" },
    ]),
  },
  {
    id: "f15",
    entity: "Birchwood Family Trust",
    period: "FY2025",
    status: "Approved",
    reviewStage: "Approved",
    ml: "Low",
    tf: "Low",
    overall: "Low",
    updated: "2 months ago",
    preparer: "L. Dumitrescu",
    audit: audit([
      {
        status: "done",
        title: "Approved by D. Yusuf",
        note: "Low-risk profile confirmed across all six dimensions.",
        time: "2 months ago",
      },
      {
        status: "done",
        title: "Submitted for approval by L. Dumitrescu",
        time: "2 months ago",
      },
      { status: "done", title: "Draft created", time: "2 months ago" },
    ]),
  },
];
export const ADMIN_APPROVERS = ["D. Yusuf", "M. Ferreira", "S. Ong"];
export const PREPARERS = [
  { id: "p1", name: "K. Alvarez", assignedApprover: "D. Yusuf" },
  { id: "p2", name: "R. Mensah", assignedApprover: "M. Ferreira" },
  {
    id: "p3",
    name: "T. Okafor",
    assignedApprover: null,
    isNew: true,
    joined: "2 hours ago",
  },
  { id: "p4", name: "A. Whitfield", assignedApprover: "S. Ong" },
  { id: "p5", name: "L. Dumitrescu", assignedApprover: "D. Yusuf" },
  {
    id: "p6",
    name: "N. Osei",
    assignedApprover: null,
    isNew: true,
    joined: "1 day ago",
  },
];
export const ADMIN_GUIDANCE = {
  intro:
    "Every question is rated twice - once for Money Laundering, once for Terrorism Financing - each with its own Impact (1–5) × Probability (1–5) = EV (1–25), plus three comment boxes per question (Inherent Risk Description · Observation and Implication · Recommendation).",
};

export const ADMIN_MAPPING = [
  { key: "low", label: "Low", min: 0, max: 3.9 },
  { key: "lowmed", label: "Low-Medium", min: 4, max: 7.9 },
  { key: "med", label: "Medium", min: 8, max: 10.9 },
  { key: "medhigh", label: "Medium-High", min: 11, max: 19.9 },
  { key: "high", label: "High", min: 20, max: 25 },
];

export const SECTOR_OPTIONS = [
  "Banking Sector",
  "Insurance Sector",
  "Securities Sector",
  "Other Financial Institutions (OFIs)",
  "Trust and Company Service Provider (TCSP) Sector",
  "Designated Non-Financial Businesses and Professions (DNFBPs)",
];
export const LICENSE_OPTIONS = [
  "Global Business License",
  "Investment Dealer License",
  "Money Changer / Foreign Exchange Dealer License",
  "Payment Intermediary Services License",
  "Management License",
];
