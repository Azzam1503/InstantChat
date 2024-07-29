import React from "react"
import userConverstaion from "../../zustand/useConversation";
const Message: React.FC = () => {
    const {selectedConversation} = userConverstaion();
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={selectedConversation.profilePic} alt="Tailwind CSS chat bubble" />
                </div>
            </div>
            <div className={`chat-bubble text-white bg-blue-500`}>Hi! What is upp</div>
            <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>12:43</div>
        </div>
    )
}

export default Message;