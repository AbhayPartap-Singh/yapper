import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

// ✅ Gemini model
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Mistral model (title)
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// ✅ Generate AI response (FIXED)
export async function generateResponse(message, history = []) {
  try {
    // 🔥 Convert DB messages → LangChain format
    const formattedHistory = history.map((msg) =>
      msg.role === "ai"
        ? new AIMessage(msg.content)
        : new HumanMessage(msg.content)
    );

    const response = await geminiModel.invoke([
      new SystemMessage("You are a helpful AI assistant."),
      ...formattedHistory,
      new HumanMessage(message),
    ]);

    return response.content?.toString() || "No response from AI";
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
        "Generate a short 2-5 word title for this conversation."
      ),
      new HumanMessage(message),
    ]);

    return response.content || "New Chat";
  } catch (err) {
    console.error("TITLE ERROR:", err);
    return "New Chat";
  }
}

