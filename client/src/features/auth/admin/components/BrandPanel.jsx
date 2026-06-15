const platformStats = [
  { label: 'Live Matches', value: '24', tone: 'text-[#9be63d]' },
  { label: 'Teams Tracked', value: '312', tone: 'text-[#9adca7]' },
  { label: 'Avg Speed', value: '142 kph', tone: 'text-[#ffb3ad]' },
]

export const BrandPanel = () => {
  return (
    <aside className="relative hidden overflow-hidden border-r border-[#26302a] bg-[#04391f] px-10 py-12 md:flex md:flex-col md:justify-between">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(154,220,167,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(154,220,167,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(6,76,39,0.92),rgba(12,14,16,0.95)_72%)]" />

      <div className="relative z-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-[#a6e9b4]">BoundaryLine</p>
            <p className="mt-1 text-sm font-semibold uppercase text-[#c7d0c9]">
              Admin Control Center
            </p>
          </div>
          <div className="rounded-lg border border-[#45524b] bg-[#171b1e] px-4 py-3 text-sm font-bold text-[#eef2ef]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#9be63d]" />
            Live Scorecard
          </div>
        </div>

        <div className="max-w-[430px]">
          <h1 className="text-5xl font-extrabold leading-[1.08] text-[#f2f5f3]">
            Command every match from the first ball.
          </h1>
          <p className="mt-6 max-w-[360px] text-lg leading-8 text-[#cfdbd3]">
            Real-time scoring, tournament controls, team rosters, and match operations built for local cricket organizers.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10">
        <div className="stadium-visual rounded-lg border border-[#3f4d46] bg-[#121719] shadow-2xl">
          <div className="stadium-light stadium-light-left" />
          <div className="stadium-light stadium-light-right" />
          <div className="stadium-field">
            <div className="stadium-pitch" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {platformStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[#35413a] bg-[#151a1d] p-4">
              <p className="text-xs font-semibold uppercase text-[#b5beb7]">{stat.label}</p>
              <p className={`mt-2 text-2xl font-extrabold ${stat.tone}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
