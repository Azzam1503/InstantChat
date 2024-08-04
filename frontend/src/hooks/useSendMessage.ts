import { useState } from "react";
import userConverstaion from "../zustand/useConversation";
import toast from 'react-hot-toast';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation} = userConverstaion();

    const sendMessage = async (message: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message})
            });

            const data = await res.json();
          
            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }finally{
            setLoading(false);
        }


    }
    return {sendMessage, loading};

}

export default useSendMessage;