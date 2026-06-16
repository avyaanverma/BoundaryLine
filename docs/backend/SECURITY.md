# Security & Authentication

> **JWT | HTTP-Only Cookies | Google OAuth 2.0 | RBAC | Helmet | Rate Limiting | CORS**

---

## 7. Authentication Flow

### Registration Flow

```
1. POST /api/auth/register
   Body: { name, email, password }
       │
2. Controller receives request
       │
3. Zod validates request body
       │
4. AuthService.registerService()
   ├── Check if email already exists → 409 if duplicate
   ├── Create user via UserRepo.create()
   │   └── Password auto-hashed via Mongoose pre-save hook
   ├── Generate JWT access token (1h expiry)
   ├── Generate JWT refresh token (30d expiry)
   └── Return tokens + user payload
       │
5. Controller sets HTTP-only cookies:
   ├── accessToken (15min dev / 1h prod)
   └── refreshToken (15min dev / 30d prod)
       │
6. Response: 201 { success, message, data: user }
```

### Login Flow

```
1. POST /api/auth/login
   Body: { email, password }
       │
2. Controller validates → AuthService.loginService()
   ├── Find user by email → 404 if not found
   ├── Check if password login is enabled → 401 if Google-only
   ├── Compare password via bcrypt → 401 if mismatch
   ├── Generate JWT tokens
   └── Return tokens + user payload
       │
3. Controller sets HTTP-only cookies
4. Response: 200 { success, message, data: user }
```

### Google OAuth Flow

```
1. GET /api/auth/google
   └── Redirects to Google consent screen (scope: profile, email)
       │
2. User authenticates with Google
       │
3. GET /api/auth/google/callback
   └── Passport.authenticate("google") handles callback
       │
4. AuthService.googleLogin()
   ├── Extract email from Google profile
   ├── AuthService.createOrFindUser()
   │   ├── Find by googleId → return if exists
   │   ├── Find by email → link googleId if exists
   │   └── Create new user if not found
   ├── Generate JWT tokens
   └── Return tokens
       │
5. Set cookies, redirect to frontend (REDIRECT_URL)
```

### Token Refresh Flow

```
1. GET /api/auth/refreshToken
   └── Extract refreshToken from cookies
       │
2. AuthService.refreshAccessToken()
   ├── Verify refresh token using REFRESH_TOKEN_SECRET
   ├── Sign new access token with existing payload
   └── Return new access token
       │
3. Update accessToken cookie
4. Response: 200 { message: "Token generated successfully" }
```

### User Verification Flow

```
1. GET /api/auth/me
   ├── authMiddleware extracts token from Authorization header or cookie
   ├── JWT.verify(token, ACCESS_TOKEN_SECRET)
   └── Attaches decoded payload to req.user
       │
2. Controller returns user data
3. Response: 200 { success, message, data: req.user }
```

---

## 8. Authorization Flow

### Role-Based Access Control (RBAC)

```
Request → authenticateRequest → authorizeRoles([allowedRoles]) → Controller
```

**Roles (hierarchical):**
- `SUPER_ADMIN` — Bypasses all role checks
- `ADMIN` — Manage resources (matches, teams, players, series)
- `SCORER` — Live scoring and commentary
- `USER` — Read-only public access

**Auth middleware chain:**
```js
// 1. Extract token (Bearer header or cookie)
function getAccessToken(req) { ... }

// 2. Verify JWT
authenticateRequest(req, res, next) {
  req.user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  next();
}

// 3. Check role
authorizeRoles(["ADMIN", "SUPER_ADMIN"]) {
  if (req.user.role === SUPER_ADMIN) return next(); // Super admin bypass
  if (allowedRoles.includes(req.user.role)) return next();
  throw new Forbidden();
}
```

### Multiple Auth Middleware Aliases

The codebase provides multiple import names for flexibility:
- `authenticateRequest` / `authenticate` / `authMiddleware`
- `authorizeRoles` / `authorize` / `authorizationMiddleware`

