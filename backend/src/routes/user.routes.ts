import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.delete("/", userController.deleteUser.bind(userController));
router.post("/", userController.findOrCreateUser.bind(userController));
router.put("/", userController.updateUser.bind(userController));

export default router;
