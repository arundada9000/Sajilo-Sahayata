import mongoose, { Document, Schema } from "mongoose";

export interface IReport extends Document {
  type: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  status: "pending" | "verified" | "resolved";
  userId?: string;
  verifiedBy?: string;
}

const ReportSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  status: {
    type: String,
    enum: ["pending", "verified", "resolved"],
    default: "pending",
  },
  userId: { type: String },
  verifiedBy: { type: String },
});

// Create a 2dsphere index for geospatial queries
ReportSchema.index({ location: "2dsphere" });

export default mongoose.model<IReport>("Report", ReportSchema);
