function FormatPill({ format }) {
    const colors = {
        T20I: "text-[#94d5a9]",
        T20: "text-[#94d5a5]",
        ODI: "text-[#97d940]",
        TEST: "text-[#ff4d4d]",
    };
    return (
        <span
            className={`text-[10px] bg-[#282a2d] px-1 py-[2px] rounded font-bold ${colors[format] ?? "text-[#e2e2e6]"
                }`}
        >
            {format}
        </span>
    );
}


export default FormatPill