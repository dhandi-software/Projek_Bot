import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Mic, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'me' | 'other';
  senderName?: string;
  text: string;
  time: string;
  type?: 'text' | 'image' | 'file';
  replyTo?: {
    senderName: string;
    text: string;
  };
}

interface ChatAreaProps {
  chatId: string;
  chatName: string;
}

const DUMMY_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', sender: 'other', text: 'Sip', time: '17:58' },
  ],
  '2': [
    { 
      id: 'm1', sender: 'other', senderName: 'Fathan', text: 'nahh gak tau dahh', time: '17:53',
      replyTo: { senderName: 'Me', text: 'Nice info, makasih than ✌️ Ini always open kah atau ada batasnya than? @48148667278466' }
    },
    { id: 'm2', sender: 'other', senderName: 'Fathan', text: 'apply aja dulu', time: '17:53' },
    { id: 'm3', sender: 'other', senderName: 'Fathan', text: 'masalah dipanggil atau enggak urusan nnt', time: '17:53' }
  ],
  '3': [
    { id: 'm1', sender: 'other', text: 'Sip', time: '17:58' }
  ],
  '4': [
    { id: 'm1', sender: 'other', senderName: 'Aga', text: 'Besok meeting jam 10', time: 'Yesterday' }
  ]
};

export function ChatArea({ chatId, chatName }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages when chatId changes
    setMessages(DUMMY_MESSAGES[chatId] || []);
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 h-16">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
             {chatName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-900">{chatName}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="hover:text-gray-700 transition"><Search size={20} /></button>
          <button className="hover:text-gray-700 transition"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
          >
            {msg.senderName && msg.sender !== 'me' && (
              <span className="text-xs text-gray-500 ml-1 mb-1">{msg.senderName}</span>
            )}
            <div 
              className={`relative max-w-[70%] rounded-lg p-2 pb-6 shadow-sm ${
                msg.sender === 'me' ? 'bg-[#D9FDD3] rounded-tr-none' : 'bg-white rounded-tl-none'
              }`}
            >
              {msg.replyTo && (
                <div className="bg-black/5 border-l-4 border-green-500 rounded p-2 mb-2 text-sm">
                  <p className="font-semibold text-green-600 text-xs">{msg.replyTo.senderName}</p>
                  <p className="text-gray-700 truncate">{msg.replyTo.text}</p>
                </div>
              )}
              <p className="text-sm text-gray-800 break-words">{msg.text}</p>
              <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-50 p-3 flex items-center space-x-3">
        <button className="text-gray-500 hover:text-gray-700 transition">
          <Smile size={24} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition">
          <Paperclip size={24} />
        </button>
        <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-2 border border-gray-200 shadow-sm">
          <input 
            type="text" 
            placeholder="Type a message" 
            className="w-full bg-transparent border-none outline-none text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {newMessage.trim() ? (
          <button 
            onClick={handleSendMessage}
            className="text-gray-500 hover:text-green-600 transition"
          >
            <Send size={24} />
          </button>
        ) : (
          <button className="text-gray-500 hover:text-gray-700 transition">
            <Mic size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
