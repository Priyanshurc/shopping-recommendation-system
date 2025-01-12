const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load your API key from the .env file
});

// Chat endpoint
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.send({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    res.status(500).send({ error: "Something went wrong", details: error.response?.data || error.message });
  }
});

module.exports = router;
