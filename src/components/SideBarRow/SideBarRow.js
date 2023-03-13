import React from "react";
import "./SideBarRow.css";

const SideBarRow = ({ selected, title }) => {
  return (
    <div className={`sidebarrow ${selected ? "selected" : ""}`}>
      <h2 className="sidebarrow__title">{title}</h2>
    </div>
  );
};

export default SideBarRow;
