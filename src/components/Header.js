import React from "react";
import "../styles/header.scss";
import { BsSearch } from "react-icons/bs";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-button">
          <BsSearch />
        </button>
      </div>
    </header>
  );
};

export default Header;
