// ============================================================
// OwnerRegister.jsx — PG Owner Registration & Onboarding
// ============================================================
// A multi-step onboarding wizard for PG owners to register their
// account and list their first property seamlessly on StayMate.
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEye,
  FiEyeOff,
  FiHome,
  FiDollarSign,
  FiCheckCircle,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiZap
} from "react-icons/fi";
import "./OwnerRegister.css";

const AMENITY_OPTIONS = [
  { id: "wifi", label: "High-Speed Wi-Fi", icon: "📶" },
  { id: "food", label: "3 Times Food/Meals", icon: "🍲" },
  { id: "ac", label: "Air Conditioning (AC)", icon: "❄️" },
  { id: "power", label: "24/7 Power Backup", icon: "⚡" },
  { id: "cctv", label: "CCTV & Security Guard", icon: "📹" },
  { id: "laundry", label: "Washing Machine / Laundry", icon: "🧺" },
  { id: "cleaning", label: "Daily Room Housekeeping", icon: "🧹" },
  { id: "water", label: "RO Drinking Water", icon: "💧" },
  { id: "geyser", label: "Hot Water Geyser", icon: "🚿" },
  { id: "parking", label: "Bike / Car Parking", icon: "🚗" },
  { id: "gym", label: "Fitness Gym", icon: "🏋️" },
  { id: "balcony", label: "Balcony / Terrace", icon: "🌿" }
];

