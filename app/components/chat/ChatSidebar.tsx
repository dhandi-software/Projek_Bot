import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Phone, Users, MoreVertical } from 'lucide-react';

interface ChatSidebarProps {
  onSelectChat: (chatId: string) => void;
  activeChatId?: string;
}

const DUMMY_CHATS = [
  { id: '1', name: 'Aga Sepuh', lastMessage: 'Sip', time: '17:58', unread: 1, type: 'personal' },
  { id: '2', name: 'Fathan', lastMessage: 'masalah dipanggil atau enggak urusan nnt', time: '17:53', unread: 0, type: 'personal' },
  { id: '3', name: 'Valentino', lastMessage: 'Sip', time: '17:58', unread: 0, type: 'personal' },
  { id: '4', name: 'Group Project', lastMessage: 'Besok meeting jam 10', time: 'Yesterday', unread: 5, type: 'group' },
];

export function ChatSidebar({ onSelectChat, activeChatId }: ChatSidebarProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'groups'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = DUMMY_CHATS.filter(chat => {
    if (filter === 'unread' && chat.unread === 0) return false;
    if (filter === 'groups' && chat.type !== 'group') return false;
    if (searchQuery && !chat.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 h-16">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            ME
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="hover:text-gray-700 transition"><Users size={20} /></button>
          <button className="hover:text-gray-700 transition"><MessageSquare size={20} /></button>
          <button className="hover:text-gray-700 transition"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Search */}
      <div className="p-2 bg-white border-b border-gray-200 flex items-center space-x-2">
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="text-gray-500 hover:text-gray-700 p-1.5"><Filter size={20} /></button>
      </div>

      {/* Filters */}
      <div className="flex p-2 space-x-2 overflow-x-auto bg-white border-b border-gray-200">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition whitespace-nowrap ${filter === 'all' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('unread')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition whitespace-nowrap ${filter === 'unread' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Unread
        </button>
        <button 
          onClick={() => setFilter('groups')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition whitespace-nowrap ${filter === 'groups' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center p-3 cursor-pointer transition hover:bg-gray-50 border-b border-gray-100 ${activeChatId === chat.id ? 'bg-gray-100' : ''}`}
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold mr-3 overflow-hidden">
               {chat.name.substring(0, 2).toUpperCase()}
            </div>
            
            {/* Chat details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-medium text-gray-900 truncate">{chat.name}</h3>
                <span className={`text-xs ${chat.unread > 0 ? 'text-green-500 font-medium' : 'text-gray-500'}`}>{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
