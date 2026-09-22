import { useState, useEffect, useCallback } from "react";
import type { DashboardStats, HeatmapDay } from "../types/dashboard.types";

export const defaultStats: DashboardStats = {
    omset: {
        amount: "Rp 128.450.000",
        change: "+12.8%",
        isPositive: true,
        comparison: "vs. bulan lalu",
    },
    totalOrder: {
        count: 1284,
        change: "+8.4%",
        isPositive: true,
        comparison: "vs. bulan lalu",
    },
    averageOrderValue: {
        value: "3.842",
        change: "+15.2%",
        isPositive: true,
        comparison: "vs. bulan lalu",
    },
    returnRate: {
        rate: "Rp 100.039",
        change: "-2.1%",
        isPositive: false,
        comparison: "vs. bulan lalu",
    },
    pencapaianTarget: {
        percentage: 107,
        status: "tercapai",
        realisasi: "Rp 128,4 jt",
        target: "Rp 120 jt",
        surplus: "+Rp 8,4 jt",
    },
    salesTrend: [
        { day: "15 Sep", value: 6.8 },
        { day: "16 Sep", value: 7.5 },
        { day: "17 Sep", value: 6.4 },
        { day: "18 Sep", value: 8.1 },
        { day: "19 Sep", value: 8.9 },
        { day: "20 Sep", value: 11.2 },
        { day: "21 Sep", value: 7.2 },
    ],
    topProducts: [
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
    ],
    monthlyTrends: [
        { month: "Mar", omset: 42, order: 310, target: 50 },
        { month: "Apr", omset: 48, order: 340, target: 55 },
        { month: "Mei", omset: 58, order: 410, target: 60 },
        { month: "Jun", omset: 52, order: 380, target: 65 },
        { month: "Jul", omset: 74, order: 520, target: 70 },
        { month: "Agu", omset: 70, order: 490, target: 75 },
        { month: "Sep", omset: 128.4, order: 1284, target: 120 },
    ],
    trafficSources: [
        { name: "Organik", percentage: 38, color: "#00a884" },
        { name: "Iklan Meta", percentage: 27, color: "#3b82f6" },
        { name: "Tokopedia", percentage: 19, color: "#10b981" },
        { name: "WhatsApp", percentage: 11, color: "#8b5cf6" },
        { name: "Lainnya", percentage: 5, color: "#6b7280" },
    ],
    weeklyOrders: [
        { day: "Sen", orders: 85, returns: 3 },
        { day: "Sel", orders: 110, returns: 5 },
        { day: "Rab", orders: 95, returns: 2 },
        { day: "Kam", orders: 140, returns: 8 },
        { day: "Jum", orders: 165, returns: 6 },
        { day: "Sab", orders: 201, returns: 11 },
        { day: "Min", orders: 145, returns: 4 },
    ],
    latestOrders: [
        {
            id: "#ORD-2026-8841",
            customer: "Budi Santoso",
            items: "Sepatu Lari Ultraboost Pro",
            total: "Rp 2.998.000",
            paymentMethod: "Transfer Bank",
            status: "Selesai",
            date: "21 Sep 2026",
            time: "10:45",
        },
        {
            id: "#ORD-2026-8840",
            customer: "Siti Rahayu",
            items: "Smartwatch Series 9 Sport",
            total: "Rp 4.999.000",
            paymentMethod: "OVO",
            status: "Dikirim",
            date: "21 Sep 2026",
            time: "09:30",
        },
        {
            id: "#ORD-2026-8839",
            customer: "Ahmad Fauzi",
            items: "Kemeja Batik Parang Rusak",
            total: "Rp 1.047.000",
            paymentMethod: "GoPay",
            status: "Diproses",
            date: "20 Sep 2026",
            time: "16:20",
        },
        {
            id: "#ORD-2026-8838",
            customer: "Dewi Lestari",
            items: "Celana Jogger Premium",
            total: "Rp 449.000",
            paymentMethod: "QRIS",
            status: "Dibayar",
            date: "20 Sep 2026",
            time: "14:15",
        },
    ],
};

export const heatmapDays: HeatmapDay[] = [
    { day: "01", level: 1 }, { day: "02", level: 2 }, { day: "03", level: 2 }, { day: "04", level: 3 }, { day: "05", level: 4 }, { day: "06", level: 5 }, { day: "07", level: 3 },
    { day: "08", level: 2 }, { day: "09", level: 3 }, { day: "10", level: 4 }, { day: "11", level: 4 }, { day: "12", level: 5 }, { day: "13", level: 5 }, { day: "14", level: 4 },
    { day: "15", level: 3 }, { day: "16", level: 4 }, { day: "17", level: 5 }, { day: "18", level: 3 }, { day: "19", level: 4 }, { day: "20", level: 5 }, { day: "21", level: 4 },
    { day: "22", level: 2 }, { day: "23", level: 3 }, { day: "24", level: 4 }, { day: "25", level: 5 }, { day: "26", level: 5 }, { day: "27", level: 4 }, { day: "28", level: 3 },
];

export const getHeatmapColor = (level: number) => {
    switch (level) {
        case 1: return "bg-emerald-50 text-emerald-800 border-emerald-100";
        case 2: return "bg-emerald-100 text-emerald-900 border-emerald-200";
        case 3: return "bg-emerald-300 text-emerald-950 font-bold border-emerald-400";
        case 4: return "bg-emerald-500 text-white font-bold border-emerald-600 shadow-sm";
        case 5: return "bg-[#00a884] text-white font-black border-[#0d7c82] shadow-md scale-105";
        default: return "bg-zinc-100 text-zinc-500";
    }
};

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats>(defaultStats);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/admin/dashboard/stats`);
            const data = await res.json();
            if (data.data) {
                setStats(data.data);
            }
        } catch (err) {
            console.log("Menggunakan data default statistik:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const refreshData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return {
        stats,
        isLoading,
        refreshData,
        heatmapDays,
        getHeatmapColor,
    };
}
