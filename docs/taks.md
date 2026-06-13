# Backend Tasks: Team + Match Modules

Date: 2026-06-13
Branch: feature/backend-team-match

## Source Context

This task plan is based on:

- `cricket_backend_documentation.pdf`
- Current frontend structure under `client/src`
- Current backend skeleton under `server/src`
- Existing project rule: keep feature-based architecture and make small commits

## Current Repo Reality

The PDF describes a full cricket backend, but the current repo backend is still a starter skeleton:

```txt
server/
  server.js
  src/
    app.js
    config/
      db.js
      env.js
    constant/
      app.constant.js
    util/
      Logger.js
```

So the work must add the backend structure step by step without breaking the existing server startup.

## Frontend Structure Notes

The frontend is feature-based and already has routes/pages for:

- landing page
- fixtures
- scoreboard
- scorer console
- points table
- analytics
- admin login

Backend APIs should stay predictable for these frontend areas:

- public match browsing and match details
- admin/scorer match operations
- team list/detail/squad data
- later integration with scoring and live updates

## Required Coding Rules

1. Use class-based backend modules.
2. Keep each module split by responsibility:
   - model
   - repository
   - service
   - controller
   - route
   - validator
3. Every function must include short step comments explaining:
   - what the function does
   - why the step is needed
   - how the step is performed
4. Keep commits small:
   - one structure/module slice complete, then commit
   - no unrelated frontend changes
   - no broad refactors unless needed for the task
5. Follow current repo ESM style:
   - `import` / `export`
   - `.js` files
6. Prefer preserving existing app startup files unless route wiring requires a small edit.

## Task 1: Team Module Structure

Goal: Add the team module folder and class-based files.

Planned files:

```txt
server/src/modules/team/
  team.model.js
  team.repository.js
  team.service.js
  team.controller.js
  team.route.js
  team.validator.js
```

Initial model fields:

- `name`
- `shortName`
- `logo`
- `primaryColor`
- `squadPlayers`
- `isDeleted`
- `createdBy`
- `updatedBy`

Initial APIs:

- `GET /api/teams`
- `GET /api/teams/:id`
- `POST /api/teams`
- `PATCH /api/teams/:id`
- `DELETE /api/teams/:id`

Commit target:

```txt
feat(team): add team module structure
```

## Task 2: Match Module Structure

Goal: Add the match module folder and class-based files.

Planned files:

```txt
server/src/modules/match/
  match.model.js
  match.repository.js
  match.service.js
  match.controller.js
  match.route.js
  match.validator.js
```

Initial model fields:

- `seriesId`
- `matchNumber`
- `venue`
- `startTime`
- `status`
- `team1`
- `team2`
- `tossWinner`
- `tossDecision`
- `playingXI`
- `winner`
- `result`
- `isDeleted`
- `createdBy`
- `updatedBy`

Initial APIs:

- `GET /api/matches`
- `GET /api/matches/:id`
- `POST /api/matches`
- `PATCH /api/matches/:id`
- `DELETE /api/matches/:id`

Commit target:

```txt
feat(match): add initial match APIs
```

## Task 3: Shared Backend Support

Goal: Add only the shared support needed by Team and Match modules.

Possible files:

```txt
server/src/shared/
  errors/AppError.js
  middleware/validateRequest.js
  utils/asyncHandler.js
```

Route wiring:

- Mount team routes in `server/src/app.js`
- Mount match routes in `server/src/app.js`
- Keep `/api/*` as the backend task prefix and expose `/v1/*` as a frontend-compatible alias
- Keep `/health` working

Commit target:

```txt
chore(server): wire team and match routes
```

## Verification Plan

Run after implementation:

```bash
cd server
npm.cmd install
node -e "import('./src/app.js').then(() => console.log('app import ok'))"
```

If MongoDB is available locally:

```bash
npm.cmd run dev
```

Manual API smoke checks after server runs:

```txt
GET /health
GET /api/teams
GET /api/matches
GET /v1/teams
GET /v1/matches
```

## Notes

- Authentication and RBAC are not part of this immediate task unless required by route wiring.
- Series, player, squad, score, and commentary modules will come later.
- If match creation needs `seriesId`, `team1`, and `team2`, validate only ObjectId shape for now; do not build series/player modules in this task.
- Current backend constant `MONGO_URI` should later be corrected from an HTTP URL to a MongoDB URI.
