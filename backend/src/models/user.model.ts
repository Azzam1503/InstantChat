import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    fullName: string;
    username: string;
    email: string;
    password: string;
    gender: string,
    profilePic: string;
    createdAt: Date;
    updateAt: Date
  }
  

const userSchema = new mongoose.Schema<UserDocument>({
    fullName:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    }
},{
    timestamps: true
});

const User =  mongoose.model<UserDocument>("user", userSchema);

export default User;