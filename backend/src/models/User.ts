import mongoos, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  auth0Id: string;
  name: string;
  email: string;
  phone: string;
  emergencyContact: {
    name: String;
    email: String;
    phone: String;
  };
  lastCheckIn: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    auth0Id: { type: String, required: true, unique: true }, // Auth0のsub
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    emergencyContact: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    lastCheckIn: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoos.model<IUser>("User", UserSchema);
