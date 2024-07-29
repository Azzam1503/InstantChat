import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const navigate = useNavigate()

    
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
        // navigate("/login");
   
    } catch (error) {
        console.log("error in logout", error)   
    }finally{
        setLoading(false);
    }
   }

   return {loading, logout};
}

export default useLogout;