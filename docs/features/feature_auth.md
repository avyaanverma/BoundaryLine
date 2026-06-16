# Authentication Feature Documentation

## Overview

The Authentication Module is responsible for:

* User Registration
* User Login
* Google OAuth Authentication
* JWT Token Generation
* Access Token Refresh
* User Verification
* Role Management

The module follows a layered architecture:

```text
Route Layer
    ↓
Controller Layer
    ↓
Service Layer
    ↓
Repository Layer
    ↓
Database (MongoDB)
```

---

# Authentication Architecture

## Route Layer

Responsible for:

* Defining API endpoints
* Applying middleware
* Delegating requests to controllers

Example:

```js
router.post(
  "/login",
  asyncHandler(authController.loginController.bind(authController))
);
```

---

## Controller Layer

Responsible for:

* Receiving HTTP requests
* Basic request validation
* Calling service methods
* Setting authentication cookies
* Returning HTTP responses

Controllers should not contain business logic.

Example:

```js
const { accessToken, refreshToken } =
  await this.userService.loginService(userData);
```

---

## Service Layer

Responsible for:

* Authentication business logic
* User creation
* User lookup
* Password verification
* Token generation
* OAuth processing

Example:

```js
const isMatch = await user.comparePassword(payload.password);
```

---

## Repository Layer

Responsible for:

* Database interaction
* User CRUD operations
* Query abstraction

Example:

```js
await this.userRepo.findByEmail(email);
```

---

# User Model

## Schema Fields

```js
{
  name: String,
  email: String,
  password: String,
  role: String,
  picture: String,
  isDeleted: Boolean
}
```

---

## Role Field

Available roles are defined in:

```js
ROLES
```

Default role:

```js
ROLES.SCORER
```

---

# Password Security

## Password Hashing

Passwords are never stored in plain text.

Before saving a user, a Mongoose pre-save hook hashes the password.

```js
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
```

---

## Password Verification

A schema method is provided for login verification.

```js
userSchema.methods.comparePassword =
  async function (candidatePassword) {
    return await bcrypt.compare(
      candidatePassword,
      this.password
    );
  };
```

---

# JWT Authentication

## Access Token

Purpose:

* Authenticate API requests
* Verify logged-in users

Generated using:

```js
jwt.sign(
  payload,
  ACCESS_TOKEN_SECRET,
  accessTokenConfig
);
```

Stored in:

```text
HTTP Cookie
```

---

## Refresh Token

Purpose:

* Generate new access tokens
* Avoid forcing users to login repeatedly

Generated using:

```js
jwt.sign(
  payload,
  REFRESH_TOKEN_SECRET,
  refreshTokenConfig
);
```

Stored in:

```text
HTTP Cookie
```

---

# Authentication Flow

## Registration Flow

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Process

1. Request reaches controller.
2. Controller validates request body.
3. Service checks if email already exists.
4. Password is hashed automatically.
5. User is stored in database.
6. Access token is generated.
7. Refresh token is generated.
8. Tokens are stored in cookies.
9. Success response is returned.

### Possible Errors

#### User Already Exists

```http
409 Conflict
```

Response:

```json
{
  "success": false,
  "message": "User Already Exists."
}
```

---

# Login Flow

## Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Process

1. User submits credentials.
2. Service finds user by email.
3. Password is verified using bcrypt.
4. JWT tokens are generated.
5. Tokens are stored in cookies.
6. User information is returned.

### Possible Errors

#### Email Not Found

```http
404 Not Found
```

Response:

```json
{
  "success": false,
  "message": "Email not found."
}
```

#### Invalid Password

```http
401 Unauthorized
```

Response:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

# Google OAuth Authentication

## Start Authentication

### Endpoint

```http
GET /api/auth/google
```

### OAuth Scopes

```js
scope: ["profile", "email"]
```

### Prompt

```js
prompt: "select_account"
```

---

## Google Callback

### Endpoint

```http
GET /api/auth/google/callback
```

### Process

1. User authenticates with Google.
2. Google returns user profile.
3. Application checks if user exists.
4. Existing user is returned.
5. New user is created if necessary.
6. JWT tokens are generated.
7. Tokens are stored in cookies.
8. User is redirected to frontend.

---

# Create Or Find User

Google OAuth uses:

```js
createOrFindUser(payload)
```

Logic:

```text
User Exists
    ↓
Return Existing User

User Does Not Exist
    ↓
Create User
    ↓
Return New User
```

---

# Refresh Token Flow

## Endpoint

```http
GET /api/auth/refreshToken
```

### Purpose

Generate a new access token using a valid refresh token.

### Process

1. Refresh token is extracted from cookies.
2. Refresh token is verified.
3. User payload is extracted.
4. New access token is generated.
5. Access token cookie is updated.
6. Success response is returned.

### Success Response

```json
{
  "success": true,
  "message": "Access token refreshed successfully"
}
```

---

# User Verification

## Endpoint

```http
GET /api/auth/me
```

### Middleware

```js
authMiddleware
```

### Purpose

Verify whether a user is authenticated and return current user information.

### Process

1. Access token is extracted from cookies.
2. Token is verified.
3. Decoded payload is attached to request.

```js
req.user
```

4. Controller returns user information.

### Success Response

```json
{
  "success": true,
  "message": "User Verified",
  "data": {
    "_id": "...",
    "email": "...",
    "role": "..."
  }
}
```

---

# Role Management

## Make Admin

### Endpoint

```http
PATCH /api/auth/make-admin
```

### Purpose

Promote a user to ADMIN role.

### Note

This endpoint is intended only for development/testing purposes and should not be exposed in production environments.

---

# Cookies

The application stores authentication tokens inside HTTP cookies.

## Cookies Used

### Access Token

```text
accessToken
```

### Refresh Token

```text
refreshToken
```

Cookie configuration is managed through:

```js
app_config().cookie
```

---

# Error Handling

The module uses centralized error handling.

## AppError

Used for business logic errors.

Example:

```js
throw new AppError(
  "User Already Exists.",
  StatusCodes.CONFLICT
);
```

---

## NotFound

Used when a requested resource does not exist.

Example:

```js
throw new NotFound(
  "Email not found."
);
```

---

# Async Error Handling

Controllers are wrapped using:

```js
asyncHandler()
```

Example:

```js
router.post(
  "/login",
  asyncHandler(
    authController.loginController.bind(authController)
  )
);
```

This eliminates repetitive try-catch blocks.

---

# Current Authentication Routes

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | /api/auth/google          | Start Google OAuth        |
| GET    | /api/auth/google/callback | Google OAuth callback     |
| GET    | /api/auth/refreshToken    | Refresh access token      |
| GET    | /api/auth/me              | Verify authenticated user |
| POST   | /api/auth/register        | Register user             |
| POST   | /api/auth/login           | Login user                |
| PATCH  | /api/auth/make-admin      | Promote user to ADMIN     |

---

# Security Features

Implemented:

* Password Hashing using bcrypt
* JWT Authentication
* Access Token / Refresh Token Strategy
* Cookie-Based Authentication
* Google OAuth Authentication
* Centralized Error Handling
* Repository Pattern
* Service Layer Abstraction

---

# Future Improvements

Recommended additions:

* Logout Endpoint
* Email Verification
* Password Reset Flow
* Refresh Token Rotation
* Account Locking after Multiple Failed Logins
* Rate Limiting
* Request Validation (Zod/Joi)
* Role-Based Authorization Middleware
* Secure Cookie Configuration for Production
* Token Blacklisting
* Audit Logging
