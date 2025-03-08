import Hobby from "../models/hobby";

// Get All Hobbies
export const getAllHobbies = async () => {
  try {
    const hobbies = await Hobby.find();
    return hobbies;
  } catch (error) {
    throw new Error("Error getting hobbies");
  }
};

// Get Hobby By ID
export const getHobbyById = async (id: string) => {
  try {
    const hobby = await Hobby.findById(id);
    if (!hobby) {
      throw new Error("Hobby not found");
    }
    return hobby;
  } catch (error) {
    throw new Error("Error getting hobby");
  }
};

// Search Hobbies
export const searchHobbies = async (title: string) => {
  try {
    const searchCriteria: any = {};
    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" };
    }
    const hobbies = await Hobby.find(searchCriteria);
    return hobbies;
  } catch (error) {
    throw new Error("Error searching hobbies");
  }
};


