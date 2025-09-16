import { GoogleGenAI } from "@google/genai";
import SYSTEM_MESSAGE from "../utils/SystemMessage.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


const llm = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
let history = [];

const chatbot = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    throw new ApiError(400, "Prompt not Found");
  }
  const response = await llm.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
    history: history,
    config: {
      maxOutputTokens: 150,
      responseMimeType: "text/plain",
      systemInstruction: SYSTEM_MESSAGE,
    },
  });
  console.log(`AI : ${response.text}`);

  history.push({ user: prompt, ai: response.text });
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Response Generated Successfully", response.text)
    );
});

export default chatbot;
