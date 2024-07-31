import {Server} from 'socket.io';
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap:{[key: string]: string} = {};

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log("a user connected", socket.id);
    const userId: string = socket.handshake.query.userId as string;
    if(userId != "undefined"){
        userSocketMap[userId] = socket.id;
    }

    // io.emit is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})
export {app, io, server};