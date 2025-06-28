"use client";

import ChatContainer from "@/components/chat/chatContainer";
import ChatInput from "@/components/chat/chatInput";
import { sendMessageToAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import Chat from "@/types/chats";
import { RiChatNewFill, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import ChatMoreMenu from "@/components/chat/chatMoreMenu";
import ChatWelcome from "@/components/chat/chatWelcome";

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentMessages =
    chats.find((chat) => chat.id === activeChatId)?.messages || [];

  useEffect(() => {
    if (chats.length === 0) {
      const firstChat = {
        id: crypto.randomUUID(),
        name: "",
        messages: [],
      };
      setChats([firstChat]);
      setActiveChatId(firstChat.id);
    }
  }, []);

  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      setActiveChatId(parsedChats[0]?.id || null);
    } else {
      setChats([]);
      setActiveChatId(null);
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      name: "",
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const selectChat = (id: string) => {
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  const handleSendFirstMessage = async (content: string) => {
    const newChatId = crypto.randomUUID();
    const newChat: Chat = {
      id: newChatId,
      name: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
      messages: [{ role: "user", content }],
    };
    setChats([newChat]);
    setActiveChatId(newChatId);
    setLoading(true);
    try {
      const aiResponse = await sendMessageToAPI(content);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === newChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: aiResponse },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === newChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: `Error: ${error}` },
                ],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChatId) return;
    setLoading(true);

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              name:
                chat.name ||
                content.slice(0, 30) + (content.length > 30 ? "..." : ""),
              messages: [...chat.messages, { role: "user", content }],
            }
          : chat
      )
    );

    try {
      const aiResponse = await sendMessageToAPI(content);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: aiResponse },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "assistant", content: ` Error: ${error}` },
                ],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = (id: string) => {
    setChats((prev) => {
      const updated = prev.filter((chat) => chat.id !== id);
      if (updated.length === 0) {
        setActiveChatId(null);
        localStorage.removeItem("chats");
        return [];
      }
      if (activeChatId === id) {
        setActiveChatId(updated[0].id);
      }
      return updated;
    });
  };

  const handleExportChat = (chat: Chat, format: "json" | "txt") => {
    let dataStr, fileName;
    if (format === "json") {
      dataStr = JSON.stringify(chat, null, 2);
      fileName = `${chat.name}.json`;
    } else {
      dataStr = chat.messages
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");
      fileName = `${chat.name}.txt`;
    }
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex min-h-screen bg-[#181A20] text-zinc-100">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-[#1E2027] border-r border-[#23252B] flex flex-col p-6
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="text-xl lg:text-2xl font-bold mb-8">
              Chatbot
            </div>
            <div className="flex items-center gap-2 mb-8">
              <button
                aria-label="New Conversation"
                className="cursor-pointer hover:text-zinc-400"
                onClick={createNewChat}
              >
                <RiChatNewFill />
              </button>
              <button
                aria-label="Close Sidebar"
                className="lg:hidden cursor-pointer hover:text-zinc-400"
                onClick={() => setSidebarOpen(false)}
              >
                <RiCloseLine />
              </button>
            </div>
          </div>
          <nav className="flex-1">
            <div className="mb-2 text-zinc-400">Conversations</div>
            <ul className="space-y-2">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`flex items-center justify-between hover:bg-[#23252B] rounded px-2 py-1 cursor-pointer ${
                    activeChatId === chat.id ? "bg-[#23252B]" : ""
                  }`}
                  onClick={() => selectChat(chat.id)}
                >
                  <span className="flex-1 truncate">{chat.name}</span>
                  <ChatMoreMenu
                    chat={chat}
                    onDelete={handleDeleteChat}
                    onExport={handleExportChat}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col py-4 lg:py-10 px-4 lg:px-12">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button
              aria-label="Open Sidebar"
              className="cursor-pointer hover:text-zinc-400"
              onClick={() => setSidebarOpen(true)}
            >
              <RiMenu3Line size={24} />
            </button>
            <div className="text-xl font-bold">Chatbot LLaMa</div>
            <div className="w-6"></div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden mb-4">
            {chats.length === 0 || currentMessages.length === 0 ? (
              <ChatWelcome onSend={handleSendFirstMessage} loading={loading} />
            ) : (
              <ChatContainer
                messages={
                  chats.find((chat) => chat.id === activeChatId)?.messages || []
                }
                loading={loading}
              />
            )}
          </div>
          {chats.length !== 0 && currentMessages.length !== 0 && (
            <ChatInput onSend={handleSendMessage} loading={loading} />
          )}
        </main>
      </div>
    </>
  );
}
