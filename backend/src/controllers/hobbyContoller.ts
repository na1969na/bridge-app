import { Request, Response } from "express";
import { getAllHobbies } from "../services/hobbyService";

export const getAllHobbiesController = async (req: Request, res: Response) => {
  try {
    const hobbies = await getAllHobbies();
    res.status(200).json(hobbies);
  } catch (error) {
    res.status(500).json({ message: "Error getting hobbies", error });
  }
};
