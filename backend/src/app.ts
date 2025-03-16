import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { checkJwt } from "./middleware/checkJwt";
import { checkJwtSub } from "./middleware/checkJwtSub";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(checkJwt);
app.use(checkJwtSub);

// MongoDB connection
connectDB();

// Routes
app.use("/users", userRoutes);

// Error handling
app.use(errorHandler);

export default app;
