// ============================================================
// Contact.jsx — Contact Us Page
// ============================================================
// Renders the Contact Us page with:
//   1. Hero section
//   2. Contact information cards (email, phone, location)
//   3. Frontend-only contact form with validation
//   4. "Why Contact Us?" section
//   5. FAQ accordion section
//   6. Call to action
//
// No backend or API calls — form validation and success
// message are handled entirely on the frontend.
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiEdit3,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiHelpCircle,
  FiAlertCircle,
  FiSettings,
  FiThumbsUp,
  FiChevronDown,
} from "react-icons/fi";
import "./Contact.css";

function Contact() {
  // ---------- Form State ----------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ---------- FAQ State ----------
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: "How can I find a PG?",
      answer:
        "Use the Find PG page to search and filter available accommodations based on your location, budget and preferences.",
    },
    {
      question: "Can PG owners list their properties?",
      answer:
        "Yes. PG owners will be able to create and manage property listings on the platform.",
    },
    {
      question: "Can I contact a PG owner?",
      answer:
        "Students will be able to send inquiries or requests to PG owners through the platform.",
    },
    {
      question: "Can I report incorrect listing information?",
      answer:
        "Users can contact the support team regarding incorrect or inappropriate information using this contact form or the email address provided.",
    },
  ];

  // Toggle FAQ open/close
  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // ---------- Input Change Handler ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------- Validation ----------
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Submit Handler (Frontend Only) ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // In a future phase, this will send data to a backend API.
      // For now, simply show a success message.
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  };

  return (
    <main className="contact-page">
      {/* ============================
          SECTION B — Hero
          ============================ */}
      <section className="contact-hero" id="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Have a question or need help finding the right PG? We&rsquo;re here
            to help.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION C — Contact Information
          ============================ */}
      <section className="section contact-info-section" id="contact-info">
        <div className="section-container">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Reach out to us through any of the following channels
          </p>

          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FiMail size={26} />
              </div>
              <h3 className="contact-info-title">Email</h3>
              <p className="contact-info-value">support@staymate.in</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FiPhone size={26} />
              </div>
              <h3 className="contact-info-title">Phone</h3>
              <p className="contact-info-value">+91 98765 43210</p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <FiMapPin size={26} />
              </div>
              <h3 className="contact-info-title">Location</h3>
              <p className="contact-info-value">Amritsar, Punjab, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION D — Contact Form
          ============================ */}
      <section className="section contact-form-section" id="contact-form">
        <div className="section-container">
          <h2 className="section-title">Send Us a Message</h2>
          <p className="section-subtitle">
            Fill out the form below and we&rsquo;ll get back to you
          </p>

          <div className="contact-form-wrapper">
            {submitted ? (
              /* ---- Success Message ---- */
              <div className="contact-success" id="contact-success">
                <div className="contact-success-icon">
                  <FiCheckCircle size={48} />
                </div>
                <h3 className="contact-success-title">Thank You!</h3>
                <p className="contact-success-text">
                  Your message has been received. We&rsquo;ll get back to you as
                  soon as possible.
                </p>
                <button
                  className="contact-success-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ---- Contact Form ---- */
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Full Name */}
                <div className="contact-form-group">
                  <label htmlFor="contact-name" className="contact-form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <div
                    className={`contact-input-wrapper ${
                      errors.name ? "input-error" : ""
                    }`}
                  >
                    <FiUser className="contact-input-icon" size={18} />
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <span className="contact-form-error">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="contact-form-group">
                  <label htmlFor="contact-email" className="contact-form-label">
                    Email <span className="required">*</span>
                  </label>
                  <div
                    className={`contact-input-wrapper ${
                      errors.email ? "input-error" : ""
                    }`}
                  >
                    <FiMail className="contact-input-icon" size={18} />
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <span className="contact-form-error">{errors.email}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="contact-form-group">
                  <label htmlFor="contact-phone" className="contact-form-label">
                    Phone Number
                  </label>
                  <div className="contact-input-wrapper">
                    <FiPhone className="contact-input-icon" size={18} />
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="contact-form-group">
                  <label
                    htmlFor="contact-subject"
                    className="contact-form-label"
                  >
                    Subject
                  </label>
                  <div className="contact-input-wrapper">
                    <FiEdit3 className="contact-input-icon" size={18} />
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="What is your query about?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="contact-form-group contact-form-group-full">
                  <label
                    htmlFor="contact-message"
                    className="contact-form-label"
                  >
                    Message <span className="required">*</span>
                  </label>
                  <div
                    className={`contact-input-wrapper contact-textarea-wrapper ${
                      errors.message ? "input-error" : ""
                    }`}
                  >
                    <FiMessageSquare
                      className="contact-input-icon contact-textarea-icon"
                      size={18}
                    />
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <span className="contact-form-error">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="contact-form-group contact-form-group-full">
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    id="contact-submit-btn"
                  >
                    <FiSend size={18} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================
          SECTION E — Why Contact Us?
          ============================ */}
      <section
        className="section contact-reasons-section"
        id="why-contact"
      >
        <div className="section-container">
          <h2 className="section-title">Why Contact Us?</h2>
          <p className="section-subtitle">
            Here are some reasons you might want to reach out
          </p>

          <div className="contact-reasons-grid">
            <div className="contact-reason-card">
              <FiHelpCircle size={22} />
              <span>Questions about finding a PG</span>
            </div>
            <div className="contact-reason-card">
              <FiAlertCircle size={22} />
              <span>Problems with a listing</span>
            </div>
            <div className="contact-reason-card">
              <FiSettings size={22} />
              <span>Account-related questions</span>
            </div>
            <div className="contact-reason-card">
              <FiThumbsUp size={22} />
              <span>Suggestions or feedback</span>
            </div>
            <div className="contact-reason-card">
              <FiAlertCircle size={22} />
              <span>Reporting incorrect information</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION F — FAQ
          ============================ */}
      <section className="section contact-faq-section" id="faq">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Quick answers to common questions
          </p>

          <div className="contact-faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`contact-faq-item ${
                  openFaq === index ? "open" : ""
                }`}
                key={index}
              >
                <button
                  className="contact-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.question}</span>
                  <FiChevronDown
                    size={20}
                    className="contact-faq-chevron"
                  />
                </button>
                <div className="contact-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          SECTION G — Call to Action
          ============================ */}
      <section className="cta-section" id="contact-cta">
        <div className="cta-content">
          <h2 className="cta-title">Looking for a PG?</h2>
          <p className="cta-text">
            Browse our listings and find an accommodation that fits your needs.
          </p>
          <div className="cta-buttons">
            <Link to="/find-pg" className="cta-btn cta-btn-primary">
              Explore PGs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