function OwnerRegister() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Owner Details
    ownerName: "",
    email: "",
    phone: "",
    city: "Amritsar",
    password: "",
    confirmPassword: "",

    // Step 2: Property Details
    propertyName: "",
    propertyType: "Boys", // Boys, Girls, Unisex / Co-living
    address: "",
    area: "",
    totalBeds: "12",
    totalRooms: "6",
    rentStarting: "7500",
    securityDeposit: "5000",

    // Step 3: Amenities & Verification
    amenities: ["wifi", "food", "ac", "power", "cctv", "laundry"],
    idType: "Aadhaar Card",
    idNumber: "",
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleAmenity = (id) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(id);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== id)
          : [...prev.amenities, id]
      };
    });
  };

  // Demo autofill for rapid testing
  const handleAutofillDemo = () => {
    setFormData({
      ownerName: "Ravi Kumar Verma",
      email: "ravi.pgowner@staymate.in",
      phone: "+91 98765 12340",
      city: "Amritsar",
      password: "password123",
      confirmPassword: "password123",

      propertyName: "Royal Palm Luxury PG",
      propertyType: "Unisex / Co-living",
      address: "Plot 42, Green Avenue, Near GNDU Campus",
      area: "Green Avenue",
      totalBeds: "18",
      totalRooms: "8",
      rentStarting: "8500",
      securityDeposit: "5000",

      amenities: ["wifi", "food", "ac", "power", "cctv", "laundry", "cleaning", "water"],
      idType: "Aadhaar Card",
      idNumber: "5423 8812 9011",
      agreeTerms: true
    });
    setErrors({});
  };

  // Validation per step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
        newErrors.phone = "Enter a valid 10-digit phone number";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 2) {
      if (!formData.propertyName.trim()) newErrors.propertyName = "Property / PG name is required";
      if (!formData.address.trim()) newErrors.address = "Property address is required";
      if (!formData.area.trim()) newErrors.area = "Locality / Landmark is required";
      if (!formData.rentStarting || Number(formData.rentStarting) <= 0) {
        newErrors.rentStarting = "Valid monthly rent is required";
      }
    }

    if (step === 3) {
      if (formData.amenities.length === 0) {
        newErrors.amenities = "Please select at least 2 amenities offered";
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "You must agree to StayMate Owner Terms & Partner Policy";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Save mock session data in localStorage for the owner
      const ownerSession = {
        name: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        propertyName: formData.propertyName,
        propertyType: formData.propertyType,
        rentStarting: formData.rentStarting,
        totalBeds: formData.totalBeds,
        amenities: formData.amenities,
        isVerified: true,
        registeredAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        })
      };

      localStorage.setItem("staymate_owner_session", JSON.stringify(ownerSession));
      setIsSubmitted(true);

      // Auto redirect to Owner Dashboard after 2 seconds
      setTimeout(() => {
        navigate("/owner/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="owner-reg-page" id="owner-register-page">
      <div className="owner-reg-container">
        {/* Left Informational Sidebar */}
        <aside className="owner-reg-hero">
          <div className="owner-hero-badge">
            <span className="badge-sparkle">✨</span> StayMate For PG Owners
          </div>
          <h1 className="owner-hero-title">
            Grow your PG occupancy with India&apos;s trusted student housing platform
          </h1>
          <p className="owner-hero-desc">
            Register your PG in under 3 minutes. Reach thousands of verified students &amp; working professionals looking for stays in your area.
          </p>

          <div className="owner-hero-perks">
            <div className="perk-item">
              <div className="perk-icon">🚀</div>
              <div>
                <h4>Zero Brokerage Direct Inquiries</h4>
                <p>Tenants connect directly with you via chat or phone call.</p>
              </div>
            </div>
            <div className="perk-item">
              <div className="perk-icon">💳</div>
              <div>
                <h4>Automated Rent &amp; Tenant Tracker</h4>
                <p>Manage bookings, monthly rent dues, and room availability in one portal.</p>
              </div>
            </div>
            <div className="perk-item">
              <div className="perk-icon">🛡️</div>
              <div>
                <h4>Verified &amp; Safe Tenants</h4>
                <p>Pre-screened profiles with KYC verification checks.</p>
              </div>
            </div>
          </div>

          <div className="owner-hero-footer">
            <p>Already a registered StayMate Partner?</p>
            <Link to="/owner/login" className="owner-login-link">
              Login to Owner Dashboard &rarr;
            </Link>
          </div>
        </aside>

        {/* Right Registration Card */}
        <main className="owner-reg-form-card">
          {/* Top Quick Actions Bar */}
          <div className="owner-form-top">
            <div className="owner-brand-logo">
              <Link to="/" className="owner-brand-link">
                <span>🏠</span> StayMate <strong>Partner Portal</strong>
              </Link>
            </div>
            <button
              type="button"
              className="btn-demo-fill"
              onClick={handleAutofillDemo}
              title="Quick fill with sample PG owner data"
            >
              <FiZap size={14} /> Quick Demo Fill
            </button>
          </div>

          {isSubmitted ? (
            <div className="owner-success-state">
              <div className="success-icon-wrap">
                <FiCheckCircle size={56} className="success-icon" />
              </div>
              <h2>Welcome to StayMate Partner Network!</h2>
              <p className="success-subtitle">
                Your PG <strong>&quot;{formData.propertyName}&quot;</strong> has been successfully registered!
              </p>
              <div className="success-box">
                <p>Redirecting you to your <strong>PG Owner Dashboard</strong> in 2 seconds...</p>
                <div className="loading-spinner"></div>
              </div>
              <button
                className="btn-primary-owner"
                onClick={() => navigate("/owner/dashboard")}
              >
                Go to Dashboard Now &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Stepper Header */}
              <div className="owner-stepper">
                <div className={`step-item ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
                  <div className="step-circle">{currentStep > 1 ? "✓" : "1"}</div>
                  <span className="step-label">Owner Info</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step-item ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
                  <div className="step-circle">{currentStep > 2 ? "✓" : "2"}</div>
                  <span className="step-label">PG Details</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step-item ${currentStep >= 3 ? "active" : ""}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">Amenities</span>
                </div>
              </div>

              {/* Multi-step Form Body */}
              <form onSubmit={handleSubmit} noValidate className="owner-form">
                {/* STEP 1: OWNER DETAILS */}
                {currentStep === 1 && (
                  <div className="form-step-section animate-fade">
                    <h3 className="section-title">Owner Contact Information</h3>
                    <p className="section-subtitle">Let tenants know who will be managing the accommodation.</p>

                    <div className="form-grid">
                      {/* Full Name */}
                      <div className="form-group full-width">
                        <label className="form-label">Full Name / Property Manager Name *</label>
                        <div className={`input-wrap ${errors.ownerName ? "has-error" : ""}`}>
                          <FiUser className="input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. Ravi Kumar"
                            value={formData.ownerName}
                            onChange={(e) => handleInputChange("ownerName", e.target.value)}
                          />
                        </div>
                        {errors.ownerName && <span className="field-error">{errors.ownerName}</span>}
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <div className={`input-wrap ${errors.email ? "has-error" : ""}`}>
                          <FiMail className="input-icon" />
                          <input
                            type="email"
                            placeholder="ravi.owner@gmail.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label className="form-label">Mobile Number (WhatsApp Enabled) *</label>
                        <div className={`input-wrap ${errors.phone ? "has-error" : ""}`}>
                          <FiPhone className="input-icon" />
                          <input
                            type="tel"
                            placeholder="9876543210"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                      </div>

                      {/* City */}
                      <div className="form-group">
                        <label className="form-label">Primary City *</label>
                        <div className="input-wrap">
                          <FiMapPin className="input-icon" />
                          <select
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          >
                            <option value="Amritsar">Amritsar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Mohali">Mohali</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Ludhiana">Ludhiana</option>
                            <option value="Jalandhar">Jalandhar</option>
                            <option value="Other">Other City</option>
                          </select>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="form-group">
                        <label className="form-label">Create Owner Password *</label>
                        <div className={`input-wrap ${errors.password ? "has-error" : ""}`}>
                          <FiLock className="input-icon" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                          />
                          <button
                            type="button"
                            className="toggle-pass-btn"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                          </button>
                        </div>
                        {errors.password && <span className="field-error">{errors.password}</span>}
                      </div>

                      {/* Confirm Password */}
                      <div className="form-group">
                        <label className="form-label">Confirm Password *</label>
                        <div className={`input-wrap ${errors.confirmPassword ? "has-error" : ""}`}>
                          <FiLock className="input-icon" />
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          />
                        </div>
                        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: PROPERTY DETAILS */}
                {currentStep === 2 && (
                  <div className="form-step-section animate-fade">
                    <h3 className="section-title">PG / Hostel Property Details</h3>
                    <p className="section-subtitle">Describe your property to attract matching students &amp; professionals.</p>

                    <div className="form-grid">
                      {/* Property Name */}
                      <div className="form-group full-width">
                        <label className="form-label">PG / Hostel / House Name *</label>
                        <div className={`input-wrap ${errors.propertyName ? "has-error" : ""}`}>
                          <FiHome className="input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. Sunshine Luxury Girls PG"
                            value={formData.propertyName}
                            onChange={(e) => handleInputChange("propertyName", e.target.value)}
                          />
                        </div>
                        {errors.propertyName && <span className="field-error">{errors.propertyName}</span>}
                      </div>

                      {/* Property Gender Category */}
                      <div className="form-group full-width">
                        <label className="form-label">PG Category / Resident Type *</label>
                        <div className="radio-pills">
                          {["Boys", "Girls", "Unisex / Co-living"].map((type) => (
                            <label
                              key={type}
                              className={`pill-option ${formData.propertyType === type ? "selected" : ""}`}
                            >
                              <input
                                type="radio"
                                name="propertyType"
                                value={type}
                                checked={formData.propertyType === type}
                                onChange={(e) => handleInputChange("propertyType", e.target.value)}
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Full Address */}
                      <div className="form-group full-width">
                        <label className="form-label">Complete Street Address *</label>
                        <div className={`input-wrap ${errors.address ? "has-error" : ""}`}>
                          <FiMapPin className="input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. House No. 128, Sector 15 / Near GNDU Gate 2"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                          />
                        </div>
                        {errors.address && <span className="field-error">{errors.address}</span>}
                      </div>

                      {/* Locality / Landmark */}
                      <div className="form-group">
                        <label className="form-label">Locality / Landmark *</label>
                        <div className={`input-wrap ${errors.area ? "has-error" : ""}`}>
                          <FiMapPin className="input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. Ranjit Avenue / Near Bus Stand"
                            value={formData.area}
                            onChange={(e) => handleInputChange("area", e.target.value)}
                          />
                        </div>
                        {errors.area && <span className="field-error">{errors.area}</span>}
                      </div>

                      {/* Total Beds Capacity */}
                      <div className="form-group">
                        <label className="form-label">Total Beds Available</label>
                        <div className="input-wrap">
                          <input
                            type="number"
                            min="1"
                            placeholder="e.g. 15"
                            value={formData.totalBeds}
                            onChange={(e) => handleInputChange("totalBeds", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Monthly Rent Starting */}
                      <div className="form-group">
                        <label className="form-label">Monthly Rent Starting From (₹) *</label>
                        <div className={`input-wrap ${errors.rentStarting ? "has-error" : ""}`}>
                          <FiDollarSign className="input-icon" />
                          <input
                            type="number"
                            placeholder="e.g. 7500"
                            value={formData.rentStarting}
                            onChange={(e) => handleInputChange("rentStarting", e.target.value)}
                          />
                        </div>
                        {errors.rentStarting && <span className="field-error">{errors.rentStarting}</span>}
                      </div>

                      {/* Security Deposit */}
                      <div className="form-group">
                        <label className="form-label">Security Deposit (₹)</label>
                        <div className="input-wrap">
                          <FiDollarSign className="input-icon" />
                          <input
                            type="number"
                            placeholder="e.g. 5000"
                            value={formData.securityDeposit}
                            onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: AMENITIES & VERIFICATION */}
                {currentStep === 3 && (
                  <div className="form-step-section animate-fade">
                    <h3 className="section-title">Amenities &amp; Verification</h3>
                    <p className="section-subtitle">Select facilities provided and verify your owner profile.</p>

                    <div className="amenities-selection">
                      <label className="form-label">Included Amenities &amp; Facilities (Select all that apply)</label>
                      <div className="amenities-grid">
                        {AMENITY_OPTIONS.map((item) => {
                          const isSelected = formData.amenities.includes(item.id);
                          return (
                            <button
                              type="button"
                              key={item.id}
                              className={`amenity-chip ${isSelected ? "selected" : ""}`}
                              onClick={() => toggleAmenity(item.id)}
                            >
                              <span className="amenity-chip-icon">{item.icon}</span>
                              <span className="amenity-chip-label">{item.label}</span>
                              {isSelected && <span className="amenity-check">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                      {errors.amenities && <span className="field-error">{errors.amenities}</span>}
                    </div>

                    <div className="verification-box">
                      <div className="verif-header">
                        <FiShield size={20} className="shield-icon" />
                        <div>
                          <h4>Owner Identity Verification (Optional for instant preview)</h4>
                          <p>Verified badges boost tenant trust by 80% and increase inquiries.</p>
                        </div>
                      </div>
                      <div className="form-grid" style={{ marginTop: "1rem" }}>
                        <div className="form-group">
                          <label className="form-label">ID Document Type</label>
                          <select
                            value={formData.idType}
                            onChange={(e) => handleInputChange("idType", e.target.value)}
                          >
                            <option value="Aadhaar Card">Aadhaar Card</option>
                            <option value="PAN Card">PAN Card</option>
                            <option value="Voter ID">Voter ID</option>
                            <option value="Electricity Bill">Electricity / Utility Bill</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">ID / Registration Number</label>
                          <input
                            type="text"
                            placeholder="e.g. 5423 8812 9011"
                            value={formData.idNumber}
                            onChange={(e) => handleInputChange("idNumber", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="terms-checkbox-group">
                      <label className="terms-label">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                        />
                        <span>
                          I agree to the StayMate <Link to="/about">Terms of Service</Link>,{" "}
                          <Link to="/about">Host &amp; Owner Code of Conduct</Link>, and certify that the PG details provided are authentic.
                        </span>
                      </label>
                      {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
                    </div>
                  </div>
                )}

                {/* Wizard Footer Controls */}
                <div className="owner-form-controls">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="btn-owner-back"
                      onClick={handlePrev}
                    >
                      <FiArrowLeft size={16} /> Previous
                    </button>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      className="btn-owner-next"
                      onClick={handleNext}
                    >
                      Continue to Step {currentStep + 1} <FiArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn-owner-submit"
                    >
                      Complete Registration &amp; Launch Dashboard 🚀
                    </button>
                  )}
                </div>
              </form>

              {/* Login Alternate */}
              <div className="owner-form-bottom-link">
                <p>
                  Are you looking for a PG as a student?{" "}
                  <Link to="/login">Student Login</Link> &bull; Already registered?{" "}
                  <Link to="/owner/login">Owner Login</Link>
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default OwnerRegister;
