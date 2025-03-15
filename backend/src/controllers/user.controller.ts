import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import {
  getOrCreateUser,
  updateUser,
  deleteUser,
} from "../services/userService";

/**
 * Get or create user
 *
 * @route POST /users
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 */
export const getOrCreateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const auth = req.auth as unknown as JwtPayload;

  if (!auth || !auth.payload.sub) {
    res.status(400).json({ error: "トークン情報が無効です。" });
    return;
  }

  const { sub } = auth.payload;

  try {
    const user = await getOrCreateUser(sub);
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
