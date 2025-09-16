import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bot,
  Send,
  User,
  ArrowLeft,
  MoreVertical,
  Trash2,
  Copy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import apiClient from "./apiClient";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      try {
        const botResponse = await generateBotResponse(inputValue);

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse?.data?.data || "Something went wrong",
          isBot: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Bot response failed:", error);

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: " Bot failed to respond. Try again later.",
          isBot: true,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1500);
  };

  const generateBotResponse = async (userInput: string) => {
    try {
      const response = await apiClient.post("/chatbot/talk", {
        prompt: userInput,
      });

      if (response?.data?.success) {
        return response;
      } else {
        throw new Error("Bot response was not successful");
      }
    } catch (error) {
      throw error;
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "Conversation history has been cleared",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="hover-lift">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={clearChat}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          <div className="container max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                } animate-fade-in`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.isBot ? "flex-row" : "flex-row-reverse"
                  } items-end space-x-2`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.isBot ? "bg-primary/10" : "bg-secondary/10"
                      }
                    >
                      {message.isBot ? (
                        <Bot className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-secondary" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <Card
                    className={`p-4 shadow-elegant border-0 group relative ${
                      message.isBot
                        ? "bg-card/80 backdrop-blur"
                        : "gradient-hero text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.isBot
                          ? "text-muted-foreground"
                          : "text-white/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={() => copyMessage(message.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </Card>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-end space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="p-4 bg-card/80 backdrop-blur border-0">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background/95 backdrop-blur p-4">
        <div className="container max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 focus-ring"
              disabled={isTyping}
            />
            <Button
              type="submit"
              variant="hero"
              size="icon"
              disabled={isTyping || !inputValue.trim()}
              className="hover-glow"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
