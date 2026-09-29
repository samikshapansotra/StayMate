// ============================================================
// AdminLogin.jsx — Admin Portal Login Page
// ============================================================
// A standalone login page for administrators.
// Uses distinct styling from the main site to differentiate
// the admin area, but retains the PG Finder brand colors.
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      // Mock login - navigate directly to dashboard
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* Top brand area */}
        <div className="admin-login-header">
          <Link to="/" className="admin-login-brand">
            <span className="admin-login-brand-icon">🏠</span>
            <span className="admin-login-brand-text">StayMate</span>
          </Link>
          <span className="admin-badge">Admin Portal</span>
        </div>

        {/* Login Box */}
        <div className="admin-login-box">
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-subtitle">
            Sign in to access the PG Finder dashboard
          </p>

          <form className="admin-login-form" onSubmit={handleLogin} noValidate>
            {/* Email Field */}
            <div className="admin-form-group">
              <label htmlFor="admin-email" className="admin-form-label">
                Email Address
              </label>
              <div className={`admin-input-wrapper ${errors.email ? "input-error" : ""}`}>
                <FiMail className="admin-input-icon" size={18} />
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@pgfinder.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="admin-form-error">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="admin-form-group">
              <label htmlFor="admin-password" className="admin-form-label">
                Password
              </label>
              <div className={`admin-input-wrapper ${errors.password ? "input-error" : ""}`}>
                <FiLock className="admin-input-icon" size={18} />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="admin-form-error">{errors.password}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="admin-form-options">
              <label className="admin-remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="admin-forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="admin-login-btn">
              Login to Dashboard
            </button>
          </form>
        </div>

        {/* Back to Site */}
        <div className="admin-back-link">
          <Link to="/">&larr; Return to main website</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
