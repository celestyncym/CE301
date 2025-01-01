import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./styles/layout.scss";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MainContent from "./components/MainContent";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import RegisterPage from "./pages/RegisterPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import CommunityPage from "./pages/CommunityPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageRecipesPage from "./pages/ManageRecipesPage";
import ManageIngredientsPage from "./pages/ManageIngredientsPage";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Auto-hide sidebar when screen width is below the breakpoint
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserRaw = localStorage.getItem("user");
    let storedUser = null;

    // Safely parse JSON to avoid errors
    try {
      storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }

    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      setIsAdmin(storedIsAdmin);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAdmin", data.user.isAdmin);
    setIsLoggedIn(true);
    setIsAdmin(data.user.isAdmin);
    setUser(data.user);
  };

  return (
    <Router>
      <div
        className={`app-layout ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* Sidebar is visible on all pages */}
        <Sidebar
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          user={user}
        />

        {/* Main content area */}
        <div className="main-wrapper">
          <Header toggleSidebar={toggleSidebar} />
          <div className="content-wrapper">
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<MainContent />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/login"
                element={<LoginPage onLogin={handleLogin} />}
              />

              {/*  User-only routes */}
              <Route path="/search-results" element={<SearchResultPage />} />
              <Route
                path="/create-recipe"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CreateRecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/store-locator"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <StoreLocatorPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/community"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CommunityPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin-only routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/manage-users"
                element={
                  <AdminRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <ManageUsersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/manage-recipes"
                element={
                  <AdminRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <ManageRecipesPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/manage-ingredients"
                element={
                  <AdminRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
                    <ManageIngredientsPage />
                  </AdminRoute>
                }
              />

              {/* Catch-all route for unmatched URLs */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
