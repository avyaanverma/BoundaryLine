import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RegisterHook } from "../hook/RegisterHook";

function AdminRegisterForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, onSubmit, errors, password } = RegisterHook()

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#07110D] px-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#2D3B35] bg-[#0E1720] p-10">
                <p className="text-xs font-bold uppercase tracking-widest text-[#8ED89A]">
                    ADMIN REGISTRATION
                </p>

                <h1 className="mt-2 text-4xl font-bold text-white">
                    Create your account
                </h1>

                <p className="mt-3 text-[#A5B0A8]">
                    Register to manage tournaments, matches, teams,
                    players, and analytics.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 space-y-8"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm text-[#D1D8D3]">
                                First Name
                            </label>

                            <input
                                type="text"
                                placeholder="John"
                                {...register("firstName", {
                                    required: "First name is required",
                                })}
                                className="w-full rounded-lg border border-[#304039] bg-[#081018] px-4 py-3 text-white outline-none focus:border-[#8ED89A]"
                            />

                            {errors.firstName && (
                                <p className="mt-1 text-sm text-[#FF8B8B]">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-[#D1D8D3]">
                                Last Name
                            </label>

                            <input
                                type="text"
                                placeholder="Doe"
                                {...register("lastName", {
                                    required: "Last name is required",
                                })}
                                className="w-full rounded-lg border border-[#304039] bg-[#081018] px-4 py-3 text-white outline-none focus:border-[#8ED89A]"
                            />

                            {errors.lastName && (
                                <p className="mt-1 text-sm text-[#FF8B8B]">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#D1D8D3]">
                            Email Address
                        </label>

                        <div className="flex items-center rounded-lg border border-[#304039] bg-[#081018] px-3">
                            <Mail size={16} className="text-[#77847C]" />

                            <input
                                type="email"
                                placeholder="admin@boundaryline.com"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>

                        {errors.email && (
                            <p className="mt-1 text-sm text-[#FF8B8B]">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[#D1D8D3]">
                            Phone Number
                        </label>

                        <div className="flex items-center rounded-lg border border-[#304039] bg-[#081018] px-3">
                            <Phone size={16} className="text-[#77847C]" />

                            <input
                                type="text"
                                placeholder="+1 (555) 000-0000"
                                {...register("mobile", {
                                    required: "Phone number is required",
                                })}
                                className="w-full bg-transparent px-3 py-3 text-white outline-none"
                            />
                        </div>

                        {errors.mobile && (
                            <p className="mt-1 text-sm text-[#FF8B8B]">
                                {errors.mobile.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm text-[#D1D8D3]">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum 8 characters",
                                    },
                                })}
                                className="w-full rounded-lg border border-[#304039] bg-[#081018] px-4 py-3 text-white outline-none focus:border-[#8ED89A]"
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-[#FF8B8B]">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-[#D1D8D3]">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                className="w-full rounded-lg border border-[#304039] bg-[#081018] px-4 py-3 text-white outline-none focus:border-[#8ED89A]"
                            />

                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-[#FF8B8B]">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Root error message */}
                    {errors.root && (
                        <p className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                            {errors.root.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#046C35] py-3 font-semibold text-white transition hover:bg-[#05823F]"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-[#A5B0A8]">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/adminlogin")}
                            className="cursor-pointer text-[#8ED89A]"
                        >
                            Sign In
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AdminRegisterForm;

