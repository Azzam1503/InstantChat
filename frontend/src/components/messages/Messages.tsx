import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
    const {loading, messages} = useGetMessages();
    console.log("messages:", messages);
    return (
            <div className="px-4 flex-1 overflow-auto">
               <Message />
            </div>
    )
}

export default Messages;