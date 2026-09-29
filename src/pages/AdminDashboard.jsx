// ============================================================
// AdminDashboard.jsx — Admin Portal Dashboard
// ============================================================
// The main layout and dashboard view for the admin portal.
// Includes a sidebar for navigation and a main content area.
// Uses mock data for statistics, recent PGs, and recent users.
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiCheckSquare,
  FiMessageSquare,
  FiFileText,
  FiAlertTriangle,
  FiSettings,
  FiLogOut,
  FiBell,
  FiMenu,
  FiX
} from "react-icons/fi";
import "./AdminDashboard.css";

// Mock Data
const stats = {
  students: 1250,
  owners: 85,
  listings: 320,
  pending: 18,
  inquiries: 642,
  reports: 7
};

const recentPGs = [
  { id: 1, name: "Sunshine PG", owner: "Ravi Kumar", location: "Delhi", rent: "₹10,000", status: "Approved", date: "Oct 24, 2026" },
  { id: 2, name: "Comfort Stay", owner: "Anita Sharma", location: "Mohali", rent: "₹8,500", status: "Pending", date: "Oct 25, 2026" },
  { id: 3, name: "Elite Boys Hostel", owner: "Vikas Singh", location: "Chandigarh", rent: "₹12,000", status: "Rejected", date: "Oct 25, 2026" },
  { id: 4, name: "Green View Girls PG", owner: "Priya Patel", location: "Amritsar", rent: "₹9,000", status: "Approved", date: "Oct 26, 2026" },
];

const recentUsers = [
  { id: 101, name: "Rahul Verma", email: "rahul.v@example.com", role: "Student", joined: "Oct 20, 2026", status: "Active" },
  { id: 102, name: "Sneha Gupta", email: "sneha.g@example.com", role: "Student", joined: "Oct 22, 2026", status: "Active" },
  { id: 103, name: "Amitabh Raj", email: "amitabh.r@example.com", role: "PG Owner", joined: "Oct 23, 2026", status: "Pending" },
  { id: 104, name: "Neha Singh", email: "neha.s@example.com", role: "Student", joined: "Oct 26, 2026", status: "Inactive" },
];

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout
    navigate("/admin/login");
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    let colorClass = "";
    if (statusLower === "approved" || statusLower === "active") colorClass = "badge-success";
    else if (statusLower === "pending") colorClass = "badge-warning";
    else if (statusLower === "rejected" || statusLower === "inactive") colorClass = "badge-danger";
    return <span className={`admin-badge ${colorClass}`}>{status}</span>;
  };

  return (
    <div className="admin-layout">
      {/* ---------- Sidebar ---------- */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-sidebar-brand">
            <span className="admin-sidebar-icon">🏠</span>
            <span className="admin-sidebar-text">StayMate <small>Admin</small></span>
          </Link>
          <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <ul className="admin-nav-list">
            <li>
              <Link to="/admin/dashboard" className="admin-nav-link active">
                <FiGrid size={20} /> Dashboard
              </Link>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiUsers size={20} /> Users
              </span>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiHome size={20} /> PG Listings
              </span>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiCheckSquare size={20} /> Pending Approvals
              </span>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiMessageSquare size={20} /> Reviews
              </span>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiFileText size={20} /> Inquiries
              </span>
            </li>
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiAlertTriangle size={20} /> Reports
              </span>
            </li>
          </ul>

          <div className="admin-sidebar-divider"></div>

          <ul className="admin-nav-list">
            <li>
              <span className="admin-nav-link disabled" title="Coming Soon">
                <FiSettings size={20} /> Settings
              </span>
            </li>
            <li>
              <button className="admin-nav-link admin-nav-logout" onClick={handleLogout}>
                <FiLogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* ---------- Main Content ---------- */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button className="admin-menu-toggle" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          
          <div className="admin-header-title">
            <h2>Admin Dashboard</h2>
            <p>Welcome back, Super Admin!</p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-notification-btn">
              <FiBell size={20} />
              <span className="admin-notification-badge">3</span>
            </button>
            <div className="admin-profile-menu">
              <div className="admin-avatar">A</div>
              <span className="admin-profile-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="admin-content">
          {/* Stats Grid */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-blue"><FiUsers size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.students}</span>
                <span className="admin-stat-label">Total Students</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-indigo"><FiHome size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.owners}</span>
                <span className="admin-stat-label">Total PG Owners</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-green"><FiGrid size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.listings}</span>
                <span className="admin-stat-label">Total PG Listings</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-yellow"><FiCheckSquare size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.pending}</span>
                <span className="admin-stat-label">Pending Listings</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-purple"><FiFileText size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.inquiries}</span>
                <span className="admin-stat-label">Total Inquiries</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon icon-red"><FiAlertTriangle size={24} /></div>
              <div className="admin-stat-details">
                <span className="admin-stat-value">{stats.reports}</span>
                <span className="admin-stat-label">Reported Reviews</span>
              </div>
            </div>
          </div>

          {/* Tables Area */}
          <div className="admin-tables-container">
            {/* Recent PG Listings */}
            <div className="admin-table-card">
              <div className="admin-table-header">
                <h3>Recent PG Listings</h3>
                <button className="admin-btn-outline">View All</button>
              </div>
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>PG Name</th>
                      <th>Owner</th>
                      <th>Location</th>
                      <th>Rent</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPGs.map((pg) => (
                      <tr key={pg.id}>
                        <td className="font-medium">{pg.name}</td>
                        <td>{pg.owner}</td>
                        <td>{pg.location}</td>
                        <td>{pg.rent}</td>
                        <td>{getStatusBadge(pg.status)}</td>
                        <td>{pg.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Users */}
            <div className="admin-table-card">
              <div className="admin-table-header">
                <h3>Recent Users</h3>
                <button className="admin-btn-outline">View All</button>
              </div>
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="font-medium">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.joined}</td>
                        <td>{getStatusBadge(user.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
