import React from "react";
import type { DashboardStats } from "../../types/dashboard.types";

interface LatestOrdersMobileProps {
    stats: DashboardStats;
}

export function LatestOrdersMobile({ stats }: LatestOrdersMobileProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="text-sm font-bold text-zinc-900">Order Terbaru</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    LIVE FEED
                </span>
            </div>

            <div className="space-y-2.5">
                {stats.latestOrders.map((order, idx) => (
                    <div
                        key={idx}
                        className="bg-zinc-50/80 p-3 rounded-xl border border-zinc-200/60 space-y-2 active:bg-zinc-100 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-base">📦</span>
                                <div>
                                    <h4 className="font-bold text-xs text-zinc-900">{order.customer}</h4>
                                    <span className="text-[9px] font-mono text-zinc-500">{order.id}</span>
                                </div>
                            </div>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    order.status === "Selesai"
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        : "bg-blue-50 text-blue-700 border-blue-200"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="pt-1.5 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-zinc-500 truncate max-w-[170px]">
                                {order.items}
                            </span>
                            <div className="text-right">
                                <span className="font-extrabold text-zinc-900 block text-xs">{order.total}</span>
                                <span className="text-[9px] text-zinc-400 block">{order.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
