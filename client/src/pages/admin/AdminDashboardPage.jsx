import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarClock,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Users,
  UsersRound,
} from "lucide-react";
import { RoleGuard } from "../../app/guards/RoleGuard.jsx";
import { logout } from "../../app/store/index.js";
import { UserRole } from "../../features/scorer-console/pages/type.js";
import { fetchAdminDashboard } from "../../features/admin-dashboard/api/adminDashboardApi.js";
import { AdminHealthPanel } from "../../features/admin-dashboard/components/AdminHealthPanel.jsx";
import { AdminQuickActions } from "../../features/admin-dashboard/components/AdminQuickActions.jsx";
import { AdminRecentMatches } from "../../features/admin-dashboard/components/AdminRecentMatches.jsx";
import { AdminStatCard } from "../../features/admin-dashboard/components/AdminStatCard.jsx";
import { logoutAdmin } from "../../features/auth/admin/index.js";

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN").format(value ?? 0);
};

export const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const hasAdminAccess =
    role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;

  const dashboardQuery = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: fetchAdminDashboard,
    enabled: hasAdminAccess,
    retry: 1,
  });

  useEffect(() => {
    if (hasAdminAccess && dashboardQuery.error?.response?.status === 401) {
      logoutAdmin().finally(() => {
        dispatch(logout());
        navigate("/admin/login", { replace: true });
      });
    }
  }, [dashboardQuery.error, dispatch, hasAdminAccess, navigate]);

  const data = dashboardQuery.data;
  const dashboard = data?.dashboard ?? {};
  const matchStats = data?.matches ?? {};
  const userStats = data?.users ?? {};
  const playerStats = data?.players ?? {};

  const handleLogout = async () => {
    await logoutAdmin();
    dispatch(logout());
    navigate("/admin/login", { replace: true });
  };

  return (
    <RoleGuard
      allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}
      fallback={<Navigate to="/admin/login" replace />}
    >
      <main className="min-h-screen bg-[#090d0f] text-[#eef2ef]">
        <header className="border-b border-white/10 bg-[#101518]/95">
          <div className="mx-auto flex min-h-20 max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <Link className="flex items-center gap-3" to="/">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#94d5a5] font-black text-[#06361f]">
                BL
              </span>
              <span>
                <span className="block text-xl font-black text-white">
                  BoundaryLine
                </span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#94d5a5]">
                  Admin Console
                </span>
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#94d5a5]/20 bg-[#94d5a5]/10 px-3 py-2 text-sm font-semibold text-[#94d5a5]">
                <ShieldCheck className="h-4 w-4" />
                {user?.role ?? "ADMIN"}
              </span>
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-[#cbd4cd] transition hover:border-[#94d5a5]/40 hover:text-white"
                onClick={() => dashboardQuery.refetch()}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              <button
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#ffb3ad]/20 px-3 text-sm font-semibold text-[#ffb3ad] transition hover:bg-[#ffb3ad]/10"
                onClick={handleLogout}
                type="button"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
          <section className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#94d5a5]">
                Live Operations
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#aeb8b0]">
                Signed in as {user?.email ?? "admin user"}.
              </p>
            </div>

            {dashboardQuery.isFetching && (
              <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-[#11171b] px-3 py-2 text-sm text-[#cbd4cd]">
                <Activity className="h-4 w-4 animate-pulse text-[#94d5a5]" />
                Syncing admin data
              </span>
            )}
          </section>

          {dashboardQuery.isError && dashboardQuery.error?.response?.status !== 401 && (
            <div className="mb-6 rounded-lg border border-[#ffb3ad]/20 bg-[#ffb3ad]/10 px-4 py-3 text-sm text-[#ffd7d3]">
              {dashboardQuery.error?.response?.data?.message ||
                dashboardQuery.error?.message ||
                "Admin dashboard data could not be loaded."}
            </div>
          )}

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              helper="Registered accounts available to the platform."
              icon={Users}
              label="Users"
              tone="green"
              value={formatNumber(userStats.totalUsers ?? dashboard.totalUsers)}
            />
            <AdminStatCard
              helper="Active cricket teams across tournaments."
              icon={UsersRound}
              label="Teams"
              tone="lime"
              value={formatNumber(dashboard.totalTeams)}
            />
            <AdminStatCard
              helper={`${formatNumber(matchStats.liveMatches ?? dashboard.activeLiveMatches)} live now.`}
              icon={CalendarClock}
              label="Matches"
              tone="blue"
              value={formatNumber(matchStats.totalMatches ?? dashboard.totalMatches)}
            />
            <AdminStatCard
              helper={`${formatNumber(playerStats.totalPlayers ?? dashboard.totalPlayers)} registered players.`}
              icon={Trophy}
              label="Players"
              tone="red"
              value={formatNumber(playerStats.totalPlayers ?? dashboard.totalPlayers)}
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
            <AdminRecentMatches matches={matchStats.recentMatches ?? []} />
            <div className="grid gap-6">
              <AdminHealthPanel health={data?.health} />
              <AdminQuickActions />
            </div>
          </section>
        </div>
      </main>
    </RoleGuard>
  );
};

export default AdminDashboardPage;
