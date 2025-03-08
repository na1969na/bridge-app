import Category, { ICategory } from "../models/Category";

// Create Category
export const createCategory = async (categoryData: ICategory) => {
  try {
    const category = new Category(categoryData);
    return await category.save();
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

// Update Category
export const updateCategory = async (
  id: string,
  categoryData: Partial<ICategory>
) => {
  try {
    return await Category.findByIdAndUpdate(id, categoryData, { new: true });
  } catch (error) {
    throw new Error("Failed to update category");
  }
};

// Delete Category
export const deleteCategory = async (id: string) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete category");
  }
};

// Search Categories
export const searchCategories = async (query: string) => {
  try {
    return await Category.find({ name: new RegExp(query, "i") });
  } catch (error) {
    throw new Error("Failed to search categories");
  }
};

// Get All Categories
export const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};