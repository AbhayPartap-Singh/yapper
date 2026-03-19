import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Yapper API Running");
});

app.use("/api/auth", authRouter);

export default app;