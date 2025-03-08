import { Router } from "express";
import {
  getAllCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  searchCategoriesController,
} from "../controllers/categoryController";

const router = Router();

router.post("/", createCategoryController);
router.delete("/:id", deleteCategoryController);
router.put("/:id", updateCategoryController);
router.get("/search", searchCategoriesController);
router.get("/", getAllCategoriesController);

export default router;
