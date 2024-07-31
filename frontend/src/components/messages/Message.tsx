import React, { useState } from "react"
import userConverstaion from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
interface MessageI{
    _id: string;
    message: string;
    revceiverId: string;
    senderId: string;
    updatedAt: string;
    createdAt: string;
    ___v: string;
}
const Message: React.FC<MessageI> = ({message}) => {
    const {authUser} = useAuthContext();
    const {selectedConversation} = userConverstaion();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const formattedDate = extractTime(message.createdAt);
    const bgColor = fromMe ? 'bg-blue-500' : "";
    const shouldShake = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="Tailwind CSS chat bubble" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bgColor} ${shouldShake} pb-2`}>{message.message}</div>
            <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{formattedDate}</div>
        </div>
    )
}

export default Message;