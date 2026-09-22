import React from "react";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { DashboardStats } from "../../types/dashboard.types";

interface ChartsSectionMobileProps {
    stats: DashboardStats;
}

export function ChartsSectionMobile({ stats }: ChartsSectionMobileProps) {
    return (
        <div className="space-y-4">
            {/* Omset & Order Trend Mobile Chart */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-zinc-900">Trend Penjualan</h3>
                        <span className="text-[10px] text-zinc-400 font-medium">7 Bln Terakhir</span>
                    </div>
                    {/* Compact Chart Legend */}
                    <div className="flex items-center gap-3 text-[10px] font-bold">
                        <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-xs bg-[#00a884]"></span>
                            <span className="text-zinc-600">Omset</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            <span className="text-zinc-600">Order</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="w-3 h-0.5 bg-amber-500 border border-dashed border-amber-500"></span>
                            <span className="text-zinc-600">Target</span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-52">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={stats.monthlyTrends} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="omsetGradientMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00a884" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00a884" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} unit="j" />
                            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#ffffff",
                                    fontSize: "11px",
                                    padding: "6px 10px",
                                }}
                            />
                            <Bar yAxisId="left" dataKey="omset" fill="url(#omsetGradientMobile)" radius={[4, 4, 0, 0]} barSize={20} />
                            <Line yAxisId="right" type="monotone" dataKey="order" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#3b82f6" }} />
                            <Line yAxisId="left" type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                        </ComposedChart>
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
