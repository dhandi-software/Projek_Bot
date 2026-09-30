import React from "react";
import { PackageCheck, Box } from "lucide-react";
import type { DashboardStats } from "../../types/dashboard.types";

interface ProdukKeluarMobileProps {
    stats: DashboardStats;
}

export function ProdukKeluarMobile({ stats }: ProdukKeluarMobileProps) {
    const list = stats.produkKeluar || [];

    return (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-2xs overflow-hidden p-4 space-y-3">
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                    <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-zinc-900">Produk Keluar</h3>
                    <p className="text-[11px] text-zinc-400">Unit produk terjual (Stok Berkurang)</p>
                </div>
            </div>

            <div className="space-y-3 divide-y divide-zinc-100">
                {list.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0 flex items-center justify-center">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <Box className="w-4 h-4 text-zinc-400" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-xs text-zinc-900 truncate">{item.title}</p>
                                <p className="text-[10px] text-zinc-400">{item.lastOrderDate}</p>
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-xs font-extrabold text-orange-600">-{item.soldQty} Unit</p>
                            <p className="text-[10px] font-bold text-zinc-700">{item.totalAmount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
