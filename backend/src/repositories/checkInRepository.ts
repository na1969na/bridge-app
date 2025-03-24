import mongoose, { Types } from "mongoose";
import CheckIn, { HealthStatus, ICheckIn } from "../models/checkIn.model";

export class CheckInRepository {
  // Create check-in
  async create(data: Partial<ICheckIn>): Promise<ICheckIn> {
    return await CheckIn.create({
      userId: data.userId,
      healthStatus: data.healthStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Get all check-ins for a user within a date range
  async getCheckInsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ICheckIn[]> {
    return await CheckIn.find({
      userId: userId,
      updatedAt: { $gte: startDate, $lte: endDate },
    }).exec();
  }

  // Update check-in
  async updateCheckIn(
    id: string,
    healthStatus: HealthStatus,
  ): Promise<ICheckIn | null> {
    return CheckIn.findByIdAndUpdate(
      id,
      { healthStatus, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  // Delete check-in
  async deleteCheckIn(userId: string, options?: { session?: mongoose.ClientSession }): Promise<void> {
    await CheckIn.deleteMany({ userId }, options).exec();
  }
}
