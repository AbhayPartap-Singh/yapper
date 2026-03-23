import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.routes.js";
import aiRouter from "./src/routes/ai.routes.js";
import morgan from "morgan"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173", // ✅ FIXED (removed /)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))




app.get("/", (req, res) => {
  res.send("Yapper API Running");
});

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);


export default app;
