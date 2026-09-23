import React, { useState } from "react";
import { useLocation } from "react-router";
import {
    Search,
    Bell,
    Settings,
    ChevronDown,
    Menu,
    X,
    LogOut,
    Package,
    Image as ImageIcon,
    Link as LinkIcon,
    MessageSquare,
    LayoutDashboard,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "~/hooks/useAuth";

interface DashboardTopbarProps {
    user?: any;
    isSidebarCollapsed?: boolean;
    onToggleSidebar?: () => void;
}

export function DashboardTopbar({ user, isSidebarCollapsed, onToggleSidebar }: DashboardTopbarProps) {
    const location = useLocation();
    const { logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Determine current page title based on pathname
    const getPageTitle = (pathname: string) => {
        if (pathname === "/admin" || pathname === "/admin/" || pathname === "/admin/dashboard" || pathname === "/dashboard" || pathname === "/dashboard/") return "Dashboard";
        if (pathname.includes("/produk")) return "Manajemen Produk & Stok";
        if (pathname.includes("/banner")) return "Banner Promo";
        if (pathname.includes("/koneksi")) return "Koneksi WhatsApp";
        if (pathname.includes("/chat")) return "Pesan Chat";
        return "Dashboard";
    };

    const title = getPageTitle(location.pathname);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200/80 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
            {/* Left: Sidebar Toggle & Dynamic Page Title */}
            <div className="flex items-center gap-3">
                {/* Desktop Sidebar Toggle Button */}
                {onToggleSidebar && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="hidden md:flex p-2 rounded-xl border border-zinc-200/80 bg-white hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
                        title={isSidebarCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
                    >
                        {isSidebarCollapsed ? (
                            <PanelLeftOpen className="w-4 h-4 text-emerald-600" />
                        ) : (
                            <PanelLeftClose className="w-4 h-4 text-zinc-500" />
                        )}
                    </button>
                )}

                {/* Mobile Menu Toggle Button */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <h1 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                    {title}
                </h1>
            </div>

            {/* Right: Search, Notifications, Settings, Profile */}
            <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Search Input */}
                <div className="relative hidden sm:block">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Cari produk, pesanan..."
                        className="pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                    />
                </div>

                {/* Bell Notification Icon */}
                <button
                    type="button"
                    className="relative p-2 rounded-xl border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
                    title="Notifikasi"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* Settings Gear Icon */}
                <button
                    type="button"
                    className="p-2 rounded-xl border border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer"
                    title="Pengaturan"
                >
                    <Settings className="w-4 h-4" />
                </button>

                {/* Vertical Divider */}
                <div className="h-6 w-[1px] bg-zinc-200 mx-0.5 sm:mx-1"></div>

                {/* User Profile Badge */}
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        A
                    </div>
                    <div className="text-left hidden md:block">
                        <div className="text-xs font-bold text-zinc-900 leading-none">Admin</div>
                        <div className="text-[10px] font-medium text-zinc-400 mt-0.5">Super Admin</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-200 p-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <a
                        href="/admin/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            location.pathname === "/admin/dashboard" || location.pathname === "/admin" || location.pathname === "/dashboard" ? "bg-[#00a884]/10 text-[#00a884] font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a
                        href="/admin/produk"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            location.pathname.includes("/produk") ? "bg-[#00a884]/10 text-[#00a884] font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Package className="w-5 h-5" />
                        Produk & Stok
                    </a>
                    <a
                        href="/admin/banner"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            location.pathname.includes("/banner") ? "bg-[#00a884]/10 text-[#00a884] font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <ImageIcon className="w-5 h-5" />
                        Banner Promo
                    </a>
                    <a
                        href="/admin/koneksi"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            location.pathname.includes("/koneksi") ? "bg-[#00a884]/10 text-[#00a884] font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <LinkIcon className="w-5 h-5" />
                        Koneksi
                    </a>
                    <a
                        href="/admin/chat"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                            location.pathname.includes("/chat") ? "bg-[#00a884]/10 text-[#00a884] font-semibold" : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Pesan Chat
                    </a>

                    <div className="pt-2 border-t border-zinc-100">
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                logout();
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
