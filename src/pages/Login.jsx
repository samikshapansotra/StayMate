// ============================================================
// Login.jsx — Login Page
// ============================================================
// Renders a two-column login layout:
//   Left  → decorative panel with welcome text
//   Right → login form with email, password, and mock handler
//
// No real authentication is implemented yet. The form uses
// basic frontend validation and a mock submit handler.
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

function Login() {
  // ---------- State ----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // ---------- Validation ----------
  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Mock Submit Handler ----------
  const handleLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      // In a future phase, this will send a POST request to the
      // backend authentication API and handle role-based redirects.
      alert(
        `Login successful! (Mock)\n\nEmail: ${email}\n\nReal authentication will be added when the backend is ready.`
      );
    }
  };

  return (
    <div className="login-page" id="login-page">
      {/* ========== Left Panel — Decorative ========== */}
      <div className="login-left">
        <div className="login-left-content">
          <Link to="/" className="login-brand">
            <span className="login-brand-icon">🏠</span>
            <span className="login-brand-text">StayMate</span>
          </Link>

          <div className="login-left-text">
            <h1 className="login-left-title">Welcome Back!</h1>
            <p className="login-left-desc">
              Find your perfect stay and continue your journey with StayMate.
              Thousands of verified PG accommodations are waiting for you.
            </p>
          </div>

          {/* Decorative floating shapes */}
          <div className="login-decor login-decor-1"></div>
          <div className="login-decor login-decor-2"></div>
          <div className="login-decor login-decor-3"></div>
        </div>
      </div>

      {/* ========== Right Panel — Login Form ========== */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Heading */}
          <h2 className="login-heading">Welcome Back</h2>
          <p className="login-subheading">Login to your StayMate account</p>

          {/* Form */}
          <form className="login-form" onSubmit={handleLogin} noValidate>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">
                Email
              </label>
              <div className={`form-input-wrapper ${errors.email ? "input-error" : ""}`}>
                <FiMail className="form-input-icon" size={18} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <div className={`form-input-wrapper ${errors.password ? "input-error" : ""}`}>
                <FiLock className="form-input-icon" size={18} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            {/* Forgot Password */}
            <div className="form-options">
              <Link to="/" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-btn" id="login-submit-btn">
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="login-register-text">
            Don&apos;t have an account?{" "}
            <Link to="/" className="register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
