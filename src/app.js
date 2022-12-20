import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import urlsRoutes from "./routes/urlsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(urlsRoutes);
app.use(userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));