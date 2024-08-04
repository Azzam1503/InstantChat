import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
    try {
        setLoading(true);
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        await res.json();
        
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    } catch (error) {
        console.log("error in logout", error)   
    }finally{
        setLoading(false);
    }
   }

   return {loading, logout};
}

export default useLogout;