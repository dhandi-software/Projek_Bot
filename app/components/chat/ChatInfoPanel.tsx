import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Link as LinkIcon, User, Users, Tag } from 'lucide-react';

interface ChatInfoPanelProps {
  chatId: string;
  chatName: string;
  onClose: () => void;
}

export function ChatInfoPanel({ chatId, chatName, onClose }: ChatInfoPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    groupData: true,
    assignedTo: true,
    tags: true,
    participants: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 w-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200 h-16 sticky top-0 z-10">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mr-4 transition">
          <X size={20} />
        </button>
        <h2 className="text-base font-medium text-gray-900 truncate flex-1">Contact Info</h2>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center p-6 border-b border-gray-100 bg-white">
        <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-4xl mb-4 overflow-hidden">
           {chatName.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="text-xl font-medium text-gray-900">{chatName}</h2>
        <p className="text-sm text-gray-500 mt-1">+62 812-1234-5678</p>
      </div>

      {/* Sections */}
      <div className="flex-1 bg-white">
        
        {/* Group Data */}
        <div className="border-b border-gray-100">
          <button 
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
            onClick={() => toggleSection('groupData')}
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Group Data</span>
            {expandedSections.groupData ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          
          {expandedSections.groupData && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-start">
                <LinkIcon size={16} className="text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 break-all">*LINK*DC : https://discord.gg/invite</p>
                </div>
              </div>
              <div className="flex items-start">
                <User size={16} className="text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">+62 812-8362-7755</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 rounded bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 mr-3 mt-0.5">D</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 break-all">WAG465bdffb-b545-4163-...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Assigned To */}
        <div className="border-b border-gray-100">
          <button 
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
            onClick={() => toggleSection('assignedTo')}
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned To</span>
            {expandedSections.assignedTo ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          
          {expandedSections.assignedTo && (
            <div className="px-4 pb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assignee</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <User size={14} className="mr-2" />
                  Unassigned
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Team Inbox</span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users size={14} className="mr-2" />
                  Unassigned
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="border-b border-gray-100">
          <button 
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
            onClick={() => toggleSection('tags')}
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</span>
            {expandedSections.tags ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          
          {expandedSections.tags && (
            <div className="px-4 pb-4">
              <div className="flex items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 cursor-pointer transition">
                <Tag size={16} className="mr-2" />
                <span className="text-sm">Add Tag</span>
              </div>
            </div>
          )}
        </div>

        {/* Participants */}
        <div className="border-b border-gray-100">
          <button 
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition"
            onClick={() => toggleSection('participants')}
          >
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Participants (25)</span>
            {expandedSections.participants ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </button>
          
          {expandedSections.participants && (
            <div className="px-4 pb-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Participant {i}</p>
                    <p className="text-xs text-gray-500 truncate">Hey there! I am using WhatsApp.</p>
                  </div>
                </div>
              ))}
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition w-full text-left mt-2">
                View all 25 participants
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
