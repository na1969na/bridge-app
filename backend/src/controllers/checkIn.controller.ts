import { Request, Response, NextFunction } from "express";
import { CheckInService } from "../services/checkIn.service";
import { HealthStatus } from "../models/checkIn.model";

export class CheckInController {
  private checkInService: CheckInService;

  constructor() {
    this.checkInService = new CheckInService();
  }

  // Create check-in
  async createCheckIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, date, healthStatus } = req.body;

      if (!userId || !date || !healthStatus) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const checkIn = await this.checkInService.createCheckIn(
        userId,
        new Date(date),
        healthStatus
      );
      res.status(201).json(checkIn);
    } catch (error) {
      next(error);
    }
  }

  // Get all check-ins
  async getCheckInsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const checkIns = await this.checkInService.getCheckInsByUserId(userId);
      res.status(200).json(checkIns);
    } catch (error) {
      next(error);
    }
  }

  // Get all check-ins within a date range
  async getCheckInsByDateRange(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, startDate, endDate } = req.body;

      if (!userId || !startDate || !endDate) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const checkIns = await this.checkInService.getCheckInsByDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      );
      res.status(200).json(checkIns);
    } catch (error) {
      next(error);
    }
  }

  // Update check-in
  async updateCheckIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { healthStatus } = req.body;

      if (!healthStatus) {
        res.status(400).json({ error: "Health status is required" });
        return;
      }

      const updatedCheckIn = await this.checkInService.updateCheckIn(id, healthStatus as HealthStatus);

      if (!updatedCheckIn) {
        res.status(404).json({ error: "Check-in not found" });
        return;
      }

      res.status(200).json(updatedCheckIn);
    } catch (error) {
      next(error);
    }
  }

  // Delete check-in
  async deleteCheckIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const deletedCheckIn = await this.checkInService.deleteCheckIn(id);

      if (!deletedCheckIn) {
        res.status(404).json({ error: "Check-in not found" });
        return;
      }

      res.status(200).json({ message: "Check-in deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
