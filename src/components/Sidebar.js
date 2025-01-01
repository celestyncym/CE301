import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.scss";
import {
  BsClipboardPlus,
  BsJournalPlus,
  BsJournalX,
  BsPinMapFill,
  BsSearch,
} from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { SlLogin, SlLogout } from "react-icons/sl";
import { FaCarrot, FaUsersCog } from "react-icons/fa";

const Sidebar = ({ isOpen, isLoggedIn, isAdmin, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
    window.location.reload(); // Optionally force reload to clear any residual state
  };

  const avatarLetter = user
    ? (user.username || user.email || "?")[0].toUpperCase()
    : "?";

  const welcomeMessage = user
    ? `Welcome, ${user.username || user.email}!`
    : 'Not a user? <a href="/register">Sign up!</a>';

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        <div className="logo">BrandName</div>
        <div className="profile">
          <div className="avatar">{avatarLetter}</div>
          <p
            className="username"
            dangerouslySetInnerHTML={{
              __html: welcomeMessage,
            }}
          />
        </div>

        <nav className="nav-links">
          <div className="default-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "sidebar-buttons active" : "sidebar-buttons"
              }
            >
              <span className="icons">
                <BsSearch />
              </span>
              Find Recipes
            </NavLink>
            <NavLink
              to="/create-recipe"
              className={({ isActive }) =>
                isActive ? "sidebar-buttons active" : "sidebar-buttons"
              }
            >
              <span className="icons">
                <BsJournalPlus />
              </span>
              Create Recipe
            </NavLink>
            <NavLink
              to="/store-locator"
              className={({ isActive }) =>
                isActive ? "sidebar-buttons active" : "sidebar-buttons"
              }
            >
              <span className="icons">
                <BsPinMapFill />
              </span>
              Store Locator
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? "sidebar-buttons active" : "sidebar-buttons"
              }
            >
              <span className="icons">
                <IoIosPeople />
              </span>
              Community
            </NavLink>
            {/* Admin-only links */}
            {isAdmin && (
              <>
                <NavLink
                  to="/manage-users"
                  className={({ isActive }) =>
                    isActive ? "sidebar-buttons active" : "sidebar-buttons"
                  }
                >
                  <span className="icons">
                    <FaUsersCog />
                  </span>
                  Manage Users
                </NavLink>
                <NavLink
                  to="/manage-recipes"
                  className={({ isActive }) =>
                    isActive ? "sidebar-buttons active" : "sidebar-buttons"
                  }
                >
                  <span className="icons">
                    <BsJournalX />
                  </span>
                  Manage Recipes
                </NavLink>
                <NavLink
                  to="/manage-ingredients"
                  className={({ isActive }) =>
                    isActive ? "sidebar-buttons active" : "sidebar-buttons"
                  }
                >
                  <span className="icons">
                    <FaCarrot />
                  </span>
                  Manage Ingredients
                </NavLink>
              </>
            )}
          </div>

          <div className="user-nav-links">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-buttons register-link active"
                      : "sidebar-buttons register-link"
                  }
                >
                  <span className="icons">
                    <BsClipboardPlus />
                  </span>
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "sidebar-buttons login-link active"
                      : "sidebar-buttons login-link"
                  }
                >
                  <span className="icons">
                    <SlLogin />
                  </span>
                  Log In
                </NavLink>
              </>
            ) : (
              <button
                className="sidebar-buttons login-link"
                onClick={handleLogout}
              >
                <span className="icons">
                  <SlLogout />
                </span>
                Log Out
              </button>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
