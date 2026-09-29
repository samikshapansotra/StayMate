// ============================================================
// PGCard.jsx — Individual PG Listing Card Component
// ============================================================
// Displays a single PG's summary: image, name, location, rent,
// room type, rating, amenities, and a "View Details" button.
// This component is reusable — it receives PG data via props.
// ============================================================

import { useState } from "react";
import { FiMapPin, FiStar, FiHeart } from "react-icons/fi";
import "./PGCard.css";

function PGCard({ pg }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="pg-card" id={`pg-card-${pg.id}`}>
      {/* PG Image */}
      <div className="pg-card-image">
        <img src={pg.image} alt={pg.name} loading="lazy" />

        {/* Favorite Heart Button */}
        <button
          className={`pg-card-favorite ${isFavorite ? "favorited" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label="Toggle favorite"
        >
          <FiHeart className="heart-icon" />
        </button>

        {/* Gender Badge */}
        {pg.gender && (
          <span className={`pg-card-gender-badge ${pg.gender.toLowerCase()}`}>
            {pg.gender}
          </span>
        )}

        {/* Rating badge overlaid on image */}
        <span className="pg-card-rating">
          <FiStar size={13} fill="currentColor" />
          <span>{pg.rating}</span>
          {pg.reviews !== undefined && (
            <span className="pg-card-reviews-count">({pg.reviews})</span>
          )}
        </span>
      </div>

      {/* Card Content */}
      <div className="pg-card-content">
        <h3 className="pg-card-name">{pg.name}</h3>

        <p className="pg-card-location">
          <FiMapPin size={14} />
          {pg.area ? `${pg.area}, ` : ""}{pg.location}
        </p>

        <div className="pg-card-meta">
          <span className="pg-card-rent">₹{pg.rent.toLocaleString()}/month</span>
          <span className="pg-card-room-type">{pg.roomType}</span>
        </div>

        {/* Availability Badge */}
        {pg.availability !== undefined && (
          <div className="pg-card-availability">
            {pg.availability > 0 ? (
              <span className="avail-status in-stock">
                {pg.availability} {pg.availability === 1 ? "room" : "rooms"} available
              </span>
            ) : (
              <span className="avail-status out-of-stock">
                Filled / No rooms available
              </span>
            )}
          </div>
        )}

        {/* Amenity Tags */}
        <div className="pg-card-amenities">
          {pg.amenities.map((amenity, index) => (
            <span key={index} className="amenity-tag">
              ✓ {amenity}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <button className="pg-card-btn" id={`view-details-${pg.id}`}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default PGCard;
