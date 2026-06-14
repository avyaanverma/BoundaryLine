function StatusBadge({ status }) {
    const map = {
        LIVE: "bg-[#ffb4ab]/20 text-[#ffb4ab]",
        UPCOMING: "bg-[#333538] text-[#e2e2e6]",
        RESULT: "bg-[#333538] text-[#8a938a]",
    };
    return (
        <span
            className={`px-2 py-1 rounded font-bold text-xs flex items-center gap-1 ${map[status] ?? map.UPCOMING
                }`}
        >
            {status === "LIVE" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-pulse" />
            )}
            {status}
        </span>
    );
}

export default StatusBadge