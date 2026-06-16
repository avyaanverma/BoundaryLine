# BoundaryLine – Real-Time Cricket Scoring & Tournament Management Platform

BoundaryLine is a modern real-time cricket scoring and tournament management platform designed specifically for local leagues, community tournaments, academies, corporate cricket events, and grassroots cricket competitions.

The platform enables organizers, scorers, players, and spectators to follow matches live with ball-by-ball updates, detailed scorecards, points tables, player statistics, and tournament standings. Organizers can create and manage tournaments, schedule fixtures, track team performance, and publish live scores directly from the ground.

# BoundaryLine Documentation

**Real-Time Cricket Scoring & Match Management Platform**

> A production-grade, full-stack cricket scoring platform with real-time updates, role-based access control, and a modular 5-layer architecture — inspired by platforms like Cricbuzz.

---

## Table of Contents

| # | Section | File |
|---|---------|------|
| 1 | Project Overview | [./README.md](#1-project-overview) |
| 2 | Features | [./README.md](#2-features) |
| 3 | Architecture Overview | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md) |
| 4 | Folder Structure Explanation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#folder-structure) |
| 5 | Database Design | [.docs/backend/DATABASE.md](backend/DATABASE.md) |
| 6 | ER Diagram Description | [.docs/backend/DATABASE.md](backend/DATABASE.md#er-diagram-description) |
| 7 | Authentication Flow | [.docs/backend/SECURITY.md](backend/SECURITY.md#authentication-flow) |
| 8 | Authorization Flow | [.docs/backend/SECURITY.md](backend/SECURITY.md#authorization-flow) |
| 9 | Request Lifecycle | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#request-lifecycle) |
| 10 | API Architecture | [.docs/backend/API.md](backend/API.md#api-architecture) |
| 11 | Socket Architecture | [.docs/backend/SOCKET.md](backend/SOCKET.md) |
| 12 | Module-wise Documentation | [.docs/backend/MODULES.md](backend/MODULES.md) |
| 13 | Database Schemas Explanation | [.docs/backend/DATABASE.md](backend/DATABASE.md#database-schemas) |
| 14 | API Endpoints Documentation | [.docs/backend/API.md](backend/API.md) |
| 15 | Validation Layer Documentation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#validation-layer) |
| 16 | Middleware Documentation | [.docs/backend/SECURITY.md](backend/SECURITY.md#middleware-layer) |
| 17 | Repository Pattern Documentation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#repository-layer) |
| 18 | Service Layer Documentation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#service-layer) |
| 19 | Controller Layer Documentation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#controller-layer) |
| 20 | Route Layer Documentation | [.docs/backend/ARCHITECTURE.md](backend/ARCHITECTURE.md#route-layer) |
| 21 | Frontend Architecture | [.docs/frontend/ARCHITECTURE.md](frontend/ARCHITECTURE.md) |
| 22 | React Query Usage | [.docs/frontend/STATE_MANAGEMENT.md](frontend/STATE_MANAGEMENT.md#react-query) |
| 23 | Redux Store Design | [.docs/frontend/STATE_MANAGEMENT.md](frontend/STATE_MANAGEMENT.md#redux-store) |
| 24 | Real-Time Communication Flow | [.docs/backend/SOCKET.md](backend/SOCKET.md#real-time-communication-flow) |
| 25 | Deployment Guide | [.docs/DEPLOYMENT.md](DEPLOYMENT.md) |
| 26 | Environment Variables | [.docs/DEPLOYMENT.md](DEPLOYMENT.md#environment-variables) |
| 27 | Security Best Practices | [.docs/backend/SECURITY.md](backend/SECURITY.md#security-best-practices) |
| 28 | Scalability Considerations | [.docs/DEPLOYMENT.md](DEPLOYMENT.md#scalability) |
| 29 | Future Improvements | [.docs/DEPLOYMENT.md](DEPLOYMENT.md#future-improvements) |
| 30 | Developer Onboarding Guide | [.docs/CONTRIBUTING.md](CONTRIBUTING.md) |

---

## 1. Project Overview

**BoundaryLine** is a modern real-time cricket scoring and tournament management platform designed for local leagues, community tournaments, academies, corporate cricket events, and grassroots cricket competitions.

The platform enables organizers, scorers, players, and spectators to follow matches live with ball-by-ball updates, detailed scorecards, points tables, player statistics, and tournament standings. Organizers can create and manage tournaments, schedule fixtures, track team performance, and publish live scores directly from the ground.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (Access + Refresh Tokens), Google OAuth 2.0 |
| **Real-Time** | Socket.IO |
| **Validation** | Zod |
| **Frontend** | React 19, Vite, TailwindCSS 4 |
| **State Management** | Redux Toolkit + TanStack React Query |
| **HTTP Client** | Axios |

---

## 2. Features

### Core Features
- **Match Management**: Create, update, schedule, and manage cricket matches with full lifecycle tracking
- **Series & Tournament Management**: Group matches into bilateral series or multi-team tournaments
- **Team & Player Management**: CRUD operations for teams, players, and squad assignments
- **Real-Time Live Scoring**: Ball-by-ball score updates with instant broadcast via Socket.IO
- **Live Commentary**: Structured ball-by-ball commentary with enriched event data (runs, wickets, extras)
- **Playing XI Selection**: Validate and submit playing XI with captain, vice-captain, and wicket-keeper assignments
- **Squad Management**: Assign players to teams for specific series/tournaments
- **Authentication & Authorization**: JWT-based auth with cookie support, Google OAuth, and RBAC

### Authentication Features
- Email/Password Registration & Login
- Google OAuth 2.0 (Passport.js)
- JWT Access Token + Refresh Token strategy
- HTTP-only cookie-based token storage
- Role-Based Access Control (RBAC)
- Token refresh flow
- User verification (`/me` endpoint)

### User Roles
| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Full system access, can promote users, manage all resources |
| `ADMIN` | Administrative access to manage matches, teams, players, series |
| `SCORER` | Can update live scores and commentary during active matches |
| `USER` | Basic read-only access to public endpoints |

### Match Lifecycle
```
UPCOMING → TOSS_COMPLETED → PLAYING_XI_SELECTED → LIVE → INNINGS_BREAK → COMPLETED
```

### Real-Time Socket Events
| Category | Events |
|----------|--------|
| **Match** | `match.created`, `match.updated`, `match.started`, `match.completed`, `match.status.updated` |
| **Toss** | `toss.completed` |
| **Playing XI** | `playingXI.submitted`, `playingXI.updated` |
| **Score** | `score.created`, `score.updated`, `score.deleted` |
| **Commentary** | `commentary.created`, `commentary.updated`, `commentary.deleted` |
| **Innings** | `innings.started`, `innings.completed` |
| **Over** | `over.completed` |
| **Room** | `match.join`, `match.leave` |

---

## Project Structure Overview

```
BoundaryLine/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── app/                # Redux store, providers, guards
│   │   ├── features/           # Feature-based modules
│   │   ├── layout/             # Layout components
│   │   ├── pages/              # Page entry components
│   │   ├── routes/             # React Router configuration
│   │   └── shared/             # Hooks, components, utils, lib
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Backend (Express)
│   ├── src/
│   │   ├── app.js              # Express app factory
│   │   ├── config/             # DB, env configuration
│   │   ├── constant/           # App-wide constants
│   │   ├── middleware/         # Auth, validation, security, error
│   │   ├── model/              # Mongoose schemas
│   │   ├── modules/            # Feature modules (public, private, admin)
│   │   ├── repository/         # Data access layer
│   │   ├── shared/             # Errors, utils, socket, validators
│   │   ├── socket/             # Socket.IO initialization
│   │   └── validators/         # Zod validation schemas
│   ├── server.js               # Entry point
│   └── package.json
│
├── .docs/                       # Documentation
└── Readme.md                   # Project readme
```
