import React from "react";
import { ArrowRight } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard.types";

interface LatestOrdersDesktopProps {
    stats: DashboardStats;
}

export function LatestOrdersDesktop({ stats }: LatestOrdersDesktopProps) {
    const orders = stats.latestOrders || [];

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "selesai":
                return (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600">
                        Selesai
                    </span>
                );
            case "dikirim":
                return (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-600">
                        Dikirim
                    </span>
                );
            case "diproses":
                return (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-600">
                        Diproses
                    </span>
                );
            case "dibayar":
                return (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#e6f4ea] text-[#137333]">
                        Dibayar
                    </span>
                );
            default:
                return (
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-zinc-100 text-zinc-600">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden">
            {/* Card Header */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-900">Pesanan Terbaru</h3>
                <a
                    href="#lihat-semua"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50/70 border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider">
                        <tr>
                            <th className="py-3.5 px-6 font-semibold">ID PESANAN</th>
                            <th className="py-3.5 px-6 font-semibold">PELANGGAN</th>
                            <th className="py-3.5 px-6 font-semibold">PRODUK</th>
                            <th className="py-3.5 px-6 font-semibold">TOTAL</th>
                            <th className="py-3.5 px-6 font-semibold">PEMBAYARAN</th>
                            <th className="py-3.5 px-6 font-semibold">STATUS</th>
                            <th className="py-3.5 px-6 font-semibold">TANGGAL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                        {orders.map((order, idx) => (
                            <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="py-4 px-6 font-bold text-blue-600 cursor-pointer hover:underline">
                                    {order.id}
                                </td>
                                <td className="py-4 px-6 font-semibold text-zinc-800">
                                    {order.customer}
                                </td>
                                <td className="py-4 px-6 text-zinc-600 max-w-xs truncate">
                                    {order.items}
                                </td>
                                <td className="py-4 px-6 font-bold text-zinc-900">
                                    {order.total}
                                </td>
                                <td className="py-4 px-6 text-zinc-500">
                                    {order.paymentMethod || "Transfer Bank"}
                                </td>
                                <td className="py-4 px-6">
                                    {getStatusBadge(order.status)}
                                </td>
                                <td className="py-4 px-6 text-zinc-400 font-medium">
                                    {order.date || "21 Sep 2026"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
