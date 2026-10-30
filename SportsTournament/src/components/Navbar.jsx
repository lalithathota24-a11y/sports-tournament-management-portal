import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark main-navbar px-3 px-md-4">
      <Link to="/" className="navbar-brand fw-bold">
        <span className="brand-icon">🏆</span> SPORTS PORTAL
      </Link>
      <span className="admin-label">Administrator Panel</span>
    </nav>
  );
}

export default Navbar;