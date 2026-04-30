import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const allowedRoles = ["admin", "citizen", "driver", "nigam"];

const createToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const userRole = allowedRoles.includes(role) ? role : "citizen";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = createToken(user);
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({ message: "User registered successfully.", user: userData, token });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error while registering user." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = createToken(user);
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({ message: "Login successful.", user: userData, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error while logging in." });
  }
};

export const getProfile = (req, res) => {
  return res.json({ user: req.user });
};
