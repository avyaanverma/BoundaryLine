# Deployment Guide

> **Production-Ready Deployment | Environment Configuration | Scalability | Future Roadmap**

---

## 25. Deployment Guide

### Prerequisites

- **Node.js** v18+ (LTS recommended)
- **MongoDB** v6+ (local or Atlas)
- **npm** or **pnpm**

### Local Development Setup

#### 1. Clone & Install

```bash
git clone <repository-url>
cd BoundaryLine

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

#### 2. Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/boundaryline
NODE_ENV=development
LOGGER_LEVEL=info
MORGAN_LOGGER=dev
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
RATELIMIT_WINDOWMS=900000
RATELIMIT_MAX=100
DATA_LIMIT=3mb

# Google OAuth (create credentials at https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
REDIRECT_URL=http://localhost:5173

# JWT Secrets (generate with: openssl rand -hex 32)
ACCESS_TOKEN_SECRET=your-32-char-access-secret-minimum
REFRESH_TOKEN_SECRET=your-32-char-refresh-secret-minimum
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

#### 3. Start Development

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:5000/api

### Production Build

#### Backend
```bash
cd server
NODE_ENV=production npm start
# or use a process manager:
pm2 start server.js --name boundaryline-api
```

#### Frontend
```bash
cd client
npm run build  # Output in client/dist/
# Serve with nginx, Vercel, Netlify, etc.
```

### Deployment Platforms

#### Backend (Render / Railway / Fly.io / AWS EC2)

1. Set environment variables in the platform dashboard
2. Build command: `cd server && npm install`
3. Start command: `node server.js`
4. Ensure MongoDB Atlas connection string is set

#### Frontend (Vercel / Netlify)

1. Connect GitHub repository
2. Build command: `cd client && npm install && npm run build`
3. Output directory: `client/dist`
4. Environment variable: `VITE_API_URL=https://your-api-url.com/api/v1`
5. Add redirect rule for SPA routing (`/*` → `/index.html`)

### Docker Deployment

```dockerfile
# server/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

```dockerfile
# client/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 26. Environment Variables

### Server Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `MONGO_URI` | Yes* | mongodb://127.0.0.1:27017/boundaryline | MongoDB connection string |
| `NODE_ENV` | No | development | Environment (development/production/test) |
| `LOGGER_LEVEL` | No | info | Pino log level |
| `MORGAN_LOGGER` | No | dev | Morgan log format |
| `CORS_ORIGIN` | No | http://localhost:5173 | Comma-separated allowed origins |
| `RATELIMIT_WINDOWMS` | No | 900000 | Rate limit window (15 min) |
| `RATELIMIT_MAX` | No | 100 | Max requests per window |
| `DATA_LIMIT` | No | 3mb | Request body size limit |
| `GOOGLE_CLIENT_ID` | Yes | — | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | — | Google OAuth client secret |
| `GOOGLE_CALLBACK_URL` | Yes | — | Google OAuth callback URL |
| `REDIRECT_URL` | Yes | — | Post-OAuth redirect URL |
| `ACCESS_TOKEN_SECRET` | Yes | — | JWT access token secret (min 16 chars) |
| `REFRESH_TOKEN_SECRET` | Yes | — | JWT refresh token secret (min 16 chars) |

> *`MONGO_URI` is required in production; development uses a local default.*

### Client Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | No | http://localhost:5000/api/v1 | Backend API base URL |

---

## 28. Scalability Considerations

### Current Architecture Scalability

| Aspect | Strategy |
|--------|----------|
| **Stateless API** | JWT tokens enable horizontal scaling — no server-side sessions |
| **Database Indexing** | Compound indexes on all frequent query patterns (status+startTime, matchId+innings) |
| **Soft Deletes** | `isDeleted` flag preserves referential integrity without hard deletes |
| **Population Control** | `.populate()` only selects necessary fields (`name shortName logo primaryColor`) |
| **Lean Queries** | `.lean()` on all read queries for performance |
| **Pagination** | Commentary and user endpoints support `page`/`limit` pagination |
| **CORS Origin Array** | Multiple origins supported via comma-separated env variable |
| **Dual Route Prefix** | Backward-compatible `/api` and `/api/v1` prefixes |

### Recommended for Production Scale

#### Horizontal Scaling
1. **Multiple API instances** behind a load balancer (nginx, AWS ALB)
2. **Shared MongoDB** (Atlas with replica sets)
3. **Socket.IO adapter** (Redis adapter for multi-instance WebSocket broadcasting):
   ```bash
   npm install @socket.io/redis-adapter redis
   ```
4. **Redis caching** for frequently accessed data (match lists, team directories)

#### Database Optimization
1. **MongoDB Atlas** with auto-scaling
2. **Covered queries** — create indexes that cover all selected fields
3. **Read preference** — secondary reads for GET endpoints
4. **TTL indexes** for auto-expiry of old commentary/scores

#### Application Optimization
1. **Rate limiting by endpoint** — stricter limits on auth routes
2. **Response compression** (already implemented via `compression`)
3. **CDN** for static assets (frontend on Vercel/Netlify)
4. **Database connection pooling** (Mongoose handles this natively)
5. **Request validation early** (Zod before auth — already implemented)

#### Monitoring & Observability
1. **Structured logging** (Pino — already configured)
2. **Application metrics** (Prometheus + Grafana)
3. **Error tracking** (Sentry)
4. **API monitoring** (Postman monitors, UptimeRobot)

---

## 29. Future Improvements

### Short-Term (Q3 2026)

| Feature | Priority | Description |
|---------|----------|-------------|
| **Logout endpoint** | High | Implement `POST /api/auth/logout` to clear cookies |
| **Email verification** | Medium | Send verification email on registration |
| **Password reset** | Medium | Forgot/reset password flow |
| **Refresh token rotation** | Medium | Issue new refresh token with each refresh |
| **Account locking** | Low | Lock account after N failed login attempts |

### Medium-Term (Q4 2026)

| Feature | Priority | Description |
|---------|----------|-------------|
| **Match scheduling** | High | Calendar-based match scheduler with conflict detection |
| **Points table** | High | Auto-calculated standings for series/tournaments |
| **Player statistics** | High | Batting, bowling, fielding aggregations |
| **Tournament bracket** | Medium | Knockout stage bracket generation |
| **Image upload** | Medium | Player/team logo upload (Cloudinary/S3) |
| **Live streaming** | Low | Embedded video stream with synchronized scoring |
| **Mobile app API** | Medium | Dedicated mobile API endpoints with reduced payloads |

### Long-Term (2027+)

| Feature | Description |
|---------|-------------|
| **AI-powered insights** | Win probability, player form analysis, match predictions |
| **Multi-language support** | i18n for international tournaments |
| **Offline scoring** | PWA with offline fallback and sync |
| **Fantasy cricket** | User-created fantasy teams based on real matches |
| **Sponsorship/branding** | Sponsor logos on scorecards, ad placements |
| **Advanced analytics** | Wagon wheels, pitch maps, batting/bowling heat maps |
