import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { CustomerRecentOrder, OrderStatusType } from "../../types/customerDashboard.types";

export interface CustomerRecentOrdersSectionProps {
    orders: CustomerRecentOrder[];
    onViewAll?: () => void;
}

export function CustomerRecentOrdersSection({
    orders,
    onViewAll,
}: CustomerRecentOrdersSectionProps) {
    const getStatusStyle = (status: OrderStatusType) => {
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
                return "text-[#5F6C72] font-medium";
        }
    };

    return (
        <div className="w-full bg-white border border-[#E4E7E9] rounded-[4px] shadow-xs">
            {/* Header */}
            <div className="border-b border-[#E4E7E9] h-[52px] flex items-center justify-between px-6 rounded-t-[4px]">
                <h2 className="text-[14px] font-medium text-[#191C1F] uppercase tracking-wide">
                    Recent Order
                </h2>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="flex items-center gap-1.5 text-[14px] font-semibold text-[#FA8232] hover:text-[#e07125] transition-colors"
                >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F2F4F5] border-b border-[#E4E7E9] text-[12px] font-medium text-[#475156] uppercase tracking-wider">
                            <th className="py-3 px-6 w-[140px]">Order ID</th>
                            <th className="py-3 px-6 w-[160px]">Status</th>
                            <th className="py-3 px-6 w-[200px]">Date</th>
                            <th className="py-3 px-6">Total</th>
                            <th className="py-3 px-6 text-right w-[140px]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E7E9] text-[14px]">
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-zinc-50/80 transition-colors group"
                            >
                                <td className="py-3.5 px-6 font-medium text-[#191C1F]">
                                    {order.orderId}
                                </td>
                                <td className={`py-3.5 px-6 text-[14px] ${getStatusStyle(order.status)}`}>
                                    {order.status}
                                </td>
                                <td className="py-3.5 px-6 text-[#5F6C72]">
                                    {order.date}
                                </td>
                                <td className="py-3.5 px-6 text-[#475156]">
                                    {order.totalAmount}{" "}
                                    <span className="text-[#77878F] text-[13px]">
                                        ({order.productCount} Produk)
                                    </span>
                                </td>
                                <td className="py-3.5 px-6 text-right">
                                    <Link
                                        to={`/orders/${order.orderId.replace("#", "")}`}
                                        className="inline-flex items-center gap-1.5 text-[#2DA5F3] font-semibold text-[14px] hover:underline group-hover:translate-x-0.5 transition-transform"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 shrink-0" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
