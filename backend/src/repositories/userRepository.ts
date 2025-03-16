import User, { IUser } from "../models/user.model";

export class UserRepository {
  // Search for a user by auth0Id
  async findByAuth0Id(auth0Id: string): Promise<IUser | null> {
    return await User.findOne({ auth0Id }).exec();
  }

  // Create user
  async create(id: string): Promise<IUser> {
    const user = new User({ id });
    return user.save({ validateBeforeSave: false });
  }

  // Update user
  async update(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Delete user
  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec();
  }
}
