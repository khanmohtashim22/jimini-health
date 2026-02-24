# Patient Encounter List with API Integration

Jimini Health Encounters is a web app for viewing a paginated list of patient encounters and encounter details.

## Setup & Running

### Install dependencies

```bash
npm install
```

### Run the app

- **Web:** `npm run dev` — starts the Next.js dev server at [http://localhost:3000](http://localhost:3000)
- **Production build:** `npm run build` then `npm start`

> This is a web-only app. There are no native iOS/Android builds.

### Run tests

```bash
npm test
```

For watch mode: `npm run test:watch`

### Environment setup

No environment variables are required for local development. The app uses mock API routes under `/api/encounters`. To point at a real backend, add `NEXT_PUBLIC_API_URL` (or similar) and update the fetch logic in `useEncounters` and the encounter detail fetch.

---

## Tech Stack Choices

| Choice | Rationale |
|--------|-----------|
| **Next.js** | App Router, API routes for backend, SSR/SSG support. Good fit for a dashboard-style app. |
| **React 19** | Latest React with built-in patterns (use, Suspense). |
| **TanStack Query** | Caching, loading/error states, and refetch logic for API calls. Reduces manual state. |
| **Tailwind CSS** | Utility-first styling, fast iteration, consistent design tokens. |
| **TypeScript** | Type safety across the app, including API responses and event payloads. |
| **Jest + React Testing Library** | Widely used stack for unit and component tests. |

### State management

TanStack Query handles server state (encounters, pagination). Local UI state is kept in components. No global client store (e.g. Zustand/Redux) is used.

---

## Design Decisions

### Architecture

- **App Router** — File-based routing with layouts, loading, and `not-found`.
- **Server + client components** — Pages fetch data server-side where possible; interactive UI uses `"use client"`.
- **API routes** — `/api/encounters` and `/api/encounters/[id]` for data; can be swapped for an external API.
- **URL-driven pagination** — `?page=2` in the URL so pages are shareable and back/forward work.

### Trade-offs

- **Mock API vs. external backend** — Mock API in repo for simplicity; production would point to a real service.
- **Tracking in components** — `track()` is called from components. Keeps tracking local; analytics could instead be centralized in middleware or a provider.
- **Redaction at output** — Sensitive fields are redacted before logging/analytics, not at storage, since the app displays real data to authorized users.

### Patterns used

- **Typed event map** — `TrackEventMap` enforces event names and payload shapes for `track()`.
- **Configurable sensitive keys** — `src/config/sensitive-keys.ts` lists fields to redact; no edits to the redact utility when adding keys.
- **i18n** — All user-facing strings in `translations.ts` for consistency and future localization.

### What would change for production

- Connect to a real API; remove or gate mock API.
- Replace `console.log` in `track()` with an analytics provider (e.g. Mixpanel, PostHog); only log to console in development.
- Add error boundary and error reporting (e.g. Sentry).
- Add auth and enforce role-based access.
- Run lint, format, and tests in CI before deploy.

---

## PHI/PII Handling

### Sensitive data protection

- **Display:** Real data is shown only in the app UI to the current user; no extra protection on the client beyond auth.
- **Logging and analytics:** Any data sent to logs or analytics is redacted before it leaves the app.

### Redaction

- **Utility:** `src/lib/redact.ts` recursively redacts configured keys in objects/arrays.
- **Config:** `src/config/sensitive-keys.ts` defines fields to redact (e.g. `patientId`, `notes`). Add new keys here when needed.
- **Behavior:** Sensitive values are replaced with `[REDACTED]`; the original object is not mutated.

### Logging strategy

- **`track()`** — Single entry point for analytics and logging. All payloads go through `redact()` before output.
- **Events tracked:** `encounter_viewed`, `encounters_list_viewed`, `encounter_row_clicked`, `pagination_changed`, `back_to_encounters_clicked`, `encounters_fetch_error`.
- **Output:** Console in development; intended to be sent to an analytics service in production (with redaction applied before sending).

---

## Testing Strategy

### What I Tested

- **[`redact` unit tests]:** Ensures `patientId` and `notes` are replaced with `[REDACTED]` in nested objects and arrays. Critical for PHI compliance — without this, sensitive data could leak into logs or analytics.

- **[EncountersTable row click + `encounter_row_clicked`]:** Covers the main user interaction (clicking a row to view an encounter) and that `router.push` and `track` are called with the correct payload. Validates the primary navigation flow.

- **[`useEncounters` fetch error / Encounters error state]:** Verifies that when the API fails, the error UI is shown and `encounters_fetch_error` is tracked. Covers the error path and ensures we log failures for debugging.
