import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function Testai(prompt) {
  try {
    if (!prompt || prompt.trim() === "") {
      return "⚠️ Please enter a valid prompt.";
    }

    const response = await model.invoke([
      ["human", prompt]
    ]);

    return response.content;

  } catch (error) {
    console.error("AI Error:", error);
    return "❌ Error getting AI response";
  }
}