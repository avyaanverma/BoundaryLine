import { Link } from "react-router-dom";
import { CalendarPlus, ClipboardList, ShieldCheck, UsersRound } from "lucide-react";

const actions = [
  {
    label: "Manage Matches",
    helper: "Open schedule and match operations.",
    path: "/admin/matches",
    icon: CalendarPlus,
  },
  {
    label: "Teams Directory",
    helper: "Review active teams and rosters.",
    path: "/teams",
    icon: UsersRound,
  },
  {
    label: "Scorer Console",
    helper: "Continue live scoring workflows.",
    path: "/scorer",
    icon: ClipboardList,
  },
  {
    label: "Admin Login",
    helper: "Switch or refresh admin session.",
    path: "/admin/login",
    icon: ShieldCheck,
  },
];

export const AdminQuickActions = () => {
  return (
    <section className="rounded-lg border border-white/10 bg-[#11171b] p-5">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa7a0]">
          Quick Actions
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">Operations</h2>
      </div>

      <div className="grid gap-3">
        {actions.map(({ label, helper, path, icon: Icon }) => (
          <Link
            className="group flex items-center gap-4 rounded-lg border border-white/10 bg-[#0b1013] p-4 transition hover:border-[#94d5a5]/50 hover:bg-[#101a15]"
            key={label}
            to={path}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#94d5a5]/10 text-[#94d5a5]">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-white group-hover:text-[#94d5a5]">
                {label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-[#9aa7a0]">
                {helper}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
