import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Scores", path: "/" },
  { label: "Schedule", path: "/matches" },
  { label: "Teams", path: "/teams" },
  { label: "Rankings", path: "/ranking" },
  { label: "News", path: "/news" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header
      className="
                fixed
                top-0
                left-0
                right-0
                z-50
                h-20
                border-b
                border-white/10
                bg-[#111316]/90
                backdrop-blur-xl
            "
    >
      <div className="max-w-[1420px] mx-auto px-4 lg:px-6 h-full">
        <nav className="h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#94d5a5] flex items-center justify-center font-black text-[#00391c]">
              BL
            </div>

            <span className="text-xl lg:text-2xl font-bold text-[#94d5a5]">
              BoundaryLine
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`
                                    relative
                                    text-sm
                                    lg:text-base
                                    transition-all
                                    pb-1
                                    ${
                                      location.pathname === item.path
                                        ? "text-[#94d5a5] font-semibold"
                                        : "text-[#c0c9bf] hover:text-[#94d5a5]"
                                    }
                                `}
              >
                {item.label}

                {location.pathname === item.path && (
                  <span
                    className="
                                            absolute
                                            left-0
                                            -bottom-1
                                            w-full
                                            h-[2px]
                                            bg-[#94d5a5]
                                        "
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth/userlogin")}
              className="
                                hidden
                                sm:block
                                text-[#e2e2e6]
                                hover:text-[#94d5a5]
                                transition-colors
                                text-sm
                                lg:text-base
                            "
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth/userregister")}
              className="
                                hidden
                                sm:flex
                                items-center
                                justify-center
                                h-10
                                px-5
                                rounded-xl
                                bg-[#94d5a5]
                                text-[#00391c]
                                font-semibold
                                hover:opacity-90
                                transition
                            "
            >
              Signup
            </button>

            {/* Mobile Menu */}
            <button
              className="
                                md:hidden
                                text-white
                                hover:text-[#94d5a5]
                                transition-colors
                            "
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
