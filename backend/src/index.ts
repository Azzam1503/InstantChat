import express, {Request, Response, Application} from "express";
import dotevn from "dotenv";
import authRoutes from "./routes/auth.routes";
import dbConnect from "./service/dbConnect";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import cookieparser from "cookie-parser";
import cors from "cors";
import {app, server} from './socket/socket';

dotevn.config();
dbConnect();
// const app: Application = express();
const PORT= process.env.PORT ||  3000;
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieparser());
app.get("/", (req : Request, res: Response) =>{
    res.send("hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
})