import User from "../models/user.model";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/protecteRoute";

export const getUsersForSideBar = async (req: CustomRequest, res: Response) => {
    try {
        const loggedInUserId = req.user?._id;

        const allUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");

        return res.json({allUsers})
    } catch (error) {
        console.log("error in the get users for sidebar", error)
    }
}