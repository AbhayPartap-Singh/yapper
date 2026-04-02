import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// ✅ Gemini model (for chat)
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Mistral model (for title)
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// ✅ Generate AI response
export async function generateResponse(message, history = []) {
  try {
    const formattedHistory = history.map(msg => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.content,
    }));

    const response = await geminiModel.invoke(formattedHistory);

    return response.content || "No response from AI";
  } catch (err) {
    console.error("AI ERROR:", err);
    return "AI failed to respond";
  }
}
// ✅ Generate title
export async function generateTitle(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(
        "Generate a short 2-5 word title that summarizes the user's message."
      ),
      new HumanMessage(message),
    ]);

    return response.content || "New Chat";
  } catch (err) {
    console.error("TITLE ERROR:", err);
    return "New Chat";
  }
}



