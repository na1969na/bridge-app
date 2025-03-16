import { UserRepository } from "../repositories/userRepository";
import { IUser } from "../models/user.model";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Find or create a user based on their Auth0 ID
  async findOrCreateUser(auth0Id: string): Promise<IUser> {
    let user = await this.userRepository.findByAuth0Id(auth0Id);
    if (!user) {
      user = await this.userRepository.create(auth0Id);
    }
    return user;
  }

  // Get a user by their Auth0 ID
  async getUserByAuth0Id(auth0Id: string): Promise<IUser | null> {
    return this.userRepository.findByAuth0Id(auth0Id);
  }

  // Update a user
  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return this.userRepository.update(id, updateData);
  }

  // Delete a user
  async deleteUser(id: string): Promise<IUser | null> {
    return this.userRepository.delete(id);
  }
}
