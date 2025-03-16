import mongoose, { Schema, Document } from "mongoose";

export interface ICheckIn extends Document {
  date: Date;
}

const checkInSchema: Schema<ICheckIn> = new Schema(
  {
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

const CheckIn = mongoose.model<ICheckIn>("CheckIn", checkInSchema);

export default CheckIn;
