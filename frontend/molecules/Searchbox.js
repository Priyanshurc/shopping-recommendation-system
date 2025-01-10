import React, { useState } from "react";

// You might use fetch, axios, or any other method to call the API
// Make sure you have an API service for Gen AI. Replace API_KEY and URL below with your actual values

const SearchBox = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the API request and response
  const handleSearch = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    setOutputText("");

    try {
      // Replace with your Gen AI API request
      const response = await fetch("https://api.example.com/genai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_API_KEY`, // Add your API key
        },
        body: JSON.stringify({
          prompt: inputText,
          max_tokens: 100, // Adjust according to your needs
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutputText(data.response); // Adjust based on the actual response
      } else {
        setError("Failed to generate response");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }

    setLoading(false);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Ask me something..."
        className="search-input"
      />
      <button onClick={handleSearch} disabled={loading} className="search-button">
        {loading ? "Loading..." : "Generate"}
      </button>
      {error && <p className="error">{error}</p>}
      {outputText && <div className="output"><strong>Response:</strong> {outputText}</div>}
    </div>
  );
};

export default SearchBox;
