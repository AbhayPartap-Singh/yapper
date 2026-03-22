import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./src/config/database.js";
import {Testai} from "./src/services/ai.service.js"

const PORT = process.env.PORT || 3000;

await Testai("Explain black holes in simple terms");

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server error:", error);
  }
};

startServer();