import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// signup a new user
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password length must be greater than 6" });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json("Internal server error");
  }
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(400).json({ error: "User not found" });
    }

    const matchpassword = await bcrypt.compare(password, finduser.password);
    if (!matchpassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: finduser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal server error");
  }
};

// Get user profile
const getprofile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password"); // Selecting all fields except password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Internal error:", error);
    res.status(500).send("Internal server error");
  }
};

// Update user profile
const updateprofile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name; // Update name if provided
    if (email) user.email = email; // Update email if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); // Hash the new password
    }

    await user.save();
    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a user
const deleteprofile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(400).json({ error: error.message });
  }
};

export { signup, login, getprofile, updateprofile, deleteprofile };
