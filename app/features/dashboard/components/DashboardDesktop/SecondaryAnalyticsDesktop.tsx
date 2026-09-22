import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { DashboardStats, HeatmapDay } from "../../types/dashboard.types";

interface SecondaryAnalyticsDesktopProps {
    stats: DashboardStats;
    heatmapDays: HeatmapDay[];
    getHeatmapColor: (level: number) => string;
}

export function SecondaryAnalyticsDesktop({ stats, heatmapDays, getHeatmapColor }: SecondaryAnalyticsDesktopProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Revenue Harian Heatmap Grid (4 columns) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900">Revenue Harian</h3>
                    <p className="text-xs text-zinc-500">September 2026</p>
                </div>

                <div className="my-5 grid grid-cols-7 gap-2">
                    {heatmapDays.map((item, idx) => (
                        <div
                            key={idx}
                            className={`h-11 rounded-xl flex items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer border ${getHeatmapColor(item.level)}`}
                            title={`Tanggal ${item.day} Sept 2026 - Level Revenue ${item.level}`}
                        >
                            {item.day}
                        </div>
                    ))}
                </div>

                {/* Gradient Legend */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs text-zinc-500 font-medium">
                    <span>Rendah</span>
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-100"></span>
                        <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></span>
                        <span className="w-3 h-3 rounded bg-emerald-300 border border-emerald-400"></span>
                        <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-600"></span>
                        <span className="w-3 h-3 rounded bg-[#00a884] border border-[#0d7c82]"></span>
                    </div>
                    <span>Tinggi</span>
                </div>
            </div>

            {/* Order Mingguan Bar Chart (4 columns) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900">Order Mingguan</h3>
                    <p className="text-xs text-zinc-500">Minggu ini (incl. retur)</p>
                </div>

                <div className="w-full h-52 my-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.weeklyOrders} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    borderRadius: "10px",
                                    color: "#fff",
                                    fontSize: "12px",
                                }}
                            />
                            <Bar dataKey="orders" fill="#00a884" radius={[4, 4, 0, 0]} barSize={20} />
                            <Bar dataKey="returns" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#00a884]"></span>
                        <span className="text-zinc-600 font-medium">Order Masuk</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-rose-500"></span>
                        <span className="text-zinc-600 font-medium">Retur</span>
                    </div>
                </div>
            </div>

            {/* Sumber Traffic Progress Bars (4 columns) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-zinc-900">Sumber Traffic</h3>
                    <p className="text-xs text-zinc-500">Distribusi kunjungan bulan ini</p>
                </div>

                <div className="space-y-4 my-4">
                    {stats.trafficSources.map((source, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-zinc-700 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }}></span>
                                    {source.name}
                                </span>
                                <span className="text-zinc-900 font-bold">{source.percentage}%</span>
                            </div>
                            <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-400 font-medium text-center">
                    Total Kunjungan: 14.820 pengunjung
                </div>
            </div>
        </div>
    );
}
