import { Router } from "express";
import { Request, Response } from "express";
import Hobby from "../models/hobby";
import { getAllHobbies, getHobbyById, searchHobbies } from "../services/hobbyService";

const router = Router();

/**
 * Create a new hobby
 *
 * @route POST /api/hobbies
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, date, rating, notes, categoryId, userId } = req.body;
    const hobby = new Hobby({
      title,
      date,
      rating,
      notes,
      categoryId,
      userId,
    });
    const newHobby = await hobby.save();
    res.status(201).json(newHobby);
  } catch (error) {
    res.status(500).json({ message: "Error creating hobby", error });
  }
});

/**
 * Update hobby by id
 *
 * @route PUT /api/hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const hobbyId = req.params.id;
    const updatedData = req.body;
    const hobby = await Hobby.findByIdAndUpdate(hobbyId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!hobby) {
      res.status(404).json({ message: "Hobby not found" });
      return;
    }

    res.status(200).json(hobby);
  } catch (error) {
    res.status(500).json({ message: "Error updating hobby", error });
  }
});

/**
 * Delete hobby by id
 *
 * @route DELETE /api/hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const hobby = await Hobby.findByIdAndDelete(req.params.id);

    if (!hobby) {
      res.status(404).json({ message: "Hobby not found" });
      return;
    }

    res.status(204).json({ message: "Hobby deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hobby", error });
  }
});

/**
 * Search hobbies by title
 *
 * @route GET /api/hobbies/search?title=keyword
 * @param {Request<{}, {}, {}, { title: string }>} req
 * @param {Response} res
 * @returns {void}
 */
router.get("/search", async (req: Request<{}, {}, {}, { title: string }>, res: Response) => {
  try {
    const title = req.query.title as string;
    const searchCriteria: any = {};
    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" };
    }
    const hobbies = await Hobby.find(searchCriteria);
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "Error searching hobbies", error });
  }
});

/**
 * Get hobby by id
 *
 * @route GET /api/hobbies/:id
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void}
 */
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const hobby = await Hobby.findById(req.params.id);
    if (!hobby) {
      res.status(404).json({ message: "Hobby not found" });
      return;
    }
    res.status(200).json(hobby);
  } catch (error) {
    res.status(500).json({ message: "Error getting hobby", error });
  }
});

/**
 * Get all hobbies
 *
 * @route GET /api/hobbies
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
router.get("/", getAllHobbies);

export default router;
