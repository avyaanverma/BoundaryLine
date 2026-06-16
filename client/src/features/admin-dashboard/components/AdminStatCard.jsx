const toneClasses = {
  green: "border-[#94d5a5]/20 bg-[#94d5a5]/10 text-[#94d5a5]",
  lime: "border-[#c7f36b]/20 bg-[#c7f36b]/10 text-[#c7f36b]",
  blue: "border-[#8fd3ff]/20 bg-[#8fd3ff]/10 text-[#8fd3ff]",
  red: "border-[#ffb3ad]/20 bg-[#ffb3ad]/10 text-[#ffb3ad]",
};

export const AdminStatCard = ({ icon: Icon, label, value, helper, tone = "green" }) => {
  return (
    <article className="rounded-lg border border-white/10 bg-[#11171b] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9aa7a0]">
            {label}
          </p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
        </div>
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${toneClasses[tone] ?? toneClasses.green}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {helper && <p className="mt-4 text-sm leading-6 text-[#aeb8b0]">{helper}</p>}
    </article>
  );
};
