// ============================================================
// App.jsx — Root Application Component
// ============================================================
// Sets up React Router and renders the shared layout (Navbar
// and Footer) around the page content.
//
// Routes:
//   /       → Home page
//   /login  → Login page (no Navbar/Footer)
//
// The Login page uses its own full-screen layout, so Navbar
// and Footer are conditionally hidden on that route.
// ============================================================

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FindPG from "./pages/FindPG";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

// Layout wrapper that conditionally shows Navbar + Footer
function AppLayout() {
  const location = useLocation();

  // Don't show Navbar/Footer on login page or admin pages
  const isNoLayoutPage = location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <>
      {!isNoLayoutPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {!isNoLayoutPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
