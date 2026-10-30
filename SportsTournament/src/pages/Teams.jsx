import React from "react";
import ResourceManager from "../components/ResourceManager";

function Teams() {
  const fields = [
    { name: "name", label: "Team Name" },
    { name: "sport", label: "Sport" },
    { name: "captain", label: "Captain Name" },
    { name: "tournamentId", label: "Tournament ID" }
  ];

  return <ResourceManager resource="teams" title="Team Management" fields={fields} />;
}

export default Teams;