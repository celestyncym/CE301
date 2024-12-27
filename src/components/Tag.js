import React from "react";
import "../styles/tag.scss";

const Tag = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`tag ${isActive ? "active" : ""}`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Tag;
