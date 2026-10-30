import React from "react";
import ResourceManager from "../components/ResourceManager";

function Results() {
  const fields = [
    { name: "matchId", label: "Match ID" },
    { name: "winner", label: "Winning Team" },
    { name: "score", label: "Final Score" },
    { name: "remarks", label: "Remarks" }
  ];

  return <ResourceManager resource="results" title="Match Results" fields={fields} />;
}

export default Results;