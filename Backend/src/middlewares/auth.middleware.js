import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // 👉 also check Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch (err) {
    console.error("AUTH ERROR 👉", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};