import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling


export default app;
