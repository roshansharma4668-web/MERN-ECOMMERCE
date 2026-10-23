import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // Live environment (HTTPS) ke liye zaroori
    sameSite: "none", // Vercel se Render par token bhejne ke liye allow karta hai
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const logoutUser = (req, res) => {
  // Logout ke time bhi sameSite aur secure dena zaroori hai tabhi cookie delete hogi
  res.cookie("jwt", "", { 
    httpOnly: true, 
    secure: true, 
    sameSite: "none", 
    expires: new Date(0) 
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Admin: Saare users ko fetch karna (password chhod kar)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Admin: Kisi user ko delete karna
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Khud ko ya kisi dusre admin ko delete karne se rokna
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Cannot delete an Admin account' });
      }
      await User.deleteOne({ _id: user._id });
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};