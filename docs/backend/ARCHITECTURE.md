# Backend Architecture

> **Node.js + Express.js | MongoDB + Mongoose | 5-Layer Architecture | Socket.IO | Zod Validation**

---

## 3. Architecture Overview

BoundaryLine follows a **5-Layer Architecture** that separates concerns at every level, ensuring maintainability, testability, and scalability.

```
┌─────────────────────────────────────┐
│          Route Layer                │  ← Defines URL mappings + middleware chain
├─────────────────────────────────────┤
│        Controller Layer             │  ← Handles HTTP req/res, delegates to services
├─────────────────────────────────────┤
│         Service Layer               │  ← Business logic, orchestration, validations
├─────────────────────────────────────┤
│        Repository Layer             │  ← Data access abstraction (MongoDB CRUD)
├─────────────────────────────────────┤
│        Database Layer               │  ← Mongoose Models + MongoDB
└─────────────────────────────────────┘
```

### Why 5 Layers?

| Layer | Responsibility | Why Separate? |
|-------|---------------|---------------|
| **Route** | URL mapping, middleware composition | Single source of truth for API surface |
| **Controller** | HTTP concerns (parse req, send res) | Keeps business logic framework-agnostic |
| **Service** | Business rules, orchestration | Testable independently of HTTP |
| **Repository** | Database queries | Swap DB without touching business logic |
| **Model** | Schema, indexes, validation | Database migrations and schema changes isolated |

---

## 4. Folder Structure

