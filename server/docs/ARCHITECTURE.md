# Project Architecture

The BoundaryLine backend is built with a focus on **modularity**, **scalability**, and **clean code**. It follows a tiered architecture that separates concerns at every level.

## 🏗️ The 4-Tier Pattern

Each feature module is typically broken down into four distinct layers:

### 1. Controller Layer (`*.controller.js`)
- **Responsibility**: Handles incoming HTTP requests.
- **Tasks**:
  - Parses request parameters, query, and body.
  - Calls the appropriate Service method.
  - Sends the HTTP response with the correct status code.
  - Does NOT contain business logic.

### 2. Service Layer (`*.service.js`)
- **Responsibility**: Contains the core business logic.
- **Tasks**:
  - Validates business rules (e.g., "Can a match be started if players aren't selected?").
  - Orchestrates calls to multiple repositories if needed.
  - Handles complex data transformations.
  - Emits socket events for real-time updates.

### 3. Repository Layer (`*.repository.js`)
- **Responsibility**: Abstracts the data source (MongoDB).
- **Tasks**:
  - Performs CRUD operations.
  - Executes complex database queries and aggregations.
  - Keeps the Service layer agnostic of the database implementation.

### 4. Model Layer (`*.model.js`)
- **Responsibility**: Defines the data structure.
- **Tasks**:
  - Mongoose schemas and indexes.
  - Field types, defaults, and validations.

## 📂 Modular Folders (`src/modules`)

To separate public-facing APIs from internal/admin management APIs, we use a tiered module structure:

- **`public/`**: Read-only or user-facing APIs (e.g., viewing live scores, match lists).
- **`private/`**: Write-intensive or restricted APIs (e.g., updating scores, managing squads).
- **`admin/`**: High-level administrative tasks (e.g., user management, system configuration).

## 🛡️ Middlewares

- **Auth**: Ensures the user is authenticated and has the correct permissions.
- **Validation**: Uses Zod to validate request bodies before they reach the controller.
- **Error**: Centralized error handling using a custom `AppError` class.
- **Security**: Implements Helmet, HPP, and Rate Limiting to protect against common web vulnerabilities.

## 📡 Real-time Data Flow

When a score is updated:
1. `ScoreController` receives the request.
2. `ScoreService` processes the update and saves it via `ScoreRepository`.
3. `ScoreService` calls the `Socket` utility to emit the update to the specific match room.
4. Connected clients in that room receive the live update instantly.
