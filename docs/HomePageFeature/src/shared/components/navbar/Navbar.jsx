import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <img src="/logo.avif" alt="BoundaryLine" />
        <span>BoundaryLine</span>
      </div>

      <div className="navbar-center">

        <ul className="navbar-menu">

          <li>
            <NavLink
              to="/scores"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Scores
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Teams
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/players"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Players
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              News
            </NavLink>
          </li>

        </ul>

      </div>

      <div className="navbar-right">
        <button className="btn-login">
          Login
        </button>

        <button className="btn-signup">
          Signup
        </button>
      </div>
    </nav>
  );
}

export default Navbar;