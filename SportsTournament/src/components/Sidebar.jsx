import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { path: "/", name: "Dashboard", icon: "📊" },
  { path: "/tournaments", name: "Tournaments", icon: "🏆" },
  { path: "/teams", name: "Teams", icon: "👥" },
  { path: "/players", name: "Players", icon: "🏃" },
  { path: "/matches", name: "Matches", icon: "🏏" },
  { path: "/results", name: "Results", icon: "🥇" }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu-heading">MAIN MENU</div>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/"}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="menu-icon">{link.icon}</span>
          {link.name}
        </NavLink>
      ))}
      <div className="sidebar-footer">Sports Tournament Portal<br />Management System</div>
    </aside>
  );
}

export default Sidebar;