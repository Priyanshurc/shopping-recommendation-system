import React, { useState } from "react";
import "styles/sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);  // Track if sidebar is expanded

  // Function to toggle the sidebar's expanded/collapsed state
  const toggleSidebar = () => {
    setIsExpanded((prevState) => !prevState);  // Toggle sidebar state
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}  // Expand on hover
      onMouseLeave={() => setIsExpanded(false)} // Collapse on mouse leave
    >
      {/* Hamburger icon, only visible when collapsed */}
      {!isExpanded && (
        <div className="sidebar-icon" onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </div>
      )}

      {/* Sidebar content */}
      <h2>Menu</h2>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/orders">Orders</a></li>
        <li><a href="/profile">Profile</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
