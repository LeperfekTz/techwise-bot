
import React from "react";
import { cn } from "@/lib/utils";

type MessageType = "user" | "ai";

interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return (
    <div className={cn(
      "flex w-full mb-4",
      type === "user" ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
        type === "user" 
          ? "bg-blue-500 text-white rounded-br-none" 
          : "bg-gray-100 text-gray-800 rounded-bl-none"
      )}>
        <div className="flex flex-col">
          <div className="break-words">{content}</div>
          <div className={cn(
            "text-xs mt-1 text-right",
            type === "user" ? "text-blue-100" : "text-gray-500"
          )}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
