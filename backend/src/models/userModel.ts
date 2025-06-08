import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string; // In production, hash this with bcrypt
  role: "user" | "admin";
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image_url: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
});

// Create a 2dsphere index for geospatial queries
UserSchema.index({ location: "2dsphere" });

export default mongoose.model<IUser>("User", UserSchema);
