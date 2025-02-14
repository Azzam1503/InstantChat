import Message from "../models/message.model";
import {Response} from "express";
import { CustomRequest } from "../middlewares/protecteRoute";
import Conversation from "../models/conversatoin.model";
import { getReceiverSocketId, io } from "../socket/socket";

export const sendMessage = async (req: CustomRequest, res: Response) => {
    try {
        const {message} = req.body;
        const { id : 
            receiverId } = req.params;
        
        const senderId = req?.user?._id;


        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, receiverId]
            }
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        
        conversation.messages.push(newMessage._id);
        await conversation.save();

        //Socket.io functionality
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } 


        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({error: "Internal server error"})
    }


} ;

export const getMessages = async (req: CustomRequest, res: Response) =>{
    try {
        
        const {id: receiverId} = req.params;
        const senderId  = req.user?._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);
    }
}