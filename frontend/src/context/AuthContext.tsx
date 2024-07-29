import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    authUser: string | null;
    setAuthUser: (user: any | null) => void;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () : AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({children}: AuthProviderProps) =>{
    // const storedUser = localStorage.getItem("chat-user");
    // const initialAuthUser = storedUser ? JSON.parse(storedUser) : null;
    const [authUser, setAuthUser] = useState<string | null>(JSON.parse(localStorage.getItem("chat-user")|| "null"));
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>;
}