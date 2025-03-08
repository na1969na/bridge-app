import { Router } from "express";
import {
  getAllHobbiesController,
  createHobbyController,
  updateHobbyController,
  deleteHobbyController,
  searchHobbiesController,
  getHobbyByIdController
} from "../controllers/hobbyContoller";

const router = Router();

router.post("/", createHobbyController);
router.delete("/:id", deleteHobbyController);
router.put("/:id", updateHobbyController);
router.get("/search", searchHobbiesController);
router.get("/:id", getHobbyByIdController);
router.get("/", getAllHobbiesController);

export default router;
