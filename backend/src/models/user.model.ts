import mongoose, { Schema, Document } from "mongoose";
import { ICheckIn } from "./checkIn.model";

export interface IUser extends Document {
  auth0Id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  emergencyContact: {
    firstname: string;
    lastname: string;
    phone: string;
    email?: string;
  }[];
  checkIns: ICheckIn[];
  reminder: {
    method: "sms" | "email";
    timeOfDay: "morning" | "afternoon" | "evening";
  };
  lastCheckedIn: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    emergencyContact: [
      {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: false },
      },
    ],
    checkIns: [{ type: mongoose.Schema.Types.ObjectId, ref: "CheckIn" }],
    reminder: {
      method: {
        type: String,
        enum: ["sms", "email"],
        required: false,
      },
      timeOfDay: {
        type: String,
        enum: ["morning", "afternoon", "evening"],
        required: false,
      },
    },
    lastCheckedIn: { type: Date, required: false },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
