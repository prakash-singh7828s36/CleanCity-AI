import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token user." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden. Insufficient permissions." });
    }

    next();
  };
};
