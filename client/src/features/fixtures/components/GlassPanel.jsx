
function GlassPanel({ children, className = "" }) {
    return (
        <div
            className={`bg-[rgba(30,32,35,0.7)] backdrop-blur-xl border border-white/[0.08] ${className}`}
        >
            {children}
        </div>
    );
}

export default GlassPanel