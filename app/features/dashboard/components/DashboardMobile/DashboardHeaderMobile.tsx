import React from "react";
import { RefreshCw, Bot, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "~/components/ui/button";

interface DashboardHeaderMobileProps {
    isLoading?: boolean;
    onRefresh?: () => void;
}

export function DashboardHeaderMobile({ isLoading, onRefresh }: DashboardHeaderMobileProps) {
    return (
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] p-5 text-[#152e00] shadow-xs border border-[#a0e653]/60 space-y-4">
            <div className="absolute top-1 left-2 opacity-35 pointer-events-none animate-m3-blob-1">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                    <polygon points="36,4 64,20 64,52 36,68 8,52 8,20" stroke="#152e00" strokeWidth="2.5" fill="#152e00" opacity="0.12" />
                </svg>
            </div>
            <div className="absolute -top-4 -right-4 w-48 h-24 rounded-full bg-[#9fe94b]/60 border border-[#152e00]/15 pointer-events-none animate-m3-blob-2" />
            <div className="absolute top-2 right-12 w-14 h-14 rounded-full border-3 border-[#152e00]/30 pointer-events-none animate-m3-horizontal" />
            <div className="absolute top-1 right-0 w-28 h-28 border-t-3 border-l-3 border-[#152e00]/50 rounded-tl-full pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152e00]/10 text-[#152e00] font-bold text-[10px] tracking-wide uppercase">
                    <div className="w-4 h-4 rounded-full bg-[#152e00] text-[#bcf677] flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5" />
                    </div>
                    <span>WHATSAPP BOT</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#152e00]/10 text-[#152e00] rounded-full text-[10px] font-bold border border-[#152e00]/20">
                    <span className="w-2 h-2 rounded-full bg-[#152e00] animate-pulse"></span>
                    <span>Online</span>
                </div>
            </div>

            <div className="relative z-10 w-full">
                <h1 className="text-xl font-black text-[#152e00] tracking-tight leading-snug">
                    Selamat datang, Admin
                </h1>
                <p className="text-[#152e00]/80 text-xs mt-0.5 font-medium">
                    1 September 2026 - 30 September 2026
                </p>
            </div>

            <div className="relative z-10 pt-2 border-t border-[#152e00]/15 flex items-center justify-between gap-2">
                <Button
                    onClick={onRefresh}
                    className="flex-1 bg-[#152e00] hover:bg-[#152e00]/90 text-white rounded-full text-xs font-bold gap-2 py-2 shadow-xs cursor-pointer"
                >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#bcf677] ${isLoading ? "animate-spin" : ""}`} />
                    <span>Refresh</span>
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="bg-[#152e00]/10 hover:bg-[#152e00]/15 text-[#152e00] border-[#152e00]/20 rounded-full text-xs font-bold gap-1.5 py-2 cursor-pointer"
                >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Excel</span>
                </Button>
            </div>
        </div>
    );
}
