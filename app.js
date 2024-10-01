export const app = express();
import path from "path";
import express from "express";
import { config } from "dotenv";
config({ path: "./config/config.env" });
import cors from "cors";
import centerRoutes from './routes/centerRoutes.js'
import studRoutes from "./routes/studRoutes.js"
console.log(process.env.COOKIE_EXPIRE)

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/centerRoutes", centerRoutes);
app.use("/api/studRoutes", studRoutes);