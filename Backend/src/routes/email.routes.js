import express from "express";
import { sendEmail } from "../services/email.js";

const router = express.Router();

// ✅ POST route for Postman
router.post("/send", async (req, res) => {
  try {
    const { to, username } = req.body;

    const subject = "Welcome to Yapper 🚀";

    const text = `Hi ${username}, welcome to Yapper!`;

    const html = `
      <h2>Hi ${username} 👋</h2>
      <p>Welcome to <b>Yapper</b>!</p>
      <p>Thanks for registering. We’re excited to have you on board.</p>
      <br/>
      <p>Regards,<br/>Yapper Team</p>
    `;

    await sendEmail({ to, subject, text, html });

    res.send("✅ Email sent successfully");
  } catch (error) {
    res.status(500).send("❌ Email failed");
  }
});

export default router;