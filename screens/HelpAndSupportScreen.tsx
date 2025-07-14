import * as React from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import type { ChatMessage } from "../types.ts";
import {
  SendHorizontal,
  Loader,
  Bot,
  User as UserIcon,
  BookOpen,
  TrendingUp,
  Coins,
  FileText,
  MessageCircle,
  Phone,
  Video,
  MoreVertical,
  Settings,
  Search,
  Paperclip,
  Smile,
} from "lucide-react";

const AssistantScreen = () => {
  const { user, getAiChatResponse, isLoading } = useAuth();
  const [inputMessage, setInputMessage] = React.useState("");
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [user?.chatHistory, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageToSend = inputMessage.trim();
    if (!messageToSend || isLoading) return;

    setInputMessage("");
    await getAiChatResponse(messageToSend);
  };

  const handleQuickPromptClick = async (prompt: string) => {
    if (!prompt || isLoading) return;
    await getAiChatResponse(prompt);
  };

  const quickPrompts = [
    {
      icon: <TrendingUp size={24} className="text-purple-400" />,
      title: "Market Concepts",
      prompt: 'Explain what a "bull market" is.',
    },
    {
      icon: <Coins size={24} className="text-yellow-400" />,
      title: "Crypto Staking",
      prompt: 'What is "staking" in crypto?',
    },
    {
      icon: <BookOpen size={24} className="text-blue-400" />,
      title: "Trading Leverage",
      prompt: 'How does "leverage" work in trading?',
    },
    {
      icon: <FileText size={24} className="text-green-400" />,
      title: "Bitcoin Halving",
      prompt: "Tell me about Bitcoin's last halving.",
    },
  ];

  const MessageBubble = ({ message }: { message: ChatMessage }) => {
    const isUser = message.role === "user";
    const messageText = message.parts.map((p) => p.text).join("\n");
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div
        className={`flex items-end gap-2 w-full max-w-3xl ${isUser ? "justify-end ml-12" : "justify-start mr-12"}`}
      >
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
        )}
        <div
          className={`relative px-4 py-2 rounded-2xl max-w-xs md:max-w-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md shadow-lg"
              : "bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-lg border border-gray-200 dark:border-slate-600"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {messageText}
          </p>
          <div
            className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
          >
            {timestamp}
          </div>
          {isUser && (
            <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1">
              <div className="w-0 h-0 border-l-8 border-l-blue-600 border-t-8 border-t-transparent"></div>
            </div>
          )}
          {!isUser && (
            <div className="absolute bottom-0 left-0 transform -translate-x-1 translate-y-1">
              <div className="w-0 h-0 border-r-8 border-r-white dark:border-r-slate-700 border-t-8 border-t-transparent"></div>
            </div>
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-600 dark:bg-slate-500 flex-shrink-0 flex items-center justify-center">
            <UserIcon size={16} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col h-full bg-blue-50 dark:bg-slate-900"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <header className="bg-blue-600 dark:bg-blue-700 text-white p-4 flex items-center justify-between sticky top-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Fortress AI Bot</h1>
            <p className="text-xs text-blue-100">
              Online • @FortressInvestmentSupport
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-blue-500 transition-colors"
            onClick={() =>
              window.open("https://t.me/FortressInvestmentSupport", "_blank")
            }
            title="Contact on Telegram"
          >
            <MessageCircle size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-500 transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-500 transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-500 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      <main
        className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23e0e7ff" fill-opacity="0.1"%3E%3Cpath d="M0 0h20v20H0z"/%3E%3C/g%3E%3C/svg%3E")',
        }}
      >
        {(user?.chatHistory || []).length === 0 && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center mb-6 shadow-lg">
              <Bot size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              Welcome to Fortress AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Your personal investment assistant
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-6">
              💬 Need direct support? Contact us on{" "}
              <a
                href="https://t.me/FortressInvestmentSupport"
                target="_blank"
                className="underline hover:text-blue-700"
              >
                @FortressInvestmentSupport
              </a>
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6 max-w-2xl w-full">
              {quickPrompts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPromptClick(item.prompt)}
                  className="bg-white dark:bg-slate-700 p-3 rounded-2xl text-left hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors flex items-start gap-3 shadow-sm border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.prompt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {(user?.chatHistory || []).map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 w-full max-w-3xl justify-start mr-12">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="relative px-4 py-3 rounded-2xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-lg border border-gray-200 dark:border-slate-600 flex items-center">
                  <Loader
                    size={14}
                    className="animate-spin mr-2 text-blue-600"
                  />
                  <span className="text-sm">Fortress AI is typing...</span>
                  <div className="absolute bottom-0 left-0 transform -translate-x-1 translate-y-1">
                    <div className="w-0 h-0 border-r-8 border-r-white dark:border-r-slate-700 border-t-8 border-t-transparent"></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-600 sticky bottom-0">
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          🔐 For account issues or urgent support, message{" "}
          <a
            href="https://t.me/FortressInvestmentSupport"
            target="_blank"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            @FortressInvestmentSupport
          </a>{" "}
          on Telegram
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex items-end gap-3 max-w-4xl mx-auto"
        >
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors mb-1"
          >
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message Fortress AI Bot..."
              className="w-full bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white rounded-full p-3 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-lg"
          >
            <SendHorizontal size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default AssistantScreen;
