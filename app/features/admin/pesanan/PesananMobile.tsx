import {
    ShoppingBag,
    Search,
    RefreshCw,
    CheckCircle2,
    Clock,
    XCircle,
    AlertTriangle,
    Eye,
    Download,
    Package,
    X,
    Wifi,
    CreditCard,
    User,
    Calendar,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAdminOrders } from "~/hooks/useAdminOrders";

export function PesananMobile() {
    const {
        filteredOrders,
        stats,
        isLoading,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        selectedOrder,
        setSelectedOrder,
        isDownloadingInvoice,
        wsConnected,
        fetchOrders,
        formatRupiah,
        formatDate,
        formatPaymentType,
        handleDownloadInvoice,
    } = useAdminOrders();

    const getStatusBadge = (status: string) => {
        const st = (status || "").toLowerCase();
        if (st === "paid" || st === "settlement") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Sudah Dibayar
                </span>
            );
        }
        if (st === "pending") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3 h-3" />
                    Menunggu Bayar
                </span>
            );
        }
        if (st === "challenge") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    <AlertTriangle className="w-3 h-3" />
                    Challenge
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <XCircle className="w-3 h-3" />
                Gagal
            </span>
        );
    };

    return (
        <div className="w-full min-h-screen bg-zinc-50 p-4 space-y-4 pb-20">
            {/* Header Section */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Pesanan Customer</h1>
                    <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            wsConnected
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-zinc-100 text-zinc-600 border-zinc-200"
                        }`}
                    >
                        <Wifi className={`w-2.5 h-2.5 ${wsConnected ? "animate-pulse text-emerald-600" : "text-zinc-400"}`} />
                        {wsConnected ? "Live" : "Offline"}
                    </span>
                </div>
                <p className="text-xs text-zinc-500">Daftar transaksi produk customer.</p>

                <div className="pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchOrders}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border-zinc-200 text-xs text-zinc-700"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh Pesanan
                    </Button>
                </div>
            </div>

            {/* Stats Overview Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <div className="bg-white p-3 rounded-xl border border-zinc-200 shrink-0 w-32 shadow-xs">
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Total</span>
                    <span className="text-lg font-bold text-zinc-900">{stats.total}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-zinc-200 shrink-0 w-36 shadow-xs">
                    <span className="text-[10px] text-emerald-600 uppercase font-semibold block">Lunas</span>
                    <span className="text-lg font-bold text-emerald-600">{stats.paidCount}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-zinc-200 shrink-0 w-36 shadow-xs">
                    <span className="text-[10px] text-amber-600 uppercase font-semibold block">Pending</span>
                    <span className="text-lg font-bold text-amber-600">{stats.pendingCount}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-zinc-200 shrink-0 w-32 shadow-xs">
                    <span className="text-[10px] text-rose-600 uppercase font-semibold block">Gagal</span>
                    <span className="text-lg font-bold text-rose-600">{stats.failedCount}</span>
                </div>
            </div>

            {/* Filter Tabs & Search */}
            <div className="bg-white p-3 rounded-2xl border border-zinc-200 space-y-3 shadow-xs">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Cari Order ID / Nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {[
                        { id: "all", label: "Semua", count: stats.total },
                        { id: "paid", label: "Dibayar", count: stats.paidCount },
                        { id: "pending", label: "Pending", count: stats.pendingCount },
                        { id: "failed", label: "Gagal", count: stats.failedCount },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setStatusFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                statusFilter === tab.id
                                    ? "bg-[#00a884] text-white shadow-xs"
                                    : "bg-zinc-100 text-zinc-600"
                            }`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Order Cards List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
                        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#00a884]" />
                        Memuat data pesanan...
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-zinc-200 text-center text-zinc-400 text-xs">
                        <Package className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                        Tidak ada pesanan ditemukan.
                    </div>
                ) : (
                    filteredOrders.map((ord) => {
                        const items = ord.order_items || ord.OrderItems || [];
                        const firstTitle = items[0]?.title || "Produk E-Commerce";
                        const itemCount = items.length;

                        return (
                            <div
                                key={ord.id || ord.order_id}
                                className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs space-y-3"
                            >
                                <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                    <div>
                                        <span className="font-bold text-xs font-mono text-zinc-900 block">
                                            {ord.order_id}
                                        </span>
                                        <span className="text-[10px] text-zinc-400">
                                            {formatDate(ord.created_at)}
                                        </span>
                                    </div>
                                    {getStatusBadge(ord.status)}
                                </div>

                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between text-zinc-700">
                                        <span className="text-zinc-400">Pelanggan:</span>
                                        <span className="font-semibold">{ord.customer_name || "Pelanggan Umum"}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-700">
                                        <span className="text-zinc-400">Metode Bayar:</span>
                                        <span className="font-semibold uppercase">{formatPaymentType(ord.payment_type, ord.va_bank)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-700">
                                        <span className="text-zinc-400">Produk:</span>
                                        <span className="font-medium text-right max-w-[180px] truncate">
                                            {firstTitle} {itemCount > 1 ? `(+${itemCount - 1})` : ""}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs pt-1 border-t border-zinc-100 mt-2">
                                        <span className="text-zinc-500 font-semibold">Total:</span>
                                        <span className="font-bold text-sm text-[#00a884]">
                                            {formatRupiah(ord.total_amount || ord.total_price || 0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedOrder(ord)}
                                        className="flex-1 h-9 rounded-xl text-xs text-zinc-700 border-zinc-200"
                                    >
                                        <Eye className="w-3.5 h-3.5 mr-1" />
                                        Detail
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDownloadInvoice(ord.order_id)}
                                        disabled={isDownloadingInvoice}
                                        className="flex-1 h-9 rounded-xl text-xs text-zinc-700 border-zinc-200"
                                    >
                                        <Download className="w-3.5 h-3.5 mr-1 text-[#00a884]" />
                                        Invoice PDF
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Mobile Modal Drawer */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
                    <div
                        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200"
                        style={{ width: "100%" }}
                    >
                        <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
                            <div>
                                <h3 className="font-bold text-sm font-mono text-zinc-900">{selectedOrder.order_id}</h3>
                                <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto space-y-4 text-xs">
                            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 space-y-2">
                                <h4 className="font-bold text-zinc-900 text-xs">Detail Pelanggan</h4>
                                <div className="space-y-1 text-zinc-700">
                                    <p><span className="text-zinc-400">Nama:</span> {selectedOrder.customer_name || "-"}</p>
                                    <p><span className="text-zinc-400">Email:</span> {selectedOrder.customer_email || "-"}</p>
                                    <p><span className="text-zinc-400">Telepon:</span> {selectedOrder.customer_phone || "-"}</p>
                                    <p><span className="text-zinc-400">Alamat:</span> {selectedOrder.shipping_address || "Indonesia"}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-bold text-zinc-900 text-xs">Produk Dibeli</h4>
                                <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200">
                                    {(selectedOrder.order_items || selectedOrder.OrderItems || []).map((it, i) => (
                                        <div key={i} className="p-3 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-semibold text-zinc-900">{it.title}</p>
                                                <p className="text-zinc-400 text-[11px]">{it.quantity} x {formatRupiah(it.price)}</p>
                                            </div>
                                            <span className="font-bold text-zinc-900">{formatRupiah(it.price * it.quantity)}</span>
                                        </div>
                                    ))}
                                    <div className="p-3 bg-zinc-50 flex justify-between font-bold text-xs text-zinc-900">
                                        <span>Total Pembayaran:</span>
                                        <span className="text-[#00a884]">{formatRupiah(selectedOrder.total_amount || selectedOrder.total_price || 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 border-t border-zinc-200 bg-zinc-50 flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 h-10 rounded-xl text-xs text-zinc-700"
                            >
                                Tutup
                            </Button>
                            <Button
                                onClick={() => handleDownloadInvoice(selectedOrder.order_id)}
                                disabled={isDownloadingInvoice}
                                className="flex-1 h-10 rounded-xl bg-[#00a884] hover:bg-[#008f70] text-white text-xs flex items-center justify-center gap-1.5"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Invoice PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
