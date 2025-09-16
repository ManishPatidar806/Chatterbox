import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import chatbotrouter from "./routes/chatbot.route.js";
import userRouter from "./routes/user.route.js";
import verifyToken from "./middleware/jwt.middleware.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/chatbot", verifyToken, chatbotrouter);

export default app;
