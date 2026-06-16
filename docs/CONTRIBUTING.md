# Developer Onboarding Guide

> **Contribution Guidelines | Coding Standards | Git Workflow | Developer Setup**

---

## 30. Developer Onboarding Guide

### Quick Start (20 minutes)

#### 1. Prerequisites

- [Node.js](https://nodejs.org) v18+ or v20+
- [MongoDB](https://www.mongodb.com/try/download/community) v6+ (local or [Atlas](https://www.mongodb.com/atlas))
- [Git](https://git-scm.com/)
- Code editor (VS Code recommended)

#### 2. Repository Setup

```bash
# Clone the repository
git clone https://github.com/your-org/boundaryline.git
cd boundaryline

# Backend
cd server
npm install

# Frontend (separate terminal)
cd client
npm install
```

#### 3. Environment Configuration

```bash
# Backend (server/.env) — see .env.example
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets

# Frontend (client/.env)
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env
```

#### 4. Start Development

```bash
# Terminal 1: Backend
cd server
npm run dev
# Server starts at http://localhost:5000

# Terminal 2: Frontend
cd client
npm run dev
# App opens at http://localhost:5173
```

#### 5. Verify Everything Works

```bash
# Health check
curl http://localhost:5000/api/health

# List matches
curl http://localhost:5000/api/matches

# List teams
curl http://localhost:5000/api/teams
```

---

### Git Workflow

#### Branch Naming Convention

```
feature/{feature-name}     # New features
fix/{bug-name}             # Bug fixes
refactor/{module-name}     # Refactoring
docs/{topic}               # Documentation
chore/{task}               # Maintenance, dependencies
```

#### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add match scheduling endpoint
fix: validate team uniqueness on update
refactor: extract common auth middleware
docs: add API endpoint documentation
chore: update mongoose to v8
```

#### PR Process

1. Create branch from `main`
2. Implement changes with tests
3. Run `npm run lint` and `npm run build`
4. Create PR with description and screenshot (if UI change)
5. Request review from at least one maintainer
6. Squash-merge to `main`

---

### Coding Standards

#### Backend (JavaScript/Node.js)

| Rule | Standard |
|------|----------|
| **Runtime** | ES Modules (`"type": "module"` in package.json) |
| **Formatting** | Use Prettier (no trailing commas, single quotes) |
| **Naming** | camelCase for variables/functions, PascalCase for classes |
| **Error handling** | Throw typed AppError subclasses (NotFound, Conflict, BadRequest) |
| **Async** | Use `asyncHandler` wrapper — no raw try/catch in controllers |
| **Validation** | Zod schemas for all request inputs |
| **Comments** | Use What/Why/How comment blocks for complex logic |
| **Imports** | Named exports for utilities, default exports for classes |

#### Example: What/Why/How Comments

```js
function getAccessToken(req) {
  // What: extract the access token from supported request locations.
  // Why: browser flows use cookies while API clients often use Bearer headers.
  // How: prefer Authorization Bearer, then fall back to the accessToken cookie.
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) { ... }
  return getCookieValue(req.headers.cookie, "accessToken");
}
```

#### Service Layer Pattern

```js
class TeamService {
  constructor(teamRepository = new TeamRepository()) {
    // What: receive the repository dependency.
    // Why: constructor injection makes service logic easier to test later.
    this.teamRepository = teamRepository;
  }

  async createTeam(payload) {
    // What: create a team after checking identity uniqueness.
    // Why: duplicate team names or short codes break selectors and scoreboards.
    await this.ensureUniqueTeam(payload.name, payload.shortName);
    return this.teamRepository.create(payload);
  }
}
```

#### Frontend (React/JSX)

| Rule | Standard |
|------|----------|
| **Components** | Function components with hooks |
| **Naming** | PascalCase for components, camelCase for functions |
| **State** | Redux Toolkit for global state, useState for local UI state |
| **Server data** | TanStack React Query — no direct fetch in components |
| **Styling** | TailwindCSS utility classes |
| **Routing** | React Router v7 with createBrowserRouter |
| **Forms** | React Hook Form for complex forms |

---

### Architecture Decision Records

#### Why Soft Delete?

All collections use `isDeleted: Boolean` instead of hard deletes:
- **Audit trail**: Historical matches and scores remain accessible
- **Data integrity**: References to deleted records don't break
- **Recovery**: Accidental deletions can be reversed

#### Why Dual Route Prefix?

Both `/api` and `/api/v1` are registered:
- `/api`: Short, used by existing clients
- `/api/v1`: Standard versioning for future API evolution
- Both point to the same controllers

#### Why Two State Management Tools?

- **Redux Toolkit**: Client-only state (auth, scorer console)
- **React Query**: Server state (matches, teams, scores)
- Separation prevents stale cache issues and enables fine-grained refetch control

#### Why Repository Pattern?

- Database implementation can change without service changes
- All queries consistently filter `isDeleted: false`
- Population logic centralized in one place

---

### Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| **Unit tests** | Vitest / Jest | Service layer business logic |
| **Integration tests** | Supertest | API endpoints |
| **Frontend tests** | Vitest + React Testing Library | Component rendering |
| **E2E tests** | Playwright | Critical user flows |

### Current Test Status

- Backend: No automated tests yet (high priority)
- Frontend: No automated tests yet
- Manual testing via `GET /api/health` and `curl` commands

---

### Project Conventions Summary

| Aspect | Convention |
|--------|------------|
| **API versioning** | Dual prefix (`/api` and `/api/v1`) |
| **Error handling** | Centralized via AppError subclasses |
| **Soft delete** | `isDeleted: Boolean` on all collections |
| **Auth** | JWT in httpOnly cookies + Bearer header fallback |
| **Real-time** | Socket.IO rooms per match |
| **Validation** | Zod schemas in separate validator files |
| **Response format** | `{ success, message, data }` |
| **Module structure** | `public/` (read) + `private/` (write) |
| **Service injection** | Constructor injection with defaults |
| **Comments** | What/Why/How for non-obvious logic |
