import React from "react";
import ResourceManager from "../components/ResourceManager";

function Players() {
  const fields = [
    { name: "name", label: "Player Name" },
    { name: "age", label: "Age", type: "number" },
    { name: "role", label: "Player Role" },
    { name: "teamId", label: "Team ID" }
  ];

  return <ResourceManager resource="players" title="Player Management" fields={fields} />;
}

export default Players;