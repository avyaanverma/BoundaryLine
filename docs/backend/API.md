# API Documentation

> **RESTful API | Versioned (/api & /api/v1) | Dual Prefix | Standardized Responses**

---

## 10. API Architecture

### Base URLs

All endpoints are available under both prefixes for backward compatibility:

```
http://localhost:5000/api/v1/...
http://localhost:5000/api/...
```

### Response Format

#### Success
```json
{
  "success": true,
  "message": "Matches fetched successfully",
  "data": { ... }
}
```

#### Error
```json
{
  "success": false,
  "message": "Match not found",
  "details": null
}
```

#### Validation Error
```json
{
  "success": false,
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "venue": ["Venue is required"]
    }
  }
}
```

### Response Classes
- `ApiResponse(statusCode, message, data)` — Success response wrapper
- `buildSuccessResponse(message, data, statusCode)` — Alternative success builder
- `AppError(message, statusCode, details)` — Base operational error

### HTTP Status Codes Used
| Code | Usage |
|------|-------|
| 200 | GET/PATCH success |
| 201 | POST resource created |
| 400 | Validation failure / Bad Request |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Resource not found |
| 409 | Conflict (duplicate) |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## 14. API Endpoints

### Authentication

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/auth/register` | No | — | Register new user |
| POST | `/auth/login` | No | — | Login with email + password |
| GET | `/auth/google` | No | — | Start Google OAuth flow |
| GET | `/auth/google/callback` | No | — | Google OAuth callback |
| GET | `/auth/refreshToken` | No | — | Refresh access token |
| GET | `/auth/me` | Yes | — | Get current authenticated user |
| PATCH | `/auth/make-admin` | Yes | SUPER_ADMIN | Promote user role |

### Matches

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/matches` | No | — | List all active matches |
| GET | `/matches/:id` | No | — | Get match by ID |
| POST | `/private/matches` | Yes | ADMIN, SUPER_ADMIN | Create match |
| PATCH | `/private/matches/:id` | Yes | ADMIN, SUPER_ADMIN | Update match |
| DELETE | `/private/matches/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete match |

### Teams

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/teams` | No | — | List all active teams |
| GET | `/teams/:id` | No | — | Get team by ID |
| POST | `/private/teams` | Yes | ADMIN, SUPER_ADMIN | Create team |
| PATCH | `/private/teams/:id` | Yes | ADMIN, SUPER_ADMIN | Update team |
| DELETE | `/private/teams/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete team |

### Players

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/players` | No | — | List players (optional `?role=` filter) |
| GET | `/players/:id` | No | — | Get player by ID |
| POST | `/private/players` | Yes | ADMIN, SUPER_ADMIN | Create player |
| PATCH | `/private/players/:id` | Yes | ADMIN, SUPER_ADMIN | Update player |
| DELETE | `/private/players/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete player |

### Series

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/series` | No | — | List all active series |
| GET | `/series/:id` | No | — | Get series by ID |
| POST | `/private/series` | Yes | ADMIN, SUPER_ADMIN | Create series |
| PATCH | `/private/series/:id` | Yes | ADMIN, SUPER_ADMIN | Update series |
| DELETE | `/private/series/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete series |

### Tournaments

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/tournaments` | No | — | List all active tournaments |
| GET | `/tournaments/:id` | No | — | Get tournament by ID |
| POST | `/private/tournaments` | Yes | ADMIN, SUPER_ADMIN | Create tournament |
| PATCH | `/private/tournaments/:id` | Yes | ADMIN, SUPER_ADMIN | Update tournament |
| DELETE | `/private/tournaments/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete tournament |

### Scores

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/scores/match/:matchId` | No | — | Get scores by match |
| POST | `/private/scores` | Yes | ADMIN, SUPER_ADMIN, SCORER | Create score entry |
| PATCH | `/private/scores/:id` | Yes | ADMIN, SUPER_ADMIN, SCORER | Update score |
| DELETE | `/private/scores/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete score |

### Commentary

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/commentary/match/:matchId` | No | — | Get commentary by match (paginated) |
| POST | `/private/commentary` | Yes | ADMIN, SUPER_ADMIN, SCORER | Add commentary entry |
| DELETE | `/private/commentary/:id` | Yes | ADMIN, SUPER_ADMIN | Delete commentary |

### Squads

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/squads` | No | — | List all squads |
| GET | `/squads/:id` | No | — | Get squad by ID |
| POST | `/private/squads` | Yes | ADMIN, SUPER_ADMIN | Create squad |
| PATCH | `/private/squads/:id` | Yes | ADMIN, SUPER_ADMIN | Update squad |
| DELETE | `/private/squads/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete squad |

### Playing XI

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/playing-xis` | No | — | List all playing XIs |
| GET | `/playing-xis/:id` | No | — | Get playing XI by ID |
| POST | `/private/playing-xis` | Yes | ADMIN, SUPER_ADMIN | Submit playing XI |
| PATCH | `/private/playing-xis/:id` | Yes | ADMIN, SUPER_ADMIN | Update playing XI |
| DELETE | `/private/playing-xis/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete playing XI |

### Users

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/private/users` | Yes | ADMIN, SUPER_ADMIN | Create user |
| GET | `/private/users` | Yes | ADMIN, SUPER_ADMIN | List users (paginated) |
| GET | `/private/users/:id` | Yes | ADMIN, SUPER_ADMIN | Get user by ID |
| PATCH | `/private/users/:id/role` | Yes | ADMIN, SUPER_ADMIN | Update user role |
| DELETE | `/private/users/:id` | Yes | ADMIN, SUPER_ADMIN | Soft-delete user |

### Admin Dashboard

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/admin/dashboard` | Yes | ADMIN, SUPER_ADMIN | Dashboard overview stats |
| GET | `/admin/matches` | Yes | ADMIN, SUPER_ADMIN | Match statistics |
| GET | `/admin/users` | Yes | ADMIN, SUPER_ADMIN | User statistics |
| GET | `/admin/players` | Yes | ADMIN, SUPER_ADMIN | Player statistics |
| GET | `/admin/health` | Yes | ADMIN, SUPER_ADMIN | System health check |

### Health

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/health` | No | — | Basic health check |
| GET | `/api/health` | No | — | Health check (aliased) |
| GET | `/api/v1/health` | No | — | Health check (versioned) |

---

## Query Parameters

| Endpoint | Parameter | Type | Description |
|----------|-----------|------|-------------|
| GET `/players` | `role` | Enum | Filter by player role |
| GET `/commentary/match/:matchId` | `page` | Number | Page number (default: 1) |
| GET `/commentary/match/:matchId` | `limit` | Number | Items per page (default: 50, max: 100) |
| GET `/users` | `page` | Number | Page number (default: 1) |
| GET `/users` | `limit` | Number | Items per page (default: 10, max: 100) |
| GET `/admin/matches` | `days` | Number | Last N days filter |
| GET `/admin/matches` | `seriesId` | ObjectId | Filter by series |
| GET `/admin/matches` | `limit` | Number | Result limit |
| GET `/admin/dashboard` | `includeStats` | Boolean | Force refresh stats |
