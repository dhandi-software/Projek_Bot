import React, { useState } from "react";
import { PackageCheck, TrendingUp, Box, ChevronLeft, ChevronRight } from "lucide-react";
import type { DashboardStats } from "~/types/dashboard.types";

interface ProdukKeluarDesktopProps {
    stats: DashboardStats;
}

export function ProdukKeluarDesktop({ stats }: ProdukKeluarDesktopProps) {
    const list = stats.produkKeluar || [];
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedList = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-2xs overflow-hidden">
            {/* Card Header */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-100 bg-gradient-to-r from-orange-50/50 via-white to-transparent">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 flex items-center justify-center shrink-0">
                        <PackageCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-zinc-900">Produk Keluar (Unit Terjual)</h3>
                        <p className="text-xs text-zinc-500 font-medium">Ringkasan unit produk yang sudah dibeli customer (Stok Berkurang Otomatis)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-semibold text-emerald-700">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Stok Realtime Synchronized</span>
                </div>
            </div>

            {/* Table */}
            {list.length === 0 ? (
                <div className="p-12 text-center text-zinc-500">
                    <Box className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-zinc-800">Belum Ada Aktivitas Produk Keluar</p>
                    <p className="text-xs text-zinc-400 mt-1">Transaksi penjualan akan tampil di sini saat produk dibeli.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-zinc-50/80 border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="py-3.5 px-6 font-semibold">PRODUK</th>
                                    <th className="py-3.5 px-6 font-semibold">UNIT KELUAR (TERJUAL)</th>
                                    <th className="py-3.5 px-6 font-semibold">TOTAL REVENUE</th>
                                    <th className="py-3.5 px-6 font-semibold">TRANSAKSI TERAKHIR</th>
                                    <th className="py-3.5 px-6 font-semibold">STATUS STOK</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
                                {paginatedList.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0 flex items-center justify-center">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Box className="w-5 h-5 text-zinc-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-zinc-900 text-xs">{item.title}</p>
                                                    <p className="text-[11px] text-zinc-400">{item.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-extrabold text-orange-600 text-sm">
                                            -{item.soldQty} Unit
                                        </td>
                                        <td className="py-4 px-6 font-bold text-zinc-900">
                                            {item.totalAmount}
                                        </td>
                                        <td className="py-4 px-6 text-zinc-500 font-medium">
                                            {item.lastOrderDate}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                {item.status || "Terjual & Stok Berkurang"}
                                            </span>
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
                                Menampilkan <span className="font-bold text-zinc-800">{startIndex + 1}</span> - <span className="font-bold text-zinc-800">{Math.min(startIndex + ITEMS_PER_PAGE, list.length)}</span> dari <span className="font-bold text-zinc-800">{list.length}</span> produk
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
