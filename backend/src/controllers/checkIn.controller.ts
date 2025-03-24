import { Request, Response, NextFunction } from "express";
import { CheckInService } from "../services/checkIn.service";
import { HealthStatus } from "../models/checkIn.model";
import mongoose from "mongoose";

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
      const { userId, healthStatus } = req.body;

      if (!userId || !healthStatus) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const data = req.body;
      const newData = await this.checkInService.createCheckIn(data);

      if (!newData) {
        res.status(404).json({ error: "Check-in not found" });
        return;
      }

      res.status(201).json(newData);
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
      const { userId, startDate, endDate } = req.query;

      if (
        typeof userId !== "string" ||
        typeof startDate !== "string" ||
        typeof endDate !== "string"
      ) {
        res.status(400).json({ error: "Invalid parameters" });
        return;
      }

      const checkIns = await this.checkInService.getCheckInsByDateRange(
        userId,
        new Date(startDate),
        new Date(endDate)
      );

      if (!checkIns) {
        res.status(404).json({ error: "Check-ins not found" });
        return;
      }

      res.status(200).json(checkIns);
    } catch (error) {
      next(error);
    }
  }

  // Update check-in
  async updateCheckIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { healthStatus } = req.body;

      if (!id || !healthStatus) {
        res.status(400).json({ error: "Health status is required" });
        return;
      }

      const updatedCheckIn = await this.checkInService.updateCheckIn(id, healthStatus);

      if (!updatedCheckIn) {
        res.status(404).json({ error: "Check-in not found" });
        return;
      }

      res.status(200).json(updatedCheckIn);
    } catch (error) {
      next(error);
    }
  }
}
