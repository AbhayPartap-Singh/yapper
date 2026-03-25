import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ attach user
    next();
  } catch (err) {
    console.error("AUTH ERROR 👉", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};