import { useEffect, useState } from "react";
import { MessageSquare, Users, Activity, Clock, CheckCircle } from "lucide-react";

interface ActivityLog {
    ID: number;
    CreatedAt: string;
    Type: string;
    Sender: string;
    Description: string;
}

export default function DashboardIndex() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/activities`)
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    setActivities(data.data);
                }
            })
            .catch(err => console.error("Gagal memuat aktivitas:", err));
    }, []);

    const formatTime = (isoString: string) => {
        const d = new Date(isoString);
        return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " - " + d.toLocaleDateString("id-ID");
    };

    return (
        <div className="p-6 lg:p-10 space-y-8 font-geist animate-in fade-in duration-500">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#119DA4] to-[#0D7C82] p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">
                        Dashboard Utama Bot
                    </h1>
                    <p className="text-white/80 text-lg w-full md:max-w-[80%] pr-4 leading-relaxed">
                        Pantau seluruh aktivitas bot WhatsApp secara real-time. Semua pesan yang masuk akan dicatat dan dihubungkan langsung ke Google Sheets Anda.
                    </p>
                </div>
                {/* Decorative overlay */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-12" />
                <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Total Pesan",
                        value: activities.length,
                        icon: MessageSquare,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                    },
                    {
                        title: "Status Bot",
                        value: "Aktif",
                        icon: CheckCircle,
                        color: "text-green-600",
                        bg: "bg-green-50",
                    },
                    {
                        title: "Interaksi Pengguna",
                        value: new Set(activities.map(a => a.Sender)).size,
                        icon: Users,
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                    },
                    {
                        title: "Log Google Sheets",
                        value: "Terhubung",
                        icon: Activity,
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-full ${stat.bg}`}>
                                <stat.icon
                                    className={`w-6 h-6 ${stat.color}`}
                                />
                            </div>
                        </div>
                        <h3 className="text-zinc-500 text-sm font-medium">
                            {stat.title}
                        </h3>
                        <p className="text-2xl font-bold text-zinc-900 mt-1">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100">
                    <h2 className="text-xl font-bold text-zinc-800">
                        Aktivitas Terkini
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-500">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Tipe</th>
                                <th className="px-6 py-4 font-semibold">Pengirim</th>
                                <th className="px-6 py-4 font-semibold">Pesan</th>
                                <th className="px-6 py-4 font-semibold">Waktu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {activities.length > 0 ? (
                                activities.map((item, i) => (
                                    <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-blue-50 rounded-full">
                                                    <MessageSquare className="w-4 h-4 text-blue-500" />
                                                </div>
                                                <span className="font-medium text-zinc-900">{item.Type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-zinc-800">
                                            {/^\d+$/.test(item.Sender) ? `+${item.Sender}` : item.Sender}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 truncate max-w-xs">
                                            "{item.Description}"
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatTime(item.CreatedAt)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-zinc-500">
                                        Belum ada aktivitas terekam.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
