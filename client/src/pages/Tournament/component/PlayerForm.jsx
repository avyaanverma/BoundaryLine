import { useForm } from "react-hook-form";
import {
    User,
    Upload,
    Globe,
    ShieldCheck,
} from "lucide-react";

function PlayerForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const inputClass =
        "w-full rounded-2xl border border-slate-700/30 bg-[#081425] px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-[#4ADE80]/40 focus:ring-2 focus:ring-[#4ADE80]/10";

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            className="
        rounded-[30px]
        border border-slate-800
        bg-gradient-to-br
        from-[#03112A]
        via-[#02102A]
        to-[#08251D]
        p-8
      "
        >
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
                <div className="rounded-2xl bg-[#4ADE80]/10 p-4">
                    <User className="text-[#4ADE80]" size={28} />
                </div>

                <div>
                    <h2 className="text-4xl font-bold text-white">
                        Player Details
                    </h2>

                    <p className="text-slate-400">
                        Create and manage cricket players.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Name + Short Name */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            PLAYER NAME *
                        </label>

                        <input
                            {...register("name", {
                                required: "Player name is required",
                            })}
                            placeholder="Virat Kohli"
                            className={inputClass}
                        />

                        {errors.name && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            SHORT NAME
                        </label>

                        <input
                            {...register("shortName")}
                            placeholder="V Kohli"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm text-[#9AE6B4]">
                        <Globe size={16} />
                        COUNTRY
                    </label>

                    <input
                        {...register("country")}
                        placeholder="India"
                        className={inputClass}
                    />
                </div>

                {/* Role */}
                <div>
                    <label className="mb-2 flex items-center gap-2 text-sm text-[#9AE6B4]">
                        <ShieldCheck size={16} />
                        ROLE *
                    </label>

                    <select
                        {...register("role", {
                            required: "Role is required",
                        })}
                        className={inputClass}
                    >
                        <option value="">Select Role</option>

                        <option value="BATTER">
                            BATTER
                        </option>

                        <option value="BOWLER">
                            BOWLER
                        </option>

                        <option value="ALL_ROUNDER">
                            ALL_ROUNDER
                        </option>

                        <option value="WICKET_KEEPER">
                            WICKET_KEEPER
                        </option>
                    </select>

                    {errors.role && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* Batting + Bowling */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            BATTING STYLE
                        </label>

                        <select
                            {...register("battingStyle")}
                            className={inputClass}
                        >
                            <option value="RIGHT_HAND">
                                RIGHT HAND
                            </option>

                            <option value="LEFT_HAND">
                                LEFT HAND
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#9AE6B4]">
                            BOWLING STYLE
                        </label>

                        <select
                            {...register("bowlingStyle")}
                            className={inputClass}
                        >
                            <option value="NONE">
                                NONE
                            </option>

                            <option value="RIGHT_ARM_FAST">
                                RIGHT ARM FAST
                            </option>

                            <option value="LEFT_ARM_FAST">
                                LEFT ARM FAST
                            </option>

                            <option value="RIGHT_ARM_MEDIUM">
                                RIGHT ARM MEDIUM
                            </option>

                            <option value="LEFT_ARM_MEDIUM">
                                LEFT ARM MEDIUM
                            </option>

                            <option value="OFF_SPIN">
                                OFF SPIN
                            </option>

                            <option value="LEG_SPIN">
                                LEG SPIN
                            </option>

                            <option value="LEFT_ARM_ORTHODOX">
                                LEFT ARM ORTHODOX
                            </option>

                            <option value="LEFT_ARM_CHINAMAN">
                                LEFT ARM CHINAMAN
                            </option>
                        </select>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="mb-3 block text-sm text-[#9AE6B4]">
                        PLAYER IMAGE
                    </label>

                    <div
                        className="
              rounded-3xl
              border
              border-dashed
              border-slate-700
              bg-[#081425]
              p-10
              text-center
            "
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-2xl bg-[#4ADE80]/10 p-4">
                                <Upload
                                    className="text-[#4ADE80]"
                                    size={24}
                                />
                            </div>
                        </div>

                        <h3 className="text-lg font-medium text-white">
                            Upload Player Image
                        </h3>

                        <p className="mt-2 text-slate-400">
                            PNG, JPG up to 5MB
                        </p>

                        <input
                            type="file"
                            {...register("image")}
                            className="mt-5 text-white"
                        />
                    </div>
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
              transition-all
              hover:bg-[#67e89b]
            "
                    >
                        Create Player
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        className="
              rounded-2xl
              border
              border-slate-700
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

export default PlayerForm;