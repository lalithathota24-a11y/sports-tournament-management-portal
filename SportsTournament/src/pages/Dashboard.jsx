import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../services/api";

const resources = ["tournaments", "teams", "players", "matches", "results"];

function Dashboard() {
  const [data, setData] = useState({
    tournaments: [], teams: [], players: [], matches: [], results: []
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const values = await Promise.all(resources.map((resource) => getData(resource)));
        setData({
          tournaments: values[0],
          teams: values[1],
          players: values[2],
          matches: values[3],
          results: values[4]
        });
        setError("");
      } catch {
        setError("JSON Server is not running. Open another terminal and run: npm run server");
      }
    };
    loadDashboard();
  }, []);

  const cards = [
    { key: "tournaments", label: "Tournaments", icon: "🏆", tone: "purple", path: "/tournaments" },
    { key: "teams", label: "Teams", icon: "👥", tone: "green", path: "/teams" },
    { key: "players", label: "Players", icon: "🏃", tone: "orange", path: "/players" },
    { key: "matches", label: "Matches", icon: "🏏", tone: "blue", path: "/matches" },
    { key: "results", label: "Results", icon: "🥇", tone: "pink", path: "/results" }
  ];

  return (
    <section>
      <div className="welcome-panel">
        <div>
          <div className="eyebrow light">SPORTS ADMINISTRATION</div>
          <h1>Welcome to your Sports Portal</h1>
          <p>Manage tournaments, teams, players and match activities in one place.</p>
        </div>
        <div className="welcome-trophy">🏆</div>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div>
          <div className="eyebrow">OVERVIEW</div>
          <h2 className="section-heading">Dashboard Statistics</h2>
        </div>
        <span className="live-label">● Live database counts</span>
      </div>

      <div className="row">
        {cards.map((card) => (
          <div className="col-sm-6 col-xl-4 mb-3" key={card.key}>
            <Link to={card.path} className="stat-link">
              <div className="stat-card">
                <div className={`stat-icon ${card.tone}`}>{card.icon}</div>
                <div>
                  <div className="stat-label">{card.label}</div>
                  <div className="stat-number">{data[card.key].length}</div>
                </div>
                <span className="stat-arrow">↗</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="content-card mt-3">
        <div className="section-title">
          <span className="section-mark"></span>
          Recent Matches
        </div>
        {data.matches.length === 0 ? (
          <p className="text-muted mb-0">No matches scheduled yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table portal-table mb-0">
              <thead>
                <tr><th>Match</th><th>Date</th><th>Time</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.matches.slice(0, 5).map((match) => (
                  <tr key={match.id}>
                    <td className="fw-semibold">{match.team1} vs {match.team2}</td>
                    <td>{match.date}</td>
                    <td>{match.time}</td>
                    <td><span className="status-pill">{match.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;