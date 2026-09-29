// ============================================================
// SearchBar.jsx — Hero Search Bar Component
// ============================================================
// Renders the search form used in the hero section.
// Currently non-functional (frontend only) — will connect to
// the backend search API in a later phase.
// ============================================================

import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar() {
  // Local state for search form fields
  const [location, setLocation] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // Mock search handler — will be replaced with API call later
  const handleSearch = (e) => {
    e.preventDefault();
    alert(
      `Searching for PGs in "${location || "Any location"}" with rent ₹${minRent || "0"} – ₹${maxRent || "Any"}\n\n(Search functionality will be connected to the backend later.)`
    );
  };

  return (
    <form className="search-bar" onSubmit={handleSearch} id="search-bar">
      {/* Location Input */}
      <div className="search-field search-field-location">
        <FiMapPin className="search-icon" />
        <input
          type="text"
          placeholder="Enter city or location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Location"
        />
      </div>

      {/* Min Rent Input */}
      <div className="search-field">
        <span className="search-icon rupee-icon">₹</span>
        <input
          type="number"
          placeholder="Min rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          min="0"
          aria-label="Minimum rent"
        />
      </div>

      {/* Max Rent Input */}
      <div className="search-field">
        <span className="search-icon rupee-icon">₹</span>
        <input
          type="number"
          placeholder="Max rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          min="0"
          aria-label="Maximum rent"
        />
      </div>

      {/* Search Button */}
      <button type="submit" className="search-btn" id="search-btn">
        <FiSearch size={18} />
        <span>Search PG</span>
      </button>
    </form>
  );
}

export default SearchBar;
