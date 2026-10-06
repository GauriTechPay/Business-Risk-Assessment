# BRA Frontend Architecture

## Role workspaces

### User / Compliance Preparer
- Dashboard
- New Assessment
- Filings
- Global Settings from header

### Approver / Compliance Approver
- Dashboard
- Review Queue
- Global Settings from header

### Admin / Administrator
- Dashboard
- Mappings
- Filings
- Configure
  - Sections & Questions
  - Guidance
  - Risk Mapping
- Global Settings from header

## Component strategy

`pages/` own route-level composition and orchestration. `components/` contains reusable presentation and interaction components. `common/` contains cross-role UI primitives. Domain components are grouped by business capability so dashboard components do not leak into filings or admin modules.

## Hook strategy

- `useState` for local UI state and application state.
- `useEffect` for lifecycle/side-effect handling, including modal keyboard handling, settings escape handling, and route guard behavior.
- `useMemo` for derived filing lists, dashboard metrics and assessment calculations.
- `useCallback` for stable actions passed through context and custom hooks.
- `useRef` for settings panel focus management.
- Custom hooks `useAssessment`, `useFilings`, `useReviewActions`, `useDebouncedValue`, and `useModal` encapsulate business/UI behavior.

Hooks are used where they solve a real state, lifecycle, memoization or DOM-reference problem rather than being added mechanically.

## Backend seam

`src/features/*/*Service.js` provides the integration boundary for real APIs. The present demo remains in-memory and therefore is not claiming production persistence, authentication, server-side authorization, database storage, or durable audit logs. Those belong in the backend implementation.
