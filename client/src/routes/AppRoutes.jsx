import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LandingPage from "../features/landing page/pages/LandingPage.jsx";
import FixturesPage from "../features/fixtures/pages/FixturesPage.jsx";
import ScoreboardPage from "../features/scoreboard/pages/ScoreBoard.jsx";
import ScorerConsolePage from "../features/scorer-console/pages/ScorerConsolePage.jsx";
import ScorerWorkspace from "../features/scorer-console/pages/ScorerWorkspace.jsx";
import { RoleGuard } from "../app/guards/RoleGuard.jsx";
import { UserRole } from "../features/scorer-console/pages/type.js";
import AnalyticsPage from "../features/analytics/pages/AnalyticsPage.jsx";
import MainLayout from '../layout/MainLayout.jsx'
import DuplicateFixture from "../features/fixtures/pages/duplicateFixture.jsx";
import UserRegisterForm from "../features/auth/user/component/UserRegisterForm.jsx";
import UserLoginForm from "../features/auth/user/component/UserLoginForm.jsx";
import NewsPage from "../features/news/pages/NewsPage.jsx";
import TeamPage from "../features/all-team/page/TeamPage.jsx";
import RankingPage from "../features/ranking/pages/RankingPage.jsx";


const ComingSoonPage = ({ title, description }) => {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6">
      <section className="max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          BoundaryLine
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
      </section>
    </main>
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

  {
    path: "/admin",
    element: (
      <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
        <ComingSoonPage
          title="Admin Panel"
          description="Tournament setup, teams, players, venues, permissions, and match operations will live here."
        />
      </RoleGuard>
    ),
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
    path: "*",
    element: <Navigate to="/" replace />,
  },

  // ye test route hai agr sahi chla tho use kr lenge om bhai se bt ke

  {
    element: <MainLayout />,
    children: [
      {
        path: "/analytics",
        element: <AnalyticsPage />
      },
      {
        path: "/matches",
        element: <FixturesPage />
      },
      {
        path: "testfx",
        element: <DuplicateFixture />
      },



    ]

  },
  {
    path: "adminlogin",
    element: <Navigate to="/admin/login" replace />
  },
  {
    path: "register",
    element: <Navigate to="/admin/register" replace />
  },
  {
    path: "userregister",
    element: <UserRegisterForm />
  },
  {
    path: "userlogin",
    element: <UserLoginForm />
  }

  //....
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
