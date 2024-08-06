import  jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { UserDocument } from "../models/user.model";

export interface CustomRequest extends Request {
    user?: UserDocument
    token?: string
  }
  
  interface DecodedToken {
    userId: string
  }
  

const proctectRoute = async (req : CustomRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.cookies.token;
        
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if(!decoded){
            return res.status(401).json({error: "Unauthorized"});
        }
        
        const user = await User.findById(decoded.userId).select("-password -profilePic");

        if(!user){
            return res.status(401).json({error: "No user found"});
        }

        req.user = user;
        next();
        
    } catch (error) {
        
    }
}

export default proctectRoute;