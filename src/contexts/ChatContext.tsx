import React, { createContext, useContext, ReactNode } from "react";
import { useChats } from "@/hooks/useChats";
import { useContextDocument } from "@/hooks/useContextDocument";
import { type AIModel } from "@/constants/models";
import Message from "@/types/message";
import Chat from "@/types/chats";

interface ChatContextType {
  // Chat data
  chats: Chat[];
  activeChatId: string | null;
  loading: boolean;
  selectedModel: AIModel;
  currentMessages: Message[];

  // Chat actions
  createNewChat: () => void;
  selectChat: (id: string) => void;
  handleSendFirstMessage: (content: string) => Promise<void>;
  handleSendMessage: (content: string) => Promise<void>;
  handleDeleteChat: (id: string) => void;
  handleExportChat: (chat: Chat, format: "json" | "txt") => void;
  setSelectedModel: (model: AIModel) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const { contextDoc } = useContextDocument();

  const {
    chats,
    activeChatId,
    loading,
    selectedModel,
    currentMessages,
    createNewChat,
    selectChat,
    handleSendFirstMessage,
    handleSendMessage,
    handleDeleteChat,
    handleExportChat,
    setSelectedModel,
  } = useChats(contextDoc);

  const value: ChatContextType = {
    chats,
    activeChatId,
    loading,
    selectedModel,
    currentMessages,
    createNewChat,
    selectChat,
    handleSendFirstMessage,
    handleSendMessage,
    handleDeleteChat,
    handleExportChat,
    setSelectedModel,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
