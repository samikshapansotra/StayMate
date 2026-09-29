// ============================================================
// Home.jsx — Home Page
// ============================================================
// This is the landing page of StayMate. It contains:
//   1. Hero Section with search bar
//   2. Featured PG Cards (from mock data)
//   3. Why Choose StayMate?
//   4. How It Works (step-by-step)
//   5. Popular Locations
//   6. Call-to-Action Section
//
// The Navbar and Footer are rendered in App.jsx (layout),
// so they are NOT included here.
// ============================================================

import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import PGCard from "../components/PGCard";
import FeatureCard from "../components/FeatureCard";
import pgData from "../data/pgData";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      {/* ============================
          SECTION 1 — Hero
          ============================ */}
      <section className="hero" id="hero-section">
        {/* Background overlay for readability */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect PG,
            <br />
            <span className="hero-title-accent">Your New Home.</span>
          </h1>
          <p className="hero-subtitle">
            Discover comfortable, affordable and verified PG accommodations that
            match your needs.
          </p>

          {/* Search Bar Component */}
          <SearchBar />

          {/* Trust Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">500+</span>
              <span className="hero-stat-label">PG Listed</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">1200+</span>
              <span className="hero-stat-label">Happy Tenants</span>
            </div>
            <div className="hero-stat-divider"></div>
            <div className="hero-stat">
              <span className="hero-stat-number">50+</span>
              <span className="hero-stat-label">Cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 2 — Featured PGs
          ============================ */}
      <section className="section featured-section" id="featured-pgs">
        <div className="section-container">
          <h2 className="section-title">Featured PGs</h2>
          <p className="section-subtitle">
            Explore our top-rated PG accommodations handpicked for you
          </p>

          <div className="pg-grid">
            {pgData.map((pg) => (
              <PGCard key={pg.id} pg={pg} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 3 — Why Choose StayMate?
          ============================ */}
      <section className="section why-section" id="why-choose">
        <div className="section-container">
          <h2 className="section-title">Why Choose StayMate?</h2>
          <p className="section-subtitle">
            Everything you need to find your ideal accommodation
          </p>

          <div className="features-grid">
            <FeatureCard
              icon="🔍"
              title="Easy Search"
              description="Find PGs according to location, budget and preferences with our smart filters."
            />
            <FeatureCard
              icon="💰"
              title="Affordable Options"
              description="Discover PG accommodations across all budgets — from economical to premium."
            />
            <FeatureCard
              icon="🏠"
              title="Detailed Listings"
              description="View rent, amenities, room types, photos and other important information."
            />
            <FeatureCard
              icon="🤝"
              title="Direct Connection"
              description="Connect with PG owners directly and send inquiries or booking requests."
            />
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 4 — How It Works
          ============================ */}
      <section className="section how-section" id="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Finding your perfect PG is just 4 simple steps away
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Search</h3>
              <p className="step-desc">
                Enter your preferred location, budget and requirements.
              </p>
            </div>
            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Explore</h3>
              <p className="step-desc">
                Compare available PGs, check photos, amenities and reviews.
              </p>
            </div>
            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Connect</h3>
              <p className="step-desc">
                Send an inquiry or booking request directly to the PG owner.
              </p>
            </div>
            <div className="step-connector"></div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">Move In</h3>
              <p className="step-desc">
                Finalize your booking and move into your new home!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 5 — Popular Locations
          ============================ */}
      <section className="section locations-section" id="popular-locations">
        <div className="section-container">
          <h2 className="section-title">Popular Locations</h2>
          <p className="section-subtitle">
            Browse PG accommodations in top cities
          </p>

          <div className="locations-grid">
            {[
              { name: "Amritsar", count: 120, emoji: "🕌" },
              { name: "Chandigarh", count: 95, emoji: "🏛️" },
              { name: "Delhi", count: 250, emoji: "🏙️" },
              { name: "Mohali", count: 78, emoji: "🏗️" },
              { name: "Ludhiana", count: 65, emoji: "🏭" },
              { name: "Jalandhar", count: 55, emoji: "🌳" },
            ].map((city, index) => (
              <div className="location-card" key={index}>
                <span className="location-emoji">{city.emoji}</span>
                <h3 className="location-name">{city.name}</h3>
                <p className="location-count">{city.count}+ PGs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 6 — Call to Action
          ============================ */}
      <section className="cta-section" id="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your New Home?</h2>
          <p className="cta-text">
            Start exploring PG accommodations that fit your budget and lifestyle.
            Join thousands of happy tenants who found their perfect stay with
            StayMate.
          </p>
          <div className="cta-buttons">
            <Link to="/" className="cta-btn cta-btn-primary">
              Find a PG
            </Link>
            <Link to="/" className="cta-btn cta-btn-secondary">
              List Your PG
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
