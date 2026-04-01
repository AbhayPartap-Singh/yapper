import { generateResponse } from "../services/ai.service.js";

export const askAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const reply = await generateResponse(prompt.trim());

    return res.status(200).json({
      message: "AI response generated successfully",
      success: true,
      prompt: prompt.trim(),
      reply,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate AI response",
      success: false,
      error: error.message,
    });
  }
};