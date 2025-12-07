import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, "SECRET_KEY", {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "User registered",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, "SECRET_KEY", {
      expiresIn: "7d",
    });

    return res.json({
      message: "Logged in",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
