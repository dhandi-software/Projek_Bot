import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NavigationSideBar } from "~/components/ui/NavigationSideBar";
import { useCustomerOrders } from "~/hooks/useCustomerOrders";
import { OrderDetailModal } from "../OrderDetailModal";
import type { OrderStatus } from "~/types/customerOrders.types";

export function CustomerOrdersDesktop() {
    const navigate = useNavigate();
    const {
        orders,
        totalOrdersCount,
        isLoading,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        currentPage,
        totalPages,
        handlePageChange,
        logout,
        cancelOrder,
        refreshOrders,
    } = useCustomerOrders();

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenDetail = (orderId: string) => {
        const cleanId = orderId.replace("#", "").trim();
        navigate(`/customer/orders/${cleanId}`);
    };

    const handleCloseDetail = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    const handleCancelOrder = async (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        if (window.confirm(`Apakah Anda yakin ingin membatalkan order ${orderId}?`)) {
            const res = await cancelOrder(orderId);
            if (!res.success) {
                alert(res.error || "Gagal membatalkan pesanan.");
            }
        }
    };

    const handlePayNow = (e: React.MouseEvent, order: any) => {
        e.stopPropagation();
        const cleanId = order.orderId.replace("#", "");
        localStorage.setItem("last_active_order_id", cleanId);
        navigate("/checkout");
    };

    const renderStatusBadge = (status: OrderStatus) => {
        switch (status) {
            case "PENDING":
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        Belum Dibayar
                    </span>
                );
            case "IN PROGRESS":
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-300">
                        Diproses
                    </span>
                );
            case "SHIPPED":
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                        Dikirim
                    </span>
                );
            case "COMPLETED":
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Selesai
                    </span>
                );
            case "CANCELED":
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        Dibatalkan
                    </span>
                );
            default:
                return (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-300">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="w-full bg-white pb-16 pt-6 px-4 md:px-8 font-sans">
            <div className="w-full max-w-full flex gap-8 items-start">
                <NavigationSideBar
                    activeId="order-history"
                    onLogout={logout}
                    onSelect={(id) => {
                        if (id === "dashboard") navigate("/customer/dashboard");
                        if (id === "track-order") navigate("/track-order");
                        if (id === "shopping-cart") navigate("/cart");
                        if (id === "wishlist") navigate("/wishlist");
                        if (id === "compare") navigate("/compare");
                        if (id === "cards-address") navigate("/profile");
                        if (id === "setting") navigate("/settings");
                    }}
                />

                <main className="flex-1 flex flex-col min-w-0 border border-[#E4E7E9] rounded-[4px] bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
                    <div className="p-6 border-b border-[#E4E7E9] flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-[18px] font-semibold text-[#191C1F] uppercase tracking-wide">
                                Order History
                            </h1>
                            <p className="text-[13px] text-[#5F6C72] mt-0.5">
                                Showing {totalOrdersCount} orders found in your account
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="w-4 h-4 text-[#77878F] absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search Order ID..."
                                    className="pl-9 pr-3 py-1.5 border border-[#E4E7E9] rounded-[4px] text-xs text-[#191C1F] placeholder-[#77878F] focus:outline-none focus:border-[#FA8232] w-48 transition-colors"
                                />
                            </div>

                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | "ALL")}
                                className="px-3 py-1.5 border border-[#E4E7E9] rounded-[4px] text-xs text-[#191C1F] font-medium focus:outline-none focus:border-[#FA8232] bg-white cursor-pointer"
                            >
                                <option value="ALL">Semua Status</option>
                                <option value="PENDING">Belum Dibayar</option>
                                <option value="IN PROGRESS">Diproses</option>
                                <option value="SHIPPED">Dikirim</option>
                                <option value="COMPLETED">Selesai</option>
                                <option value="CANCELED">Dibatalkan</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[920px]">
                            <thead>
                                <tr className="bg-[#F2F4F5] border-b border-[#E4E7E9] text-[11px] font-bold text-[#475156] uppercase tracking-wider">
                                    <th className="py-3 px-5 w-44">ORDER ID</th>
                                    <th className="py-3 px-5">NAMA PRODUK</th>
                                    <th className="py-3 px-5 w-36 text-center">STATUS</th>
                                    <th className="py-3 px-5 w-40">DATE</th>
                                    <th className="py-3 px-5 w-44">TOTAL</th>
                                    <th className="py-3 px-5 w-52 text-right">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E4E7E9]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-xs text-[#77878F]">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-[#FA8232] border-t-transparent rounded-full animate-spin" />
                                                <span>Loading order history...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-xs text-[#77878F]">
                                            No orders found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-zinc-50/80 transition-colors text-[13px] text-[#191C1F]"
                                        >
                                            <td className="py-3.5 px-5 font-mono font-medium text-xs text-[#191C1F] truncate max-w-[160px]">
                                                {order.orderId}
                                            </td>

                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-3 min-w-[200px]">
                                                    {order.productImage ? (
                                                        <img
                                                            src={order.productImage}
                                                            alt={order.productTitle || "Produk"}
                                                            className="w-10 h-10 rounded-md object-contain bg-zinc-50 p-0.5 border border-zinc-200 shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-400">
                                                            P
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-xs text-[#191C1F] line-clamp-1">
                                                            {order.productTitle || "Produk Dhandi Ecommerce"}
                                                        </p>
                                                        {order.itemCount > 1 && (
                                                            <span className="text-[11px] text-[#77878F] block mt-0.5">
                                                                +{order.itemCount - 1} produk lainnya
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-5 text-center whitespace-nowrap">
                                                {renderStatusBadge(order.status)}
                                            </td>

                                            <td className="py-3.5 px-5 text-[#5F6C72] text-xs whitespace-nowrap">
                                                {order.date}
                                            </td>

                                            <td className="py-3.5 px-5 text-xs whitespace-nowrap">
                                                <span className="font-bold text-[#191C1F]">
                                                    Rp {order.totalAmount.toLocaleString("id-ID")}
                                                </span>{" "}
                                                <span className="text-[#77878F] text-[11px]">
                                                    ({order.itemCount} Barang)
                                                </span>
                                            </td>

                                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    {order.status === "PENDING" && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => handlePayNow(e, order)}
                                                                className="px-3 py-1 bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold rounded shadow-2xs cursor-pointer transition-colors shrink-0"
                                                            >
                                                                Bayar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => handleCancelOrder(e, order.orderId)}
                                                                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded border border-rose-200 cursor-pointer transition-colors shrink-0"
                                                            >
                                                                Batal
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenDetail(order.orderId)}
                                                        className="text-[#2DA5F3] hover:text-[#1B6392] font-semibold text-xs flex items-center gap-1 group cursor-pointer shrink-0"
                                                    >
                                                        <span>Detail</span>
                                                        <ArrowRight className="w-3.5 h-3.5 text-[#2DA5F3] group-hover:translate-x-0.5 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 border-t border-[#E4E7E9] flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-10 h-10 rounded-full border border-[#E4E7E9] flex items-center justify-center text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232] disabled:opacity-40 disabled:hover:border-[#E4E7E9] disabled:hover:text-[#191C1F] transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const isActive = page === currentPage;
                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full font-semibold text-[14px] transition-colors cursor-pointer ${
                                        isActive
                                            ? "bg-[#FA8232] text-white shadow-xs"
                                            : "border border-[#E4E7E9] text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232]"
                                    }`}
                                >
                                    {page < 10 ? `0${page}` : page}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 rounded-full border border-[#E4E7E9] flex items-center justify-center text-[#191C1F] hover:border-[#FA8232] hover:text-[#FA8232] disabled:opacity-40 disabled:hover:border-[#E4E7E9] disabled:hover:text-[#191C1F] transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </main>
            </div>

            <OrderDetailModal
                orderId={selectedOrderId}
                isOpen={isModalOpen}
                onClose={handleCloseDetail}
            />
        </div>
    );
}

export default CustomerOrdersDesktop;
