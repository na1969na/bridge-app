import Hobby, { IHobby } from "../models/hobby";

// Create Hobby
export const createHobby = async (hobbyData: IHobby) => {
  try {
    const hobby = new Hobby(hobbyData);
    return await hobby.save();
  } catch (error) {
    throw new Error("Failed to create hobby");
  }
};

// Update Hobby
export const updateHobby = async (id: string, hobbyData: Partial<IHobby>) => {
  try {
    return await Hobby.findByIdAndUpdate(id, hobbyData, { new: true });
  } catch (error) {
    throw new Error("Failed to update hobby");
  }
};

// Delete Hobby
export const deleteHobby = async (id: string) => {
  try {
    return await Hobby.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete hobby");
  }
};

// Search Hobbies
export const searchHobbies = async (query: string) => {
  try {
    return await Hobby.find({ title: new RegExp(query, "i") }); // 部分一致 & 大文字小文字区別なし
  } catch (error) {
    throw new Error("Failed to search hobbies");
  }
};

// Get Hobby By ID
export const getHobbyById = async (id: string) => {
  try {
    return await Hobby.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch hobby");
  }
};

// Get All Hobbies
export const getAllHobbies = async () => {
  try {
    return await Hobby.find();
  } catch (error) {
    throw new Error("Failed to fetch hobbies");
  }
};
