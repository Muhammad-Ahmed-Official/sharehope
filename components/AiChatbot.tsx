import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Sparkles, Send, X, Bot, User } from "lucide-react";
import { dummyNGOs } from "@/app/dummydata";

interface Message {
  role: "user" | "assistant";
  content: string;
  ngos?: typeof dummyNGOs;
}

const aiResponses: Record<string, { text: string; showNGOs?: boolean }> = {
  education: {
    text: "Great choice! Education is the foundation of progress. Based on your interest, I've found these top-rated education NGOs that match your values. They all have verified 80G certificates.",
    showNGOs: true,
  },
  healthcare: {
    text: "Healthcare is crucial for community well-being! Here are some verified healthcare NGOs doing exceptional work. Our AI has verified their medical credentials and impact reports.",
    showNGOs: true,
  },
  environment: {
    text: "Wonderful! Environmental causes need more supporters like you. I've matched you with NGOs actively working on reforestation, clean energy, and sustainability.",
    showNGOs: true,
  },
  donate: {
    text: "I can help you donate! Based on your profile, I recommend starting with a monthly contribution to maximize impact. Would you like me to suggest an amount based on your preferences?",
  },
  help: {
    text: "I'm here to help! I can:\n• Find NGOs matching your interests\n• Explain how donations work\n• Show your impact potential\n• Guide you through the donation process\n\nWhat would you like to know?",
  },
  default: {
    text: "I understand! Let me help you find the perfect cause. Could you tell me more about what matters to you? For example: education, healthcare, environment, or child welfare?",
  },
};

export default function AChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI giving assistant. I analyze thousands of NGOs to find the perfect match for you. What causes are you passionate about?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userMessage: string): { text: string; ngos?: typeof dummyNGOs } => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes("education") || lowerMsg.includes("school") || lowerMsg.includes("learn")) {
      return { ...aiResponses.education, ngos: dummyNGOs.filter((n:any) => n.category === "Education") };
    }
    if (lowerMsg.includes("health") || lowerMsg.includes("medical") || lowerMsg.includes("hospital")) {
      return { ...aiResponses.healthcare, ngos: dummyNGOs.filter((n:any) => n.category === "Healthcare") };
    }
    if (lowerMsg.includes("environment") || lowerMsg.includes("tree") || lowerMsg.includes("green") || lowerMsg.includes("climate")) {
      return { ...aiResponses.environment, ngos: dummyNGOs.filter((n:any) => n.category === "Environment") };
    }
    if (lowerMsg.includes("donate") || lowerMsg.includes("give") || lowerMsg.includes("contribute")) {
      return aiResponses.donate;
    }
    if (lowerMsg.includes("help") || lowerMsg.includes("what can you")) {
      return aiResponses.help;
    }
    return aiResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(input);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.text,
        ngos: response.ngos,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 cursor-pointer w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-glow-primary flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <Sparkles className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-128 bg-card border border-border rounded-2xl shadow-soft flex flex-col z-50 animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground">AI Assistant</h4>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === "user"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>

                {/* NGO Cards */}
                {msg.ngos && msg.ngos.length > 0 && (
                  <div className="mt-3 space-y-2 ml-10">
                    {msg.ngos.slice(0, 2).map((ngo:any) => (
                      <div
                        key={ngo.id}
                        className="bg-card border border-border rounded-xl p-3 shadow-soft"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={ngo.image}
                            alt={ngo.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm text-foreground truncate">
                              {ngo.name}
                            </h5>
                            <p className="text-xs text-muted-foreground">{ngo.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-medium text-primary">
                                {ngo.aiMatchScore}% Match
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ★ {ngo.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about causes, NGOs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button className="cursor-pointer" onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};