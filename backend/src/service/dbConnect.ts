import mongoose from "mongoose";

export default async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.log(error)
    }
}