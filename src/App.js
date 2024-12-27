import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import "./styles/layout.scss";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Auto-hide sidebar when screen width is below the breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Close sidebar on smaller screens
      } else {
        setIsSidebarOpen(true); // Open sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`app-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <div className="content-wrapper">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default App;
