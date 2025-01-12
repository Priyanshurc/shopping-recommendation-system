import React, { useState } from "react";
import "styles/searchbox.css";

const SearchBox = () => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="search-box">
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          console.log("Input changed:", e.target.value);
          setInputText(e.target.value);
        }}
        placeholder="Ask me something..."
        className="search-input"
      />
      <button
        onClick={() => console.log("Button clicked with:", inputText)}
        className="search-button"
      >
        Generate
      </button>
    </div>
  );
};

export default SearchBox;
