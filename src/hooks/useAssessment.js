import { useCallback, useMemo } from "react";
import { DIMS } from "../data/riskData";
import { overallCalc } from "../utils/risk";
import { useApp } from "../context/AppContext";

const REQUIRED_QUESTION_FIELDS = [
  "mlImp",
  "mlProb",
  "tfImp",
  "tfProb",
  "inherent",
  "obs",
  "reco",
];

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "");

function validateQuestion(q) {
  const errors = {};

  REQUIRED_QUESTION_FIELDS.forEach((field) => {
    if (isEmpty(q?.[field])) {
      errors[field] = true;
    }
  });

  return errors;
}

export default function useAssessment() {
  const {
    dims,
    updateQ,
    step,
    setStep,
    status,
    validationErrors,
    setQuestionValidationErrors,
  } = useApp();

  const overall = useMemo(
    () => overallCalc(DIMS.map((d) => dims[d.id])),
    [dims],
  );

  const setAnswer = useCallback(
    (dimensionId, questionIndex, patch) => {
      updateQ(dimensionId, questionIndex, patch);
    },
    [updateQ],
  );

  const progress = useMemo(() => {
    const all = DIMS.flatMap((d) => dims[d.id]?.q || []);

    const answered = all.filter(
      (q) =>
        q.mlImp != null &&
        q.mlProb != null &&
        q.tfImp != null &&
        q.tfProb != null,
    ).length;

    return {
      answered,
      total: all.length,
      percent: all.length
        ? Math.round((answered / all.length) * 100)
        : 0,
    };
  }, [dims]);

  /*
   * Validate one dimension only.
   *
   * Important:
   * DIMS contains `qs`,
   * while the actual answer state contains `q`.
   */
  const validateDimension = useCallback(
    (dimensionId) => {
      const dimensionState = dims?.[dimensionId];

      if (!dimensionState || !Array.isArray(dimensionState.q)) {
        return {
          valid: false,
          errors: {},
        };
      }

      const dimensionErrors = {};

      dimensionState.q.forEach((question, qi) => {
        const questionErrors = validateQuestion(question);

        if (Object.keys(questionErrors).length > 0) {
          dimensionErrors[qi] = questionErrors;
        }
      });

      setQuestionValidationErrors((prev) => {
        const next = { ...prev };

        if (Object.keys(dimensionErrors).length > 0) {
          next[dimensionId] = dimensionErrors;
        } else {
          delete next[dimensionId];
        }

        return next;
      });

      return {
        valid: Object.keys(dimensionErrors).length === 0,
        errors: dimensionErrors,
      };
    },
    [dims, setQuestionValidationErrors],
  );

  /*
   * Validate all assessment dimensions A-F.
   *
   * This is the important fix for your console error.
   *
   * We iterate:
   *   DIMS -> d.id -> dims[d.id].q
   *
   * We NEVER use d.q or d.qs.forEach() for the answer state.
   */
  const validateAll = useCallback(() => {
    const allErrors = {};
    let firstInvalidStep = null;

    DIMS.forEach((dimension, dimensionIndex) => {
      const dimensionState = dims?.[dimension.id];

      if (!dimensionState || !Array.isArray(dimensionState.q)) {
        return;
      }

      const dimensionErrors = {};

      dimensionState.q.forEach((question, qi) => {
        const questionErrors = validateQuestion(question);

        if (Object.keys(questionErrors).length > 0) {
          dimensionErrors[qi] = questionErrors;
        }
      });

      if (Object.keys(dimensionErrors).length > 0) {
        allErrors[dimension.id] = dimensionErrors;

        if (firstInvalidStep === null) {
          // A = step 1, B = step 2, etc.
          firstInvalidStep = dimensionIndex + 1;
        }
      }
    });

    /*
     * Preserve Setup and Conclusion errors.
     * Do not overwrite them when validating A-F.
     */
    setQuestionValidationErrors((prev) => {
      const next = { ...prev };

      // Remove old A-F validation errors first.
      DIMS.forEach((dimension) => {
        delete next[dimension.id];
      });

      // Add the latest A-F errors.
      Object.assign(next, allErrors);

      return next;
    });

    return {
      valid: Object.keys(allErrors).length === 0,
      errors: allErrors,
      firstInvalidStep,
    };
  }, [dims, setQuestionValidationErrors]);

  const clearQuestionErrors = useCallback(
    (dimensionId, questionIndex) => {
      setQuestionValidationErrors((prev) => {
        const next = { ...prev };

        if (!next[dimensionId]) {
          return next;
        }

        const dimensionErrors = { ...next[dimensionId] };

        delete dimensionErrors[questionIndex];

        if (Object.keys(dimensionErrors).length === 0) {
          delete next[dimensionId];
        } else {
          next[dimensionId] = dimensionErrors;
        }

        return next;
      });
    },
    [setQuestionValidationErrors],
  );

  const goToStep = useCallback(
    (next) => {
      setStep(Math.max(0, Math.min(9, next)));
    },
    [setStep],
  );

  const canContinue = useMemo(() => {
    if (step >= 1 && step <= 6) {
      const dimensionId = DIMS[step - 1]?.id;
      return !validationErrors?.[dimensionId];
    }

    return true;
  }, [step, validationErrors]);

  return {
    dims,
    step,
    status,
    overall,
    progress,
    setAnswer,
    goToStep,

    validateQuestion,
    validateDimension,
    validateAll,
    clearQuestionErrors,

    validationErrors,
    canContinue,
  };
}