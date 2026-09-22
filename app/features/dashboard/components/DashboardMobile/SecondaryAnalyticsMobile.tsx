import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { DashboardStats, HeatmapDay } from "../../types/dashboard.types";

interface SecondaryAnalyticsMobileProps {
    stats: DashboardStats;
    heatmapDays: HeatmapDay[];
    getHeatmapColor: (level: number) => string;
}

export function SecondaryAnalyticsMobile({ stats, heatmapDays, getHeatmapColor }: SecondaryAnalyticsMobileProps) {
    return (
        <div className="space-y-4">
            {/* Revenue Harian Heatmap Mobile */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Revenue Harian</h3>
                    <span className="text-[10px] text-zinc-400 font-medium">Sept 2026</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                    {heatmapDays.map((item, idx) => (
                        <div
                            key={idx}
                            className={`h-9 rounded-lg flex items-center justify-center text-[10px] border transition-transform active:scale-95 ${getHeatmapColor(item.level)}`}
                            title={`Tgl ${item.day} - Level ${item.level}`}
                        >
                            {item.day}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[10px] text-zinc-500 font-medium">
                    <span>Rendah</span>
                    <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-50 border border-emerald-100"></span>
                        <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-200"></span>
                        <span className="w-2.5 h-2.5 rounded bg-emerald-300 border border-emerald-400"></span>
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-600"></span>
                        <span className="w-2.5 h-2.5 rounded bg-[#00a884] border border-[#0d7c82]"></span>
                    </div>
                    <span>Tinggi</span>
                </div>
            </div>

            {/* Order Mingguan Bar Chart Mobile */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Order Mingguan</h3>
                    <div className="flex items-center gap-2 text-[10px]">
                        <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded bg-[#00a884]"></span> Order
                        </span>
                        <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded bg-rose-500"></span> Retur
                        </span>
                    </div>
                </div>

                <div className="w-full h-44">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.weeklyOrders} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontSize: "11px",
                                    padding: "4px 8px",
                                }}
                            />
                            <Bar dataKey="orders" fill="#00a884" radius={[3, 3, 0, 0]} barSize={14} />
                            <Bar dataKey="returns" fill="#f43f5e" radius={[3, 3, 0, 0]} barSize={14} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sumber Traffic Mobile */}
            <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-900">Sumber Traffic</h3>
                    <span className="text-[10px] text-zinc-400 font-medium">14.820 Visitors</span>
                </div>

                <div className="space-y-2.5">
                    {stats.trafficSources.map((source, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-medium">
                                <span className="text-zinc-700 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }}></span>
                                    {source.name}
                                </span>
                                <span className="text-zinc-900 font-bold text-[11px]">{source.percentage}%</span>
                            </div>
                            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
