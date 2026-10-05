// ============================================================
// Footer.jsx — Site-wide Footer Component
// ============================================================
// Renders the footer with branding, quick links, user links,
// and contact information. Uses React Router <Link> for
// internal navigation.
// ============================================================

import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        {/* ---------- Brand Column ---------- */}
        <div className="footer-col footer-brand">
          <h3 className="footer-logo">
            <span className="footer-logo-icon">🏠</span> StayMate
          </h3>
          <p className="footer-desc">
            Find your perfect stay, hassle-free. StayMate connects students and
            tenants with verified PG accommodations across India.
          </p>
        </div>

        {/* ---------- Quick Links ---------- */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find-pg">Find PG</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ---------- For PG Owners ---------- */}
        <div className="footer-col">
          <h4 className="footer-col-title">For PG Owners</h4>
          <ul className="footer-links">
            <li><Link to="/owner/register">Register as PG Owner</Link></li>
            <li><Link to="/owner/login">Owner Login</Link></li>
            <li><Link to="/owner/dashboard">Owner Dashboard</Link></li>
            <li><Link to="/owner/register">List Your Property</Link></li>
          </ul>
        </div>

        {/* ---------- Contact ---------- */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact">
            <li>
              <FiMail size={15} />
              <span>support@staymate.in</span>
            </li>
            <li>
              <FiPhone size={15} />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <FiMapPin size={15} />
              <span>Amritsar, Punjab, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Bottom Bar ---------- */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
