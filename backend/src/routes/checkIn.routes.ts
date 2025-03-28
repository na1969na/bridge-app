import express from "express";
import { CheckInController } from "../controllers/checkIn.controller";

const router = express.Router();
const checkInController = new CheckInController();

router.post("/", checkInController.createCheckIn.bind(checkInController));
router.get("/", checkInController.getCheckInsByDateRange.bind(checkInController));
router.put("/:id", checkInController.updateCheckIn.bind(checkInController));

export default router;