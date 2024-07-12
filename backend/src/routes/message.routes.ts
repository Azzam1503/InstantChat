import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller";
import proctectRoute from "../middlewares/protecteRoute";
const router = express.Router();

router.get("/:id", proctectRoute, getMessages);
router.post("/send/:id", proctectRoute, sendMessage);


export default router;