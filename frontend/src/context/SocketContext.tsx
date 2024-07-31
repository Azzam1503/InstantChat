import React, {createContext, ReactNode, useEffect, useState} from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";


interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
};

export const SocketContext = createContext<SocketContextType | undefined>();

interface SocketContextProvider {
    children: ReactNode
}
export const SocketContextProvider:React.FC<SocketContextProvider> = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUser] = useState<string[]>([]);

    const {authUser} =  useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket = new io("http://localhost:3000");
            setSocket(socket);
            console.log("in the connection", socket);
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
}