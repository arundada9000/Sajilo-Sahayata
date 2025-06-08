import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  },
});

// Middleware for handling the image upload (single image)
export const uploadImage = upload.single("image"); // 'image' is the field name in the form

// This function checks if a username and/or password is valid
export const validateCredentials = (username?: string, password?: string) => {
  let errors: string[] = [];

  if (username) {
    if (!username.trim()) {
      errors.push("Username is required");
    }
    if (!/^[a-zA-Z]+$/.test(username.trim())) {
      errors.push("Username must contain only alphabetic characters");
    }
    if (username.length < 3 || username.length > 20) {
      errors.push("Username must be between 3 and 20 characters");
    }
  }

  if (password) {
    if (!password.trim()) {
      errors.push("Password is required");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
  }

  return errors;
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const errors = validateCredentials(username, password);
    if (errors.length > 0) {
      res.status(400).json({ message: errors.join(", ") });
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: "Image is required" });
      return;
    }
    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    const user = new User({
      username,
      password,
      image_url: imageUrl,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const errors = validateCredentials(username, password);
    if (errors.length > 0) {
      res.status(400).json({ message: errors.join(", ") });
      return;
    }
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error });
  }
};

export const getAllUsersAroundLocation = async (
  req: Request,
  res: Response
) => {
  try {
    const { longitude, latitude, radius } = req.query;
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: Number(radius) || 5000, // 5 km default
        },
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: "Error fetching users", error });
  }
};
