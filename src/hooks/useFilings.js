import { useMemo } from 'react';
import useDebouncedValue from './useDebouncedValue';
import { useApp } from '../context/AppContext';
export default function useFilings() {
  const { role, filings, search, setSearch, filingsStatus, setFilingsStatus } = useApp();
  const debouncedSearch = useDebouncedValue(search);
  const filteredFilings = useMemo(() => filings.filter(f =>
    (role === 'approver' ? f.reviewStage !== 'Draft' : true) &&
    (!debouncedSearch || f.entity.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
    (filingsStatus === 'All' || f.reviewStage === filingsStatus || f.status === filingsStatus)
  ), [filings, role, debouncedSearch, filingsStatus]);
  return { filings, filteredFilings, search, setSearch, filingsStatus, setFilingsStatus };
}
