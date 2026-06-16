
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserRegisterForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, onSubmit, errors, password } = UserRegisterHook()

    return (
        <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl">
                {/* Logo */}
                {/* <div className="mb-10 flex justify-center">
                    <h1 className="text-4xl font-bold text-[#8FE39C]">
                        BoundaryLine
                    </h1>
                </div> */}

                {/* Card */}
                <div className="rounded-2xl border border-[#2D3B35] bg-[#0E1720] p-8 shadow-xl">
                    <h2 className="text-center text-4xl font-bold text-white">
                        Create User Account
                    </h2>

                    <p className="mt-2 text-center text-[#AEB8B0]">
                        Join the platform to track your cricket stats and performance.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-6"
                    >
                        {/* First Name + Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm text-[#C7D0C9]">
                                    First Name
                                </label>

                                <input
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                    type="text"
                                    placeholder="Enter first name"
                                    className={`w-full rounded-lg bg-[#0D1318] px-4 py-3 text-white outline-none transition-all duration-300 ${errors.firstName
                                        ? "border border-[#FF7B7B]"
                                        : "border border-[#38423D] focus:border-[#9ADCA7]"
                                        }`}
                                />

                                {errors.firstName && (
                                    <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-[#C7D0C9]">
                                    Last Name
                                </label>

                                <input
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    type="text"
                                    placeholder="Enter last name"
                                    className={`w-full rounded-lg bg-[#0D1318] px-4 py-3 text-white outline-none transition-all duration-300 ${errors.lastName
                                        ? "border border-[#FF7B7B]"
                                        : "border border-[#38423D] focus:border-[#9ADCA7]"
                                        }`}
                                />

                                {errors.lastName && (
                                    <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm text-[#C7D0C9]">
                                Email Address
                            </label>

                            <div
                                className={`flex items-center rounded-lg bg-[#0D1318] px-3 transition-all duration-300 ${errors.email
                                    ? "border border-[#FF7B7B]"
                                    : "border border-[#38423D]"
                                    }`}
                            >
                                <Mail size={18} className="text-[#7D8780]" />

                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Please enter a valid email address",
                                        },
                                    })}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-transparent px-3 py-3 text-white outline-none"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="mb-2 block text-sm text-[#C7D0C9]">
                                Phone Number
                            </label>

                            <div
                                className={`flex items-center rounded-lg bg-[#0D1318] px-3 transition-all duration-300 ${errors.mobile
                                    ? "border border-[#FF7B7B]"
                                    : "border border-[#38423D]"
                                    }`}
                            >
                                <Phone size={18} className="text-[#7D8780]" />

                                <input
                                    {...register("mobile", {
                                        required: "Mobile number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Enter a valid 10 digit mobile number",
                                        },
                                    })}
                                    type="text"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-transparent px-3 py-3 text-white outline-none"
                                />
                            </div>

                            {errors.mobile && (
                                <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                    {errors.mobile.message}
                                </p>
                            )}
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm text-[#C7D0C9]">
                                    Password
                                </label>

                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                    })}
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full rounded-lg bg-[#0D1318] px-4 py-3 text-white outline-none transition-all duration-300 ${errors.password
                                        ? "border border-[#FF7B7B]"
                                        : "border border-[#38423D] focus:border-[#9ADCA7]"
                                        }`}
                                />

                                {errors.password && (
                                    <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-[#C7D0C9]">
                                    Confirm Password
                                </label>

                                <input
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value) =>
                                            value === password || "Passwords do not match",
                                    })}
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full rounded-lg bg-[#0D1318] px-4 py-3 text-white outline-none transition-all duration-300 ${errors.confirmPassword
                                        ? "border border-[#FF7B7B]"
                                        : "border border-[#38423D] focus:border-[#9ADCA7]"
                                        }`}
                                />

                                {errors.confirmPassword && (
                                    <p className="mt-2 text-sm font-medium text-[#FF7B7B] animate-pulse">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-center gap-2 text-sm text-[#C7D0C9]">
                            <input
                                type="checkbox"
                                className="accent-[#9ADCA7]"
                            />
                            I agree to the Terms of Service and Privacy Policy.
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#075F32] py-3 font-semibold text-white transition hover:bg-[#08713B]"
                        >
                            Create Account →
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-[#38423D]" />
                            <span className="text-sm text-[#AEB8B0]">OR</span>
                            <div className="h-px flex-1 bg-[#38423D]" />
                        </div>

                        <p className="text-center text-sm text-[#AEB8B0]">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="cursor-pointer font-semibold text-[#9ADCA7] hover:underline"
                            >
                                Sign In
                            </span>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UserRegisterForm;
