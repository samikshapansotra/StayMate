// ============================================================
// FeatureCard.jsx — Reusable Feature/Advantage Card
// ============================================================
// Used in the "Why Choose StayMate?" section.
// Accepts icon, title, and description as props.
// ============================================================

import "./FeatureCard.css";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="feature-card-icon">{icon}</span>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-desc">{description}</p>
    </div>
  );
}

export default FeatureCard;
