// ============================================================
// FindPG.jsx — Find PG Page Component
// ============================================================
// Allows students to browse, search, and filter PG accommodations
// based on location, budget, room type, amenities, gender, and rating.
// It is fully responsive, supporting a mobile filter drawer.
// ============================================================

import { useState, useMemo } from "react";
import { FiSearch, FiMapPin, FiFilter, FiX, FiSliders } from "react-icons/fi";
import pgData from "../data/pgData";
import PGCard from "../components/PGCard";
import "./FindPG.css";

function FindPG() {
  // --- Search Bar States ---
  const [searchLocation, setSearchLocation] = useState("");
  const [minRentInput, setMinRentInput] = useState("");
  const [maxRentInput, setMaxRentInput] = useState("");
  const [roomTypeInput, setRoomTypeInput] = useState("Any Room Type");

  // --- Applied Search States (Triggered by clicking "Search PG") ---
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedMinRent, setAppliedMinRent] = useState("");
  const [appliedMaxRent, setAppliedMaxRent] = useState("");
  const [appliedRoomType, setAppliedRoomType] = useState("Any Room Type");

  // --- Sidebar Filter States (Triggered immediately on change) ---
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRentRanges, setSelectedRentRanges] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedRating, setSelectedRating] = useState("Any");

  // --- Sorting & Pagination States ---
  const [sortBy, setSortBy] = useState("Recommended");
  const [visibleCount, setVisibleCount] = useState(6);

  // --- Mobile Filter Drawer Toggle ---
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedLocation(searchLocation);
    setAppliedMinRent(minRentInput);
    setAppliedMaxRent(maxRentInput);
    setAppliedRoomType(roomTypeInput);
    setVisibleCount(6);
  };

  // Toggle checklist selection helper
  const handleToggleFilter = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
    setVisibleCount(6);
  };

  // Clear All Filters & Search
  const handleClearFilters = () => {
    setSearchLocation("");
    setMinRentInput("");
    setMaxRentInput("");
    setRoomTypeInput("Any Room Type");

    setAppliedLocation("");
    setAppliedMinRent("");
    setAppliedMaxRent("");
    setAppliedRoomType("Any Room Type");

    setSelectedLocations([]);
    setSelectedRentRanges([]);
    setSelectedRoomTypes([]);
    setSelectedAmenities([]);
    setSelectedGender("All");
    setSelectedRating("Any");

    setSortBy("Recommended");
    setVisibleCount(6);
  };

  // Count active sidebar filters (to show badge on mobile toggle button)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    count += selectedLocations.length;
    count += selectedRentRanges.length;
    count += selectedRoomTypes.length;
    count += selectedAmenities.length;
    if (selectedGender !== "All") count += 1;
    if (selectedRating !== "Any") count += 1;
    return count;
  }, [
    selectedLocations,
    selectedRentRanges,
    selectedRoomTypes,
    selectedAmenities,
    selectedGender,
    selectedRating
  ]);

  // --- Filter and Sort Logic ---
  const filteredAndSortedPGs = useMemo(() => {
    let results = [...pgData];

    // 1. Search Bar: Location
    if (appliedLocation.trim() !== "") {
      const query = appliedLocation.toLowerCase();
      results = results.filter(
        (pg) =>
          pg.location.toLowerCase().includes(query) ||
          (pg.area && pg.area.toLowerCase().includes(query))
      );
    }

    // 2. Search Bar: Min Rent
    if (appliedMinRent !== "") {
      results = results.filter((pg) => pg.rent >= Number(appliedMinRent));
    }

    // 3. Search Bar: Max Rent
    if (appliedMaxRent !== "") {
      results = results.filter((pg) => pg.rent <= Number(appliedMaxRent));
    }

    // 4. Search Bar: Room Type
    if (appliedRoomType !== "Any Room Type") {
      results = results.filter((pg) => pg.roomType === appliedRoomType);
    }

    // 5. Sidebar: Locations (Multiple checklist check)
    if (selectedLocations.length > 0) {
      results = results.filter((pg) =>
        selectedLocations.includes(pg.location)
      );
    }

    // 6. Sidebar: Room Types (Multiple checklist check)
    if (selectedRoomTypes.length > 0) {
      results = results.filter((pg) =>
        selectedRoomTypes.includes(pg.roomType)
      );
    }

    // 7. Sidebar: Rent Ranges
    if (selectedRentRanges.length > 0) {
      results = results.filter((pg) => {
        return selectedRentRanges.some((range) => {
          if (range === "Under 5000") return pg.rent < 5000;
          if (range === "5000-7000") return pg.rent >= 5000 && pg.rent <= 7000;
          if (range === "7000-10000") return pg.rent >= 7000 && pg.rent <= 10000;
          if (range === "Above 10000") return pg.rent > 10000;
          return true;
        });
      });
    }

    // 8. Sidebar: Amenities (Must contain ALL selected amenities)
    if (selectedAmenities.length > 0) {
      results = results.filter((pg) =>
        selectedAmenities.every((amenity) => pg.amenities.includes(amenity))
      );
    }

    // 9. Sidebar: Gender preference
    if (selectedGender !== "All") {
      results = results.filter((pg) => pg.gender === selectedGender);
    }

    // 10. Sidebar: Rating
    if (selectedRating !== "Any") {
      if (selectedRating === "4") {
        results = results.filter((pg) => pg.rating >= 4.0);
      } else if (selectedRating === "3") {
        results = results.filter((pg) => pg.rating >= 3.0);
      }
    }

    // 11. Sorting
    if (sortBy === "Price: Low to High") {
      results.sort((a, b) => a.rent - b.rent);
    } else if (sortBy === "Price: High to Low") {
      results.sort((a, b) => b.rent - a.rent);
    } else if (sortBy === "Rating: High to Low") {
      results.sort((a, b) => b.rating - a.rating);
    }
    // "Recommended" uses default order from dataset

    return results;
  }, [
    appliedLocation,
    appliedMinRent,
    appliedMaxRent,
    appliedRoomType,
    selectedLocations,
    selectedRentRanges,
    selectedRoomTypes,
    selectedAmenities,
    selectedGender,
    selectedRating,
    sortBy
  ]);

  // Paginated subset
  const displayedPGs = useMemo(() => {
    return filteredAndSortedPGs.slice(0, visibleCount);
  }, [filteredAndSortedPGs, visibleCount]);

  // Sidebar Filter Panel JSX (Reused for Desktop Sidebar & Mobile Drawer)
  const renderFilterPanel = () => (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        {activeFiltersCount > 0 && (
          <button className="clear-filters-link" onClick={handleClearFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="filter-group">
        <h4>Location</h4>
        <div className="filter-checkbox-list">
          {["Amritsar", "Chandigarh", "Delhi", "Mohali", "Ludhiana"].map((loc) => (
            <label key={loc} className="filter-label">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() =>
                  handleToggleFilter(loc, selectedLocations, setSelectedLocations)
                }
              />
              <span>{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rent Ranges Filter */}
      <div className="filter-group">
        <h4>Monthly Rent</h4>
        <div className="filter-checkbox-list">
          {[
            { label: "Under ₹5,000", value: "Under 5000" },
            { label: "₹5,000 – ₹7,000", value: "5000-7000" },
            { label: "₹7,000 – ₹10,000", value: "7000-10000" },
            { label: "Above ₹10,000", value: "Above 10000" }
          ].map((range) => (
            <label key={range.value} className="filter-label">
              <input
                type="checkbox"
                checked={selectedRentRanges.includes(range.value)}
                onChange={() =>
                  handleToggleFilter(
                    range.value,
                    selectedRentRanges,
                    setSelectedRentRanges
                  )
                }
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Room Type Filter */}
      <div className="filter-group">
        <h4>Room Type</h4>
        <div className="filter-checkbox-list">
          {["Single Sharing", "Double Sharing", "Triple Sharing"].map((type) => (
            <label key={type} className="filter-label">
              <input
                type="checkbox"
                checked={selectedRoomTypes.includes(type)}
                onChange={() =>
                  handleToggleFilter(type, selectedRoomTypes, setSelectedRoomTypes)
                }
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="filter-group">
        <h4>Amenities</h4>
        <div className="filter-checkbox-list">
          {[
            "Wi-Fi",
            "AC",
            "Food",
            "Laundry",
            "Parking",
            "Power Backup",
            "CCTV"
          ].map((amenity) => (
            <label key={amenity} className="filter-label">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() =>
                  handleToggleFilter(
                    amenity,
                    selectedAmenities,
                    setSelectedAmenities
                  )
                }
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender Preference Filter */}
      <div className="filter-group">
        <h4>Gender Preference</h4>
        <div className="filter-radio-list">
          {[
            { label: "All Genders", value: "All" },
            { label: "Boys Only", value: "Male" },
            { label: "Girls Only", value: "Female" },
            { label: "Unisex", value: "Unisex" }
          ].map((g) => (
            <label key={g.value} className="filter-radio-label">
              <input
                type="radio"
                name="gender-pref"
                value={g.value}
                checked={selectedGender === g.value}
                onChange={(e) => {
                  setSelectedGender(e.target.value);
                  setVisibleCount(6);
                }}
              />
              <span>{g.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <h4>Rating</h4>
        <div className="filter-radio-list">
          {[
            { label: "Any Rating", value: "Any" },
            { label: "3.0+ Stars", value: "3" },
            { label: "4.0+ Stars", value: "4" }
          ].map((r) => (
            <label key={r.value} className="filter-radio-label">
              <input
                type="radio"
                name="rating-pref"
                value={r.value}
                checked={selectedRating === r.value}
                onChange={(e) => {
                  setSelectedRating(e.target.value);
                  setVisibleCount(6);
                }}
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="find-pg-page">
      {/* ---------- Hero Section ---------- */}
      <section className="find-pg-hero">
        <div className="hero-container">
          <h1 className="hero-title">Find Your Perfect PG</h1>
          <p className="hero-subtitle">
            Explore comfortable and affordable PG accommodations that match your needs.
          </p>

          {/* Large Search Bar */}
          <form className="find-pg-searchbar" onSubmit={handleSearchSubmit}>
            <div className="search-field location-input-container">
              <FiMapPin className="field-icon" />
              <div className="input-col">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Search by city, area or location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="search-field rent-input-container">
              <span className="field-icon rupee-symbol">₹</span>
              <div className="input-col">
                <label>Min Rent</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minRentInput}
                  onChange={(e) => setMinRentInput(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="search-field rent-input-container">
              <span className="field-icon rupee-symbol">₹</span>
              <div className="input-col">
                <label>Max Rent</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxRentInput}
                  onChange={(e) => setMaxRentInput(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="search-field dropdown-input-container">
              <FiSliders className="field-icon" />
              <div className="input-col">
                <label>Room Type</label>
                <select
                  value={roomTypeInput}
                  onChange={(e) => setRoomTypeInput(e.target.value)}
                >
                  <option value="Any Room Type">Any Room Type</option>
                  <option value="Single Sharing">Single Sharing</option>
                  <option value="Double Sharing">Double Sharing</option>
                  <option value="Triple Sharing">Triple Sharing</option>
                </select>
              </div>
            </div>

            <button type="submit" className="search-submit-btn">
              <FiSearch size={18} />
              <span>Search PG</span>
            </button>
          </form>
        </div>
      </section>

      {/* ---------- Main Layout Content ---------- */}
      <div className="find-pg-container">
        {/* Desktop Sidebar Filters */}
        <aside className="find-pg-sidebar">{renderFilterPanel()}</aside>

        {/* Results Listings Content */}
        <main className="find-pg-results">
          {/* Results Action Bar */}
          <div className="results-header">
            <div className="results-count">
              <h2>Available PGs</h2>
              <p>
                {filteredAndSortedPGs.length}{" "}
                {filteredAndSortedPGs.length === 1 ? "PG" : "PGs"} found
              </p>
            </div>

            <div className="results-sorting-actions">
              {/* Mobile Filter Toggle Button */}
              <button
                className="mobile-filter-toggle-btn"
                onClick={() => setShowMobileFilters(true)}
              >
                <FiFilter size={16} />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </button>

              {/* Sorting Dropdown */}
              <div className="sort-container">
                <label>Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setVisibleCount(6);
                  }}
                >
                  <option value="Recommended">Recommended</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Rating: High to Low">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredAndSortedPGs.length === 0 ? (
            <div className="no-results-state">
              <span className="no-results-icon">🔍</span>
              <h3>No PGs Match Your Filters</h3>
              <p>Try adjusting your search keywords, budget, or filters.</p>
              <button className="reset-btn" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="find-pg-grid">
                {displayedPGs.map((pg) => (
                  <PGCard key={pg.id} pg={pg} />
                ))}
              </div>

              {/* Load More Pagination */}
              {filteredAndSortedPGs.length > visibleCount && (
                <div className="load-more-container">
                  <button
                    className="load-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load More Accommodations
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* ---------- Mobile Filter Drawer Overlay ---------- */}
      {showMobileFilters && (
        <div className="mobile-drawer-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Filter Preferences</h3>
              <button
                className="close-drawer-btn"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="drawer-body">{renderFilterPanel()}</div>
            <div className="drawer-footer">
              <button
                className="apply-close-btn"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters ({filteredAndSortedPGs.length} stays)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindPG;
