
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import CategorySelector from "./CategorySelector";
import TypingIndicator from "./TypingIndicator";

type MessageType = "user" | "ai";
type Category = "hardware" | "software";

interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    content: "Olá! Sou o TechWise, seu assistente de suporte técnico. Em que posso ajudar você hoje? Por favor, selecione a categoria do seu problema para começarmos.",
    type: "ai",
    timestamp: new Date()
  }
];

const HARDWARE_RESPONSE = "Entendi que você está enfrentando um problema de hardware. Pode me descrever os sintomas que está observando? Por exemplo: o equipamento não liga, está fazendo barulhos estranhos, está superaquecendo, etc.";

const SOFTWARE_RESPONSE = "Entendi que você está enfrentando um problema de software. Pode me descrever o que está acontecendo? Por exemplo: qual programa está com erro, qual mensagem de erro aparece, quando o problema começou, etc.";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      type: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateResponse(content);
      
      const newAiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        type: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const response = category === "hardware" ? HARDWARE_RESPONSE : SOFTWARE_RESPONSE;
      
      const newMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        type: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("obrigado") || lowerMessage.includes("obrigada")) {
      return "Estou aqui para ajudar! Se tiver mais alguma dúvida, é só perguntar.";
    }
    
    if (selectedCategory === "hardware") {
      if (lowerMessage.includes("não liga")) {
        return "Se o dispositivo não está ligando, verifique: 1) Se está conectado à tomada, 2) Se o cabo de força não está danificado, 3) Se o botão de liga/desliga está funcionando. Você já tentou estas verificações básicas?";
      }
      
      if (lowerMessage.includes("superaquec") || lowerMessage.includes("quente")) {
        return "Superaquecimento pode ser causado por acúmulo de poeira nos ventiladores, problemas na pasta térmica ou ventilação insuficiente. Quando foi a última vez que o equipamento foi limpo internamente?";
      }
      
      return "Para resolver este problema de hardware, precisarei de mais detalhes. Pode descrever exatamente o que acontece quando tenta utilizar o equipamento? Algum ruído, luz de erro ou comportamento específico?";
    } else {
      if (lowerMessage.includes("tela azul") || lowerMessage.includes("bsod")) {
        return "Telas azuis geralmente indicam problemas com drivers ou hardware. Você notou quando começou a acontecer? Instalou algum software ou hardware recentemente?";
      }
      
      if (lowerMessage.includes("lento") || lowerMessage.includes("devagar")) {
        return "Computadores lentos podem ser causados por vários fatores como: pouco espaço em disco, memória RAM insuficiente, malware ou muitos programas iniciando com o sistema. Quando foi a última vez que você reiniciou completamente o sistema?";
      }
      
      return "Para resolver este problema de software, vamos precisar de mais informações. Qual sistema operacional você está usando? O problema acontece sempre ou apenas em situações específicas?";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg border-0">
      <CardHeader className="border-b bg-blue-500 text-white rounded-t-lg">
        <CardTitle className="text-center">TechWise - Assistente Técnico</CardTitle>
        <CardDescription className="text-center text-blue-100">
          Resolva seus problemas de hardware e software
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        {!selectedCategory && (
          <div className="my-4">
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}
        
        <div className="h-[50vh] overflow-y-auto p-2 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 bg-gray-50">
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
