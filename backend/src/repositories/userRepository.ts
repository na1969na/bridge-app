import User, { IUser } from "../models/user.model";

export class UserRepository {
  // Search user
  async findByAuth0Id(auth0Id: string): Promise<IUser | null> {
    return await User.findOne({ auth0Id }).exec();
  }

  // Create user
  async create(auth0Id: string): Promise<IUser> {
    const user = new User({ auth0Id });
    return user.save();
  }

  // Update user
  async update(auth0Id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(auth0Id, updateData, { new: true }).exec();
  }

  // Delete user
  async delete(auth0Id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(auth0Id).exec();
  }
}
