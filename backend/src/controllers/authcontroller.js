import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "SECRET_KEY", { expiresIn: "7d" });
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    // Logging
    console.log("Register payload:", req.body);

    // Check if user exists
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already used" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user.id);

    return res.status(201).json({
      message: "User registered",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Logging
    console.log("Login payload:", req.body);

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    // Generate token
    const token = generateToken(user.id);

    return res.json({
      message: "Logged in",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
