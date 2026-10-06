import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  DIMS,
  DEFAULT_THEME,
  FILINGS,
  PREPARERS,
} from "../data/riskData";

const AppContext = createContext(null);

const REQUIRED_QUESTION_FIELDS = [
  "mlImp",
  "mlProb",
  "tfImp",
  "tfProb",
  "inherent",
  "obs",
  "reco",
];

const isFilled = (value) =>
  value !== null &&
  value !== undefined &&
  value !== "";

/* ---------------------------------------------------------
   Initial assessment structure
--------------------------------------------------------- */

const makeAssessment = () =>
  Object.fromEntries(
    DIMS.map((d) => [
      d.id,
      {
        activeQ: 0,
        l2Expanded: false,

        q: d.qs.map(() => ({
          mlImp: null,
          mlProb: null,
          tfImp: null,
          tfProb: null,

          inherent: "",
          obs: "",
          reco: "",

          open: false,
        })),
      },
    ]),
  );

/* ---------------------------------------------------------
   Provider
--------------------------------------------------------- */

export function AppProvider({ children }) {
  const [role, setRole] = useState("preparer"),
    [page, setPage] = useState("dashboard"),
    [step, setStep] = useState(0),
    [status, setStatus] = useState("draft"),
    [layout, setLayout] = useState("layout1"),
    [badgeStyle, setBadgeStyle] = useState("filled"),
    [sidebarCollapsed, setSidebarCollapsed] = useState(false),

    /* Assessment setup */
    [company, setCompany] = useState("Apex Global Capital Ltd"),
    [from, setFrom] = useState("2026-01-01"),
    [to, setTo] = useState("2026-12-31"),
    [sector, setSector] = useState("Banking Sector"),
    [license, setLicense] = useState("- Select license -"),
    [nra, setNra] = useState(
      "Reference or notes on the National Risk Assessment (NRA)...",
    ),
    [conclusion, setConclusion] = useState(""),

    [dims, setDims] = useState(makeAssessment),

    [preparers, setPreparers] = useState(
      PREPARERS.map((p) => ({ ...p })),
    ),

    /* -----------------------------------------------------
       Validation

       Example:

       {
         A: {
           0: {
             mlImp: true,
             mlProb: true,
             inherent: true
           }
         }
       }
    ----------------------------------------------------- */
    [validationErrors, setValidationErrors] = useState({}),

    /* -----------------------------------------------------
       UI State
    ----------------------------------------------------- */
    [toast, setToast] = useState(null),
    [notificationsOpen, setNotificationsOpen] = useState(false),
    [profileOpen, setProfileOpen] = useState(false),
    [drawerOpen, setDrawerOpen] = useState(false),
    [actionModal, setActionModal] = useState(null),

    /* Admin */
    [assignModal, setAssignModal] = useState(null),

    /* Approver */
    [reviewFilingId, setReviewFilingId] = useState(null);

  /* -------------------------------------------------------
     Theme / Layout
  ------------------------------------------------------- */

  const [theme, setTheme] = useState({
    ...DEFAULT_THEME,
    selected: "",
  });

  /* -------------------------------------------------------
     Filings & filters
  ------------------------------------------------------- */

  const [filings, setFilings] = useState(
    FILINGS.map((f) => ({
      ...f,
      audit: f.audit.map((a) => ({ ...a })),
    })),
  );

  const [search, setSearch] = useState("");
  const [filingsStatus, setFilingsStatus] = useState("All");
  const [selectedFilingId, setSelectedFilingId] = useState(null);

  /* -------------------------------------------------------
     Toast
  ------------------------------------------------------- */

  const notify = useCallback(
    (message, type = "success") => {
      setToast({
        message,
        type,
      });
    },
    [],
  );

  /* ---------------------------------------------------------
     Remove validation errors for fields that were corrected
  --------------------------------------------------------- */

  const clearQuestionFieldErrors = useCallback(
    (dimId, qi, patch) => {
      setValidationErrors((prev) => {
        const dimensionErrors = prev[dimId];

        if (!dimensionErrors) {
          return prev;
        }

        const questionErrors = dimensionErrors[qi];

        if (!questionErrors) {
          return prev;
        }

        const updatedQuestionErrors = {
          ...questionErrors,
        };

        let changed = false;

        Object.keys(patch).forEach((field) => {
          if (
            REQUIRED_QUESTION_FIELDS.includes(field) &&
            isFilled(patch[field]) &&
            updatedQuestionErrors[field]
          ) {
            delete updatedQuestionErrors[field];
            changed = true;
          }
        });

        if (!changed) {
          return prev;
        }

        const updatedDimensionErrors = {
          ...dimensionErrors,
        };

        if (Object.keys(updatedQuestionErrors).length === 0) {
          delete updatedDimensionErrors[qi];
        } else {
          updatedDimensionErrors[qi] = updatedQuestionErrors;
        }

        const updatedErrors = {
          ...prev,
        };

        if (Object.keys(updatedDimensionErrors).length === 0) {
          delete updatedErrors[dimId];
        } else {
          updatedErrors[dimId] = updatedDimensionErrors;
        }

        return updatedErrors;
      });
    },
    [],
  );

  /* ---------------------------------------------------------
     Update individual assessment question
  --------------------------------------------------------- */

  const updateQ = useCallback(
    (dimId, qi, patch) => {
      setDims((prev) => ({
        ...prev,

        [dimId]: {
          ...prev[dimId],

          q: prev[dimId].q.map((q, i) =>
            i === qi
              ? {
                  ...q,
                  ...patch,
                }
              : q,
          ),
        },
      }));

      /*
       * If this update fills a required field,
       * remove its validation error immediately.
       */
      clearQuestionFieldErrors(dimId, qi, patch);
    },
    [clearQuestionFieldErrors],
  );

  /* ---------------------------------------------------------
     Set validation errors

     Used by useAssessment when Continue / Submit validates.
  --------------------------------------------------------- */

  const setQuestionValidationErrors = useCallback(
    (errors) => {
      setValidationErrors(errors);
    },
    [],
  );

  /* ---------------------------------------------------------
     Clear all validation errors
  --------------------------------------------------------- */

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  /* ---------------------------------------------------------
     Navigation
  --------------------------------------------------------- */

  const navigate = useCallback((p) => {
    setPage(p);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, []);

  /* ---------------------------------------------------------
     Context value
  --------------------------------------------------------- */

  const value = useMemo(
    () => ({
      /* Role */
      role,
      setRole,

      /* Navigation */
      page,
      setPage,
      step,
      setStep,

      /* Assessment status */
      status,
      setStatus,

      /* Layout */
      layout,
      setLayout,
      badgeStyle,
      setBadgeStyle,
      sidebarCollapsed,
      setSidebarCollapsed,

      /* Assessment setup */
      company,
      setCompany,
      from,
      setFrom,
      to,
      setTo,
      sector,
      setSector,
      license,
      setLicense,
      nra,
      setNra,
      conclusion,
      setConclusion,

      /* Assessment dimensions */
      dims,
      setDims,
      updateQ,

      /* Validation */
      validationErrors,
      setQuestionValidationErrors,
      clearValidationErrors,

      /* Theme */
      theme,
      setTheme,

      /* Filings */
      filings,
      setFilings,
      search,
      setSearch,
      filingsStatus,
      setFilingsStatus,
      selectedFilingId,
      setSelectedFilingId,

      /* UI */
      toast,
      setToast,
      notify,

      notificationsOpen,
      setNotificationsOpen,

      profileOpen,
      setProfileOpen,

      drawerOpen,
      setDrawerOpen,

      actionModal,
      setActionModal,

      /* Admin */
      assignModal,
      setAssignModal,

      /* Approver */
      reviewFilingId,
      setReviewFilingId,

      /* Other */
      navigate,
      preparers,
      setPreparers,
    }),

    [
      role,
      page,
      step,
      status,
      layout,
      badgeStyle,
      sidebarCollapsed,

      company,
      from,
      to,
      sector,
      license,
      nra,
      conclusion,

      dims,
      validationErrors,

      theme,

      filings,
      search,
      filingsStatus,
      selectedFilingId,

      toast,
      notificationsOpen,
      profileOpen,
      drawerOpen,
      actionModal,
      assignModal,
      reviewFilingId,

      preparers,

      notify,
      updateQ,
      clearQuestionFieldErrors,
      setQuestionValidationErrors,
      clearValidationErrors,
      navigate,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);