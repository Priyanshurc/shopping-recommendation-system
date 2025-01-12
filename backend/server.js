require('dotenv').config();
const express = require('express');

const chatRoutes = require('./routes/chat'); // Import the chat route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Use the chat route
app.use('/chat', chatRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
