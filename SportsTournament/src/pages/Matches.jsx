import React from "react";
import ResourceManager from "../components/ResourceManager";

function Matches() {
  const fields = [
    { name: "team1", label: "Team 1" },
    { name: "team2", label: "Team 2" },
    { name: "date", label: "Match Date", type: "date" },
    { name: "time", label: "Match Time", type: "time" },
    { name: "status", label: "Status (Scheduled / Completed)" }
  ];

  return <ResourceManager resource="matches" title="Match Scheduling" fields={fields} />;
}

export default Matches;