---

## 16. Middleware Layer

### Middleware Pipeline Order

```js
// In app.js:
securityMiddleware(app);
// 1. CORS (with credentials)
// 2. Helmet (security headers)
// 3. HPP (HTTP parameter pollution protection)
// 4. Rate Limiting (100 requests per 15 minutes per IP)
// 5. Body parsing (JSON + URL-encoded, 3MB limit)
// 6. Compression (gzip/brotli)

googleOAuthMiddleware(app);
// 7. Passport initialization
// 8. Google OAuth 2.0 strategy

registerFeatureRoutes(app, "/api");
// Per-route:
// 9. validateRequest (Zod) — catches invalid input before auth
// 10. authenticateRequest (JWT) — identifies user
// 11. authorizeRoles (RBAC) — checks permissions
// 12. Controller — processes the request

// Global error handlers:
app.use(notFoundHandler);
app.use(errorHandler);
```

### Middleware Details

| Middleware | Package | Purpose |
|-----------|---------|---------|
| `cors()` | cors | Allow configured origins with credentials |
| `helmet()` | helmet | Set secure HTTP headers |
| `hpp()` | hpp | Prevent HTTP parameter pollution |
| `rateLimit()` | express-rate-limit | 100 req/15min per IP |
| `express.json()` | express | Parse JSON bodies (3MB limit) |
| `express.urlencoded()` | express | Parse form data (3MB limit) |
| `compression()` | compression | Gzip/brotli response compression |
| `morgan()` | morgan | Request logging (development only) |
| `passport.initialize()` | passport | OAuth strategy bootstrap |
| `validateRequest()` | zod | Request body/params/query validation |
| `authenticateRequest()` | jsonwebtoken | JWT verification |
| `authorizeRoles()` | — | Role-based access check |
| `notFoundHandler()` | — | 404 for unmatched routes |
| `errorHandler()` | — | Centralized error JSON response |

### Error Classes

| Class | Status | Usage |
|-------|--------|-------|
| `AppError` | varies | Base class for all operational errors |
| `BadRequest` | 400 | Invalid input / business rule violation |
| `Unauthorized` | 401 | Missing/invalid authentication |
| `Forbidden` | 403 | Insufficient role permissions |
| `NotFound` | 404 | Resource does not exist |
| `Conflict` | 409 | Duplicate resource |

### Error Response Format

```json
{
  "message": "Match not found",
  "details": null,
  "success": false
}
```

---

## 27. Security Best Practices

### Implemented

| Practice | Implementation |
|----------|---------------|
| **Password Hashing** | bcrypt with salt rounds = 10 |
| **Password Field Protection** | `select: false` on password field |
| **JWT Authentication** | Access + Refresh token strategy |
| **HTTP-Only Cookies** | Tokens stored in httpOnly, sameSite cookies |
| **Secure Cookies in Production** | `secure: true` when NODE_ENV=production |
| **CORS** | Whitelist of allowed origins (from env) |
| **Helmet** | Security headers (XSS, clickjacking, etc.) |
| **Rate Limiting** | 100 requests per 15 minutes per IP |
| **HPP Protection** | Prevent HTTP parameter pollution |
| **Request Size Limiting** | 3MB max body size |
| **Input Validation** | Zod schema validation on all endpoints |
| **Soft Delete** | `isDeleted` flag instead of hard deletes |
| **Centralized Error Handling** | No stack traces leaked in production |
| **Environment Validation** | Zod validates all env vars at startup |
| **Production-Only Checks** | MONGO_URI required in production |

### Recommended Additions
- **Rate limiting on auth routes** (stricter limits for login/register)
- **Account locking** after repeated failed login attempts
- **Token blacklisting** for immediate session invalidation
- **CSP headers** (Content Security Policy)
- **API key authentication** for external integrations
- **Audit logging** for all admin operations
- **Request logging** using morgan (dev only) or structured logging (production)
