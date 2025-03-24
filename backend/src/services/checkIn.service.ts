import { CheckInRepository } from "../repositories/checkInRepository";
import { HealthStatus } from "../models/checkIn.model";
import { ICheckIn } from "../models/checkIn.model";
import { Types } from "mongoose";

export class CheckInService {
  private checkInRepository: CheckInRepository;

  constructor() {
    this.checkInRepository = new CheckInRepository();
  }

  // Create check-in
  async createCheckIn(
    data: Partial<ICheckIn>
  ): Promise<ICheckIn> {
    return await this.checkInRepository.create(data);
  }

  // Get all check-ins within a date range
  async getCheckInsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ICheckIn[]> {
    return await this.checkInRepository.getCheckInsByDateRange(
      userId,
      startDate,
      endDate
    );
  }

  // Update check-in
  async updateCheckIn(
    id: string,
    healthStatus: HealthStatus
  ): Promise<ICheckIn | null> {
    return await this.checkInRepository.updateCheckIn(id, healthStatus);
  }
}
