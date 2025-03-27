
import React from "react";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
        TechWise - Assistente de Suporte Técnico
      </h1>
      <ChatInterface />
      <footer className="mt-8 text-sm text-center text-gray-500">
        © 2023 TechWise - Assistente de problemas com software e hardware
      </footer>
    </div>
  );
};

export default Index;
