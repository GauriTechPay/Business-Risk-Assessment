# BRA — Business Risk Assessment

Client-facing React/Vite frontend for a Business Risk Assessment workflow with three role-specific workspaces:

- **User / Compliance Preparer** — Dashboard, New Assessment, Filings
- **Approver / Compliance Approver** — Dashboard, Review Queue
- **Admin / Administrator** — Dashboard, Mappings, Filings, Configure (Sections & Questions, Guidance, Risk Mapping)

**Settings is intentionally global** and is opened from the header beside Notifications for every role.

## Architecture

The project separates role-specific pages, domain components, common UI, hooks, state and API boundaries. Business services under `src/features/*` are intentionally thin API seams so a real backend can be connected without moving UI logic into pages.

Current persistence is in-memory demo state; authentication, server-side RBAC, database persistence, audit storage and real APIs are not included in this frontend-only package.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
