import { useCallback, useState } from 'react';
import { useApp } from '../context/AppContext';
export default function useReviewActions(filingId) {
  const { filings, setFilings, navigate, notify } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const submit = useCallback((stage, comment = '') => {
    if (!filingId || submitting) return;
    setSubmitting(true);
    setFilings(prev => prev.map(x => x.id === filingId ? {
      ...x, reviewStage: stage, status: stage,
      audit: [{ status: stage === 'Rejected' ? 'rejected' : stage === 'Changes Requested' ? 'stuck' : 'done', title: `${stage} by Kiran Alvarez`, note: comment || undefined, time: 'Just now' }, ...x.audit]
    } : x));
    notify(`${filings.find(x => x.id === filingId)?.entity || 'Assessment'} ${stage.toLowerCase()}.`);
    setTimeout(() => { setSubmitting(false); navigate('filings'); }, 0);
  }, [filingId, submitting, setFilings, notify, filings, navigate]);
  return { approve: () => submit('Approved'), requestChanges: (comment) => submit('Changes Requested', comment), reject: (comment) => submit('Rejected', comment), submitting };
}
