"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { getWorkspace } from "@/queries/getWorkspace";
import { ArrowRight, Bot } from "lucide-react";
import Prompt from "@/data/Prompt";
import Lookup from "@/data/Lookup";
import updateWorkspace from "@/queries/updateWorkspace";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { MessagesContext } from "@/context/MessagesContext";

const ChatView = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const { user } = useUser();
  const { messages, setMessages } = useContext(MessagesContext);
  const [input, setInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;

    const fetchWorkspace = async () => {
      try {
        const data = await getWorkspace(workspaceId);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Failed to fetch workspace:", error);
      }
    };

    fetchWorkspace();
  }, [workspaceId, setMessages]);

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role === "user" && !isFetching) {
      getAiResponse();
    }
  }, [messages]);

  const getAiResponse = async () => {
    if (isFetching) return;

    setIsFetching(true);
    const prompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    try {
      const result = await axios.post("/api/ai-chat", { prompt });
      const newMessages = [...messages, { role: "ai", content: result.data.result }];
      setMessages(newMessages);
      await updateWorkspace(workspaceId, newMessages);
    } catch (error) {
      console.error("AI response error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const onGenerate = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    await updateWorkspace(workspaceId, newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] shadow-lg">
      <div className="flex-1 rounded-xl overflow-y-scroll">
        {messages.length === 0 && <div>Loading...</div>}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 mb-2 rounded-lg flex gap-3 items-center ${
              message.role === "user" ? "bg-gray-700 text-white" : "bg-gray-700"
            }`}
          >
            {message.role === "user" ? (
              <img src={user?.imageUrl} alt="User" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 aspect-square rounded-full bg-gray-600 flex items-center justify-center">
                <Bot size={20} className="text-gray-300" />
              </div>
            )}
            <div>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 border border-gray-700 rounded-xl bg-gray-800 shadow-lg">
        <div className="flex gap-2 items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="bg-transparent outline-none w-full h-20 max-h-56 resize-none text-gray-300 placeholder-gray-500 p-2"
          />
          {input && (
            <ArrowRight
              onClick={onGenerate}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 h-10 w-10 rounded-lg cursor-pointer transition-all"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
