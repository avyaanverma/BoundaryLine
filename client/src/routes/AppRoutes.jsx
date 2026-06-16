import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LandingPage from "../features/landing page/pages/LandingPage.jsx";
import FixturesPage from "../features/fixtures/pages/FixturesPage.jsx";
import ScoreboardPage from "../features/scoreboard/pages/ScoreBoard.jsx";
import ScorerConsolePage from "../features/scorer-console/pages/ScorerConsolePage.jsx";
import ScorerWorkspace from "../features/scorer-console/pages/ScorerWorkspace.jsx";
import { RoleGuard } from "../app/guards/RoleGuard.jsx";
import { UserRole } from "../features/scorer-console/pages/type.js";
import AnalyticsPage from "../features/analytics/pages/AnalyticsPage.jsx";
import MainLayout from "../layout/MainLayout.jsx";
import UserRegisterForm from "../features/auth/user/component/UserRegisterForm.jsx";
import UserLoginForm from "../features/auth/user/component/UserLoginForm.jsx";
import AdminRegisterForm from "../features/auth/admin/components/AdminRegisterForm.jsx";
import AdminLoginForm from "../features/auth/admin/components/AdminLoginForm.jsx";
import NewsPage from "../features/news/pages/NewsPage.jsx";
import TeamPage from "../features/all-team/page/TeamPage.jsx";
import RankingPage from "../features/ranking/pages/RankingPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";

// Admin Panel Pages
import AdminLayout from "../features/admin-dashboard/pages/AdminLayout.jsx";
import AdminMatchesPage from "../features/admin-dashboard/pages/AdminMatchesPage.jsx";
import AdminTeamsPage from "../features/admin-dashboard/pages/AdminTeamsPage.jsx";
import AdminPlayersPage from "../features/admin-dashboard/pages/AdminPlayersPage.jsx";
import AdminSeriesPage from "../features/admin-dashboard/pages/AdminSeriesPage.jsx";
import { ComingSoonPage } from "./TestRouter.jsx";

const ProtectedAdminRoute = ({ children }) => {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
      {children}
    </RoleGuard>
  );
};

const ProtectedScorerRoute = ({ children }) => {
  return (
    <RoleGuard
      allowedRoles={[UserRole.SCORER, UserRole.ADMIN, UserRole.SUPER_ADMIN]}
    >
      {children}
    </RoleGuard>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/matches",
    element: <FixturesPage />,
  },
  {
    path: "/fixtures",
    element: <Navigate to="/matches" replace />,
  },
  {
    path: "/matches/:matchId",
    element: <ScoreboardPage />,
  },
  {
    path: "/scoreboard",
    element: <ScoreboardPage />,
  },
  {
    path: "/scorer",
    element: (
      <ProtectedScorerRoute>
        <ScorerConsolePage />
      </ProtectedScorerRoute>
    ),
  },
  {
    path: "/scorer/:matchId",
    element: (
      <ProtectedScorerRoute>
        <ScorerConsolePage />
      </ProtectedScorerRoute>
    ),
  },
  {
    path: "/workspace",
    element: <ScorerWorkspace />,
  },

  // Admin Panel Routes
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "matches", element: <AdminMatchesPage /> },
      { path: "teams", element: <AdminTeamsPage /> },
      { path: "players", element: <AdminPlayersPage /> },
      { path: "series", element: <AdminSeriesPage /> },
    ],
  },
  {
    path: "/tournaments",
    element: (
      <ComingSoonPage
        title="Tournaments"
        description="Browse leagues, bilateral series, domestic competitions, and tournament dashboards."
      />
    ),
  },
  {
    path: "/tournaments/:tournamentId",
    element: (
      <ComingSoonPage
        title="Tournament Details"
        description="Fixtures, squads, points table, stats, and tournament news will connect here."
      />
    ),
  },
  {
    path: "/teams",
    element: <TeamPage />,
  },
  {
    path: "/players",
    element: (
      <ComingSoonPage
        title="Players"
        description="Player profiles, batting and bowling stats, rankings, and performance history will connect here."
      />
    ),
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/ranking",
    element: <RankingPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
    ],
  },

  // Redirect: singular 'fixture' → plural '/matches'
  {
    path: "/fixture",
    element: <Navigate to="/matches" replace />,
  },

  {
    path: "/register",
    element: <AdminRegisterForm />,
  },
  {
    path: "/userregister",
    element: <UserRegisterForm />,
  },
  {
    path: "/adminlogin",
    element: <AdminLoginForm />,
  },
  {
    path: "/userlogin",
    element: <UserLoginForm />,
  },

  // Catch-all: unknown routes redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
