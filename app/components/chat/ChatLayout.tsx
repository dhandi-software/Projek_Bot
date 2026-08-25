import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatArea } from './ChatArea';
import { ChatInfoPanel } from './ChatInfoPanel';

export function ChatLayout() {
  const [activeChatId, setActiveChatId] = useState<string | undefined>('2'); // Default to Fathan as in screenshot
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  // In a real app, this would be derived from the selected chat data
  const chatName = activeChatId === '1' ? 'Aga Sepuh' :
                   activeChatId === '2' ? 'Fathan' :
                   activeChatId === '3' ? 'Valentino' :
                   activeChatId === '4' ? 'Group Project' : 'Chat';

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-gray-100 shadow-xl border border-gray-200">
      {/* Sidebar (Chat List) */}
      <div className="w-[30%] min-w-[300px] max-w-[400px] h-full flex-shrink-0">
        <ChatSidebar 
          onSelectChat={setActiveChatId} 
          activeChatId={activeChatId} 
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full min-w-0 flex flex-col">
        {activeChatId ? (
          <div className="flex flex-1 h-full min-h-0">
            {/* The actual chat messages area */}
            <div className="flex-1 h-full relative">
              <ChatArea 
                chatId={activeChatId} 
                chatName={chatName} 
              />
            </div>
            
            {/* Optional Info Panel */}
            {showInfoPanel && (
              <div className="w-[300px] xl:w-[350px] h-full flex-shrink-0 border-l border-gray-200 bg-white">
                <ChatInfoPanel 
                  chatId={activeChatId} 
                  chatName={chatName}
                  onClose={() => setShowInfoPanel(false)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 flex-col">
            <div className="w-64 h-64 bg-gray-200 rounded-full mb-6 opacity-50"></div>
            <h1 className="text-2xl font-light text-gray-500">WhatsApp for Web</h1>
            <p className="text-gray-400 mt-2">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
