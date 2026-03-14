import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function AiAssistant() {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    {role: 'assistant', text: 'Hello! I am your Izwi Business Mentor. How can I help you brainstorm, analyze, or improve your business communication today?'}
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are an expert Business Mentor, Teacher, Analyst, and Brainstormer with a Master's in Business Communication. Provide professional, corporate, and user-friendly advice to entrepreneurs.",
        },
      });
      
      const response = await chat.sendMessage({ message: input });
      setMessages(prev => [...prev, { role: 'assistant', text: response.text || 'Sorry, I could not generate a response.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'An error occurred. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="p-2 rounded-full bg-stone-100 dark:bg-stone-700">
                {msg.role === 'assistant' ? <Bot className="h-5 w-5 text-emerald-700 dark:text-emerald-300" /> : <User className="h-5 w-5 text-stone-700 dark:text-stone-300" />}
              </div>
              <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 dark:bg-emerald-700 text-white' : 'bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-100'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-stone-500 dark:text-stone-400 text-sm">Mentor is thinking...</div>}
      </div>
      <div className="p-4 border-t border-stone-100 dark:border-stone-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask your mentor..."
          className="flex-1 p-2 border border-stone-200 dark:border-stone-600 dark:bg-stone-900 rounded-lg dark:text-stone-100"
        />
        <button onClick={sendMessage} className="bg-emerald-600 dark:bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-800">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
