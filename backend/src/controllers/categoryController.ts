import { Request, Response } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  searchCategories,
} from "../services/categoryService";

/**
 * Create category
 *
 * @route POST /categories
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update category by id
 *
 * @route PUT /categories/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const updateCategoryController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const updatedCategory = await updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete category by id
 *
 * @route DELETE /categories/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const deleteCategoryController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Search categories
 *
 * @route GET /categories/search
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const searchCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await searchCategories(req.query.name as string);
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all categories
 *
 * @route GET /categories
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};