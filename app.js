export const app = express();
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import centerRoutes from './routes/centerRoutes.js'

config({ path: "./config/config.env" });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/centerRoutes", centerRoutes);
