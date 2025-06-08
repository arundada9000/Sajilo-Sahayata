import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import reportRoutes from "./routes/reportRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
