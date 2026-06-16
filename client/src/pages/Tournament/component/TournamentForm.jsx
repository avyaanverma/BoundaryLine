import { useForm } from "react-hook-form";
import {
    CalendarDays,
    Trophy,
    Upload,
    Users,
} from "lucide-react";

function TournamentForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const inputClass =
        "w-full bg-[#0B1220]/80 border border-slate-700/30 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#4ADE80]/40 focus:ring-2 focus:ring-[#4ADE80]/10 transition-all";

    const onSubmit = (data) => {
        const payload = {
            ...data,
            teams: data.teams
                .split(",")
                .map((team) => team.trim())
                .filter(Boolean),
        };

        console.log(payload);

        /**
         * Example Payload
         *
         * {
         *   name: "IPL 2025",
         *   format: "T20",
         *   status: "UPCOMING",
         *   startDate: "2025-01-01",
         *   endDate: "2025-03-01",
         *   teams: ["India","Australia","England"],
         *   description: "..."
         * }
         */
    };

    return (
        <div
            className="
        bg-gradient-to-br
        from-[#08111f]
        via-[#0b1220]
        to-[#12261d]
        border border-slate-700/20
        rounded-[32px]
        p-8
        backdrop-blur-xl
      "
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-[#4ADE80]" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-white">
                        Tournament Details
                    </h2>

                    <p className="text-slate-400 mt-1">
                        Complete all fields to create your tournament.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Tournament Name */}
                <div>
                    <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                        Tournament Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter tournament name"
                        className={inputClass}
                        {...register("name", {
                            required: "Tournament name is required",
                        })}
                    />

                    {errors.name && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Format + Status */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                            Format
                        </label>

                        <select
                            className={inputClass}
                            {...register("format", {
                                required: "Format is required",
                            })}
                        >
                            <option value="">Select Format</option>
                            <option value="T5">T5</option>
                            <option value="T10">T10</option>
                            <option value="T20">T20</option>
                            <option value="ODI">ODI</option>
                            <option value="TEST">TEST</option>
                        </select>

                        {errors.format && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.format.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                            Tournament Status
                        </label>

                        <select
                            className={inputClass}
                            {...register("status")}
                        >
                            <option value="UPCOMING">UPCOMING</option>
                            <option value="ONGOING">ONGOING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                            Start Date
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                className={`${inputClass} pr-12`}
                                {...register("startDate", {
                                    required: "Start date is required",
                                })}
                            />

                            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4ADE80] w-5 h-5 pointer-events-none" />
                        </div>

                        {errors.startDate && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.startDate.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                            End Date
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                className={`${inputClass} pr-12`}
                                {...register("endDate", {
                                    required: "End date is required",
                                })}
                            />

                            <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4ADE80] w-5 h-5 pointer-events-none" />
                        </div>

                        {errors.endDate && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.endDate.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Teams */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#9AE6B4] mb-2">
                        <Users size={16} />
                        Participating Teams
                    </label>

                    <input
                        type="text"
                        placeholder="India, Australia, England..."
                        className={inputClass}
                        {...register("teams", {
                            required: "At least one team is required",
                        })}
                    />

                    <p className="text-xs text-slate-500 mt-2">
                        Separate multiple team names using commas.
                    </p>

                    {errors.teams && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.teams.message}
                        </p>
                    )}
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="block text-sm font-medium text-[#9AE6B4] mb-3">
                        Tournament Banner
                    </label>

                    <div className="border border-dashed border-slate-600 rounded-3xl p-12 text-center bg-[#0B1220]/40 hover:border-[#4ADE80]/30 transition-all">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4ADE80]/10 flex items-center justify-center mb-4">
                            <Upload className="text-[#4ADE80]" />
                        </div>

                        <h3 className="text-white text-lg font-medium">
                            Upload Tournament Banner
                        </h3>

                        <p className="text-slate-400 mt-2">
                            PNG, JPG up to 10MB
                        </p>

                        <input
                            type="file"
                            className="mt-4 text-white"
                            {...register("banner")}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-[#9AE6B4] mb-2">
                        Tournament Description
                    </label>

                    <textarea
                        rows={5}
                        placeholder="Briefly describe the tournament..."
                        className={`${inputClass} resize-none`}
                        {...register("description")}
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        className="
              flex-1
              py-4
              rounded-2xl
              bg-[#4ADE80]
              text-black
              font-semibold
              hover:bg-[#67e89b]
              transition-all
            "
                    >
                        Create Tournament
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="
              px-8
              rounded-2xl
              border
              border-slate-700/30
              bg-[#0B1220]/60
              text-white
              hover:bg-[#111827]
              transition-all
            "
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TournamentForm;