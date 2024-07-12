import {Router} from "express";
import proctectRoute from "../middlewares/protecteRoute";
import { getUsersForSideBar } from "../controllers/user.controller";
const router = Router();

router.get("/getUsersForSideBar", proctectRoute ,getUsersForSideBar);
export default router;