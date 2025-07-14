
import * as React from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import type { ChatMessage } from '../types.ts';
import { SendHorizontal, Loader, Sparkles, User as UserIcon, BookOpen, TrendingUp, Coins, FileText } from 'lucide-react';

const AssistantScreen = () => {
    const { user, getAiChatResponse, isLoading } = useAuth();
    const [inputMessage, setInputMessage] = React.useState('');
    const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(() => {
        scrollToBottom();
    }, [user?.chatHistory, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const messageToSend = inputMessage.trim();
        if (!messageToSend || isLoading) return;

        setInputMessage('');
        await getAiChatResponse(messageToSend);
    };

    const handleQuickPromptClick = async (prompt: string) => {
        if (!prompt || isLoading) return;
        await getAiChatResponse(prompt);
    };

    const quickPrompts = [
      {
        icon: <TrendingUp size={24} className="text-purple-400" />,
        title: 'Market Concepts',
        prompt: 'Explain what a "bull market" is.',
      },
      {
        icon: <Coins size={24} className="text-yellow-400" />,
        title: 'Crypto Staking',
        prompt: 'What is "staking" in crypto?',
      },
      {
        icon: <BookOpen size={24} className="text-blue-400" />,
        title: 'Trading Leverage',
        prompt: 'How does "leverage" work in trading?',
      },
      {
        icon: <FileText size={24} className="text-green-400" />,
        title: 'Bitcoin Halving',
        prompt: "Tell me about Bitcoin's last halving.",
      },
    ];

    const MessageBubble = ({ message }: { message: ChatMessage }) => {
        const isUser = message.role === 'user';
        const messageText = message.parts.map(p => p.text).join('\n');
        
        return (
            <div className={`flex items-start gap-3 w-full max-w-2xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex-shrink-0 flex items-center justify-center">
                        <Sparkles size={24} className="text-white"/>
                    </div>
                )}
                <div className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-purple-600 text-white rounded-br-lg' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg'}`}>
                    <p className="whitespace-pre-wrap">{messageText}</p>
                </div>
                 {isUser && (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-600 flex-shrink-0 flex items-center justify-center">
                       <UserIcon size={24} className="text-slate-800 dark:text-slate-200"/>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900" style={{minHeight: 'calc(100vh - 5rem)'}}>
            <header className="p-4 border-b border-gray-200 dark:border-slate-700 text-center sticky top-0 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-lg">
                <h1 className="text-2xl font-bold">Fortress AI Assistant</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your personal investment expert</p>
            </header>
            
            <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col">
                {(user?.chatHistory || []).length === 0 && !isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex-shrink-0 flex items-center justify-center mb-4">
                          <Sparkles size={36} className="text-white"/>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl w-full">
                          {quickPrompts.map((item, index) => (
                              <button
                                  key={index}
                                  onClick={() => handleQuickPromptClick(item.prompt)}
                                  className="bg-white dark:bg-slate-800 p-4 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-start gap-3"
                              >
                                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                  <div>
                                      <p className="font-semibold text-slate-800 dark:text-white">{item.title}</p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.prompt}</p>
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
                             <div className="flex items-start gap-3 w-full max-w-2xl mx-auto justify-start">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex-shrink-0 flex items-center justify-center">
                                    <Sparkles size={24} className="text-white"/>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-lg flex items-center">
                                   <Loader size={16} className="animate-spin mr-2" />
                                   Assistant is typing...
                                </div>
                            </div>
                        )}
                    </>
                )}
                 <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 sticky bottom-0">
                <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-3">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about market trends, specific coins..."
                        className="flex-1 w-full bg-gray-100 dark:bg-slate-800 border-transparent rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !inputMessage.trim()} className="bg-purple-600 text-white rounded-lg p-3 disabled:bg-purple-400 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors">
                        <SendHorizontal size={24} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default AssistantScreen;