```
server/src/
├── app.js                          # Express app factory
├── config/
│   ├── db.js                       # MongoDB connection
│   └── env.js                      # Zod-validated environment config
├── constant/
│   ├── app.constant.js             # App defaults, JWT/cookie config
│   ├── format.constant.js          # Match formats (T5, T10, T20, ODI, TEST)
│   ├── role.constant.js            # User roles
│   ├── series.constant.js          # Series/tournament statuses
│   ├── socket-events.constant.js   # All Socket.IO event names
│   └── tournament.constant.js      # Tournament status re-exports
├── middleware/
│   ├── auth.middleware.js          # JWT verify + role authorization
│   ├── error.middleware.js         # Centralized error handler + 404
│   ├── googleOAuth.middleware.js   # Passport Google OAuth strategy
│   ├── security.middleware.js      # Helmet, CORS, rate-limit, HPP, compression
│   └── validateRequest.js          # Zod request validation middleware
├── model/
│   ├── user.model.js               # User schema (bcrypt hashing)
│   ├── match.model.js              # Match schema (lifecycle + playing XI)
│   ├── player.model.js             # Player schema (roles, styles)
│   ├── team.model.js               # Team schema (name, logo, squad)
│   ├── series.model.js             # Series schema (format, teams, dates)
│   ├── tournament.model.js         # Tournament schema
│   ├── score.model.js              # Score schema (innings-based)
│   ├── commentary.model.js         # Commentary schema (ball-by-ball enriched)
│   ├── squad.model.js              # Squad schema (series-team-player bridge)
│   └── playingXI.model.js          # Playing XI schema (11 players + roles)
├── modules/
│   ├── public/                     # Read-only APIs (no auth required)
│   │   ├── auth/                   # Register, Login, Google OAuth, Refresh, Me
│   │   ├── match/                  # GET matches
│   │   ├── player/                 # GET players
│   │   ├── team/                   # GET teams
│   │   ├── series/                 # GET series
│   │   ├── tournament/             # GET tournaments
│   │   ├── score/                  # GET scores by match
│   │   ├── commentary/             # GET commentary by match
│   │   ├── squad/                  # GET squads
│   │   ├── playingXI/              # GET playing XIs
│   │   └── health/                 # Health check
│   ├── private/                    # Write APIs (auth + role required)
│   │   ├── match/                  # POST/PATCH/DELETE matches
│   │   ├── player/                 # POST/PATCH/DELETE players
│   │   ├── team/                   # POST/PATCH/DELETE teams
│   │   ├── series/                 # POST/PATCH/DELETE series
│   │   ├── tournament/             # POST/PATCH/DELETE tournaments
│   │   ├── score/                  # POST/PATCH/DELETE scores
│   │   ├── commentary/             # POST/DELETE commentary
│   │   ├── squad/                  # POST/PATCH/DELETE squads
│   │   ├── playingXI/              # POST/PATCH/DELETE playing XIs
│   │   └── user/                   # POST/GET/PATCH/DELETE users
│   └── admin/                      # Admin dashboard APIs
│       ├── admin.controller.js
│       ├── admin.service.js
│       ├── admin.repository.js
│       ├── admin.model.js          # AdminDashboard stats cache
│       ├── dto/admin.dto.js        # Dashboard DTO
│       └── validators/             # Admin query validators
├── repository/                     # Data access layer
│   ├── match.repository.js
│   ├── player.repository.js
│   ├── team.repository.js
│   ├── series.repository.js
│   ├── tournament.repository.js
│   ├── score.repository.js
│   ├── commentary.respository.js
│   ├── squad.repository.js
│   ├── playingXI.repository.js
│   └── user.repository.js
├── socket/
│   └── index.js                    # Socket.IO server init + room management
├── shared/
│   ├── error/                      # Custom error classes
│   │   ├── AppError.js             # Base operational error
│   │   ├── BadRequest.js           # 400
│   │   ├── NotFound.js             # 404
│   │   ├── Conflict.js             # 409
│   │   ├── Forbidden.js            # 403
│   │   └── Unauthorized.js         # 401
│   ├── socket/
│   │   └── emitToMatch.js          # Match-scoped socket emission utility
│   ├── successResponse/
│   │   └── buildSuccessResponse.js # Success response builder
│   ├── utils/
│   │   ├── asyncHandler.js         # Async error wrapper
│   │   ├── authCookies.js          # Set/clear auth cookies
│   │   ├── logger.js               # Pino logger with pretty-print
│   │   └── ApiResponse.js          # Standardized API response class
│   └── validators/
│       └── common.js               # Shared validators (extensible)
├── validators/                     # Zod validation schemas per resource
│   ├── match.validator.js
│   ├── player.validator.js
│   ├── team.validator.js
│   ├── series.validator.js
│   ├── tournament.validator.js
│   ├── score.validator.js
│   ├── commentary.validator.js
│   ├── squad.validator.js
│   ├── playingXI.validator.js
│   └── user.validator.js
├── server.js                       # Entry point: HTTP server + DB + Socket.IO
└── package.json
```

---

## 9. Request Lifecycle

Every API request follows this exact flow:

```
1. HTTP Request arrives
       │
2. Security Middleware (Helmet, CORS, Rate Limit, Compression)
       │
3. Validation Middleware (Zod schema validation)
       │  └─ On failure → 400 {"success": false, "errors": ...}
       │
4. Auth Middleware (JWT verification)
       │  └─ On failure → 401 {"success": false, "message": "..."}
       │
5. Role Authorization Middleware (RBAC check)
       │  └─ On failure → 403 {"success": false, "message": "..."}
       │
6. Controller Layer
       │  └─ Parses validated data, calls Service
       │
7. Service Layer
       │  └─ Business logic, validation, orchestration
       │  └─ May call Repository, emit Socket events
       │
8. Repository Layer
       │  └─ Database CRUD operations
       │
9. Response sent back
       │
10. Error Middleware (if any error thrown)
       └─ Catches errors → sends structured JSON error response
```

### Dual Prefix Strategy

Both `/api` and `/api/v1` prefixes are registered for backward compatibility:

```js
registerFeatureRoutes(app, "/api");
registerFeatureRoutes(app, "/api/v1");
```

---

## 15. Validation Layer

**Technology**: Zod 4

