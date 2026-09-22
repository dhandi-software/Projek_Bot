import React from "react";
import type { DashboardStats } from "../../types/dashboard.types";

interface MetricCardsDesktopProps {
    stats: DashboardStats;
}

export function MetricCardsDesktop({ stats }: MetricCardsDesktopProps) {
    const cards = [
        {
            title: "Total Pendapatan",
            value: stats.omset?.amount || "Rp 128.450.000",
            change: stats.omset?.change || "+12.8%",
            comparison: stats.omset?.comparison || "vs. bulan lalu",
            isPositive: stats.omset?.isPositive ?? true,
        },
        {
            title: "Total Pesanan",
            value: stats.totalOrder?.count ? stats.totalOrder.count.toLocaleString("id-ID") : "1.284",
            change: stats.totalOrder?.change || "+8.4%",
            comparison: stats.totalOrder?.comparison || "vs. bulan lalu",
            isPositive: stats.totalOrder?.isPositive ?? true,
        },
        {
            title: "Produk Terjual",
            value: stats.averageOrderValue?.value || "3.842",
            change: stats.averageOrderValue?.change || "+15.2%",
            comparison: stats.averageOrderValue?.comparison || "vs. bulan lalu",
            isPositive: stats.averageOrderValue?.isPositive ?? true,
        },
        {
            title: "Rata-rata Nilai Pesanan",
            value: stats.returnRate?.rate || "Rp 100.039",
            change: stats.returnRate?.change || "-2.1%",
            comparison: stats.returnRate?.comparison || "vs. bulan lalu",
            isPositive: stats.returnRate?.isPositive ?? false,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow"
                >
                    <span className="text-xs font-semibold text-zinc-500">
                        {card.title}
                    </span>
                    
                    <div className="mt-2.5">
                        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                            {card.value}
                        </h2>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs">
                        <span
                            className={`font-bold ${
                                card.isPositive ? "text-emerald-600" : "text-rose-500"
                            }`}
                        >
                            {card.change}
                        </span>
                        <span className="text-zinc-400 font-medium">
                            {card.comparison}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
