import { useEffect, useState } from 'react'
export interface ConversationI{
    _id: string
    fullName: string;
    email: string;
    password: string
    profilePic: string;
}

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<ConversationI[]>([]);

    useEffect(() => {
        const getConverstions = async () => {
            // setLoading(true);
            try {
                const res = await fetch('/api/users/getUsersForSideBar');
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);;
                }
                setConversations(data.allUsers);
            } catch (error) {
                
            }finally{
                setLoading(false);
            }
        }

        getConverstions();
    },[])
  return {loading, conversations};
}

export default useGetConversations;
