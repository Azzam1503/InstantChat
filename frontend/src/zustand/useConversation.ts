import { create } from "zustand";

interface ConversationState {
    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
  }

const userConverstaion = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({selectedConversation}),
    messages:[],
    setMessages: (messages:string[]) => set({messages}),
}))

export default userConverstaion;