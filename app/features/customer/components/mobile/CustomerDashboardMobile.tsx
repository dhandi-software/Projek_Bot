import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
    User,
    Package,
    Clock,
    CheckCircle2,
    CreditCard,
    ArrowRight,
    LogOut,
    ShoppingBag,
} from "lucide-react";
import { useCustomerDashboard } from "../../hooks/useCustomerDashboard";

export function CustomerDashboardMobile() {
    const navigate = useNavigate();
    const {
        profile,
        billingAddress,
        cards,
        orders,
        stats,
        browsingHistory,
        logout,
    } = useCustomerDashboard();

    const [activeTab, setActiveTab] = useState<"overview" | "orders" | "cards">("overview");

    return (
        <div className="w-full bg-zinc-50 min-h-screen pb-20">
            {/* Top User Header Bar */}
            <div className="bg-white border-b border-zinc-200 p-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                    />
                    <div className="flex flex-col">
                        <span className="text-xs text-zinc-500 font-medium">Selamat Datang</span>
                        <span className="text-sm font-bold text-zinc-900 truncate max-w-[180px]">
                            {profile.name}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={logout}
                    className="p-2 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="bg-white border-b border-zinc-200 px-4 flex gap-4 text-xs font-semibold text-zinc-600 overflow-x-auto">
                <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "overview"
                            ? "border-[#FA8232] text-[#FA8232]"
                            : "border-transparent text-zinc-500"
                    }`}
                >
                    Ringkasan
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "orders"
                            ? "border-[#FA8232] text-[#FA8232]"
                            : "border-transparent text-zinc-500"
                    }`}
                >
                    Pesanan Saya ({orders.length})
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("cards")}
                    className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === "cards"
                            ? "border-[#FA8232] text-[#FA8232]"
                            : "border-transparent text-zinc-500"
                    }`}
                >
                    Kartu & Alamat
                </button>
            </div>

            {/* Main Content Area */}
            <div className="p-4 space-y-4">
                {/* Tab: Overview */}
                {activeTab === "overview" && (
                    <>
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#EAF6FE] p-3 rounded-xl flex flex-col items-center text-center">
                                <Package className="w-5 h-5 text-[#2DA5F3] mb-1" />
                                <span className="text-base font-extrabold text-[#191C1F]">
                                    {stats.totalOrders}
                                </span>
                                <span className="text-[10px] text-zinc-500">Total Order</span>
                            </div>
                            <div className="bg-[#FFF3EB] p-3 rounded-xl flex flex-col items-center text-center">
                                <Clock className="w-5 h-5 text-[#FA8232] mb-1" />
                                <span className="text-base font-extrabold text-[#191C1F]">
                                    {stats.pendingOrders}
                                </span>
                                <span className="text-[10px] text-zinc-500">Proses</span>
                            </div>
                            <div className="bg-[#EAF7E9] p-3 rounded-xl flex flex-col items-center text-center">
                                <CheckCircle2 className="w-5 h-5 text-[#2DB224] mb-1" />
                                <span className="text-base font-extrabold text-[#191C1F]">
                                    {stats.completedOrders}
                                </span>
                                <span className="text-[10px] text-zinc-500">Selesai</span>
                            </div>
                        </div>

                        {/* Recent Orders Short List */}
                        <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-xs space-y-3">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                                <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                                    Pesanan Terakhir
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("orders")}
                                    className="text-xs font-bold text-[#FA8232] flex items-center gap-1"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {orders.slice(0, 3).map((ord) => (
                                    <div
                                        key={ord.id}
                                        className="p-3 bg-zinc-50 rounded-lg flex items-center justify-between text-xs"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-bold text-zinc-900">{ord.orderId}</span>
                                            <span className="text-[10px] text-zinc-500">{ord.date}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-[#2DA5F3]">{ord.totalAmount}</span>
                                            <span
                                                className={`text-[10px] font-bold ${
                                                    ord.status === "COMPLETED"
                                                        ? "text-emerald-600"
                                                        : ord.status === "CANCELED"
                                                        ? "text-rose-600"
                                                        : "text-amber-600"
                                                }`}
                                            >
                                                {ord.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Browsing History */}
                        <div className="bg-white rounded-xl p-4 border border-zinc-200 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                                Terakhir Dilihat
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {browsingHistory.slice(0, 2).map((prod) => (
                                    <Link
                                        key={prod.id}
                                        to={`/product/${prod.id}`}
                                        className="p-2 border rounded-lg bg-white flex flex-col justify-between"
                                    >
                                        <img
                                            src={prod.image}
                                            alt={prod.title}
                                            className="h-24 object-contain mx-auto mb-2"
                                        />
                                        <p className="text-[11px] font-semibold text-zinc-800 line-clamp-2">
                                            {prod.title}
                                        </p>
                                        <span className="text-xs font-bold text-[#2DA5F3] mt-1">
                                            Rp {prod.price.toLocaleString("id-ID")}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Tab: Orders List */}
                {activeTab === "orders" && (
                    <div className="space-y-3">
                        {orders.map((ord) => (
                            <div
                                key={ord.id}
                                className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs space-y-2"
                            >
                                <div className="flex items-center justify-between border-b pb-2">
                                    <span className="text-xs font-bold text-zinc-900">{ord.orderId}</span>
                                    <span
                                        className={`text-xs font-bold ${
                                            ord.status === "COMPLETED"
                                                ? "text-emerald-600"
                                                : ord.status === "CANCELED"
                                                ? "text-rose-600"
                                                : "text-amber-600"
                                        }`}
                                    >
                                        {ord.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500">{ord.date}</span>
                                    <span className="font-extrabold text-[#2DA5F3]">{ord.totalAmount}</span>
                                </div>
                                <Link
                                    to={`/orders/${ord.orderId.replace("#", "")}`}
                                    className="w-full mt-2 block text-center py-2 bg-sky-50 text-[#2DA5F3] font-bold text-xs rounded-lg"
                                >
                                    Rincian Pesanan
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab: Cards & Address */}
                {activeTab === "cards" && (
                    <div className="space-y-4">
                        {/* Profile Info Box */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs space-y-2 text-xs">
                            <h3 className="font-bold text-zinc-900 border-b pb-2">Informasi Akun</h3>
                            <p><span className="text-zinc-500">Nama:</span> {profile.name}</p>
                            <p><span className="text-zinc-500">Email:</span> {profile.email}</p>
                            <p><span className="text-zinc-500">No. HP:</span> {profile.phone}</p>
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="mt-2 text-[#2DA5F3] font-bold"
                            >
                                Edit Profil &rarr;
                            </button>
                        </div>

                        {/* Billing Address Box */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs space-y-2 text-xs">
                            <h3 className="font-bold text-zinc-900 border-b pb-2">Alamat Tagihan</h3>
                            <p className="text-zinc-700">{billingAddress.address}</p>
                        </div>

                        {/* Payment Cards */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-zinc-800">Opsi Pembayaran</h3>
                            {cards.map((c) => (
                                <div
                                    key={c.id}
                                    className="p-4 rounded-xl text-white bg-gradient-to-r from-[#1B6392] to-[#124261] space-y-2 text-xs shadow-md"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm">{c.cardType.toUpperCase()}</span>
                                        <span className="font-extrabold">{c.balance}</span>
                                    </div>
                                    <p className="font-mono tracking-widest text-sm">{c.cardNumberMasked}</p>
                                    <p className="opacity-80">{c.cardHolderName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerDashboardMobile;
