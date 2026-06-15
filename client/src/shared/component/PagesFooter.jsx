import { Send } from "lucide-react";

export default function PageFooter() {
    return (
        <footer
            className="
                mt-16
                border-t border-white/10
                bg-[#070b12]
            "
        >
            <div className="max-w-[1420px] mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#94d5a5]">
                            CricPulse
                        </h2>

                        <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
                            Predictive analytics and real-time insights
                            for the modern cricket enthusiast.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    Privacy
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    Terms
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Social
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    Twitter
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    Instagram
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-[#94d5a5] transition"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
                            Newsletter
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 max-w-xs">
                            Get the latest match insights delivered
                            to your inbox.
                        </p>

                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="
                                    flex-1
                                    h-10
                                    rounded-xl
                                    bg-white/5
                                    border border-white/10
                                    px-4
                                    text-sm
                                    text-white
                                    placeholder:text-gray-500
                                    outline-none
                                    focus:border-[#94d5a5]
                                "
                            />

                            <button
                                className="
                                    h-10
                                    w-10
                                    rounded-xl
                                    bg-[#94d5a5]
                                    text-[#00391c]
                                    flex
                                    items-center
                                    justify-center
                                    hover:scale-105
                                    transition
                                "
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div
                    className="
                        mt-12
                        pt-6
                        border-t border-white/10
                        text-center
                        text-sm
                        text-gray-500
                    "
                >
                    © 2024 CricPulse Analytics. All rights reserved.
                </div>

            </div>
        </footer>
    );
}