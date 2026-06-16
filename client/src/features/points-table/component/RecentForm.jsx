function RecentForm({ form }) {
    return (
        <div className="flex gap-2">
            {form.map((result, index) => (
                <span
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
            ${result === "W"
                            ? "bg-lime-400 text-black"
                            : "bg-red-600 text-white"
                        }`}
                >
                    {result}
                </span>
            ))}
        </div>
    );
}

export default RecentForm;