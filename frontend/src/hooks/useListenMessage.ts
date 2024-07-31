import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import userConverstaion from '../zustand/useConversation';
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessage = () => {
   const {socket} = useSocketContext();
   const {messages, setMessages, selectedConversation} = userConverstaion();

   useEffect(() =>{
    socket?.on('newMessage', (newMessage) => {
        const sound = new Audio(notificationSound);
        sound.play();

        if(newMessage.receiverId === selectedConversation._id){
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        }
    });

    return () => socket?.off('newMessage');
   },[socket, setMessages, messages]);
}

export default useListenMessage
