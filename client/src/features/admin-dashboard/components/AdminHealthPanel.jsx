import { Activity, Database, Server } from "lucide-react";

const formatBytes = (value = 0) => {
  if (!value) return "0 MB";
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
};

const formatUptime = (seconds = 0) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

export const AdminHealthPanel = ({ health }) => {
  const memory = health?.memoryUsage;
  const isHealthy = health?.status === "HEALTHY";

  return (
    <section className="rounded-lg border border-white/10 bg-[#11171b] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa7a0]">
            System Health
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            {isHealthy ? "Healthy" : "Degraded"}
          </h2>
        </div>
        <span
          className={`inline-flex h-3 w-3 rounded-full ${isHealthy ? "bg-[#94d5a5]" : "bg-[#ffb3ad]"}`}
        />
      </div>

      <div className="mt-5 grid gap-3">
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1013] px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-[#aeb8b0]">
            <Database className="h-4 w-4 text-[#94d5a5]" />
            Database
          </span>
          <span className="text-sm font-semibold text-white">
            {health?.database?.status ?? "unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1013] px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-[#aeb8b0]">
            <Server className="h-4 w-4 text-[#8fd3ff]" />
            Uptime
          </span>
          <span className="text-sm font-semibold text-white">
            {formatUptime(health?.uptime)}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b1013] px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-[#aeb8b0]">
            <Activity className="h-4 w-4 text-[#c7f36b]" />
            Heap Used
          </span>
          <span className="text-sm font-semibold text-white">
            {formatBytes(memory?.heapUsed)}
          </span>
        </div>
      </div>
    </section>
  );
};
