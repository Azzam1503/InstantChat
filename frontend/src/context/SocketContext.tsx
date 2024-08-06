import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";


interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
};

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketContextProviderProps {
    children: ReactNode
}

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within a SocketContextProvider');
    }
    return context;
};

const socketURL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const SocketContextProvider:React.FC<SocketContextProviderProps> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    const {authUser} =  useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket: Socket = io(socketURL, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.close()
            };
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
}