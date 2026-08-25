import { useEffect, useState, useRef, useCallback } from "react";
import { chatService } from "~/services/chatService";
import type { Message, ChatContact } from "~/types/chat";
import { useAuth } from "~/hooks/useAuth";

export function useChat() {
  const { user } = useAuth();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [activeContact, setActiveContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const activeContactRef = useRef<ChatContact | null>(null);

  useEffect(() => {
    activeContactRef.current = activeContact;
  }, [activeContact]);

  useEffect(() => {
    if (!user) return;

    const wsUrl = process.env.NODE_ENV === 'production' 
      ? `wss://${window.location.host}/ws` 
      : `ws://localhost:8080/ws`;
      
    const ws = new WebSocket(wsUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected to backend");
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === "receive_message") {
          const message = payload.data as Message;
          
          setMessages((prev) => {
             // Check if message already exists
             if (prev.find(m => String(m.id) === String(message.id))) return prev;
             
             const currentActive = activeContactRef.current;
             if (currentActive) {
                 const activeClean = String(currentActive.id).split('@')[0];
                 const senderClean = String(message.senderId || "").split('@')[0];
                 const roomClean = String(message.roomId || "").split('@')[0];
                 if (activeClean && (activeClean === senderClean || activeClean === roomClean)) {
                     const updated = [...prev, message];
                     updated.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                     return updated;
                 }
             }
             return prev;
          });
          
          // Update the last message in contacts list
          setContacts(prev => prev.map(c => {
             const cClean = String(c.id).split('@')[0];
             const senderClean = String(message.senderId || "").split('@')[0];
             const roomClean = String(message.roomId || "").split('@')[0];
             if (cClean && (cClean === senderClean || cClean === roomClean)) {
                 return { ...c, lastMessage: message };
             }
             return c;
          }));
        }
      } catch (err) {
        console.error("Error parsing WS message", err);
      }
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [user]);

  const fetchContacts = useCallback(async () => {
    try {
        const data = await chatService.getContacts();
        if (Array.isArray(data)) {
            setContacts(data);
        }
    } catch (error) {
        console.error("Failed to fetch contacts", error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (!activeContact) return;

    setIsLoadingHistory(true);
    chatService.getChatHistory(undefined, String(activeContact.id))
      .then(data => {
         if (Array.isArray(data)) {
             const sorted = [...data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
             setMessages(sorted);
         } else {
             setMessages([]);
         }
      })
      .catch(console.error)
      .finally(() => setIsLoadingHistory(false));
  }, [activeContact]);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeContact || isSending || !content.trim()) return;

    setIsSending(true);
    try {
        const targetId = activeContact.id;
        
        // Optimistic UI Update
        const tempId = Date.now() + Math.random();
        const optimisticMessage: Message = {
            id: tempId as any,
            content: content,
            senderId: "Admin",
            receiverId: targetId,
            createdAt: new Date().toISOString(),
            sender: { username: "Admin", role: "admin" },
            isPublic: false,
            isRead: false,
            isDeleted: false,
            isEdited: false,
            roomId: activeContact.isGroup ? targetId as string : undefined,
            attachmentUrl: null,
            attachmentType: null
        };

        setMessages(prev => [...prev, optimisticMessage]);

        // Send via API
        await chatService.sendMessage(String(targetId), content);
        
    } catch (error) {
        console.error("SendMessage Error:", error);
    } finally {
        setIsSending(false);
    }
  }, [activeContact, isSending]);

  // Dummy implementations to satisfy ChatDesktop component for now
  const markAsRead = (...args: any[]) => {};
  const deleteMessage = (...args: any[]) => {};
  const deleteMessageForMe = (...args: any[]) => {};
  const editMessage = (...args: any[]) => {};
  const createGroup = async (...args: any[]) => {};
  const deleteGroup = async (...args: any[]) => {};
  const addMembersToGroup = async (...args: any[]) => {};
  const removeMemberFromGroup = async (...args: any[]) => {};
  const fetchPublicMembers = async (...args: any[]) => {};
  const kickFromPublic = async (...args: any[]) => {};
  const unbanFromPublic = async (...args: any[]) => {};
  const resetUnreadCount = (...args: any[]) => {};
  
  return {
    contacts,
    activeContact,
    setActiveContact,
    messages,
    sendMessage,
    isLoadingHistory,
    user,
    unreadCounts: {},
    resetUnreadCount,
    markAsRead,
    deleteMessage,
    deleteMessageForMe,
    editMessage,
    createGroup,
    deleteGroup,
    addMembersToGroup,
    removeMemberFromGroup,
    publicMembers: [],
    fetchPublicMembers,
    kickFromPublic,
    unbanFromPublic,
    toastProps: null,
    setToastProps: () => {},
    isSending,
    fetchContacts
  };
}
