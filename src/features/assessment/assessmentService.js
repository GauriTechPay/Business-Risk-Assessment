// API boundary. Replace the in-memory implementation with HTTP calls when the backend is connected.
export const assessmentService = {
  async saveDraft(payload) { return { ok: true, payload }; },
  async submit(payload) { return { ok: true, payload }; },
};
