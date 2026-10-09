# BoundaryLine - Implementation Log

## Overview
This log tracks implementation progress, verified bug fixes, test execution results, and architectural updates across all milestones in Phase 2.

---

## Milestone Execution Progress

### Milestone 1: Core Infra, Security, Auth & API Validation Layer
- [x] **BL-001**: Changed default user role to `ROLES.USER` in `user.model.js` and added `USER` to `role.constant.js`.
- [x] **BL-003**: Installed `cookie-parser`, attached middleware in `app.js`, and fixed async cookie/header refresh in `auth.controller.js`.
- [x] **BL-004**: Registered `POST /auth/logout` endpoint in `auth.route.js` and imported `clearAuthCookies` in `auth.controller.js`.
- [x] **BL-007**: Standardized `validateRequest.js` middleware to handle both plain JS objects and ZodObject instances.
- [x] **BL-019**: Removed duplicate store file `client/src/store.js` and consolidated on `client/src/app/store/index.js`.

### Milestone 2: Real-Time Scoring & Sockets
- [x] **BL-002**: Added object-level authorization check and score upsert logic for match scoring operations in `score.service.js`.
- [x] **BL-005**: Added `SOCKET_EVENTS.MATCH_JOIN` subscription and `MATCH_LEAVE` un-subscription in `useScoreSocket.js`.
- [x] **BL-006**: Added optional JWT handshake authentication middleware to Socket.IO server setup (`socket/index.js`).
- [x] **BL-008**: Updated `commentary.validator.js` to allow `null` values for `batterId`, `bowlerId`, `nonStrikerId`.
- [x] **BL-009**: Updated `createScore` in `score.service.js` to perform upsert (`POST` vs `PATCH`) for match score updates by `(matchId, innings)`.

### Milestone 3: Tournament Lifecycle, Delegation & Frontend Integration
- [x] **BL-010**: Implemented `TournamentsPage.jsx`, `TournamentDetailPage.jsx`, and `CreateTournamentModal.jsx`.
- [x] **BL-011**: Allowed authenticated users (`authMiddleware`) to create tournaments and associate `createdBy` as owner.
- [x] **BL-012**: Added `authorizedScorers` field to `tournament.model.js` and service methods for scorer delegation.
- [x] **BL-014**: Added pagination and query bounds to public tournament list queries.
- [x] **BL-015**: Connected `LandingPage.jsx` to live API endpoints using `useMatchesQuery` & `useTournamentsQuery`.
- [x] **BL-016**: Updated `LandingPage.jsx` and `NavBar.jsx` with authentication state awareness and "Create Tournament" action.
- [x] **BL-017**: Fixed `FixturesPage.jsx` card navigation so clicking match cards navigates to `/matches/:id` for all users.
- [x] **BL-018**: Added Google Sign-in button to `UserLoginForm.jsx` and fixed session restoration in `AuthSessionGate.jsx`.

### Milestone 4: Database Seeding, Testing & Final Verification
- [x] **BL-013**: Implemented repeatable database seed script `server/src/seed/seed.js` (`npm run seed`).
- [x] **BL-020**: Added automated test suite in `server/test/api.test.js` (`npm test`).
- [x] **BL-021**: Resolved Git merge conflict markers in root `Readme.md` and cleaned up doc formatting.

---

## Log Entries & Verification Evidence

1. **User Role Default Fix (BL-001):**
   - Verified default schema role in `user.model.js` is `ROLES.USER`. Newly registered accounts receive standard read access instead of global scorer privileges.
2. **Cookie Parsing & Auth Endpoints (BL-003, BL-004):**
   - Installed `cookie-parser` v1.4.7. Attached `app.use(cookieParser())` in Express pipeline.
   - Updated `refreshAccessToken` in `auth.controller.js` to await token verification.
   - Registered `POST /api/v1/auth/logout` endpoint returning 200 OK.
3. **Zod Validation Middleware Normalization (BL-007):**
   - Updated `validateRequest.js` to inspect `schemas.shape || schemas`. Supports both `z.object({ body: ... })` and `{ body: z.object(...) }`.
4. **Socket.IO Room Subscriptions & Auth (BL-005, BL-006):**
   - Updated `useScoreSocket.js` to emit `match.join` with `{ matchId }` on component mount and `match.leave` on unmount.
   - Added JWT handshake authentication middleware to Socket.IO server.
5. **Database Seed Script Execution (BL-013):**
   - Executed `npm run seed`. Successfully populated Users (Super Admin, Admin, Scorer, User), 4 Teams, 8 Players, Series, Tournament, Completed Match, Live Match, Upcoming Match, Scorecards, and Commentary.
6. **Automated Unit & Logic Tests (BL-020):**
   - Executed `npm test`. 3/3 test suites passed with zero failures.
7. **Frontend Tournament Module & Landing Page (BL-010, BL-015, BL-016):**
   - Implemented `TournamentsPage`, `TournamentDetailPage`, `CreateTournamentModal`.
   - Wired `LandingPage.jsx` to live API queries (`useMatchesQuery`, `useTournamentsQuery`).
8. **Frontend Linter Clean-up & Verification:**
   - Cleared all 34 ESLint warnings/errors in `client/` across 12 files.
   - Executed `npm run lint` in `client/` -> 0 errors, 0 warnings.
   - Executed `npm test` in `server/` -> 3/3 tests passed.
