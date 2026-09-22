import React from "react";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { DashboardHeaderMobile } from "../components/DashboardMobile/DashboardHeaderMobile";
import { MetricCardsMobile } from "../components/DashboardMobile/MetricCardsMobile";
import { ChartsSectionMobile } from "../components/DashboardMobile/ChartsSectionMobile";
import { SecondaryAnalyticsMobile } from "../components/DashboardMobile/SecondaryAnalyticsMobile";
import { LatestOrdersMobile } from "../components/DashboardMobile/LatestOrdersMobile";

export function DashboardMobile() {
    const { stats, isLoading, refreshData, heatmapDays, getHeatmapColor } = useDashboardStats();

    return (
        <div className="p-3.5 space-y-4 font-geist bg-zinc-50/80 min-h-screen text-zinc-900 animate-in fade-in duration-300 pb-16">
            {/* Header */}
            <DashboardHeaderMobile isLoading={isLoading} onRefresh={refreshData} />

            {/* Metric Overview Grid */}
            <MetricCardsMobile stats={stats} />

            {/* Charts & Target Donut */}
            <ChartsSectionMobile stats={stats} />

            {/* Heatmap, Bar Chart & Traffic */}
            <SecondaryAnalyticsMobile
                stats={stats}
                heatmapDays={heatmapDays}
                getHeatmapColor={getHeatmapColor}
            />

            {/* Recent Orders List */}
            <LatestOrdersMobile stats={stats} />
        </div>
    );
}
