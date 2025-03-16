import { CheckInRepository } from "../repositories/checkInRepository";
import { HealthStatus } from "../models/checkIn.model";
import { ICheckIn } from "../models/checkIn.model";

export class CheckInService {
  private checkInRepository: CheckInRepository;

  constructor() {
    this.checkInRepository = new CheckInRepository();
  }

  // Create check-in
  async createCheckIn(
    userId: string,
    date: Date,
    healthStatus: HealthStatus
  ): Promise<ICheckIn> {
    return await this.checkInRepository.create(userId, date, healthStatus);
  }

  // Get all check-ins
  async getCheckInsByUserId(
    userId: string
  ): Promise<ICheckIn[]> {
    return await this.checkInRepository.getCheckInsByUserId(userId);
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
    userId: string,
    healthStatus: HealthStatus
  ): Promise<ICheckIn | null> {
    return await this.checkInRepository.updateCheckIn(userId, healthStatus);
  }

  // Delete check-ins
  async deleteCheckIn(userId: string): Promise<ICheckIn | null> {
    return await this.checkInRepository.deleteCheckIn(userId);
  }
}
