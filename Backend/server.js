import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/database.js";
import http from 'http'
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app)
initSocket(httpServer)
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB Connected");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server error:", error);
  }
};

startServer();