import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import userConverstaion from '../zustand/useConversation';
import notificationSound from "../assets/sounds/notification.mp3";
import { MessageI } from '../zustand/useConversation';

interface NewMessageI extends MessageI{
    shouldShake?: boolean
}
const useListenMessage = () => {
   const {socket} = useSocketContext();
   const {messages, setMessages, selectedConversation} = userConverstaion();

   useEffect(() =>{
    if(socket != undefined){
        socket?.on('newMessage', (newMessage: NewMessageI) => {
            const sound = new Audio(notificationSound);
            sound.play();
        
            if(newMessage.senderId === selectedConversation._id){
                newMessage.shouldShake = true;
                setMessages([...messages, newMessage]);
            }
        });
    }

    return () => {
        socket?.off('newMessage');
    };
   },[socket, setMessages, messages]);
}

export default useListenMessage
