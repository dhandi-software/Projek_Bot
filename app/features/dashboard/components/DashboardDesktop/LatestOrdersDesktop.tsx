import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import type { DashboardStats } from "~/types/dashboard.types";

interface LatestOrdersDesktopProps {
    stats: DashboardStats;
}

export function LatestOrdersDesktop({ stats }: LatestOrdersDesktopProps) {
    const orders = stats.latestOrders || [];
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                <Link
                    to="/admin/pesanan"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <span>Lihat Semua</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Table */}
            {orders.length === 0 ? (
                <div className="p-12 text-center text-zinc-500">
                    <ShoppingBag className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-zinc-800">Belum Ada Pesanan Terbaru</p>
                    <p className="text-xs text-zinc-400 mt-1">Transaksi pesanan dari pelanggan akan muncul di sini.</p>
                </div>
            ) : (
                <>
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
                                {paginatedOrders.map((order, idx) => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between text-xs text-zinc-500">
                            <div>
                                Menampilkan <span className="font-bold text-zinc-800">{startIndex + 1}</span> - <span className="font-bold text-zinc-800">{Math.min(startIndex + ITEMS_PER_PAGE, orders.length)}</span> dari <span className="font-bold text-zinc-800">{orders.length}</span> pesanan
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-zinc-800 px-1">
                                    Halaman {currentPage} dari {totalPages}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
