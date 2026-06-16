function SectionDivider({ label, date }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <h3 className="text-2xl font-bold text-[#e2e2e6] whitespace-nowrap">{label}</h3>
            {date && (
                <span className="px-2 py-1 bg-[#333538] rounded text-xs font-semibold text-[#8a938a]">
                    {date}
                </span>
            )}
            <div className="h-px flex-grow bg-white/10" />
        </div>
    );
};

export default SectionDivider