import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import hoobyRoutes from "./routes/hobby.routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use("/api/hobbies", hoobyRoutes);

// Error handling


export default app;
