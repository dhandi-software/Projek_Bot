import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { ChatDesktop } from "~/features/chat/ChatDesktop";
import { ChatMobile } from "~/features/chat/ChatMobile";

export function meta() {
  return [
    { title: "Chat - Projek Bot" },
    { name: "description", content: "WhatsApp Chat Interface" },
  ];
}

export default function ChatRoute() {
  const context = useOutletContext<ContextType | undefined>();
  const [isMobileWindow, setIsMobileWindow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWindow(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = context?.isMobile ?? isMobileWindow;

  return (
    <div className="w-full h-[calc(100vh-2rem)] p-2 bg-gray-50 flex flex-col">
      {/* The Chat UI */}
      <div className="flex-1 min-h-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isMobile ? <ChatMobile /> : <ChatDesktop />}
      </div>
    </div>
  );
}
