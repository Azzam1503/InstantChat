import { createContext, ReactNode, useContext, useState } from "react";

interface AuthUserI {
    email: string,
    fullName: string,
    _id: string;
    username: string;
    profilePic: string
}

interface AuthContextType {
    authUser: AuthUserI | null;
    setAuthUser: (user: AuthUserI | null) => void;
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
    const storedUser = localStorage.getItem("chat-user");
    const initialAuthUser = storedUser ? JSON.parse(storedUser) : null;
    const [authUser, setAuthUser] = useState<AuthUserI | null>(initialAuthUser);
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>;
} 