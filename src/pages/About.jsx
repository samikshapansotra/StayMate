// ============================================================
// About.jsx — About Page
// ============================================================
// Explains what PG Finder / StayMate is, its mission, features,
// how it works, and who it serves. All content is informational.
//
// Reuses the existing design tokens (CSS custom properties),
// section layout patterns, and FeatureCard component from the
// Home page so both pages feel visually consistent.
// ============================================================

import { Link } from "react-router-dom";
import {
  FiSearch,
  FiInfo,
  FiHeart,
  FiUsers,
  FiMapPin,
  FiDollarSign,
  FiHome,
  FiList,
  FiSend,
  FiCheckCircle,
  FiEye,
  FiStar,
} from "react-icons/fi";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      {/* ============================
          SECTION A — Hero
          ============================ */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">About PG Finder</h1>
          <p className="about-hero-subtitle">
            Making it easier for students to find a comfortable place they can
            call home.
          </p>
        </div>
      </section>

      {/* ============================
          SECTION C — Our Mission
          ============================ */}
      <section className="section about-mission-section" id="our-mission">
        <div className="section-container">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-subtitle">
            Simplifying accommodation discovery for students and tenants
          </p>

          <div className="about-mission-card">
            <p className="about-mission-text">
              PG Finder is designed to simplify the process of finding suitable
              PG accommodations for students and tenants. Instead of depending on
              multiple sources or visiting different properties physically, users
              can explore available PGs, compare important details and find
              accommodation according to their preferences.
            </p>

            <div className="about-mission-points">
              <div className="about-mission-point">
                <FiCheckCircle size={20} />
                <span>Easier</span>
              </div>
              <div className="about-mission-point">
                <FiCheckCircle size={20} />
                <span>Faster</span>
              </div>
              <div className="about-mission-point">
                <FiCheckCircle size={20} />
                <span>More Transparent</span>
              </div>
              <div className="about-mission-point">
                <FiCheckCircle size={20} />
                <span>More Convenient</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION D — What is PG Finder?
          ============================ */}
      <section className="section about-what-section" id="what-is-pgfinder">
        <div className="section-container">
          <h2 className="section-title">What is PG Finder?</h2>
          <p className="section-subtitle">
            A web-based accommodation discovery platform connecting students and
            PG owners
          </p>

          <div className="about-what-grid">
            {/* Students Column */}
            <div className="about-what-card">
              <div className="about-what-card-icon">
                <FiSearch size={28} />
              </div>
              <h3 className="about-what-card-title">For Students</h3>
              <p className="about-what-card-desc">
                Students can eventually use PG Finder to:
              </p>
              <ul className="about-what-list">
                <li>
                  <FiCheckCircle size={16} /> Search PGs
                </li>
                <li>
                  <FiCheckCircle size={16} /> Filter according to preferences
                </li>
                <li>
                  <FiCheckCircle size={16} /> View PG details
                </li>
                <li>
                  <FiCheckCircle size={16} /> Compare accommodation options
                </li>
                <li>
                  <FiCheckCircle size={16} /> Save favourite PGs
                </li>
                <li>
                  <FiCheckCircle size={16} /> Send inquiries/requests
                </li>
              </ul>
            </div>

            {/* Owners Column */}
            <div className="about-what-card">
              <div className="about-what-card-icon">
                <FiHome size={28} />
              </div>
              <h3 className="about-what-card-title">For PG Owners</h3>
              <p className="about-what-card-desc">
                PG owners can eventually use PG Finder to:
              </p>
              <ul className="about-what-list">
                <li>
                  <FiCheckCircle size={16} /> List their PG
                </li>
                <li>
                  <FiCheckCircle size={16} /> Add property details
                </li>
                <li>
                  <FiCheckCircle size={16} /> Add room and amenity information
                </li>
                <li>
                  <FiCheckCircle size={16} /> Manage their listings
                </li>
                <li>
                  <FiCheckCircle size={16} /> Respond to student requests
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION E — Why Choose PG Finder?
          ============================ */}
      <section className="section about-why-section" id="why-choose-pgfinder">
        <div className="section-container">
          <h2 className="section-title">Why Choose PG Finder?</h2>
          <p className="section-subtitle">
            Features designed to make your accommodation search simple
          </p>

          <div className="about-features-grid">
            <div className="about-feature-card">
              <span className="about-feature-icon">
                <FiSearch size={26} />
              </span>
              <h3 className="about-feature-title">Easy Discovery</h3>
              <p className="about-feature-desc">
                Find PG accommodations based on location, budget and
                preferences.
              </p>
            </div>

            <div className="about-feature-card">
              <span className="about-feature-icon">
                <FiInfo size={26} />
              </span>
              <h3 className="about-feature-title">Detailed Information</h3>
              <p className="about-feature-desc">
                View important information such as rent, room type, amenities
                and availability.
              </p>
            </div>

            <div className="about-feature-card">
              <span className="about-feature-icon">
                <FiHeart size={26} />
              </span>
              <h3 className="about-feature-title">Student Friendly</h3>
              <p className="about-feature-desc">
                Designed with students and tenants in mind for a seamless
                experience.
              </p>
            </div>

            <div className="about-feature-card">
              <span className="about-feature-icon">
                <FiUsers size={26} />
              </span>
              <h3 className="about-feature-title">Owner Connection</h3>
              <p className="about-feature-desc">
                Makes it easier for students and PG owners to connect directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION F — How PG Finder Works
          ============================ */}
      <section className="section about-how-section" id="how-pgfinder-works">
        <div className="section-container">
          <h2 className="section-title">How PG Finder Works</h2>
          <p className="section-subtitle">
            Finding your perfect PG is just 4 simple steps away
          </p>

          <div className="about-steps-grid">
            <div className="about-step-card">
              <div className="about-step-number">1</div>
              <h3 className="about-step-title">Search</h3>
              <p className="about-step-desc">
                Enter your preferred location and requirements.
              </p>
            </div>
            <div className="about-step-connector"></div>

            <div className="about-step-card">
              <div className="about-step-number">2</div>
              <h3 className="about-step-title">Explore</h3>
              <p className="about-step-desc">
                Browse PG listings and compare their details.
              </p>
            </div>
            <div className="about-step-connector"></div>

            <div className="about-step-card">
              <div className="about-step-number">3</div>
              <h3 className="about-step-title">Connect</h3>
              <p className="about-step-desc">
                Send an inquiry or request to the PG owner.
              </p>
            </div>
            <div className="about-step-connector"></div>

            <div className="about-step-card">
              <div className="about-step-number">4</div>
              <h3 className="about-step-title">Find Your Stay</h3>
              <p className="about-step-desc">
                Choose the accommodation that suits your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION G — For Students and PG Owners
          ============================ */}
      <section className="section about-audience-section" id="for-students-owners">
        <div className="section-container">
          <div className="about-audience-grid">
            {/* Students Column */}
            <div className="about-audience-card about-audience-students">
              <div className="about-audience-icon">
                <FiStar size={32} />
              </div>
              <h3 className="about-audience-title">For Students</h3>
              <p className="about-audience-desc">
                Students can discover PGs based on their specific preferences:
              </p>
              <ul className="about-audience-list">
                <li>
                  <FiMapPin size={16} /> Location
                </li>
                <li>
                  <FiDollarSign size={16} /> Budget
                </li>
                <li>
                  <FiHome size={16} /> Room Type
                </li>
                <li>
                  <FiList size={16} /> Amenities
                </li>
                <li>
                  <FiHeart size={16} /> Personal Preferences
                </li>
              </ul>
            </div>

            {/* Owners Column */}
            <div className="about-audience-card about-audience-owners">
              <div className="about-audience-icon">
                <FiEye size={32} />
              </div>
              <h3 className="about-audience-title">For PG Owners</h3>
              <p className="about-audience-desc">
                Owners can showcase their properties and provide important
                information to potential tenants, making it easy for students to
                find and evaluate the right accommodation.
              </p>
              <ul className="about-audience-list">
                <li>
                  <FiHome size={16} /> Property Showcase
                </li>
                <li>
                  <FiList size={16} /> Room &amp; Amenity Details
                </li>
                <li>
                  <FiUsers size={16} /> Tenant Management
                </li>
                <li>
                  <FiSend size={16} /> Inquiry Response
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION H — Our Vision
          ============================ */}
      <section className="section about-vision-section" id="our-vision">
        <div className="section-container">
          <h2 className="section-title">Our Vision</h2>
          <div className="about-vision-card">
            <blockquote className="about-vision-quote">
              &ldquo;Our vision is to create a simple, reliable and
              user-friendly platform that makes finding and managing PG
              accommodation easier for students and property owners.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION I — Call to Action
          ============================ */}
      <section className="cta-section" id="about-cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Perfect PG?</h2>
          <p className="cta-text">
            Explore available accommodations and find a stay that fits your
            needs.
          </p>
          <div className="cta-buttons">
            <Link to="/find-pg" className="cta-btn cta-btn-primary">
              Find a PG
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
