import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import userRouter from "./user/user.routes.js";
import postRouter from "./post/post.routes.js";
import commentRouter from "./comment/comment.routes.js";
import authRouter from "./auth/auth.routes.js";
process.loadEnvFile(".env");

await mongoose.connect(process.env.MONGODB_URL);

cloudinary.config({
  cloud_name: "du97czlhz",
  api_key: "452675419245823",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();
app.use(morgan("dev"));
app.use("/ping", (req, res) => {
  res.send({
    status: 200,
    message: "Keep me alive bro",
  });
});
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || process.env.WAKEUP_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
