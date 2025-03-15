import User, { IUser } from "../models/user.model";

// Get or create user
export const getOrCreateUser = async (auth0Id: string) => {
  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id });
      await user.save();
    }
    return user;
  } catch (error) {
    console.error('Error creating or finding user:', error);
    throw new Error("Failed to find or create user");
  }
};

// Update User
export const updateUser = async (userData: Partial<IUser>) => {
  try {
    return await User.findByIdAndUpdate(userData.auth0Id, userData, {
      new: true,
    });
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
