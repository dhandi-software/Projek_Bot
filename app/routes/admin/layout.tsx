import { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink, useOutletContext } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import {
    LayoutDashboard,
    Link as LinkIcon,
    LogOut,
    MessageSquare,
    Package,
    Image as ImageIcon,
    ChevronLeft,
} from "lucide-react";
import type { ContextType } from "~/root";
import { DashboardTopbar } from "~/features/dashboard/components/DashboardTopbar";

export default function AdminLayout() {
    const { isAuthenticated, logout, isLoading, user } = useAuth();
    const navigate = useNavigate();
    const context = useOutletContext<ContextType>();

    // Sidebar collapsed state initialized from localStorage
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("admin_sidebar_collapsed") === "true";
        }
        return false;
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => {
            const nextState = !prev;
            if (typeof window !== "undefined") {
                localStorage.setItem("admin_sidebar_collapsed", String(nextState));
            }
            return nextState;
        });
    };

    if (isLoading || !isAuthenticated) return null;

    return (
        <div className="flex min-h-screen bg-zinc-50 font-geist">
            {/* Collapsible & Resizable Sidebar */}
            <aside
                className={`bg-white border-r border-zinc-200 hidden md:flex flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 ease-in-out relative ${
                    isCollapsed ? "w-20" : "w-64"
                }`}
            >
                {/* Header Logo & Collapse Toggle Button */}
                <div
                    className={`p-4 border-b border-zinc-200 flex items-center justify-between h-16 ${
                        isCollapsed ? "justify-center" : ""
                    }`}
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                        <img
                            src="/images/Logo_Bot.png"
                            alt="Logo Bot"
                            className="w-8 h-8 object-contain shrink-0"
                        />
                        {!isCollapsed && (
                            <span className="font-bold text-base text-zinc-900 truncate tracking-tight">
                                Admin Panel
                            </span>
                        )}
                    </div>

                    {/* Quick Toggle Icon Button */}
                    <button
                        type="button"
                        onClick={toggleSidebar}
                        className={`p-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 transition-colors cursor-pointer shrink-0 ${
                            isCollapsed ? "hidden" : "block"
                        }`}
                        title={isCollapsed ? "Buka Sidebar" : "Lipat Sidebar"}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        title={isCollapsed ? "Dashboard" : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                                isCollapsed ? "justify-center px-0" : ""
                            } ${
                                isActive
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <LayoutDashboard className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Dashboard</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/produk"
                        title={isCollapsed ? "Produk & Stok" : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                                isCollapsed ? "justify-center px-0" : ""
                            } ${
                                isActive
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <Package className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Produk & Stok</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/banner"
                        title={isCollapsed ? "Banner Promo" : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                                isCollapsed ? "justify-center px-0" : ""
                            } ${
                                isActive
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <ImageIcon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Banner Promo</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/koneksi"
                        title={isCollapsed ? "Koneksi" : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                                isCollapsed ? "justify-center px-0" : ""
                            } ${
                                isActive
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <LinkIcon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Koneksi</span>}
                    </NavLink>

                    <NavLink
                        to="/admin/chat"
                        title={isCollapsed ? "Pesan Chat" : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                                isCollapsed ? "justify-center px-0" : ""
                            } ${
                                isActive
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold"
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <MessageSquare className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Pesan Chat</span>}
                    </NavLink>
                </nav>

                {/* Sign Out Button */}
                <div className="p-3 border-t border-zinc-200">
                    <button
                        onClick={logout}
                        title={isCollapsed ? "Sign Out" : undefined}
                        className={`flex items-center gap-3 px-3.5 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer ${
                            isCollapsed ? "justify-center px-0" : ""
                        }`}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span className="text-sm">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden min-w-0 transition-all duration-300">
                {/* Global Topbar showing active page title, sidebar toggle, search, notifications & profile */}
                <DashboardTopbar
                    user={user}
                    isSidebarCollapsed={isCollapsed}
                    onToggleSidebar={toggleSidebar}
                />

                <div className="flex-1 p-0">
                    <Outlet context={context} />
                </div>
            </main>
        </div>
    );
}
