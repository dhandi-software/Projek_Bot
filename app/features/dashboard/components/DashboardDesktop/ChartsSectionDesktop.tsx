import React from "react";
import { Calendar, Filter } from "lucide-react";
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
import { FilterSelect } from "../FilterSelect";

interface ChartsSectionDesktopProps {
    stats: DashboardStats;
    selectedYear?: number;
    setSelectedYear?: (year: number) => void;
    selectedMonth?: number;
    setSelectedMonth?: (month: number) => void;
}

export function ChartsSectionDesktop({
    stats,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
}: ChartsSectionDesktopProps) {
    const trendData = stats.salesTrend || [];
    const topProducts = stats.topProducts || [];

    const months = [
        { value: 0, label: "Semua Bulan (Tahunan)" },
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const currentYear = new Date().getFullYear();
    const rawYears = stats.availableYears && stats.availableYears.length > 0
        ? stats.availableYears
        : [currentYear, currentYear - 1];

    const yearOptions = rawYears.map((y) => ({
        value: y,
        label: `Tahun ${y}`,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tren Penjualan Chart (8 Columns) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                        <h3 className="text-base font-bold text-zinc-900">Tren Penjualan</h3>
                        <p className="text-xs text-zinc-400 mt-0.5 font-medium">
                            {selectedMonth && selectedMonth > 0
                                ? `Penjualan harian (${months.find((m) => m.value === selectedMonth)?.label || ""} ${selectedYear || currentYear})`
                                : `Penjualan bulanan (Tahun ${selectedYear || currentYear})`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {/* Dropdown Tahun */}
                        <FilterSelect
                            options={yearOptions}
                            value={selectedYear || currentYear}
                            onChange={(val) => setSelectedYear?.(val)}
                            icon={<Calendar className="w-3.5 h-3.5" />}
                        />

                        {/* Dropdown Bulan */}
                        <FilterSelect
                            options={months}
                            value={selectedMonth ?? 0}
                            onChange={(val) => setSelectedMonth?.(val)}
                            icon={<Filter className="w-3.5 h-3.5" />}
                        />
                    </div>
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
