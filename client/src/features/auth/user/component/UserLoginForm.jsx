import { Mail, Lock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserLoginHook } from "../hook/userDetailsHook";

function UserLoginForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, onSubmit, errors } = UserLoginHook()



    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#010B08] via-[#02110C] to-[#041A12] flex items-center justify-center px-4 py-10">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-[560px]">

                {/* Logo */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Target
                            size={32}
                            className="text-[#63E39B]"
                        />

                        <h1 className="text-5xl font-bold text-[#63E39B]">
                            BoundaryLine
                        </h1>
                    </div>

                    <h2 className="mt-6 text-5xl font-bold text-white">
                        Welcome Back
                    </h2>

                    <p className="mt-4 text-lg leading-relaxed text-[#B7C0BC]">
                        Enter your credentials to access your
                        <br />
                        cricket analytics dashboard.
                    </p>
                </div>

                {/* Login Card */}
                <div className="relative overflow-hidden rounded-3xl border border-[#1C3B32] bg-[#061421]/95 p-10 backdrop-blur-lg shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

                    {/* Card Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 animate-pulse" />

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative z-10 space-y-6"
                    >

                        {/* Email */}
                        <div>
                            <label className="mb-3 block text-base text-[#D5D9D7]">
                                Email Address
                            </label>

                            <div
                                className={`flex items-center rounded-xl bg-[#020D16] px-4 transition-all duration-300 ${errors.email
                                    ? "border border-red-500"
                                    : "border border-[#204135] focus-within:border-[#63E39B] focus-within:shadow-[0_0_15px_rgba(99,227,155,0.15)]"
                                    }`}
                            >
                                <Mail
                                    size={20}
                                    className="text-[#7D8780]"
                                />

                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Please enter a valid email",
                                        },
                                    })}
                                    type="email"
                                    placeholder="analyst@boundaryline.com"
                                    className="w-full bg-transparent px-4 py-4 text-lg text-white outline-none placeholder:text-[#6B7280]"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-3 block text-base text-[#D5D9D7]">
                                Password
                            </label>

                            <div
                                className={`flex items-center rounded-xl bg-[#020D16] px-4 transition-all duration-300 ${errors.password
                                    ? "border border-red-500"
                                    : "border border-[#204135] focus-within:border-[#63E39B] focus-within:shadow-[0_0_15px_rgba(99,227,155,0.15)]"
                                    }`}
                            >
                                <Lock
                                    size={20}
                                    className="text-[#7D8780]"
                                />

                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="w-full bg-transparent px-4 py-4 text-lg text-white outline-none"
                                />
                            </div>

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me + Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#067132]"
                                />

                                <span className="text-[#B7C0BC]">
                                    Remember Me
                                </span>
                            </div>

                            <button
                                type="button"
                                className="text-sm font-medium text-[#63E39B] hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-[#067132] py-5 text-2xl font-semibold text-white transition-all duration-300 hover:bg-[#0A8340] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,227,155,0.35)]"
                        >
                            Sign In →
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-lg text-[#D5D9D7]">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="cursor-pointer font-semibold text-[#63E39B] hover:underline"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default UserLoginForm;