# Frontend Architecture

> **React 19 | Vite | TailwindCSS 4 | React Router 7 | Feature-Based Architecture**

---

## 21. Frontend Architecture

### Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| TailwindCSS | 4 | Utility-first CSS |
| React Router | 7 | Client-side routing |
| Redux Toolkit | 2 | Global state management |
| TanStack React Query | 5 | Server state & caching |
| Axios | 1 | HTTP client |
| Socket.IO Client | 4 | Real-time communication |
| React Hook Form | 7 | Form management |
| react-toastify | 11 | Toast notifications |
| lucide-react | 1 | Icons |
| motion | 12 | Animation library |

### Architecture Pattern

The frontend follows a **Feature-Based Architecture** where each feature is self-contained:

```
src/
├── app/                          # Global app configuration
│   ├── guards/                   # RBAC guards (RoleGuard, PermissionGate)
│   ├── providers/                # Root providers (Redux, Query, Auth, Socket)
│   └── store/                    # Redux store configuration
│
├── features/                     # Feature modules
│   ├── admin-dashboard/          # Admin panel
│   ├── auth/                     # Authentication (admin + user forms)
│   ├── scoreboard/              # Match scoreboard viewer
│   ├── scorer-console/           # Scorer control panel
│   ├── fixtures/                 # Match fixtures/schedule
│   ├── landing page/             # Home page
│   ├── all-team/                 # Teams directory
│   ├── analytics/                # Analytics dashboard
│   ├── news/                     # News feed
│   ├── points-table/             # Points table
│   └── ranking/                 # Rankings
│
├── layout/                       # Layout components
│   ├── AuthLayout.jsx            # Auth pages layout
│   └── MainLayout.jsx            # Main app layout (TopNav + Sidebar + Footer)
│
├── pages/                        # Route page wrappers
│   └── admin/                    # Admin page wrappers
│
├── routes/                       # Router configuration
│   ├── AppRoutes.jsx             # Main router with all routes
│   └── TestRouter.jsx            # Legacy test router
│
├── shared/                       # Shared utilities
│   ├── components/               # Reusable UI (NavBar, Footer, Toast)
│   ├── hooks/                    # Global hooks (useQueries)
│   ├── lib/                      # Axios instance (interceptors, auth)
│   ├── services/                 # Socket provider
│   └── utils/                    # Utility functions (cricketMath)
│
├── App.jsx                       # Root component
├── main.jsx                      # Entry point
└── index.css                     # Tailwind + global styles
```

### App Initialization Flow

```
1. main.jsx
   └── createRoot → <StrictMode><App /></StrictMode>
       │
2. App.jsx
   └── <RootProvider><AppRoutes /></RootProvider>
       │
3. RootProviders.jsx
   ├── ReduxProvider (store)
   ├── QueryClientProvider (TanStack Query)
   │   └── retry: 1, refetchOnWindowFocus: false
   ├── AuthSessionGate
   │   └── Manages auth session persistence
   ├── SocketProvider
   │   └── Socket.IO client connection
   └── ToastProvider
       └── Global toast notifications (react-toastify)
       │
4. AppRoutes.jsx
   └── createBrowserRouter with all route definitions
```

### Routing Structure

```jsx
const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <LandingPage /> },
  { path: "/matches", element: <FixturesPage /> },
  { path: "/matches/:matchId", element: <ScoreboardPage /> },
  { path: "/teams", element: <TeamPage /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/ranking", element: <RankingPage /> },
  { path: "/register", element: <AdminRegisterForm /> },
  { path: "/userregister", element: <UserRegisterForm /> },
  { path: "/adminlogin", element: <AdminLoginForm /> },
  { path: "/userlogin", element: <UserLoginForm /> },

  // Protected routes
  { path: "/scorer", element: <ProtectedScorerRoute><ScorerConsolePage /></ProtectedScorerRoute> },
  { path: "/scorer/:matchId", element: <ProtectedScorerRoute><ScorerConsolePage /></ProtectedScorerRoute> },

  // Admin routes (nested under RoleGuard)
  { path: "/admin", element: <ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "matches", element: <AdminMatchesPage /> },
      { path: "teams", element: <AdminTeamsPage /> },
      { path: "players", element: <AdminPlayersPage /> },
      { path: "series", element: <AdminSeriesPage /> },
    ]
  },

  // Catch-all
  { path: "*", element: <Navigate to="/" replace /> },
]);
```

### RBAC Guards

#### RoleGuard (Page-Level)
```jsx
<RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
  {children}
</RoleGuard>
```
- SUPER_ADMIN bypasses all checks
- Shows "Access Violation" UI for unauthorized users

#### PermissionGate (Component-Level)
```jsx
<PermissionGate allowedRoles={[UserRole.ADMIN]} fallback={<DisabledButton />}>
  <DeleteButton />
</PermissionGate>
```
- Used for inline conditional rendering within pages

### Design System

The UI uses a **Dark Theme** with **Glassmorphism** effects and **Green Accents**:

```css
:root {
  color: #eef2ef;
  background: #0d1012;
}

/* Primary green: #94d5a5 / #9adca7 */
/* Surface: #111316 / #1a1d20 */
/* Border: rgba(255,255,255,0.1) */

/* Glassmorphism: 
   bg-[#111316]/90 
   backdrop-blur-xl 
   border border-white/10 */
```

### Key UI Components
- **Navbar** — Fixed top navigation with Scores, Teams, Rankings, News links
- **PageFooter** — Newsletter signup, social links, brand info
- **ToastProvider** — Dark-themed toast notifications using react-toastify
- **Stadium Visual** — CSS-art cricket stadium background with floodlights and pitch
