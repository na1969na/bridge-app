import User, { IUser } from "../models/User";

// Fetch a user by id or create a new user
export const findOrCreateUser = async (auth0Id: string, name: string, email: string) => {
  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, name, email });
      await user.save();
    }
    return user;
  }
  catch (error) {
    throw new Error("Failed to find or create user");
  }
};

// Update User
export const updateUser = async (userData: Partial<IUser>) => {
  try {
    return await User.findByIdAndUpdate(userData.auth0Id, userData, { new: true });
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

// Delete user
export const deleteUser = async (auth0Id: string) => {
  try {
    return await User.findByIdAndDelete(auth0Id);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
