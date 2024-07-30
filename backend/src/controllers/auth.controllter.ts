
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import generateTokenSetCookie from "../service/generateToken";
import mongoose from "mongoose";

export const singupUser = async (req: Request, res: Response) => {
    try {
     
        const {fullName, email, username, password, confirmPassword, gender} = req.body;
        if(password != confirmPassword){
            return res.status(400).json({
                message: "Password and confirm password do not match",
                success: false
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log(hashedPassword);
        const existing = await User.findOne({email, username});
      
        if(existing){
            return res.status(400).json({
                message: "User already exist",
                success: false
            });
        }

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        const user = await User.create({
            fullName,
            email,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        console.log(user);
        generateTokenSetCookie(user._id as mongoose.Types.ObjectId, res);
        return res.status(200).json(
            {   
                id: user._id,
                username: user.username,
                profilePic: user.profilePic,
                success: true
            }
        );
    } catch (error) {
        console.log(error);
    }

}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        console.log(user);
        const compare = await bcryptjs.compare(password, user?.password || "");

        if (!user || !compare) {
            return res.status(404).json({ error: 'User not found or invalid credentials' });
        }
     
        generateTokenSetCookie(user._id as mongoose.Types.ObjectId, res);
        res.status(200).json({
            success: true,
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log(error);
    }
}
export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const forgotPassword = (req: Request, res: Response) => {

};