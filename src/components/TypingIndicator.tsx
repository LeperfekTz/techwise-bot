
import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 p-2">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "600ms" }}></div>
    </div>
  );
};

export default TypingIndicator;
