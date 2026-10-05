// ============================================================
// OwnerDashboard.jsx — PG Owner Management Portal
// ============================================================
// A comprehensive dashboard for PG Owners to manage properties,
// room availability, student inquiries, rent payments, and analytics.
// ============================================================

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiHome,
  FiInbox,
  FiDollarSign,
  FiStar,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiCheck,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUsers,
  FiTrendingUp,
  FiBell,
  FiMenu,
  FiShield,
  FiCheckCircle,
  FiEdit2,
  FiTrash2,
  FiFilter,
  FiEye
} from "react-icons/fi";
import "./OwnerDashboard.css";

// Initial mock properties for the owner
const initialProperties = [
  {
    id: "prop-1",
    name: "Sunshine Luxury PG",
    category: "Boys",
    location: "Near GNDU Campus, Amritsar",
    rentStarting: 7500,
    totalBeds: 24,
    occupiedBeds: 21,
    roomsCount: 8,
    status: "Active",
    rating: 4.8,
    reviewsCount: 34,
    image: "/images/pg-1.jpg",
    amenities: ["Wi-Fi", "Food (3 Meals)", "AC", "Power Backup", "CCTV", "Laundry"]
  },
  {
    id: "prop-2",
    name: "Green View Executive Stays",
    category: "Unisex / Co-living",
    location: "Ranjit Avenue, Amritsar",
    rentStarting: 9500,
    totalBeds: 16,
    occupiedBeds: 13,
    roomsCount: 6,
    status: "Active",
    rating: 4.6,
    reviewsCount: 19,
    image: "/images/pg-2.jpg",
    amenities: ["Wi-Fi", "AC", "Gym", "Power Backup", "Housekeeping", "Parking"]
  }
];

// Initial inquiries from tenants/students
const initialInquiries = [
  {
    id: "inq-101",
    studentName: "Aman Sharma",
    phone: "+91 98140 22334",
    email: "aman.sharma@gmail.com",
    college: "GNDU Amritsar (B.Tech)",
    propertyId: "prop-1",
    propertyName: "Sunshine Luxury PG",
    roomType: "Double Sharing",
    moveInDate: "15 Oct 2026",
    status: "Pending",
    message: "Looking for double sharing room with food included from next week."
  },
  {
    id: "inq-102",
    studentName: "Simran Kaur",
    phone: "+91 97800 55441",
    email: "simran.k@yahoo.com",
    college: "Khalsa College",
    propertyId: "prop-2",
    propertyName: "Green View Executive Stays",
    roomType: "Single Room",
    moveInDate: "01 Nov 2026",
    status: "Approved",
    message: "Working professional at IT Park, need AC single room with parking."
  },
  {
    id: "inq-103",
    studentName: "Rohit Verma",
    phone: "+91 99882 11990",
    email: "rohit.v@outlook.com",
    college: "DAV College",
    propertyId: "prop-1",
    propertyName: "Sunshine Luxury PG",
    roomType: "Triple Sharing",
    moveInDate: "20 Oct 2026",
    status: "Pending",
    message: "Inquiring about monthly rent deposit and gate curfew timings."
  },
  {
    id: "inq-104",
    studentName: "Karan Johal",
    phone: "+91 98722 44321",
    email: "karan.j@gmail.com",
    college: "GNDU Amritsar",
    propertyId: "prop-1",
    propertyName: "Sunshine Luxury PG",
    roomType: "Single Room",
    moveInDate: "10 Oct 2026",
    status: "Rejected",
    message: "Urgent move in required."
  }
];

// Initial rent payment records
const initialPayments = [
  {
    id: "pay-1",
    tenantName: "Aakash Deep",
    roomNo: "Room 102 (Single)",
    propertyName: "Sunshine Luxury PG",
    amount: 9000,
    dueDate: "05 Nov 2026",
    status: "Paid",
    paidOn: "03 Nov 2026"
  },
  {
    id: "pay-2",
    tenantName: "Harman Singh",
    roomNo: "Room 104 (Double)",
    propertyName: "Sunshine Luxury PG",
    amount: 7500,
    dueDate: "05 Nov 2026",
    status: "Paid",
    paidOn: "05 Nov 2026"
  },
  {
    id: "pay-3",
    tenantName: "Pooja Sharma",
    roomNo: "Room 201 (Single)",
    propertyName: "Green View Stays",
    amount: 11000,
    dueDate: "05 Nov 2026",
    status: "Pending",
    paidOn: "-"
  },
  {
    id: "pay-4",
    tenantName: "Vikram Mehta",
    roomNo: "Room 203 (Double)",
    propertyName: "Green View Stays",
    amount: 8500,
    dueDate: "01 Nov 2026",
    status: "Overdue",
    paidOn: "-"
  }
];

function OwnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // overview, properties, inquiries, payments, reviews, profile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ownerData, setOwnerData] = useState({
    name: "Ravi Kumar Verma",
    email: "ravi.owner@staymate.in",
    phone: "+91 98765 12340",
    city: "Amritsar",
    isVerified: true
  });

  // Dynamic state
  const [properties, setProperties] = useState(initialProperties);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [payments, setPayments] = useState(initialPayments);

  // Filter state for inquiries
  const [inquiryFilter, setInquiryFilter] = useState("All");

  // Modal State for Add Property
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    name: "",
    category: "Boys",
    location: "",
    rentStarting: "",
    totalBeds: "",
    roomsCount: "",
    amenitiesInput: "Wi-Fi, Food, AC, Power Backup, CCTV"
  });

  // Load session from localStorage if available
  useEffect(() => {
    const sessionStr = localStorage.getItem("staymate_owner_session");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        setOwnerData((prev) => ({
          ...prev,
          name: session.name || prev.name,
          email: session.email || prev.email,
          phone: session.phone || prev.phone,
          city: session.city || prev.city
        }));

        // If they registered a new property, append it to properties
        if (session.propertyName && !properties.some((p) => p.name === session.propertyName)) {
          const registeredProp = {
            id: `prop-${Date.now()}`,
            name: session.propertyName,
            category: session.propertyType || "Boys",
            location: `${session.city} (Near University)`,
            rentStarting: Number(session.rentStarting) || 7500,
            totalBeds: Number(session.totalBeds) || 12,
            occupiedBeds: 0,
            roomsCount: 4,
            status: "Active",
            rating: 5.0,
            reviewsCount: 1,
            image: "/images/pg-3.jpg",
            amenities: ["Wi-Fi", "Food (3 Meals)", "AC", "Power Backup", "CCTV Security"]
          };
          setProperties((prev) => [registeredProp, ...prev]);
        }
      } catch {
        // use default fallback
      }
    }
  }, []);

  // Stats computation
  const totalBedsCount = properties.reduce((acc, p) => acc + Number(p.totalBeds || 0), 0);
  const occupiedBedsCount = properties.reduce((acc, p) => acc + Number(p.occupiedBeds || 0), 0);
  const occupancyPercentage = totalBedsCount > 0 ? Math.round((occupiedBedsCount / totalBedsCount) * 100) : 0;
  const pendingInquiriesCount = inquiries.filter((i) => i.status === "Pending").length;
  const monthlyEstimatedRevenue = properties.reduce(
    (acc, p) => acc + (Number(p.occupiedBeds || 0) * Number(p.rentStarting || 0)),
    0
  );

  // Inquiry actions
  const handleInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  // Payment status toggle
  const handleTogglePayment = (id) => {
    setPayments((prev) =>
      prev.map((pay) => {
        if (pay.id === id) {
          const isCurrentlyPaid = pay.status === "Paid";
          return {
            ...pay,
            status: isCurrentlyPaid ? "Pending" : "Paid",
            paidOn: isCurrentlyPaid ? "-" : new Date().toLocaleDateString("en-IN")
          };
        }
        return pay;
      })
    );
  };

  // Toggle Property Active Status
  const handleTogglePropertyStatus = (id) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === "Active" ? "Paused" : "Active"
          };
        }
        return p;
      })
    );
  };

  // Add new property submit
  const handleAddPropertySubmit = (e) => {
    e.preventDefault();
    if (!newProp.name.trim() || !newProp.location.trim() || !newProp.rentStarting) {
      alert("Please fill in all required property details.");
      return;
    }

    const created = {
      id: `prop-${Date.now()}`,
      name: newProp.name,
      category: newProp.category,
      location: newProp.location,
      rentStarting: Number(newProp.rentStarting),
      totalBeds: Number(newProp.totalBeds) || 10,
      occupiedBeds: 0,
      roomsCount: Number(newProp.roomsCount) || 4,
      status: "Active",
      rating: 5.0,
      reviewsCount: 0,
      image: "/images/pg-4.jpg",
      amenities: newProp.amenitiesInput.split(",").map((s) => s.trim()).filter(Boolean)
    };

    setProperties((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewProp({
      name: "",
      category: "Boys",
      location: "",
      rentStarting: "",
      totalBeds: "",
      roomsCount: "",
      amenitiesInput: "Wi-Fi, Food, AC, Power Backup, CCTV"
    });
    setActiveTab("properties");
  };

  const handleLogout = () => {
    navigate("/owner/login");
  };

  const filteredInquiries =
    inquiryFilter === "All"
      ? inquiries
      : inquiries.filter((inq) => inq.status === inquiryFilter);

  return (
    <div className="owner-dash-layout" id="owner-dashboard">
      {/* ---------- Sidebar Navigation ---------- */}
      <aside className={`owner-dash-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="dash-sidebar-header">
          <Link to="/" className="dash-brand">
            <span className="dash-brand-icon">🏠</span>
            <div className="dash-brand-text">
              <span>StayMate</span>
              <small>PG Owner Portal</small>
            </div>
          </Link>
          <button
            className="btn-close-sidebar"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Owner Quick Profile Tag */}
        <div className="owner-sidebar-profile">
          <div className="owner-avatar">
            {ownerData.name ? ownerData.name.charAt(0).toUpperCase() : "O"}
          </div>
          <div className="owner-info">
            <h4 className="owner-name">{ownerData.name}</h4>
            <span className="owner-verified-badge">
              <FiShield size={12} /> Verified Partner
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="dash-nav">
          <ul className="dash-nav-list">
            <li>
              <button
                className={`dash-nav-item ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("overview");
                  setSidebarOpen(false);
                }}
              >
                <FiGrid size={18} />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`dash-nav-item ${activeTab === "properties" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("properties");
                  setSidebarOpen(false);
                }}
              >
                <FiHome size={18} />
                <span>My Properties</span>
                <span className="nav-pill">{properties.length}</span>
              </button>
            </li>
            <li>
              <button
                className={`dash-nav-item ${activeTab === "inquiries" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("inquiries");
                  setSidebarOpen(false);
                }}
              >
                <FiInbox size={18} />
                <span>Tenant Inquiries</span>
                {pendingInquiriesCount > 0 && (
                  <span className="nav-pill-badge">{pendingInquiriesCount}</span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`dash-nav-item ${activeTab === "payments" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("payments");
                  setSidebarOpen(false);
                }}
              >
                <FiDollarSign size={18} />
                <span>Rent Tracker</span>
              </button>
            </li>
            <li>
              <button
                className={`dash-nav-item ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("reviews");
                  setSidebarOpen(false);
                }}
              >
                <FiStar size={18} />
                <span>Guest Reviews</span>
              </button>
            </li>
            <li>
              <button
                className={`dash-nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("profile");
                  setSidebarOpen(false);
                }}
              >
                <FiSettings size={18} />
                <span>Profile &amp; Settings</span>
              </button>
            </li>
          </ul>

          <div className="dash-nav-footer">
            <Link to="/" className="dash-nav-item view-site-link">
              <FiEye size={18} />
              <span>Back to Public Site</span>
            </Link>
            <button className="dash-nav-item logout-btn" onClick={handleLogout}>
              <FiLogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Backdrop for Mobile */}
      {sidebarOpen && (
        <div
          className="dash-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ---------- Main Content Area ---------- */}
      <main className="owner-dash-main">
        {/* Top Header */}
        <header className="dash-top-header">
          <div className="header-left">
            <button
              className="btn-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
            <div>
              <h2 className="header-title">
                {activeTab === "overview" && "Owner Dashboard Overview"}
                {activeTab === "properties" && "My PG Properties"}
                {activeTab === "inquiries" && "Tenant Bookings & Inquiries"}
                {activeTab === "payments" && "Rent Collection & Dues"}
                {activeTab === "reviews" && "Student Ratings & Feedback"}
                {activeTab === "profile" && "Owner Profile & Verification"}
              </h2>
              <p className="header-sub">
                Welcome back, {ownerData.name}! Here is what is happening across your PGs today.
              </p>
            </div>
          </div>

          <div className="header-right">
            <button
              className="btn-add-property-top"
              onClick={() => setIsAddModalOpen(true)}
            >
              <FiPlus size={18} /> Add New PG
            </button>
          </div>
        </header>

        {/* Dashboard Main Content Body */}
        <div className="dash-content-body">
          {/* ==================== TAB 1: OVERVIEW ==================== */}
          {activeTab === "overview" && (
            <div className="tab-view animate-fade">
              {/* Stat Metric Cards */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon icon-teal">
                    <FiHome size={24} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-value">{properties.length}</span>
                    <span className="metric-label">Listed Properties</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon icon-amber">
                    <FiUsers size={24} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-value">
                      {occupiedBedsCount} / {totalBedsCount}
                    </span>
                    <span className="metric-label">Occupied Beds ({occupancyPercentage}%)</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon icon-green">
                    <FiDollarSign size={24} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-value">
                      ₹{monthlyEstimatedRevenue.toLocaleString("en-IN")}
                    </span>
                    <span className="metric-label">Monthly Gross Revenue</span>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon icon-purple">
                    <FiInbox size={24} />
                  </div>
                  <div className="metric-data">
                    <span className="metric-value">{pendingInquiriesCount}</span>
                    <span className="metric-label">Pending Inquiries</span>
                  </div>
                </div>
              </div>

              {/* Action Banner for PG Owners */}
              <div className="owner-action-banner">
                <div className="banner-text">
                  <h3>Boost your bookings with StayMate Verified Badge</h3>
                  <p>
                    Your properties in {ownerData.city} are currently receiving high student traffic. Keep your room rates and photo gallery updated for maximum inquiry conversions.
                  </p>
                </div>
                <button
                  className="banner-cta-btn"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <FiPlus size={16} /> List Another PG Property
                </button>
              </div>

              {/* Two Column Layout: Recent Inquiries + Properties Status */}
              <div className="overview-two-col">
                {/* Recent Inquiries Card */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <div>
                      <h3>Recent Inquiries</h3>
                      <p>Students looking for immediate accommodation</p>
                    </div>
                    <button
                      className="dash-link-btn"
                      onClick={() => setActiveTab("inquiries")}
                    >
                      View All ({inquiries.length}) &rarr;
                    </button>
                  </div>

                  <div className="inquiries-mini-list">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="inquiry-mini-card">
                        <div className="inquiry-mini-header">
                          <div>
                            <h4 className="inquiry-student-name">{inq.studentName}</h4>
                            <span className="inquiry-sub">
                              {inq.college} &bull; {inq.propertyName}
                            </span>
                          </div>
                          <span className={`status-tag status-${inq.status.toLowerCase()}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="inquiry-msg">&quot;{inq.message}&quot;</p>
                        <div className="inquiry-mini-footer">
                          <span className="inquiry-date">Move-in: {inq.moveInDate}</span>
                          {inq.status === "Pending" && (
                            <div className="inquiry-mini-actions">
                              <button
                                className="btn-action-check"
                                onClick={() => handleInquiryStatus(inq.id, "Approved")}
                                title="Approve inquiry"
                              >
                                <FiCheck size={14} /> Accept
                              </button>
                              <button
                                className="btn-action-reject"
                                onClick={() => handleInquiryStatus(inq.id, "Rejected")}
                                title="Decline inquiry"
                              >
                                <FiX size={14} /> Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Properties Quick View */}
                <div className="dash-card">
                  <div className="dash-card-header">
                    <div>
                      <h3>Property Occupancy Snapshot</h3>
                      <p>Live bed availability across your stays</p>
                    </div>
                    <button
                      className="dash-link-btn"
                      onClick={() => setActiveTab("properties")}
                    >
                      Manage Properties &rarr;
                    </button>
                  </div>

                  <div className="properties-mini-list">
                    {properties.map((prop) => {
                      const propOccupancy =
                        prop.totalBeds > 0
                          ? Math.round((prop.occupiedBeds / prop.totalBeds) * 100)
                          : 0;
                      return (
                        <div key={prop.id} className="prop-mini-card">
                          <div className="prop-mini-top">
                            <div>
                              <h4>{prop.name}</h4>
                              <span className="prop-mini-loc">
                                <FiMapPin size={12} /> {prop.location}
                              </span>
                            </div>
                            <span
                              className={`prop-status-pill ${
                                prop.status === "Active" ? "active" : "paused"
                              }`}
                            >
                              {prop.status}
                            </span>
                          </div>

                          <div className="occupancy-progress-wrap">
                            <div className="occupancy-progress-text">
                              <span>Occupancy</span>
                              <strong>
                                {prop.occupiedBeds} / {prop.totalBeds} Beds ({propOccupancy}%)
                              </strong>
                            </div>
                            <div className="progress-bar-bg">
                              <div
                                className="progress-bar-fill"
                                style={{ width: `${propOccupancy}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="prop-mini-footer">
                            <span className="prop-mini-rent">
                              Starts from <strong>₹{prop.rentStarting}</strong>/mo
                            </span>
                            <button
                              className="btn-edit-mini"
                              onClick={() => setActiveTab("properties")}
                            >
                              <FiEdit2 size={13} /> Edit
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: MY PROPERTIES ==================== */}
          {activeTab === "properties" && (
            <div className="tab-view animate-fade">
              <div className="tab-actions-bar">
                <div>
                  <h3 className="tab-title">Active Property Listings ({properties.length})</h3>
                  <p className="tab-sub">Manage room rates, toggle active status, and add new accommodations.</p>
                </div>
                <button
                  className="btn-primary-add"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <FiPlus size={16} /> Add New PG Property
                </button>
              </div>

              <div className="properties-grid">
                {properties.map((prop) => {
                  const propOccupancy =
                    prop.totalBeds > 0
                      ? Math.round((prop.occupiedBeds / prop.totalBeds) * 100)
                      : 0;

                  return (
                    <div key={prop.id} className="owner-property-card">
                      <div className="prop-card-img-wrap">
                        <img
                          src={prop.image || "/images/pg-1.jpg"}
                          alt={prop.name}
                          className="prop-card-img"
                          onError={(e) => {
                            e.target.src = "/images/pg-1.jpg";
                          }}
                        />
                        <span className="prop-gender-tag">{prop.category}</span>
                        <button
                          className={`prop-live-toggle ${
                            prop.status === "Active" ? "status-live" : "status-paused"
                          }`}
                          onClick={() => handleTogglePropertyStatus(prop.id)}
                          title="Click to toggle active status"
                        >
                          {prop.status === "Active" ? "● Active Listing" : "○ Listing Paused"}
                        </button>
                      </div>

                      <div className="prop-card-body">
                        <div className="prop-card-main-info">
                          <h4 className="prop-card-title">{prop.name}</h4>
                          <p className="prop-card-address">
                            <FiMapPin size={14} /> {prop.location}
                          </p>
                        </div>

                        <div className="prop-card-stats-row">
                          <div className="prop-stat-box">
                            <span className="stat-label">Total Rooms</span>
                            <span className="stat-val">{prop.roomsCount} Rooms</span>
                          </div>
                          <div className="prop-stat-box">
                            <span className="stat-label">Available Beds</span>
                            <span className="stat-val font-accent">
                              {prop.totalBeds - prop.occupiedBeds} Free
                            </span>
                          </div>
                          <div className="prop-stat-box">
                            <span className="stat-label">Rent / Month</span>
                            <span className="stat-val">₹{prop.rentStarting}</span>
                          </div>
                        </div>

                        {/* Occupancy gauge */}
                        <div className="prop-card-occupancy">
                          <div className="occupancy-labels">
                            <span>Occupancy Rate</span>
                            <strong>{propOccupancy}%</strong>
                          </div>
                          <div className="gauge-track">
                            <div
                              className="gauge-fill"
                              style={{ width: `${propOccupancy}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Amenities Chips */}
                        <div className="prop-card-amenities">
                          {prop.amenities.slice(0, 4).map((am, i) => (
                            <span key={i} className="amenity-mini-chip">
                              ✓ {am}
                            </span>
                          ))}
                          {prop.amenities.length > 4 && (
                            <span className="amenity-mini-chip more">
                              +{prop.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        <div className="prop-card-footer">
                          <button
                            className="btn-prop-edit"
                            onClick={() => alert(`Editing options for ${prop.name}`)}
                          >
                            <FiEdit2 size={14} /> Edit Pricing &amp; Details
                          </button>
                          <button
                            className="btn-prop-inquiries"
                            onClick={() => setActiveTab("inquiries")}
                          >
                            <FiInbox size={14} /> Inquiries
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== TAB 3: TENANT INQUIRIES ==================== */}
          {activeTab === "inquiries" && (
            <div className="tab-view animate-fade">
              <div className="inquiries-control-bar">
                <div>
                  <h3 className="tab-title">Student Booking Inquiries ({inquiries.length})</h3>
                  <p className="tab-sub">Review incoming tenant requests, connect with applicants, and confirm stays.</p>
                </div>

                {/* Filter Pills */}
                <div className="filter-pill-group">
                  {["All", "Pending", "Approved", "Rejected"].map((f) => (
                    <button
                      key={f}
                      className={`filter-pill ${inquiryFilter === f ? "active" : ""}`}
                      onClick={() => setInquiryFilter(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="empty-inquiries-card">
                  <FiInbox size={48} className="empty-icon" />
                  <h4>No {inquiryFilter !== "All" ? inquiryFilter : ""} Inquiries Found</h4>
                  <p>When students submit inquiry forms from the Find PG page, they will show up here immediately.</p>
                </div>
              ) : (
                <div className="inquiries-table-card">
                  <div className="table-responsive">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Student Info</th>
                          <th>Property &amp; Room</th>
                          <th>Move-in Date</th>
                          <th>Message / Requirements</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInquiries.map((inq) => (
                          <tr key={inq.id}>
                            <td>
                              <div className="student-profile-cell">
                                <strong>{inq.studentName}</strong>
                                <span className="student-sub">{inq.college}</span>
                                <div className="contact-links">
                                  <a href={`tel:${inq.phone}`} title="Call student">
                                    <FiPhone size={12} /> {inq.phone}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td>
                              <strong>{inq.propertyName}</strong>
                              <span className="table-cell-sub">{inq.roomType}</span>
                            </td>
                            <td>
                              <span className="date-badge">{inq.moveInDate}</span>
                            </td>
                            <td className="message-cell">
                              <p title={inq.message}>{inq.message}</p>
                            </td>
                            <td>
                              <span className={`status-tag status-${inq.status.toLowerCase()}`}>
                                {inq.status}
                              </span>
                            </td>
                            <td>
                              <div className="table-action-btns">
                                {inq.status !== "Approved" && (
                                  <button
                                    className="btn-approve"
                                    onClick={() => handleInquiryStatus(inq.id, "Approved")}
                                    title="Approve booking"
                                  >
                                    <FiCheck size={14} /> Accept
                                  </button>
                                )}
                                {inq.status !== "Rejected" && (
                                  <button
                                    className="btn-reject"
                                    onClick={() => handleInquiryStatus(inq.id, "Rejected")}
                                    title="Decline"
                                  >
                                    <FiX size={14} /> Decline
                                  </button>
                                )}
                                <a
                                  href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-chat"
                                  title="Chat on WhatsApp"
                                >
                                  💬 Chat
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB 4: RENT TRACKER ==================== */}
          {activeTab === "payments" && (
            <div className="tab-view animate-fade">
              <div className="tab-actions-bar">
                <div>
                  <h3 className="tab-title">Monthly Rent &amp; Dues Collection</h3>
                  <p className="tab-sub">Track tenant monthly rent payments, overdue balances, and generate receipts.</p>
                </div>
              </div>

              <div className="payments-table-card">
                <div className="table-responsive">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Tenant Name</th>
                        <th>Room &amp; Property</th>
                        <th>Monthly Rent</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Paid Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((pay) => (
                        <tr key={pay.id}>
                          <td>
                            <strong>{pay.tenantName}</strong>
                          </td>
                          <td>
                            <span>{pay.roomNo}</span>
                            <span className="table-cell-sub">{pay.propertyName}</span>
                          </td>
                          <td>
                            <strong className="rent-amount">
                              ₹{pay.amount.toLocaleString("en-IN")}
                            </strong>
                          </td>
                          <td>{pay.dueDate}</td>
                          <td>
                            <span className={`payment-badge badge-${pay.status.toLowerCase()}`}>
                              {pay.status}
                            </span>
                          </td>
                          <td>{pay.paidOn}</td>
                          <td>
                            <button
                              className={`btn-toggle-payment ${
                                pay.status === "Paid" ? "btn-paid" : "btn-mark-paid"
                              }`}
                              onClick={() => handleTogglePayment(pay.id)}
                            >
                              {pay.status === "Paid" ? "✓ Mark Unpaid" : "Mark as Paid"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: REVIEWS ==================== */}
          {activeTab === "reviews" && (
            <div className="tab-view animate-fade">
              <div className="tab-actions-bar">
                <div>
                  <h3 className="tab-title">Verified Student Reviews</h3>
                  <p className="tab-sub">Feedback and ratings given by students staying at your PG.</p>
                </div>
              </div>

              <div className="reviews-grid">
                <div className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">R</div>
                      <div>
                        <strong>Rahul Sharma</strong>
                        <span className="reviewer-stay">Stayed 6 months at Sunshine Luxury PG</span>
                      </div>
                    </div>
                    <div className="stars-row">⭐⭐⭐⭐⭐ <span>5.0</span></div>
                  </div>
                  <p className="review-text">
                    &quot;Best PG near GNDU campus! The food is hygienic and tastes just like home. High-speed Wi-Fi is great for online classes and owner uncle is very helpful.&quot;
                  </p>
                </div>

                <div className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">P</div>
                      <div>
                        <strong>Priya Saini</strong>
                        <span className="reviewer-stay">Stayed at Green View Stays</span>
                      </div>
                    </div>
                    <div className="stars-row">⭐⭐⭐⭐⭐ <span>4.8</span></div>
                  </div>
                  <p className="review-text">
                    &quot;Very safe environment for girls with biometric gate security and power backup. Clean rooms with regular housekeeping.&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 6: PROFILE ==================== */}
          {activeTab === "profile" && (
            <div className="tab-view animate-fade">
              <div className="profile-card">
                <div className="profile-header-banner">
                  <div className="profile-large-avatar">
                    {ownerData.name ? ownerData.name.charAt(0).toUpperCase() : "O"}
                  </div>
                  <div className="profile-title-block">
                    <h3>{ownerData.name}</h3>
                    <p>{ownerData.email} &bull; {ownerData.city}, Punjab</p>
                    <span className="verified-pill">
                      <FiShield size={14} /> StayMate Verified Partner
                    </span>
                  </div>
                </div>

                <div className="profile-details-grid">
                  <div className="detail-item">
                    <label>Registered Mobile Number</label>
                    <p>{ownerData.phone}</p>
                  </div>
                  <div className="detail-item">
                    <label>Operating City</label>
                    <p>{ownerData.city}</p>
                  </div>
                  <div className="detail-item">
                    <label>Total Properties Listed</label>
                    <p>{properties.length} Properties</p>
                  </div>
                  <div className="detail-item">
                    <label>Account Status</label>
                    <p className="text-success">Active &amp; In Good Standing</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ---------- ADD NEW PROPERTY MODAL ---------- */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="modal-content animate-fade"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>List a New PG Property</h3>
              <button
                className="btn-modal-close"
                onClick={() => setIsAddModalOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPropertySubmit} className="modal-form">
              <div className="modal-form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Property / PG Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palace Boys PG"
                    value={newProp.name}
                    onChange={(e) =>
                      setNewProp({ ...newProp, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resident Category *</label>
                  <select
                    value={newProp.category}
                    onChange={(e) =>
                      setNewProp({ ...newProp, category: e.target.value })
                    }
                  >
                    <option value="Boys">Boys PG</option>
                    <option value="Girls">Girls PG</option>
                    <option value="Unisex / Co-living">Unisex / Co-living</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Monthly Rent Starting (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 8000"
                    value={newProp.rentStarting}
                    onChange={(e) =>
                      setNewProp({ ...newProp, rentStarting: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Address / Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near GNDU Gate 2, Amritsar"
                    value={newProp.location}
                    onChange={(e) =>
                      setNewProp({ ...newProp, location: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Beds Available</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={newProp.totalBeds}
                    onChange={(e) =>
                      setNewProp({ ...newProp, totalBeds: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Rooms</label>
                  <input
                    type="number"
                    placeholder="e.g. 6"
                    value={newProp.roomsCount}
                    onChange={(e) =>
                      setNewProp({ ...newProp, roomsCount: e.target.value })
                    }
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Amenities (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Wi-Fi, Food, AC, CCTV, Power Backup"
                    value={newProp.amenitiesInput}
                    onChange={(e) =>
                      setNewProp({ ...newProp, amenitiesInput: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  + Add Property to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
