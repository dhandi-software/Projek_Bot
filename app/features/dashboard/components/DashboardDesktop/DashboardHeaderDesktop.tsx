import React from "react";
import { RefreshCw, Bot, FileSpreadsheet, FileText, Star } from "lucide-react";
import { Button } from "~/components/ui/button";

interface DashboardHeaderDesktopProps {
    isLoading?: boolean;
    onRefresh?: () => void;
}

export function DashboardHeaderDesktop({ isLoading, onRefresh }: DashboardHeaderDesktopProps) {
    return (
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] p-8 text-[#152e00] shadow-xs border border-[#a0e653]/60">
            {/* Material 3 Multi-Geometry Shapes */}
            <div className="absolute -top-10 -left-12 w-80 h-44 rounded-full bg-[#9fe94b]/55 border border-[#152e00]/15 pointer-events-none animate-m3-blob-1" />
            <div className="absolute top-4 left-44 opacity-40 pointer-events-none animate-m3-horizontal">
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                    <polygon points="55,6 98,31 98,79 55,104 12,79 12,31" fill="#152e00" opacity="0.14" stroke="#152e00" strokeWidth="3" />
                </svg>
            </div>
            <div className="absolute -bottom-10 left-12 w-48 h-48 border-t-4 border-r-4 border-[#152e00]/40 rounded-tr-full pointer-events-none" />
            <div className="absolute bottom-6 left-72 w-12 h-12 rounded-2xl bg-[#152e00]/15 rotate-45 border border-[#152e00]/20 pointer-events-none animate-pulse" />

            <div className="absolute top-2 left-1/3 w-72 h-36 rounded-full bg-[#d2fa94]/65 border border-[#152e00]/15 pointer-events-none animate-m3-blob-2" />
            <div className="absolute top-6 left-[38%] opacity-40 pointer-events-none animate-m3-blob-1">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                    <polygon points="48,6 84,27 84,69 48,90 12,69 12,27" stroke="#152e00" strokeWidth="3" fill="none" />
                    <circle cx="48" cy="48" r="14" fill="#152e00" opacity="0.22" />
                </svg>
            </div>
            <div className="absolute bottom-4 left-[48%] opacity-35 pointer-events-none">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="8" cy="8" r="4" fill="#152e00" />
                    <circle cx="32" cy="8" r="4" fill="#152e00" />
                    <circle cx="56" cy="8" r="4" fill="#152e00" />
                    <circle cx="8" cy="32" r="4" fill="#152e00" />
                    <circle cx="32" cy="32" r="4" fill="#152e00" />
                    <circle cx="56" cy="32" r="4" fill="#152e00" />
                    <circle cx="8" cy="56" r="4" fill="#152e00" />
                    <circle cx="32" cy="56" r="4" fill="#152e00" />
                    <circle cx="56" cy="56" r="4" fill="#152e00" />
                </svg>
            </div>
            <div className="absolute bottom-5 left-[54%] text-[#152e00]/35 pointer-events-none animate-bounce">
                <Star className="w-10 h-10 fill-[#152e00]/25" />
            </div>

            <div className="absolute top-2 right-64 opacity-40 pointer-events-none animate-m3-blob-2">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none">
                    <polygon points="64,8 114,37 114,91 64,120 14,91 14,37" fill="#152e00" opacity="0.14" stroke="#152e00" strokeWidth="3" />
                </svg>
            </div>
            <div className="absolute top-4 right-20 w-96 h-44 rounded-full bg-[#9fe94b]/65 border border-[#152e00]/15 pointer-events-none animate-m3-blob-1" />
            <div className="absolute top-3 right-10 w-28 h-28 rounded-full border-4 border-[#152e00]/30 pointer-events-none animate-m3-horizontal" />
            <div className="absolute top-6 right-4 w-56 h-56 border-t-4 border-l-4 border-[#152e00]/55 rounded-tl-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 w-full">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152e00]/10 text-[#152e00] font-bold text-xs tracking-wider uppercase backdrop-blur-xs">
                        <div className="w-5 h-5 rounded-full bg-[#152e00] text-[#bcf677] flex items-center justify-center">
                            <Bot className="w-3 h-3" />
                        </div>
                        <span>WHATSAPP BOT CONTROL PANEL</span>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#152e00] leading-tight">
                            Selamat datang, Admin
                        </h1>
                        <p className="text-[#152e00]/80 text-sm font-medium leading-relaxed">
                            Mulai hari dengan catatan transaksi dan pencapaian target toko yang rapi. · 1 September 2026 - 30 September 2026
                        </p>
                    </div>
                </div>

                {/* Action Buttons using UI Button component */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <Button
                        onClick={onRefresh}
                        className="group bg-[#152e00] hover:bg-[#152e00]/90 text-white font-bold rounded-full px-5 py-2.5 text-xs gap-2 shadow-xs cursor-pointer"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#bcf677] transition-transform group-hover:rotate-180 ${isLoading ? "animate-spin" : ""}`} />
                        <span>Refresh Data</span>
                    </Button>
                    
                    <Button
                        type="button"
                        variant="outline"
                        className="bg-[#152e00]/10 hover:bg-[#152e00]/15 text-[#152e00] border-[#152e00]/20 font-bold rounded-full px-4 py-2.5 text-xs gap-2 backdrop-blur-xs cursor-pointer"
                    >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-[#152e00]" />
                        <span>Excel</span>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="bg-[#152e00]/10 hover:bg-[#152e00]/15 text-[#152e00] border-[#152e00]/20 font-bold rounded-full px-4 py-2.5 text-xs gap-2 backdrop-blur-xs cursor-pointer"
                    >
                        <FileText className="w-3.5 h-3.5 text-[#152e00]" />
                        <span>PDF</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
