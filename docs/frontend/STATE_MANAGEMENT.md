# Frontend State Management

> **Redux Toolkit (Client State) + TanStack React Query (Server State) + Socket.IO (Real-Time)**

---

## 22. React Query Usage

BoundaryLine uses **TanStack React Query** for all server-state management — fetching, caching, and synchronizing data from the backend REST API.

### Query Configuration

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### Custom Query Hooks (`shared/hooks/useQueries.js`)

All API interactions are encapsulated in custom hooks that handle:
- Data transformation (backend → frontend format)
- Error handling with graceful fallbacks
- Automatic refetch intervals for live data
- Loading/error states

#### `useLiveMatchQuery(matchId)`

```js
const { data: match, isLoading, error } = useLiveMatchQuery(matchId);
// Fetches: GET /matches/:matchId
// Refetch: every 5 seconds
// Fallback: Redux currentMatch if backend unavailable
// Transform: team data into { id, name, shortName, logo, primaryColor } format
```

#### `useMatchesQuery()`

```js
const { data: matches } = useMatchesQuery();
// Fetches: GET /matches
// Refetch: every 10 seconds
// Returns: Array of transformed match objects
```

#### `useTeamsQuery()`

```js
const { data: teams } = useTeamsQuery();
// Fetches: GET /teams
// Returns: Transformed team array with id, name, shortName, logo, primaryColor
```

#### `usePlayersQuery(teamId)`

```js
const { data: players } = usePlayersQuery(teamId);
// Fetches: GET /players
// Enabled: only when teamId is provided
// Returns: Transformed player array
```

#### `useMatchScoresQuery(matchId)`

```js
const { data: scores } = useMatchScoresQuery(matchId);
// Fetches: GET /scores/match/:matchId
// Refetch: every 5 seconds
// Enabled: only when matchId is provided
```

#### `useCommentaryQuery(matchId)`

```js
const { data: commentary } = useCommentaryQuery(matchId);
// Fetches: GET /commentary/match/:matchId
// Refetch: every 5 seconds
// Returns: Enriched commentary array with dismissal data
```

#### `useSquadPlayersQuery(teamId)`

```js
const { data: squadPlayers } = useSquadPlayersQuery(teamId);
// Fetches: GET /squads → filters client-side by teamId
// Returns: Player array from the team's squad
```

### Mutations

#### `usePublishScoreMutation()`

```js
const publishScore = usePublishScoreMutation();
publishScore.mutate({ matchId, scoreData: { runs, wickets, overs, battingTeam } });

// Automatically invalidates:
// - ["scores", matchId]
// - ["match", matchId]
```

### Data Transformation Pattern

Backend documents are transformed into frontend-friendly formats:

```js
const transformMatch = (match) => ({
  _id: match._id,
  id: match._id,
  title: `${team1.shortName} vs ${team2.shortName}`,
  subtitle: `${series.name} • Match ${match.matchNumber}`,
  venue: match.venue,
  team1: { _id, name, shortName, logo, primaryColor },
  team2: { _id, name, shortName, logo, primaryColor },
  teamA: { ...team1Fields, id: team1._id },  // Dual naming for compatibility
  teamB: { ...team2Fields, id: team2._id },
  status: match.status,
  series: series.name,
});
```

---

## 23. Redux Store Design

Redux Toolkit manages **client-side state** that is not directly fetched from the server:
- Authentication state (user, role, token)
- Live match state for the scorer console (ball-by-ball data, undo history)

### Store Structure

```js
store = {
  auth: {
    user: null | { _id, email, name, role, picture },
    role: null | "SUPER_ADMIN" | "ADMIN" | "SCORER",
    token: null | string,
    isAuthenticated: boolean,
  },
  match: {
    currentMatch: { ... },
    // Scorer console state
    // Ball-by-ball history, innings, playing XI
  }
}
```

### Auth Slice

```js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      const user = action.payload.user ?? action.payload;
      state.user = user;
      state.role = user.role;
      state.token = action.payload.token ?? null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      clearStoredAuth(); // Clears localStorage + sessionStorage
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});
```

### Auth Persistence

Auth state is persisted to `localStorage` / `sessionStorage`:

```js
const AUTH_STORAGE_KEY = "boundaryline_auth_user";

const readStoredAuth = () => {
  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY) ||
                       window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  return storedValue ? JSON.parse(storedValue) : null;
};
```

### Axios Interceptor for Auth

The Axios client automatically:
1. Attaches JWT token from localStorage to every request
2. Clears auth state on 401 responses
3. Shows "Session expired" toast notification

```js
// Request interceptor: Attach Bearer token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("boundaryline_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth();
      store.dispatch(logout());
      toast.warn("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);
```

### State Management Matrix

| State Type | Tool | Examples |
|-----------|------|---------|
| Server state | TanStack React Query | Matches, teams, players, scores, commentary |
| Client state | Redux Toolkit | Auth (user, role, token), scorer console state |
| Real-time state | Socket.IO + Redux | Live score updates, commentary, match status changes |
| Form state | React Hook Form | Registration forms, login forms, admin forms |
| UI state | React useState | Modals, dropdowns, filters, toggles |

### Why Two State Management Tools?

| Concern | Redux Toolkit | React Query |
|---------|---------------|-------------|
| **Scope** | Client-only state | Server-cache state |
| **Auth** | ✅ User session | ❌ |
| **Scorer state** | ✅ Ball-by-ball, undo history | ❌ |
| **Match data** | ❌ | ✅ Cached with refetchInterval |
| **Teams/Players** | ❌ | ✅ Cached, deduped |
| **Mutations** | ❌ | ✅ Auto cache invalidation |
| **Persistence** | ✅ localStorage | ❌ (in-memory cache) |
