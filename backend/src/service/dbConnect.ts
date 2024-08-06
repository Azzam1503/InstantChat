import mongoose from "mongoose";

export default async () =>{
    try {
        await mongoose.connect("mongodb+srv://Azzam:azzam123@cluster0.kgnx0io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat-app");
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.log(error)
    }
}