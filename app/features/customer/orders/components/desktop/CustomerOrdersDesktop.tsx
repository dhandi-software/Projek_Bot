import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { NavigationSideBar } from "~/components/ui/NavigationSideBar";
import { useCustomerOrders } from "../../hooks/useCustomerOrders";
import { OrderDetailModal } from "../OrderDetailModal";
import type { OrderStatus } from "../../types/customerOrders.types";

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
                return "text-[#FA8232] font-semibold";
            case "COMPLETED":
                return "text-[#2DB224] font-semibold";
            case "CANCELED":
                return "text-[#EE5858] font-semibold";
            case "PENDING":
                return "text-[#2DA5F3] font-semibold";
            default:
                return "text-[#5F6C72] font-semibold";
        }
    };

    return (
        <div className="w-full bg-white pb-16 pt-8 px-8 font-sans">
            <div className="max-w-[1320px] mx-auto flex gap-8 items-start">
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
                                <option value="ALL">All Status</option>
                                <option value="IN PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELED">Canceled</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <div className="bg-[#F2F4F5] px-6 py-2.5 flex items-center text-[12px] font-medium text-[#475156] uppercase tracking-wider border-b border-[#E4E7E9]">
                            <div className="w-[140px] shrink-0 font-semibold">Order ID</div>
                            <div className="flex-1 min-w-[200px] font-semibold">Nama Produk</div>
                            <div className="w-[120px] shrink-0 font-semibold">Status</div>
                            <div className="w-[160px] shrink-0 font-semibold">Date</div>
                            <div className="w-[180px] shrink-0 font-semibold">Total</div>
                            <div className="w-[130px] shrink-0 text-right font-semibold pr-2">Action</div>
                        </div>

                        <div className="divide-y divide-[#E4E7E9]">
                            {isLoading ? (
                                <div className="p-12 text-center text-xs text-[#77878F] flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-[#FA8232] border-t-transparent rounded-full animate-spin" />
                                    Loading order history...
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="p-12 text-center text-xs text-[#77878F]">
                                    No orders found matching your criteria.
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="px-6 py-3.5 flex items-center text-[14px] text-[#191C1F] hover:bg-zinc-50/80 transition-colors gap-2"
                                    >
                                        <div className="w-[140px] shrink-0 font-medium text-[#191C1F] truncate">
                                            {order.orderId}
                                        </div>

                                        <div className="flex-1 min-w-[200px] flex items-center gap-2.5 pr-2">
                                            {order.productImage ? (
                                                <img
                                                    src={order.productImage}
                                                    alt={order.productTitle || "Produk"}
                                                    className="w-9 h-9 rounded-md object-contain bg-zinc-50 p-0.5 border border-zinc-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-400">
                                                    P
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="font-medium text-[13px] text-[#191C1F] truncate">
                                                    {order.productTitle || "Produk Dhandi Ecommerce"}
                                                </p>
                                                {order.itemCount > 1 && (
                                                    <span className="text-[11px] text-[#77878F] block">
                                                        +{order.itemCount - 1} produk lainnya
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-[120px] shrink-0">
                                            <span className={getStatusStyle(order.status)}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="w-[160px] shrink-0 text-[#5F6C72] text-[13px]">
                                            {order.date}
                                        </div>

                                        <div className="w-[180px] shrink-0 font-normal text-[#475156] text-[13px]">
                                            Rp {order.totalAmount.toLocaleString("id-ID")}{" "}
                                            <span className="text-[#77878F] text-[12px]">({order.itemCount} Produk)</span>
                                        </div>

                                        <div className="w-[130px] shrink-0 flex justify-end pr-1">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenDetail(order.orderId)}
                                                className="text-[#2DA5F3] hover:text-[#1B6392] font-semibold text-[14px] flex items-center gap-1 group cursor-pointer"
                                            >
                                                <span>View Details</span>
                                                <ArrowRight className="w-4 h-4 text-[#2DA5F3] group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
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
