import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useCustomerOrders } from "../../hooks/useCustomerOrders";
import { OrderDetailModal } from "../OrderDetailModal";
import type { OrderStatus } from "../../types/customerOrders.types";

export function CustomerOrdersMobile() {
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
    } = useCustomerOrders();

    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenDetail = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleCloseDetail = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    const getStatusStyle = (status: OrderStatus) => {
        switch (status) {
            case "IN PROGRESS":
                return "bg-[#FFF3EB] text-[#FA8232]";
            case "COMPLETED":
                return "bg-[#EAF7E9] text-[#2DB224]";
            case "CANCELED":
                return "bg-[#FDEEEE] text-[#EE5858]";
            case "PENDING":
                return "bg-[#EAF6FE] text-[#2DA5F3]";
            default:
                return "bg-zinc-100 text-zinc-600";
        }
    };

    return (
        <div className="w-full bg-zinc-50 min-h-screen pb-20 font-sans">
            <div className="bg-white border-b border-zinc-200 p-4 sticky top-0 z-20 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/customer/dashboard")}
                        className="p-1 text-zinc-600 hover:text-zinc-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-base font-bold text-zinc-900">Riwayat Pesanan</h1>
                </div>
                <span className="text-xs text-zinc-500 font-medium">
                    {totalOrdersCount} Pesanan
                </span>
            </div>

            <div className="p-4 space-y-3">
                <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari Order ID..."
                        className="w-full pl-9 pr-3 py-2 border border-zinc-200 bg-white rounded-lg text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FA8232]"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
                    {(["ALL", "IN PROGRESS", "COMPLETED", "CANCELED"] as const).map((st) => (
                        <button
                            key={st}
                            type="button"
                            onClick={() => setSelectedStatus(st)}
                            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                                selectedStatus === st
                                    ? "bg-[#FA8232] text-white shadow-xs"
                                    : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                            }`}
                        >
                            {st === "ALL" ? "Semua Status" : st}
                        </button>
                    ))}
                </div>

                <div className="space-y-3 pt-1">
                    {isLoading ? (
                        <div className="p-8 text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-[#FA8232] border-t-transparent rounded-full animate-spin" />
                            Memuat riwayat pesanan...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="p-8 text-center text-xs text-zinc-500 bg-white rounded-xl border border-zinc-200">
                            Tidak ada pesanan ditemukan.
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs space-y-3"
                            >
                                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                                    <span className="text-xs font-extrabold text-zinc-900">
                                        {order.orderId}
                                    </span>
                                    <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {order.productImage ? (
                                        <img
                                            src={order.productImage}
                                            alt={order.productTitle || "Produk"}
                                            className="w-12 h-12 rounded-lg object-contain bg-zinc-50 p-1 border border-zinc-200 shrink-0"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-400">
                                            P
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-xs text-zinc-900 line-clamp-2">
                                            {order.productTitle || "Produk Dhandi Ecommerce"}
                                        </p>
                                        <p className="text-[11px] text-zinc-500 mt-0.5">{order.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-100">
                                    <span className="text-zinc-500">Total Tagihan ({order.itemCount} Barang):</span>
                                    <span className="font-extrabold text-[#2DA5F3]">
                                        Rp {order.totalAmount.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleOpenDetail(order.orderId)}
                                    className="w-full mt-1 block text-center py-2 bg-sky-50 text-[#2DA5F3] font-bold text-xs rounded-lg hover:bg-sky-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                    <span>Rincian Invoice & Detail</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="pt-4 flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 disabled:opacity-40 bg-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-semibold text-zinc-700">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 disabled:opacity-40 bg-white"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <OrderDetailModal
                orderId={selectedOrderId}
                isOpen={isModalOpen}
                onClose={handleCloseDetail}
            />
        </div>
    );
}

export default CustomerOrdersMobile;
