import React from "react";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { DashboardHeaderDesktop } from "../components/DashboardDesktop/DashboardHeaderDesktop";
import { MetricCardsDesktop } from "../components/DashboardDesktop/MetricCardsDesktop";
import { ChartsSectionDesktop } from "../components/DashboardDesktop/ChartsSectionDesktop";
import { LatestOrdersDesktop } from "../components/DashboardDesktop/LatestOrdersDesktop";

export function DashboardDesktop() {
    const { stats, isLoading, refreshData } = useDashboardStats();

    return (
        <div className="p-6 lg:p-8 space-y-6 font-geist bg-[#f8fafc] min-h-screen text-zinc-900 animate-in fade-in duration-300">
            {/* Top Header Bar */}
            <DashboardHeaderDesktop isLoading={isLoading} onRefresh={refreshData} />

            {/* 4 Metric Cards */}
            <MetricCardsDesktop stats={stats} />

            {/* Tren Penjualan & Produk Terlaris */}
            <ChartsSectionDesktop stats={stats} />

            {/* Pesanan Terbaru */}
            <LatestOrdersDesktop stats={stats} />
        </div>
    );
}
