import { User, Clock, Monitor } from "lucide-react";
import Avatar, { AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import type { ChatContact } from "~/types/chat";
import { profileApi } from "~/api/profileApi";

interface ChatRightSidebarProps {
    activeContact: ChatContact | null;
}

export function ChatRightSidebar({ activeContact }: ChatRightSidebarProps) {
    if (!activeContact) return null;

    const getAvatarDetails = (contact: ChatContact) => {
        let initials = (contact.username || "U")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

        return { 
            initials, 
            image: contact.photo ? profileApi.getProfilePhotoUrl(contact.photo) : "" 
        };
    };

    const { initials, image } = getAvatarDetails(activeContact);

    return (
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shrink-0 z-20 shadow-sm hidden lg:flex">
            {/* Header / Avatar Profile */}
            <div className="flex flex-col items-center pt-8 pb-6 border-b border-slate-100">
                <Avatar className="h-24 w-24 mb-4 shadow-sm ring-4 ring-slate-50" src={image || ""}>
                    <AvatarImage src={image} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-medium text-2xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-slate-800 text-center px-4">
                    {activeContact.username}
                </h3>
                <div className="flex items-center mt-1 text-slate-500 text-sm">
                    <span className="mr-1">🇮🇩</span>
                    <span>{activeContact.isGroup ? "Group" : "+62 812 9314 0270"}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* CONTACT INFORMATION */}
                <div className="px-5 py-5 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between items-center cursor-pointer hover:text-slate-600 transition-colors">
                        CONTACT INFORMATION
                        <span className="text-slate-400">^</span>
                    </h4>
                    
                    <div className="space-y-4 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{activeContact.username}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>6:21:18 PM</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Monitor className="w-4 h-4 text-slate-400" />
                            <span>Web</span>
                        </div>
                    </div>
                    
                    <div className="mt-5">
                        <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 font-medium rounded-lg">
                            Add As Contact
                        </Button>
                    </div>
                </div>

                {/* ASSIGNED TO */}
                <div className="px-5 py-5 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between items-center cursor-pointer hover:text-slate-600 transition-colors">
                        ASSIGNED TO
                        <span className="text-slate-400">^</span>
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Assignee</span>
                            <div className="flex items-center text-slate-400 gap-2">
                                <User className="w-4 h-4" />
                                <span>Unassigned</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Team Inbox</span>
                            <div className="flex items-center text-slate-400 gap-2">
                                <User className="w-4 h-4" />
                                <span>Unassigned</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TAGS */}
                <div className="px-5 py-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between items-center cursor-pointer hover:text-slate-600 transition-colors">
                        TAGS
                        <span className="text-slate-400">v</span>
                    </h4>
                </div>
            </div>
        </div>
    );
}
