import { Request, Response } from "express";
import {
  getAllHobbies,
  createHobby,
  updateHobby,
  deleteHobby,
  searchHobbies,
  getHobbyById,
} from "../services/hobbyService";

/**
 * Create hobby
 *
 * @route POST /hobbies
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const createHobbyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hobby = await createHobby(req.body);
    res.status(201).json(hobby);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update hobby by id
 *
 * @route PUT /hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const updateHobbyController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const updatedHobby = await updateHobby(req.params.id, req.body);
    if (!updatedHobby) {
      res.status(404).json({ error: "Hobby not found" });
      return;
    }
    res.status(200).json(updatedHobby);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete hobby by id
 *
 * @route DELETE /hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const deleteHobbyController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const deletedHobby = await deleteHobby(req.params.id);
    if (!deletedHobby) {
      res.status(404).json({ error: "Hobby not found" });
      return;
    }
    res.status(200).json({ message: "Hobby deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Search hobbies by title
 *
 * @route GET /hobbies/search?title=keyword
 * @param {Request<{}, {}, {}, { title: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const searchHobbiesController = async (
  req: Request<{}, {}, {}, { title: string }>,
  res: Response
): Promise<void> => {
  try {
    const hobbies = await searchHobbies(req.query.title);
    res.status(200).json(hobbies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get hobby by id
 *
 * @route GET /hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
export const getHobbyByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const hobby = await getHobbyById(req.params.id);
    if (!hobby) {
      res.status(404).json({ error: "Hobby not found" });
      return;
    }
    res.status(200).json(hobby);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all hobbies
 *
 * @route GET /hobbies
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const getAllHobbiesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hobbies = await getAllHobbies();
    res.status(200).json(hobbies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
