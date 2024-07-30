import Message from "../models/message.model";
import {Response} from "express";
import { CustomRequest } from "../middlewares/protecteRoute";
import Conversation from "../models/conversatoin.model";
import mongoose from "mongoose";

export const sendMessage = async (req: CustomRequest, res: Response) => {
    try {
        const {message} = req.body;
        const { id : 
            receiverId } = req.params;
        console.log(receiverId);
        const senderId = req?.user?._id;
        console.log(senderId);

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

        //TODO Socket.io functionality
        console.log(newMessage);
        conversation.messages.push(newMessage._id);
        await conversation.save();
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({error: "Internal server error"})
    }


} ;

export const getMessages = async (req: CustomRequest, res: Response) =>{
    try {
        console.log("in the getMessages")
        const {id: receiverId} = req.params;
        const senderId  = req.user?._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        console.log(messages)
        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);
    }
}