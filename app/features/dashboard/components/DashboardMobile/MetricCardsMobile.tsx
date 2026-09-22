import React from "react";
import type { DashboardStats } from "../../types/dashboard.types";

interface MetricCardsMobileProps {
    stats: DashboardStats;
}

export function MetricCardsMobile({ stats }: MetricCardsMobileProps) {
    const cards = [
        {
            title: "Total Pendapatan",
            value: stats.omset?.amount || "Rp 128.450.000",
            change: stats.omset?.change || "+12.8%",
            isPositive: stats.omset?.isPositive ?? true,
        },
        {
            title: "Total Pesanan",
            value: stats.totalOrder?.count ? stats.totalOrder.count.toLocaleString("id-ID") : "1.284",
            change: stats.totalOrder?.change || "+8.4%",
            isPositive: stats.totalOrder?.isPositive ?? true,
        },
        {
            title: "Produk Terjual",
            value: stats.averageOrderValue?.value || "3.842",
            change: stats.averageOrderValue?.change || "+15.2%",
            isPositive: stats.averageOrderValue?.isPositive ?? true,
        },
        {
            title: "Rata-rata Nilai Pesanan",
            value: stats.returnRate?.rate || "Rp 100.039",
            change: stats.returnRate?.change || "-2.1%",
            isPositive: stats.returnRate?.isPositive ?? false,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-3.5 border border-zinc-200/80 shadow-2xs">
                    <span className="text-[11px] font-semibold text-zinc-500 block leading-tight">
                        {card.title}
                    </span>
                    <h2 className="text-lg font-bold text-zinc-900 mt-1.5 tracking-tight truncate">
                        {card.value}
                    </h2>
                    <div className="mt-2 flex items-center gap-1 text-[11px]">
                        <span className={`font-bold ${card.isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                            {card.change}
                        </span>
                        <span className="text-zinc-400 font-medium">vs. bulan lalu</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
