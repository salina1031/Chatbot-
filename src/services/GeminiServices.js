import axios from "axios";

// Gemini API key from .env
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Gemini text chat model endpoint
const GEMINI_URL = "https://gemini.googleapis.com/v1beta2/models/textchat-bison-001:generateMessage";

export const geminiService = {
  sendMessage: async (messages) => {
    // POST request to Gemini API with messages and API key
    const response = await axios.post(GEMINI_URL, { messages }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GEMINI_KEY}`,
      },
    });

    // Return AI's reply (first candidate)
    return response.data.candidates[0].content;
  },
};