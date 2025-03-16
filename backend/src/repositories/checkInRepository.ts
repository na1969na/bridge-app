import CheckIn, { ICheckIn } from "../models/checkIn.model";

export class CheckInRepository {
  // Create check-in
  async create(userId: string, date: Date, healthStatus: string): Promise<ICheckIn> {
    return await CheckIn.create({ userId, date, healthStatus });
  }

  // Get all check-ins for a user
  async getCheckInsByUserId(userId: string): Promise<ICheckIn[]> {
    return CheckIn.find({ userId }).sort({ date: -1 });
  }

  // Get all check-ins for a user within a date range
  async getCheckInsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ICheckIn[]> {
    return await CheckIn.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    }).exec();
  }

  // Update check-in
  async updateCheckIn(id: string, healthStatus: string): Promise<ICheckIn | null> {
    return CheckIn.findByIdAndUpdate(id, { healthStatus }, { new: true }).exec();
  }

  // Delete check-in
  async deleteCheckIn(userId: string): Promise<ICheckIn | null> {
    return CheckIn.findByIdAndDelete(userId).exec();
  }
}
