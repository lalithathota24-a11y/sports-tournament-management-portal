import React from "react";
import ResourceManager from "../components/ResourceManager";

function Tournaments() {
  const fields = [
    { name: "name", label: "Tournament Name" },
    { name: "sport", label: "Sport" },
    { name: "date", label: "Tournament Date", type: "date" },
    { name: "location", label: "Location" },
    { name: "status", label: "Status (Upcoming / Ongoing / Completed)" }
  ];

  return <ResourceManager resource="tournaments" title="Tournament Management" fields={fields} />;
}

export default Tournaments;