import express from "express";
import { CenterLogin, CenterRegisterUser } from "../controller/FrontController.js";
const router = express.Router();

router.post("/register", CenterRegisterUser);
router.post("/center/login", CenterLogin)
export default router;
