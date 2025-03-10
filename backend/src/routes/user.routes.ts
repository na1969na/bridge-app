import { Router } from "express";
import {
  loginUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userContoller";

const router = Router();

router.post("/login", loginUserController);
router.put("/update", updateUserController);
router.delete("/delete", deleteUserController);

export default router;
