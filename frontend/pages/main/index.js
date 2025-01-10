import React from "react";
import Sidebar from "@molecules/sidebar";
import PauseOnHover from "@molecules/PauseOnHover";
import SearchBox from "@molecules/Searchbox";  // Import the SearchBox component
import "styles/app.css";

const App = () => {
  return (
    <div className="app">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to My GEN AI shopping Assistant</h1>
        <PauseOnHover />
      </div>

      <SearchBox /> {/* Add SearchBox component */}

      <Sidebar />
      <div className="content" style={{ marginLeft: "250px", padding: "20px" }}>
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default App;
