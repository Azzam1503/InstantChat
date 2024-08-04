import { create } from "zustand";

interface ConversationState {
    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: MessageI[];
    setMessages: (messages: MessageI[]) => void;
  }

  export interface MessageI {
    _id: string;
    message: string;
    receiverId: string;
    senderId: string;
    updatedAt: string;
    createdAt: string;
}


const userConverstaion = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({selectedConversation}),
    messages: [],
    setMessages: (messages:MessageI[]) => set({messages}),
}))

export default userConverstaion;