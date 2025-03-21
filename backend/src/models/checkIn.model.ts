import mongoose, { Schema, Document } from "mongoose";

export enum HealthStatus {
  GOOD = "good",
  PHYSICAL = "physical",
  MENTAL = "mental",
}

export interface ICheckIn extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  date: Date;
  healthStatus: HealthStatus;
}

const checkInSchema: Schema<ICheckIn> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to _id in User model
      required: true,
    },
    date: { type: Date, required: true },
    healthStatus: {
      type: String,
      required: true,
      enum: Object.values(HealthStatus),
    },
  },
  { timestamps: true, versionKey: false }
);

checkInSchema.post("save", async function (doc) {
  try {
    const user = await mongoose.model("User").findOne(doc.userId);
    if (user) {
      user.checkIns.push(doc._id);
      user.lastCheckedIn = doc.date;
      await user.save();
    }
  } catch (error) {
    console.error("Error updating user with check-in:", error);
  }
});

checkInSchema.index({ userId: 1, date: 1 });

const CheckIn = mongoose.model<ICheckIn>("CheckIn", checkInSchema);

export default CheckIn;
