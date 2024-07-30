import { create } from "zustand";

interface ConversationState {
    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
  }

  interface MessageI {
    _id: string;
    message: string;
    receiverId: string;
    senderId: string;
    updatedAt: string;
    createdAt: string;
    __v: string;
}


const userConverstaion = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({selectedConversation}),
    messages:[],
    setMessages: (messages:MessageI[]) => set({messages}),
}))

export default userConverstaion;