// ============================================================
// OwnerLogin.jsx — PG Owner Login Portal
// ============================================================
// Dedicated login portal for property owners and managers to
// access their PG listings, inquiries, and tenant tracker.
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiCheckCircle, FiShield, FiHome } from "react-icons/fi";
import "./OwnerLogin.css";

function OwnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      // Mock session set if none exists
      if (!localStorage.getItem("staymate_owner_session")) {
        const defaultOwner = {
          name: "Ravi Kumar Verma",
          email: email || "ravi.owner@staymate.in",
          phone: "+91 98765 12340",
          city: "Amritsar",
          propertyName: "Sunshine Luxury PG",
          propertyType: "Boys",
          rentStarting: "7500",
          totalBeds: "18",
          isVerified: true
        };
        localStorage.setItem("staymate_owner_session", JSON.stringify(defaultOwner));
      }
      navigate("/owner/dashboard");
    }
  };

  // Quick 1-click Demo Login
  const handleDemoLogin = () => {
    setEmail("owner.demo@staymate.in");
    setPassword("staymate123");
    const defaultOwner = {
      name: "Ravi Kumar Verma",
      email: "owner.demo@staymate.in",
      phone: "+91 98765 12340",
      city: "Amritsar",
      propertyName: "Sunshine Luxury PG",
      propertyType: "Boys",
      rentStarting: "7500",
      totalBeds: "18",
      isVerified: true
    };
    localStorage.setItem("staymate_owner_session", JSON.stringify(defaultOwner));
    setTimeout(() => {
      navigate("/owner/dashboard");
    }, 300);
  };

  return (
    <div className="owner-login-page" id="owner-login-page">
      <div className="owner-login-container">
        {/* Left Decorative Column */}
        <div className="owner-login-left">
          <div className="owner-login-brand">
            <Link to="/" className="brand-logo-white">
              <span className="logo-icon">🏠</span> StayMate <strong>Owner Portal</strong>
            </Link>
          </div>

          <div className="owner-login-left-content">
            <div className="owner-login-tag">
              <FiShield size={14} /> Official PG Owner &amp; Host Hub
            </div>
            <h1>Manage Your PG, Tenants &amp; Rents in One Place</h1>
            <p>
              Connect directly with verified students and working professionals looking for PG accommodations across India.
            </p>

            <div className="owner-feature-list">
              <div className="feature-item">
                <FiCheckCircle className="check-icon" />
                <span>Instant inquiry notifications with student contact info</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="check-icon" />
                <span>Update room rates, availability &amp; amenities on the fly</span>
              </div>
              <div className="feature-item">
                <FiCheckCircle className="check-icon" />
                <span>Zero listing fees and direct tenant communication</span>
              </div>
            </div>
          </div>

          <div className="owner-login-left-footer">
            <span>Looking for student login instead?</span>
            <Link to="/login" className="student-login-link">Student Login &rarr;</Link>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="owner-login-right">
          <div className="owner-login-form-wrapper">
            <div className="form-header">
              <h2>PG Owner Login</h2>
              <p>Enter your owner credentials to access your dashboard</p>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="demo-access-banner">
              <div>
                <strong>Want to test without registering?</strong>
                <p>Click below for instant demo owner access</p>
              </div>
              <button
                type="button"
                className="btn-demo-quick"
                onClick={handleDemoLogin}
              >
                <FiZap size={14} /> 1-Click Demo Login
              </button>
            </div>

            <form onSubmit={handleLogin} noValidate className="owner-login-form">
              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="owner-email">Owner Email Address</label>
                <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                  <FiMail className="field-icon" />
                  <input
                    id="owner-email"
                    type="email"
                    placeholder="e.g. ravi.owner@staymate.in"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="label-with-link">
                  <label className="form-label" htmlFor="owner-password">Password</label>
                  <Link to="/" className="forgot-link">Forgot Password?</Link>
                </div>
                <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
                  <FiLock className="field-icon" />
                  <input
                    id="owner-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-owner-login">
                Login to Owner Dashboard &rarr;
              </button>
            </form>

            <div className="owner-register-prompt">
              <p>
                Don&apos;t have a PG Owner account yet?{" "}
                <Link to="/owner/register" className="register-highlight">
                  Register as PG Owner
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerLogin;
