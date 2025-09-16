import Router from "express";
import chatbot from "../controller/chatbot.controller.js";
const chatbotrouter = Router();

chatbotrouter.route("/talk").post(chatbot);

export default chatbotrouter;
