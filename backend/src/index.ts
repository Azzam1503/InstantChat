import express, {Request, Response, Application} from "express";
import dotevn from "dotenv";
import authRoutes from "./routes/auth.routes";
import dbConnect from "./service/dbConnect";
import messageRoutes from "./routes/message.routes";

dotevn.config();
dbConnect();
const app: Application = express();
const PORT= process.env.PORT ||  3000;

app.use(express.json());
app.get("/", (req : Request, res: Response) =>{
    res.send("hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
})