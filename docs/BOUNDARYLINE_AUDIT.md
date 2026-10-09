# BoundaryLine - Comprehensive Repository Audit & Checklist

## Executive Summary
BoundaryLine is a real-time cricket scoring and tournament management platform built with Node.js/Express, MongoDB/Mongoose ODM, Socket.IO, React 19, Redux Toolkit, and TanStack React Query.

This audit document details all identified security, architecture, validation, real-time socket, scoring, tournament management, frontend UI, and testing defects identified during Phase 1.

---

## Complete Approved Issue Checklist

| ID | Category | Priority | Status | Location | Description |
|---|---|---|---|---|---|
| **BL-001** | Security / Auth | P0 | Confirmed | `server/src/model/user.model.js` | Default user role is set to `SCORER` on user registration. |
| **BL-002** | Security / Auth | P0 | Confirmed | `server/src/modules/private/score/score.route.js` | Missing object-level authorization for match scoring operations. |
| **BL-003** | Auth / Cookies | P0 | Confirmed | `server/src/app.js`, `auth.controller.js` | `cookie-parser` middleware missing; token refresh logic broken and un-awaited. |
| **BL-004** | Auth / API | P1 | Confirmed | `server/src/modules/public/auth/auth.route.js` | Missing `/auth/logout` endpoint and missing `clearAuthCookies` import in controller. |
| **BL-005** | WebSockets | P0 | Confirmed | `client/src/features/scoreboard/hooks/useScoreSocket.js` | Clients never emit `match.join` to join Socket.IO match rooms; real-time score updates fail. |
| **BL-006** | WebSockets | P2 | Confirmed | `server/src/socket/index.js` | Socket connection lacks JWT handshake authentication. |
| **BL-007** | Validation / Middleware | P0 | Confirmed | `server/src/middleware/validateRequest.js` | Mismatch between ZodObject exports and `validateRequest` parser causing runtime `TypeError` crashes. |
| **BL-008** | Validation / API | P1 | Confirmed | `server/src/validators/commentary.validator.js` | Commentary player IDs reject `null` values from frontend sync hook. |
| **BL-009** | Scoring / Database | P1 | Confirmed | `client/src/features/scorer-console/hooks/useSyncScores.js` | Score sync only calls `POST /scores`, creating duplicate score documents in MongoDB on subsequent saves. |
| **BL-010** | Tournaments / UI | P1 | Confirmed | `client/src/routes/AppRoutes.jsx` | Tournament pages (`/tournaments`, `/tournaments/:tournamentId`) render `ComingSoonPage` placeholders. |
| **BL-011** | Tournaments / Security | P1 | Confirmed | `server/src/modules/private/tournament/tournament.route.js` | Tournament creation endpoint is restricted to system `ADMIN` roles, preventing user creation. |
| **BL-012** | Tournaments / Auth | P1 | Confirmed | `server/src/model/tournament.model.js` | Tournament schema lacks `authorizedScorers` field and scorer delegation endpoints. |
| **BL-013** | Data / Seeding | P1 | Confirmed | `server/src/seed/seed.js` | Zero database seed scripts exist to populate demo matches, tournaments, teams, and players. |
| **BL-014** | Data Integrity | P2 | Confirmed | `server/src/repository/tournament.repository.js` | Public list queries perform unbounded database reads without pagination. |
| **BL-015** | UI / Homepage | P1 | Confirmed | `client/src/features/landing page/pages/LandingPage.jsx` | Homepage uses hardcoded static arrays instead of querying backend APIs. |
| **BL-016** | UI / Homepage | P1 | Confirmed | `client/src/features/landing page/pages/LandingPage.jsx` | Homepage lacks "Create Tournament" action for authenticated users and auth state awareness. |
| **BL-017** | UI / Navigation | P2 | Confirmed | `client/src/features/fixtures/pages/FixturesPage.jsx` | Admin users clicking match cards are redirected to `/admin/matches` instead of public Scoreboard. |
| **BL-018** | UI / Auth | P2 | Confirmed | `client/src/features/auth/user/component/UserLoginForm.jsx` | User login form lacks Google Sign-in button; session restoration gate drops OAuth redirects. |
| **BL-019** | Architecture | P2 | Confirmed | `client/src/store.js` | Duplicate Redux store configuration file causing import ambiguity. |
| **BL-020** | Testing / QA | P1 | Confirmed | `server/package.json` | Zero automated unit, integration, or E2E tests exist. |
| **BL-021** | Documentation | P3 | Confirmed | `Readme.md` | Unresolved Git merge conflict markers present in root `Readme.md`. |
