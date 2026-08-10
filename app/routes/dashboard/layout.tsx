import { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { LayoutDashboard, Link as LinkIcon, LogOut } from "lucide-react";

export default function DashboardLayout() {
    const { isAuthenticated, logout, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading || !isAuthenticated) return null;

    return (
        <div className="flex min-h-screen bg-zinc-50 font-geist">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-zinc-200 hidden md:flex flex-col shrink-0 sticky top-0 h-screen">
                <div className="p-6 border-b border-zinc-200 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#00a884] rounded-lg flex items-center justify-center text-white">
                        🤖
                    </div>
                    <span className="font-bold text-lg text-zinc-800">WhatsApp Bot</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                isActive 
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold" 
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/dashboard/koneksi"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                isActive 
                                    ? "bg-[#00a884]/10 text-[#00a884] font-semibold" 
                                    : "text-zinc-600 hover:bg-zinc-100"
                            }`
                        }
                    >
                        <LinkIcon className="w-5 h-5" />
                        Koneksi
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-zinc-200">
                    <button 
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
