import React from "react";
import "../styles/sidebar.scss";
import {
  BsClipboardPlus,
  BsJournalPlus,
  BsPinMapFill,
  BsSearch,
} from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { SlLogin } from "react-icons/sl";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        <div className="logo">BrandName</div>
        <div className="profile">
          <div className="avatar">J</div>
          <p className="username">
            Not a user? <a href="#">Sign up!</a>
          </p>
        </div>

        <nav className="nav-links">
          <div className="default-links">
            <button className="sidebar-buttons active">
              <span className="icons">
                <BsSearch />
              </span>
              Find Recipes
            </button>
            <button className="sidebar-buttons">
              <span className="icons">
                <BsJournalPlus />
              </span>
              Create Recipe
            </button>
            <button className="sidebar-buttons">
              <span className="icons">
                <BsPinMapFill />
              </span>
              Store Locator
            </button>
            <button className="sidebar-buttons">
              <span className="icons">
                <IoIosPeople />
              </span>
              Community
            </button>
          </div>

          <div className="user-nav-links">
            <button className="sidebar-buttons register-link">
              <span className="icons">
                <BsClipboardPlus />
              </span>
              Register
            </button>
            <button className="sidebar-buttons login-link">
              <span className="icons">
                <SlLogin />
              </span>
              Log In
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
