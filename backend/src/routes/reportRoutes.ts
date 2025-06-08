import { Router } from "express";
import {
  createReport,
  verifyReport,
  getAllReports,
  getReportById,
  getAllReportLocations,
  changeReportStatus,
} from "../controllers/reportController";
import { uploadImage } from "../controllers/authController";

const router = Router();

router.post("/reports", uploadImage, createReport);
router.put("/reports/:id/verify", verifyReport);
router.get("/reports", getAllReports);
router.get("/reports/:id", getReportById);
router.get("/reports/locations", getAllReportLocations);
router.put("/reports/:id/status", changeReportStatus);

export default router;
