import express from "express";
const router = express.Router();
import { singupUser, loginUser, logout, forgotPassword } from "../controllers/auth.controllter";

router.post("/signup", singupUser);
router.post("/login", loginUser);

router.post("/logout", logout);

export default router;
