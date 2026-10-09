import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, ShieldCheck, Trophy, HelpCircle, Radio } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/store/index.js";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Matches", path: "/matches" },
  { label: "Tournaments", path: "/tournaments" },
  { label: "Teams", path: "/teams" },
  { label: "How to Use", path: "/how-to" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 border-b border-white/10 bg-[#0c0f12]/90 backdrop-blur-xl transition-all">
      <div className="max-w-[1420px] mx-auto px-4 lg:px-6 h-full">
        <nav className="h-full flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#94d5a5] to-[#16a34a] flex items-center justify-center font-black text-[#04210e] text-sm sm:text-base shadow-lg shadow-[#94d5a5]/20">
              BL
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-[#94d5a5] tracking-tight leading-none">
                BoundaryLine
              </span>
              <span className="text-[10px] text-[#8a938a] font-medium tracking-widest uppercase leading-tight hidden sm:block">
                Cricket Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative text-sm font-medium transition-all py-1.5 ${
                    isActive ? "text-[#94d5a5] font-semibold" : "text-[#c0c9bf] hover:text-[#94d5a5]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#94d5a5] rounded-full shadow-sm shadow-[#94d5a5]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Auth / User Profile */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#94d5a5]/40 hover:bg-white/10 transition group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#94d5a5] text-[#04210e] font-bold flex items-center justify-center text-xs">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-semibold text-[#eef2ef] group-hover:text-[#94d5a5] transition-colors leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-[#94d5a5] font-mono leading-tight uppercase">
                      {role || "USER"}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#14181c] border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-2xl">
                    <div className="p-3 border-b border-white/5 mb-1">
                      <p className="text-xs font-semibold text-white">{user.name}</p>
                      <p className="text-[11px] text-[#8a938a] truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/tournaments?create=true"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#e2e2e6] hover:bg-[#94d5a5]/10 hover:text-[#94d5a5] transition"
                    >
                      <Trophy size={14} />
                      Create Tournament
                    </Link>

                    {(role === "ADMIN" || role === "SUPER_ADMIN") && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#e2e2e6] hover:bg-[#94d5a5]/10 hover:text-[#94d5a5] transition"
                      >
                        <ShieldCheck size={14} />
                        Admin Dashboard
                      </Link>
                    )}

                    {(role === "SCORER" || role === "ADMIN" || role === "SUPER_ADMIN") && (
                      <Link
                        to="/scorer"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#e2e2e6] hover:bg-[#94d5a5]/10 hover:text-[#94d5a5] transition"
                      >
                        <Radio size={14} />
                        Scorer Console
                      </Link>
                    )}

                    <Link
                      to="/how-to"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#e2e2e6] hover:bg-white/5 transition"
                    >
                      <HelpCircle size={14} />
                      How to Use Guide
                    </Link>

                    <div className="pt-1 mt-1 border-t border-white/5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition text-left"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/userlogin")}
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#e2e2e6] hover:text-[#94d5a5] hover:bg-white/5 transition"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate("/userregister")}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#94d5a5] to-[#16a34a] text-[#04210e] text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#94d5a5]/20 transition"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-[#c0c9bf] hover:text-white hover:bg-white/5 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c0f12] px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-[#94d5a5]/10 text-[#94d5a5] font-semibold"
                  : "text-[#c0c9bf] hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {!isAuthenticated && (
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/userlogin");
                }}
                className="w-full py-2 text-center rounded-xl bg-white/5 text-[#e2e2e6] text-xs font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/userregister");
                }}
                className="w-full py-2 text-center rounded-xl bg-[#94d5a5] text-[#04210e] text-xs font-bold"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
