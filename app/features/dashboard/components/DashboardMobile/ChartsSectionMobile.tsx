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
import type { DashboardStats } from "~/types/dashboard.types";
import { FilterSelect } from "../FilterSelect";

interface ChartsSectionMobileProps {
    stats: DashboardStats;
    selectedYear?: number;
    setSelectedYear?: (year: number) => void;
    selectedMonth?: number;
    setSelectedMonth?: (month: number) => void;
}

export function ChartsSectionMobile({
    stats,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
}: ChartsSectionMobileProps) {
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
        label: `${y}`,
    }));

    return (
        <div className="space-y-4">
            {/* Omset & Order Trend Mobile Chart */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <h3 className="text-sm font-bold text-zinc-900">Tren Penjualan</h3>
                            <p className="text-[10px] text-zinc-400 font-medium">
                                {selectedMonth && selectedMonth > 0
                                    ? `${months.find((m) => m.value === selectedMonth)?.label || ""} ${selectedYear || currentYear}`
                                    : `Tahun ${selectedYear || currentYear}`}
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                            {/* Dropdown Tahun */}
                            <FilterSelect
                                options={yearOptions}
                                value={selectedYear || currentYear}
                                onChange={(val) => setSelectedYear?.(val)}
                                icon={<Calendar className="w-3 h-3" />}
                                size="sm"
                            />

                            {/* Dropdown Bulan */}
                            <FilterSelect
                                options={months}
                                value={selectedMonth ?? 0}
                                onChange={(val) => setSelectedMonth?.(val)}
                                icon={<Filter className="w-3 h-3" />}
                                size="sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.salesTrend || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesTrendGradientMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `${val}jt`}
                            />
                            <Tooltip
                                formatter={(value: any) => [`Rp ${value} Juta`, "Omset"]}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    color: "#0f172a",
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#2563eb"
                                strokeWidth={2.5}
                                fillOpacity={1}
                                fill="url(#salesTrendGradientMobile)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pencapaian Target Mobile Donut Card */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs flex items-center gap-4">
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#e2e8f0"
                            strokeWidth="12"
                            fill="transparent"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#00a884"
                            strokeWidth="12"
                            strokeDasharray="251.2"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            fill="transparent"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-xl font-black text-zinc-900 tracking-tight">
                            {stats.pencapaianTarget.percentage}%
                        </span>
                        <span className="text-[9px] font-extrabold uppercase text-[#00a884]">
                            {stats.pencapaianTarget.status}
                        </span>
                    </div>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                    <h3 className="font-extrabold text-zinc-900 text-sm">Target Sept 2026</h3>
                    <div className="flex items-center justify-between text-zinc-600">
                        <span>Realisasi:</span>
                        <span className="font-bold text-zinc-900">{stats.pencapaianTarget.realisasi}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-600">
                        <span>Target:</span>
                        <span className="font-bold text-zinc-900">{stats.pencapaianTarget.target}</span>
                    </div>
                    <div className="pt-1.5 border-t border-zinc-100 flex items-center justify-between text-emerald-700 font-extrabold text-[11px]">
                        <span>Surplus:</span>
                        <span>{stats.pencapaianTarget.surplus}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
