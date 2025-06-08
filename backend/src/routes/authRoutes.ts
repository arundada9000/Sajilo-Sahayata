import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsersAroundLocation,
  uploadImage,
} from "../controllers/authController";

const router = Router();

router.post("/register", uploadImage, registerUser);
router.post("/login", loginUser);
router.get("/users/:id", getUserById);
router.get("/users/around", getAllUsersAroundLocation);

export default router;
