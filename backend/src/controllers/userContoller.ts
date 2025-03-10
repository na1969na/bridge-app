import { Request, Response } from "express";
import {
  findOrCreateUser,
  updateUser,
  deleteUser,
} from "../services/userService";

/**
 * Login
 *
 * @route POST /users/login
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { auth0Id, name, email } = req.body;
  try {
    const user = await findOrCreateUser(auth0Id, name, email);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Update user by id
 *
 * @route PUT /users/update
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await updateUser(req.body);
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Delete user by id
 *
 * @route DELETE /users/delete
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedUser = await deleteUser(req.body.auth0Id);
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
