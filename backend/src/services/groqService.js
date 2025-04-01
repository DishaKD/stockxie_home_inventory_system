require("dotenv").config();
const axios = require("axios");

const getAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      process.env.GROQ_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: messages,
      },
      {
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return null;
  }
};

module.exports = { getAIResponse }; // Named export
