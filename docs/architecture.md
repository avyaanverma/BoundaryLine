# CricPulse: Frontend Architecture Documentation

---

## 1. Directory Structure

CricPulse is organized around a highly modular, enterprise-grade, **Feature-Based Architecture**. It segregates logic by logical domain blocks rather than technical details. This prevents file clutter and accelerates developers' workflows in large teams.

```
src/
├── app/                        # Central app configurations
│   ├── providers/              # React Context Providers (Redux, TanStack, Sockets)
│   ├── store/                  # Central Redux Toolkit store definitions
│   └── guards/                 # RBAC filters and Route Guards (RoleGuard)
│
├── features/                   # Core application business features
│   ├── auth/                   # Identity and permission models (Zod, React Hook Form)
│   ├── scoreboard/             # Viewer dashboard visualization features
│   └── scorer-console/         # Scorer control panels
│
├── shared/                     # Reusable utilities and design elements
│   ├── components/             # Reusable UI controls
│   ├── constants/              # Fixed values and specs
│   ├── hooks/                  # Global hooks
│   └── lib/                    # Library-specific configs (Axios Instance, TanStack Queries)
│
├── types.ts                    # Global shared TypeScript model definitions
├── index.css                   # Global visual styling and Tailwind configurations
└── main.tsx                    # React bootstrapping script
```

---

## 2. Authentication & Role-Based Access Control (RBAC)

CricPulse secures screens and administrative controls via clear role assignments.

```typescript
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SCORER = "SCORER",
  VIEWER = "VIEWER"
}
```

### Components:
- **`RoleGuard`**: Route-level filter. Blocks unauthorized rendering, displaying an elegant "Access Violation" error panel.
- **`PermissionGate`**: Layout-level helper. Disables or hides specific inline controls (e.g. Save or Undo buttons) if permission levels are not met.

---

## 3. Real-Time WebSocket Infrastructure

To support high-concurrency score distribution, CricPulse establishes a clean, decoupled connection layer using `socket.io-client`:

- **`SocketService` Class**: Encapsulates connections, custom event binding, and cleanup methods to protect memory.
- **`SocketProvider`**: Merges WebSocket status into the React component tree and monitors global JWT tokens.
- **`useSocket`**: Custom hook exposing connection status and callback triggers.

---

## 4. State Management Matrix

CricPulse combines two primary state control paradigms ensuring optimal data performance:

1. **Local Server Cache (TanStack Query)**:
   - Caches matchups, team squads, and historic schedules.
   - Prevents duplicate fetch events, tracks query execution times, and implements automatic query retry policies.

2. **Global Client State (Redux Toolkit)**:
   - Synchronizes current active ball outcomes, over progress charts, and user roles.
   - Powers the Scorer Undo stack.

---

## 5. Design Guidelines

CricPulse implements **Modern SaaS Minimalism** and **Glassmorphism**:
- Dense, structured off-black grids and tonal layers.
- Responsive design from high-fidelity desktop displays down to target-dense mobile screens.
- Generous premium negative space and typography scale featuring **Inter** and **Space Grotesk** pairings.
