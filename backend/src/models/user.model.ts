import mongoose, { Schema, Document } from "mongoose";
import { ICheckIn } from "./checkIn.model";

export interface IUser extends Document {
  auth0Id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    email?: string;
  }[];
  checkIns: ICheckIn[];
  notificationSettings: {
    isEnabled: boolean;
    timeOfDay: "morning" | "afternoon" | "evening";
    notificationMethod: "sms" | "email";
  };
  lastCheckedIn: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    emergencyContact: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
      },
    ],
    checkIns: [{ type: mongoose.Schema.Types.ObjectId, ref: "CheckIn" }],
    notificationSettings: {
      isEnabled: { type: Boolean, required: true },
      timeOfDay: { type: String, enum: ["morning", "afternoon", "evening"] },
      notificationMethod: { type: String, enum: ["sms", "email"] },
    },
    lastCheckedIn: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
