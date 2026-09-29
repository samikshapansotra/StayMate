// ============================================================
// Navbar.jsx — Top Navigation Bar Component
// ============================================================
// Renders the site-wide navigation bar with logo, links, and
// auth buttons. Includes a hamburger menu for mobile screens.
// Uses React Router's <Link> for SPA-style navigation.
// ============================================================

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.css";

function Navbar() {
  // Controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // useLocation lets us highlight the currently active nav link
  const location = useLocation();

  // Toggle mobile menu open/close
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close mobile menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" id="main-navbar">
      {/* ---------- Brand / Logo ---------- */}
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <span className="logo-icon">🏠</span>
        <span className="logo-text">StayMate</span>
      </Link>

      {/* ---------- Navigation Links ---------- */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active-link" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/find-pg"
            className={location.pathname === "/find-pg" ? "active-link" : ""}
            onClick={closeMenu}
          >
            Find PG
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active-link" : ""}
            onClick={closeMenu}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active-link" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>

        {/* Auth buttons shown inside mobile menu */}
        <li className="navbar-auth-mobile">
          <Link to="/login" className="btn-login" onClick={closeMenu}>
            Login
          </Link>
          <Link to="/" className="btn-register" onClick={closeMenu}>
            Register
          </Link>
        </li>
      </ul>

      {/* ---------- Auth Buttons (Desktop) ---------- */}
      <div className="navbar-auth">
        <Link to="/login" className="btn-login">
          Login
        </Link>
        <Link to="/" className="btn-register">
          Register
        </Link>
      </div>

      {/* ---------- Hamburger Icon (Mobile) ---------- */}
      <button
        className="navbar-hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
      </button>
    </nav>
  );
}

export default Navbar;