Each resource has a dedicated validator file in `server/src/validators/`. The `validateRequest` middleware consumes these:

```js
// Example: match.validator.js
export const createMatchSchema = z.object({
  body: z.object({
    seriesId: objectIdSchema,
    team1: objectIdSchema,
    team2: objectIdSchema,
    venue: z.string().trim().min(2).max(140),
    startTime: z.coerce.date(),
    matchNumber: z.string().trim().max(40).optional(),
  }),
});
```

The middleware validates `body`, `params`, and `query` independently and attaches the result to `req.validated`:

```js
// validateRequest.js
export const validateRequest = (schemas) => (req, res, next) => {
  if (schemas.body) validated.body = schemas.body.parse(req.body);
  if (schemas.params) validated.params = schemas.params.parse(req.params);
  if (schemas.query) validated.query = schemas.query.parse(req.query);
  req.validated = validated;
  next();
};
```

### Validation Features
- **ObjectId validation**: Custom regex/refine checks for 24-character hex strings
- **Partial updates**: `refine(hasAtLeastOneField)` prevents empty PATCH requests
- **Cross-field validation**: `superRefine` for interdependent fields (e.g., password required when no googleId)
- **Coercion**: `z.coerce.date()`, `z.coerce.number()` for query/body normalization
- **Enums**: Match status, player roles, bowling/batting styles all validated against defined enums

---

## 17. Repository Pattern

Each repository class encapsulates all database operations for a resource, returning plain JavaScript objects (`.lean()`).

### Standard Repository Interface

```js
class TeamRepository {
  async findAll()                   // Get all active records
  async findById(id)                // Get one by ID
  async findByNameOrShortName()     // Custom query for uniqueness
  async create(payload)             // Insert new document
  async updateById(id, payload)     // Partial update (PATCH)
  async softDeleteById(id)          // Soft delete (isDeleted: true)
}
```

### Why Repository Pattern?
- **Swap databases**: MongoDB can be replaced without touching service layer
- **Testability**: Repositories can be mocked in unit tests
- **Consistent queries**: All queries respect `isDeleted: false` for soft-delete
- **Population logic centralized**: Team and series population happens in one place

---

## 18. Service Layer

Services contain all business logic and orchestration:

```js
class MatchService {
  async createMatch(payload) {
    this.ensureDifferentTeams(payload.team1, payload.team2);
    const match = await this.matchRepository.create(payload);
    emitToMatch(match._id, SOCKET_EVENTS.MATCH_CREATED, { matchId, status });
    return match;
  }
}
```

### Service Responsibilities
- Business rule validation (e.g., teams must differ, squad must exist)
- Calling multiple repositories for cross-resource operations
- Emitting Socket.IO events after state changes
- Throwing typed errors (NotFound, Conflict, BadRequest)
- Constructor injection for testability

---

## 19. Controller Layer

Controllers handle HTTP concerns only:

```js
class PublicTeamController {
  listTeams = asyncHandler(async (_req, res) => {
    const teams = await this.teamService.listTeams();
    return new ApiResponse(200, "Teams fetched successfully", teams).send(res);
  });
}
```

### Controller Rules
- Parse request data (`req.validated`, `req.params`, `req.user`)
- Call exactly one service method
- Return response via `ApiResponse` or direct `res.json()`
- NO business logic
- Wrapped with `asyncHandler` for error forwarding

---

## 20. Route Layer

Routes define URL mappings and middleware chains:

```js
class MatchRoute {
  registerRoutes() {
    this.router.post("/",
      authenticateRequest,
      authorizeRoles([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
      validateRequest(createMatchSchema),
      this.matchController.createMatch,
    );
  }
}
```

### Route Structure
- **Public routes**: No auth required (read-only GET endpoints)
- **Private routes**: Auth + role authorization (write endpoints)
- **Admin routes**: Admin-only dashboard endpoints
- Each module exports a configured Router via class-based pattern
