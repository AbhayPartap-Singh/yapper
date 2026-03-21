import readline from "readline";
import "dotenv/config";
import { Testai } from "./src/services/ai.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("🤖 AI Terminal Chat (type 'exit' to quit)\n");

function chat() {
  rl.question("You: ", async (input) => {

    if (input.toLowerCase() === "exit") {
      console.log("👋 Exiting chat...");
      rl.close();
      return;
    }

    const response = await Testai(input);

    console.log("\nAI:", response, "\n");

    chat(); // 🔁 loop again
  });
}

chat();