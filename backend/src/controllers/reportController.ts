import { Request, Response } from "express";
import Report from "../models/reportModel";

export const createReport = async (req: Request, res: Response) => {
  try {
    const { type, description, location, userId } = req.body;
    if (!type || typeof type !== "string") {
      res.status(400).json({
        message:
          'Invalid type. It must be one of "incident", "complaint", or "suggestion".',
      });
      return;
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.length < 10
    ) {
      res.status(400).json({
        message:
          "Description must be a string and at least 10 characters long.",
      });
      return;
    }

    const parsedLocation = JSON.parse(location);
    if (!parsedLocation) {
      res.status(400).json({ message: "Location must be a string." });
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: "Image is required" });
      return;
    }
    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    const report = new Report({
      type,
      description,
      location: {
        coordinates: parsedLocation,
      },
      userId,
      imageUrl,
    });
    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error });
  }
};

export const verifyReport = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }
    report.status = "verified";
    report.verifiedBy = req.user.id;
    await report.save();
    res.json({ message: "Report verified", report });
  } catch (error) {
    res.status(400).json({ message: "Error verifying report", error });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: "Error fetching reports", error });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: "Error fetching report", error });
  }
};

export const getAllReportLocations = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({}, { location: 1, _id: 0 });
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: "Error fetching report locations", error });
  }
};

export const changeReportStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    report.status = status;
    await report.save();
    res.json({ message: "Report status updated", report });
  } catch (error) {
    res.status(400).json({ message: "Error updating report status", error });
  }
};
