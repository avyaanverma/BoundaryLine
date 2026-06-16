import {
    MapPin,

} from "lucide-react";
import { useForm } from "react-hook-form";

function MatchForm() {
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
        <div className="rounded-[30px] border border-slate-800 bg-gradient-to-br from-[#03112A] via-[#02102A] to-[#08251D] p-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            MATCH NUMBER
                        </label>

                        <input
                            {...register("matchNumber")}
                            placeholder="e.g. T20-45"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            SERIES SELECTION
                        </label>

                        <select
                            {...register("seriesId")}
                            className={inputClass}
                        >
                            <option>Select Series</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        VENUE
                    </label>

                    <div className="relative">
                        <MapPin
                            className="absolute left-4 top-4 text-slate-400"
                            size={18}
                        />

                        <input
                            {...register("venue")}
                            placeholder="Stadium Name, City"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        MATCH START DATE & TIME
                    </label>

                    <input
                        type="datetime-local"
                        {...register("startTime")}
                        className={inputClass}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            TEAM 1
                        </label>

                        <select
                            {...register("team1")}
                            className={inputClass}
                        >
                            <option>Select Team</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            TEAM 2
                        </label>

                        <select
                            {...register("team2")}
                            className={inputClass}
                        >
                            <option>Select Team</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-[#9AE6B4]">
                        MATCH STATUS
                    </label>

                    <select
                        {...register("status")}
                        className={inputClass}
                    >
                        <option>UPCOMING</option>
                        <option>TOSS_COMPLETED</option>
                        <option>PLAYING_XI_SELECTED</option>
                        <option>LIVE</option>
                        <option>INNINGS_BREAK</option>
                        <option>COMPLETED</option>
                    </select>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="rounded-2xl bg-[#4ADE80] px-8 py-4 font-semibold text-black"
                    >
                        Create Match
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="rounded-2xl border border-slate-700 px-8 py-4 text-white"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MatchForm;