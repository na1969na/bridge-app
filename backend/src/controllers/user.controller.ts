import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Create or find user
  async findOrCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { sub } = req;

    if (!sub) {
      res.status(400).json({ error: "User ID not found" });
      return;
    }

    try {
      const user = await this.userService.findOrCreateUser(sub);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // Get user
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sub } = req;

      if (!sub) {
        res.status(400).json({ error: "User ID not found" });
        return;
      }

      const user = await this.userService.getUserByAuth0Id(sub);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // Update user
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sub } = req;

      if (!sub) {
        res.status(400).json({ error: "User ID not found" });
        return;
      }

      const updateData = req.body;
      const updatedUser = await this.userService.updateUser(sub, updateData);

      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  // Delete user
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { sub } = req;

      if (!sub) {
        res.status(400).json({ error: "User ID not found" });
        return;
      }

      const deletedUser = await this.userService.deleteUser(sub);

      if (!deletedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
