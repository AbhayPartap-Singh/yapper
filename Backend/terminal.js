import readline from "readline";
import "dotenv/config";
import { Testai } from "./src/services/ai.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("🤖 AI Chat Started (type 'exit' to quit)\n");

const chat = () => {
  rl.question("You: ", async (input) => {

    if (input.toLowerCase() === "exit") {
      console.log("AI: Goodbye 👋");
      rl.close();
      return;
    }

    try {
      const response = await Testai(input);

      console.log(`AI: ${response}\n`);

    } catch (err) {
      console.log("AI: ❌ Error getting response\n");
    }

    chat(); // loop again
  });
};

chat();