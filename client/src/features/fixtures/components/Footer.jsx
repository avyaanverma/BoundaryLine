import { MessageSquare, Rss } from "lucide-react";

export function FooterLinkGroup({ title, links }) {
    return (
        <div>
            <h4 className="text-xs font-semibold text-[#e2e2e6] mb-4">{title}</h4>
            <ul className="space-y-2">
                {links.map(({ label, active }) => (
                    <li key={label}>
                        <a
                            href="#"
                            className={`text-sm transition-colors ${active
                                ? "text-[#94d5a3] underline"
                                : "text-[#c0c9bf] hover:text-[#e2e2e6]"
                                }`}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer() {
    const SOCIAL = [Rss, MessageSquare];
    return (
        <footer className="bg-[#0c0e11] border-t border-[#404941] w-full py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 w-full mx-auto">
                <div>
                    <span className="text-2xl font-bold text-[#94d5a5] block mb-4">BoundaryLine</span>
                    <p className="text-[#c0c9bf] text-sm">
                        The ultimate destination for real-time cricket data, analytics, and fan
                        engagement. Experience the game like never before.
                    </p>
                </div>

                <FooterLinkGroup
                    title="Quick Links"
                    links={[
                        { label: "Live Scores" },
                        { label: "Match Fixtures", active: true },
                        { label: "Rankings" },
                        { label: "Cricket News" },
                    ]}
                />
                <FooterLinkGroup
                    title="Support"
                    links={[
                        { label: "About Us" },
                        { label: "Privacy Policy" },
                        { label: "Terms of Service" },
                        { label: "Contact Us" },
                    ]}
                />

                <div>
                    <h4 className="text-xs font-semibold text-[#e2e2e6] mb-4">Stay Connected</h4>
                    <div className="flex gap-4 mb-4">
                        {SOCIAL.map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-10 h-10 rounded-full bg-[rgba(30,32,35,0.7)] border border-white/[0.08] flex items-center justify-center hover:text-[#94d5a5] transition-all"
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                    <p className="text-[10px] text-[#8a938a]">
                        © 2024 BoundaryLine Analytics. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}


