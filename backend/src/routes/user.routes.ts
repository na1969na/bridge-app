import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import {
  getOrCreateUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";

const router = Router();

// JWT middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

router.post("/", checkJwt, getOrCreateUserController);
router.put("/update", updateUserController);
router.delete("/delete", deleteUserController);

export default router;
