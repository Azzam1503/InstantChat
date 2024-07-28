import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

interface LoginI{
    username: string,
    password: string
}

const useSignin = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const signin = async ({username, password} :LoginI) =>{
        const success = handleInputErrors({username, password});
        if(!success) return;
        try {
            setLoading(true);
            
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({username, password})
                
            });
    
            const data = await res.json();
            console.log(data);
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error: any) {
            toast.error(error.message);
            console.log("error in log", error);
        }finally{
            setLoading(false);
        }
    }

    return {loading, signin};
}

export default useSignin;

function handleInputErrors({username ,password}: LoginI){
    if(!username  || !password ){
      toast.error('Please fill in all fields')
      return false;
    }
    return true;
  }