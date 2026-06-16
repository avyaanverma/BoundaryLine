import { useForm } from "react-hook-form";

function SeriesForm() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const inputClass =
        "w-full rounded-2xl border border-slate-700/30 bg-[#081425] px-5 py-4 text-white outline-none focus:border-[#4ADE80]/40";

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            className="
      rounded-[32px]
      border border-slate-800
      bg-gradient-to-br
      from-[#03112A]
      via-[#02102A]
      to-[#08251D]
      p-8
    "
        >
            <div className="mb-8 flex items-center gap-3">
                <div className="h-8 w-2 rounded bg-[#4ADE80]" />

                <h2 className="text-3xl font-bold text-white">
                    Series Details
                </h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Series Name */}
                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        Series Name *
                    </label>

                    <input
                        {...register("name")}
                        placeholder="e.g., Global T20 Championship"
                        className={inputClass}
                    />
                </div>

                {/* Format + Status */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            Format *
                        </label>

                        <select
                            {...register("format")}
                            className={inputClass}
                        >
                            <option>Select Format</option>
                            <option>FIVER</option>
                            <option>TEN</option>
                            <option>TWENTY</option>
                            <option>ODI</option>
                            <option>TEST</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            Series Status
                        </label>

                        <select
                            {...register("status")}
                            className={inputClass}
                        >
                            <option>UPCOMING</option>
                            <option>ONGOING</option>
                            <option>COMPLETED</option>
                        </select>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            Start Date *
                        </label>

                        <input
                            type="date"
                            {...register("startDate")}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            End Date *
                        </label>

                        <input
                            type="date"
                            {...register("endDate")}
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Teams */}
                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        Participating Teams *
                    </label>

                    <div className="rounded-2xl border border-slate-700/30 bg-[#081425] p-4">
                        <div className="mb-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#4ADE80]/10 px-3 py-1 text-xs text-[#4ADE80]">
                                INDIA WARRIORS
                            </span>

                            <span className="rounded-full bg-[#4ADE80]/10 px-3 py-1 text-xs text-[#4ADE80]">
                                AUSSIE BLASTERS
                            </span>

                            <span className="rounded-full bg-[#4ADE80]/10 px-3 py-1 text-xs text-[#4ADE80]">
                                ENGLAND LIONS
                            </span>
                        </div>

                        <input
                            placeholder="Search teams..."
                            className="w-full bg-transparent text-white outline-none"
                        />
                    </div>
                </div>

                {/* Winner */}
                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        Winner Team
                    </label>

                    <select className={inputClass}>
                        <option>
                            Select winner (only if completed)
                        </option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="
              rounded-2xl
              bg-[#4ADE80]
              px-8
              py-4
              font-semibold
              text-black
              hover:bg-[#67e89b]
            "
                    >
                        Create Series
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="
              rounded-2xl
              border border-slate-700
              px-8
              py-4
              text-white
            "
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SeriesForm;