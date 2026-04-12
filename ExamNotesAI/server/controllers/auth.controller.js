

import bcrypt from "bcryptjs";
import usermodel from "../models/usermodel.js";
import { getToken } from "../utils/token.js";

// GOOGLE AUTH ................................
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await usermodel.findOne({ email });

    if (!user) {
      user = await usermodel.create({ name, email });
    }

    let token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `googleSignup Error ${error}` });
  }
};


// SIGNUP ...........
export const signup = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      name,
      email,
      password: hashedPassword,
      credits: 300,
      isCreditAvailable: true
    });

    return res.status(200).json(user);

  } catch (error) {
    console.log("FULL ERROR:", error.message);
    return res.status(500).json({ message: "Auth failed" });
  }
};


// LOGIN .......................
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);

  } catch (error) {
    console.log("FULL ERROR:", error.message);
    return res.status(500).json({ message: "Auth failed" });
  }
};


// LOGOUT .........................
export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error ${error}` });
  }
};