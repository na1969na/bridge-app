import { UserRepository } from "../repositories/userRepository";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Find or create user
  async findOrCreateUser(auth0Id: string): Promise<IUser> {
    let user = await this.userRepository.findByAuth0Id(auth0Id);
    console.log("auth0Id", auth0Id);
    console.log("user", user);
    if (!user) {
      user = await this.userRepository.create(auth0Id);
    }
    return user;
  }

  // Get user
  async getUserByAuth0Id(auth0Id: string): Promise<IUser | null> {
    return await this.userRepository.findByAuth0Id(auth0Id);
  }

  // Update user
  async updateUser(
    auth0Id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await this.userRepository.update(auth0Id, updateData);
  }

  // Delete user
  async deleteUser(auth0Id: string): Promise<IUser | null> {
    return await this.userRepository.delete(auth0Id);
  }
}
