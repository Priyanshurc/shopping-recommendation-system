// App.js
import React from "react";
import Sidebar from "@molecules/sidebar";
import PauseOnHover from "@molecules/PauseOnHover";

const App = () => {
  return (
    <div className="app">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My Next.js App with Slick Carousel!</h1>
      <PauseOnHover />
      </div>


      <Sidebar />
      <div className="content" style={{ marginLeft: "250px", padding: "20px" }}>
        {/* Main content goes here */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default App;
