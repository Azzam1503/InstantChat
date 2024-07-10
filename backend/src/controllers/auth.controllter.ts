
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import generateTokenSetCookie from "../service/generateToken";

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

        const boyProfilePic =  `https://avatar.iran.liara.run/username?username=${username}`;
        const girlProfilePic =  `https://avatar.iran.liara.run/username?username=${username}`;
        
        const user = await User.create({
            fullName,
            email,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        console.log(user);
        generateTokenSetCookie(user._id, res);
        return res.status(200).json(
            {   
                message: "User created successfully",
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
        
        const compare = await bcryptjs.compare(password, user?.password || "");

        if (!user || !compare) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }

        generateTokenSetCookie(user._id, res);
        res.status(200).json({
            message: "Logged In successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const forgotPassword = (req: Request, res: Response) => {

};