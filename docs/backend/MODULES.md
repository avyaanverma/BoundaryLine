# Module-Wise Documentation

> **3 Module Tiers: Public (read-only) | Private (write) | Admin (dashboard)**

---

## 12. Module-wise Documentation

### Module Architecture Pattern

Each feature module follows the same 4-layer pattern:

```
{module}/
├── {module}.route.js        # Routes + middleware chain
├── {module}.controller.js   # HTTP handler
├── {module}.service.js      # Business logic
└── (optional) dto/           # Data Transfer Objects
```

For public endpoints, the controller often reuses the **private service**:

```js
// Public controller delegates to private service
class PublicMatchController {
  constructor(matchService = new MatchService()) {
    this.matchService = matchService;
  }
  listMatches = asyncHandler(async (_req, res) => {
    const matches = await this.matchService.listMatches();
    return new ApiResponse(200, "Matches fetched successfully", matches).send(res);
  });
}
```

### Authentication Module

**Files**: `modules/public/auth/`
- `auth.route.js` — Routes for register, login, Google OAuth, refresh, me, make-admin
- `auth.controller.js` — Handles HTTP, sets cookies, delegates to AuthService
- `auth.service.js` — Business logic: registration, login, OAuth, token management
- `auth.validator.js` — Zod schemas for register, login, make-admin

**Dependencies**: UserRepo (repository), JWT, Passport, bcrypt

**Key behaviors**:
- Password auto-hashed via Mongoose pre-save hook on User model
- Google OAuth uses `createOrFindUser()` — links by googleId first, then email
- Tokens stored in httpOnly cookies via `setAuthCookies()`
- `makeAdmin` endpoint restricted to SUPER_ADMIN only

### Match Module

**Files**: `modules/public/match/`, `modules/private/match/`
- Public: `GET /matches`, `GET /matches/:id`
- Private: `POST /matches`, `PATCH /matches/:id`, `DELETE /matches/:id`

**Service behaviors**:
- `ensureDifferentTeams()` — team1 and team2 must be different
- `createMatch()` — validates, creates, emits `match.created`
- `updateMatch()` — partial update, emits status change events (LIVE, INNINGS_BREAK, COMPLETED, TOSS)
- `deleteMatch()` — soft delete with existence check

**Socket events**: `match.created`, `match.updated`, `match.status.updated`, `match.started`, `match.completed`, `toss.completed`, `innings.started`, `innings.completed`

### Player Module

**Files**: `modules/public/player/`, `modules/private/player/`
- Public: `GET /players` (optional `?role=` filter), `GET /players/:id`
- Private: `POST /players`, `PATCH /players/:id`, `DELETE /players/:id`

**Service behaviors**:
- `ensureUniquePlayerName()` — prevents duplicate player names
- Supports role-based filtering (BATTER, BOWLER, ALL_ROUNDER, WICKET_KEEPER)
- Batting/bowling style enums for detailed player profiles

### Team Module

**Files**: `modules/public/team/`, `modules/private/team/`
- Public: `GET /teams`, `GET /teams/:id`
- Private: `POST /teams`, `PATCH /teams/:id`, `DELETE /teams/:id`

**Service behaviors**:
- `ensureUniqueTeam()` — checks both `name` and `shortName` for uniqueness
- Soft delete preserves team history for past matches

### Series Module

**Files**: `modules/public/series/`, `modules/private/series/`
- Public: `GET /series`, `GET /series/:id`
- Private: `POST /series`, `PATCH /series/:id`, `DELETE /series/:id`

**Service behaviors**:
- Validates minimum 2 teams per series
- Validates endDate >= startDate
- Format enum: T5, T10, T20, ODI, TEST

### Tournament Module

**Files**: `modules/public/tournament/`, `modules/private/tournament/`
- Public: `GET /tournaments`, `GET /tournaments/:id`
- Private: `POST /tournaments`, `PATCH /tournaments/:id`, `DELETE /tournaments/:id`

**Service behaviors**:
- Duplicate name check for tournaments
- Same status lifecycle as series (UPCOMING, ONGOING, COMPLETED)

### Score Module

**Files**: `modules/public/score/`, `modules/private/score/`
- Public: `GET /scores/match/:matchId`
- Private: `POST /scores`, `PATCH /scores/:id`, `DELETE /scores/:id`

**Service behaviors**:
- `ensureLiveMatch()` — only LIVE or INNINGS_BREAK matches can be scored
- Over completion detection: when overs end with `.0` and aren't `0.0`
- Automatic socket emission on create, update (with over detection), and delete

### Commentary Module

**Files**: `modules/public/commentary/`, `modules/private/commentary/`
- Public: `GET /commentary/match/:matchId` (paginated)
- Private: `POST /commentary`, `DELETE /commentary/:id`

**Service behaviors**:
- Only LIVE or INNINGS_BREAK matches accept commentary
- Enriched ball-by-ball data structure (runs, extras, dismissal, batter/bowler IDs)
- CommentaryDTO for response transformation

### Squad Module

**Files**: `modules/public/squad/`, `modules/private/squad/`
- Public: `GET /squads`, `GET /squads/:id`
- Private: `POST /squads`, `PATCH /squads/:id`, `DELETE /squads/:id`

**Service behaviors**:
- `ensureSquad()` verifies series and team exist
- Prevents duplicate squads for same series+team combination
- Validates players exist before assigning

### Playing XI Module

**Files**: `modules/public/playingXI/`, `modules/private/playingXI/`
- Public: `GET /playing-xis`, `GET /playing-xis/:id`
- Private: `POST /playing-xis`, `PATCH /playing-xis/:id`, `DELETE /playing-xis/:id`

**Service behaviors**:
- **Exactly 11 players** required
- **No duplicate players** allowed
- Captain, vice-captain, and wicket-keeper must all be in the playing XI
- All players must belong to the squad for that series
- Prevents duplicate submissions per match+team combination
- Emits `playingXI.submitted` on create

### User Module (Private)

**Files**: `modules/private/user/`
- `GET /users` — Paginated list with pagination metadata
- `POST /users` — Create user with role
- `GET /users/:id` — Get user by ID
- `PATCH /users/:id/role` — Update user role
- `DELETE /users/:id` — Soft delete user

**Service behaviors**:
- Duplicate email check (case-insensitive)
- Paginated responses with total, page, limit, totalPages
- Socket emits on user-created, user-role-updated, user-deleted

### Admin Dashboard Module

**Files**: `modules/admin/`
- `GET /admin/dashboard` — Overview with total counts (matches, users, teams, players)
- `GET /admin/matches` — Match statistics with optional filters (days, seriesId)
- `GET /admin/users` — User counts (total + active in last 7 days)
- `GET /admin/players` — Player inventory count
- `GET /admin/health` — System health (DB connection state, uptime, memory)

**Key architecture**:
- Uses **AdminDashboard** model for cached statistics (pre-computed, not live)
- `includeStats=true` parameter forces recalculation
- Parallel Promise.all for count queries
- DTO pattern for response transformation
