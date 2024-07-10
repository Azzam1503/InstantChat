import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";
const generateTokenSetCookie = (userId: mongoose.Types.ObjectId, res: Response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!,{
        expiresIn: '5d'
    });

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development"
    })
};

export default generateTokenSetCookie;

