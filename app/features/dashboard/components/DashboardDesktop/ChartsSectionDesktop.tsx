import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { DashboardStats } from "../../types/dashboard.types";

interface ChartsSectionDesktopProps {
    stats: DashboardStats;
}

export function ChartsSectionDesktop({ stats }: ChartsSectionDesktopProps) {
    const trendData = stats.salesTrend || [
        { day: "15 Sep", value: 6.8 },
        { day: "16 Sep", value: 7.5 },
        { day: "17 Sep", value: 6.4 },
        { day: "18 Sep", value: 8.1 },
        { day: "19 Sep", value: 8.9 },
        { day: "20 Sep", value: 11.2 },
        { day: "21 Sep", value: 7.2 },
    ];

    const topProducts = stats.topProducts || [
        {
            rank: 1,
            title: "Smartwatch Series 9 Sport",
            soldCount: 264,
            change: "+18.2%",
            isPositive: true,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
        },
        {
            rank: 2,
            title: "Sepatu Lari Ultraboost Pro",
            soldCount: 342,
            change: "+12.4%",
            isPositive: true,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80",
        },
        {
            rank: 3,
            title: "Celana Jogger Premium",
            soldCount: 411,
            change: "+24.1%",
            isPositive: true,
            image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=100&q=80",
        },
        {
            rank: 4,
            title: "Kemeja Batik Parang Rusak",
            soldCount: 187,
            change: "+6.8%",
            isPositive: true,
            image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&q=80",
        },
        {
            rank: 5,
            title: "Parfum Oud Al Bakhoor",
            soldCount: 58,
            change: "-3.2%",
            isPositive: false,
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=100&q=80",
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tren Penjualan Chart (8 Columns) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
                <div className="mb-6">
                    <h3 className="text-base font-bold text-zinc-900">Tren Penjualan</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 font-medium">7 hari terakhir</p>
                </div>

                <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesTrendGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}jt`}
                                domain={[0, 12]}
                                ticks={[0, 3, 6, 9, 12]}
                            />
                            <Tooltip
                                formatter={(value: any) => [`Rp ${value} Juta`, "Omset"]}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    color: "#0f172a",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#2563eb"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#salesTrendGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Produk Terlaris (4 Columns) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-bold text-zinc-900 mb-4">Produk Terlaris</h3>

                    <div className="space-y-4">
                        {topProducts.map((prod) => (
                            <div key={prod.rank} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-semibold text-zinc-400 w-3 shrink-0 text-center">
                                        {prod.rank}
                                    </span>
                                    <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200/60 overflow-hidden shrink-0 flex items-center justify-center">
                                        {prod.image ? (
                                            <img
                                                src={prod.image}
                                                alt={prod.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs font-bold text-zinc-400">
                                                {prod.title.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-xs font-bold text-zinc-800 truncate leading-tight">
                                            {prod.title}
                                        </h4>
                                        <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                                            {prod.soldCount} terjual
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`text-xs font-bold shrink-0 ${
                                        prod.isPositive ? "text-emerald-600" : "text-rose-500"
                                    }`}
                                >
                                    {prod.change}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
