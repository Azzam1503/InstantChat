import express, {Request, Response} from "express";
import path from "path";
import dotevn from "dotenv";
import authRoutes from "./routes/auth.routes";
import dbConnect from "./service/dbConnect";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";
import cookieparser from "cookie-parser";
import {app, server} from './socket/socket';

dotevn.config();
dbConnect();

const PORT= process.env.PORT ||  3000;

const ___dirname = path.resolve();

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

if(process.env.NODE_ENV !== "development"){
    app.use(express.static(path.join(___dirname, "/frontend/dist")));
    app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.join(___dirname, "frontend", "dist", "index.html"));
    })
}

server.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
})