import { UserRepository } from "../repositories/userRepository";
import mongoose from "mongoose";
import { CheckInRepository } from "../repositories/checkInRepository";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;
  private checkInRepository: CheckInRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.checkInRepository = new CheckInRepository();
  }

  // Find or create user
  async findOrCreateUser(auth0Id: string): Promise<IUser> {
    let user = await this.userRepository.findByAuth0Id(auth0Id);

    if (!user) {
      user = await this.userRepository.create(auth0Id);
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const userId = user._id.toString();

    const checkIns = await this.checkInRepository.getCheckInsByDateRange(
      userId,
      startOfMonth,
      endOfMonth
    );

    const userWithCheckIns: IUser = {
      ...user.toObject(),
      checkIns,
    };

    return userWithCheckIns;
  }

  // Update user
  async updateUser(
    auth0Id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await this.userRepository.update(auth0Id, updateData);
  }

  // Delete user
  async deleteUser(auth0Id: string): Promise<IUser | null | undefined> {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const deletedUser = await this.userRepository.delete(auth0Id, {
        session,
      });

      if (!deletedUser) {
        throw new Error("User not found");
      }

      await this.checkInRepository.deleteCheckIn(deletedUser.id, { session });

      await session.commitTransaction();

      return deletedUser;
    } catch (error) {
      await session.abortTransaction();
      console.error("Error deleting user and related data:", error);
    } finally {
      await session.endSession();
    }
  }
}
