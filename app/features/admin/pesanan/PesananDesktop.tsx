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
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAdminOrders } from "~/hooks/useAdminOrders";

export function PesananDesktop() {
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sudah Dibayar
                </span>
            );
        }
        if (st === "pending") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                    <Clock className="w-3.5 h-3.5" />
                    Menunggu Pembayaran
                </span>
            );
        }
        if (st === "challenge") {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/80">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Challenge
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
                <XCircle className="w-3.5 h-3.5" />
                Gagal / Kadaluarsa
            </span>
        );
    };

    return (
        <div className="w-full min-h-screen bg-zinc-50/50 p-6 lg:p-8 space-y-6 max-w-none">
            {/* Header Section */}
            <div className="flex items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Manajemen Pesanan Customer</h1>
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                wsConnected
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : "bg-zinc-100 text-zinc-600 border-zinc-200"
                            }`}
                        >
                            <Wifi className={`w-3 h-3 ${wsConnected ? "animate-pulse text-emerald-600" : "text-zinc-400"}`} />
                            {wsConnected ? "Live Sync Active" : "Offline"}
                        </span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-1">
                        Pantau seluruh transaksi customer, verifikasi status pembayaran, dan unduh invoice resmi.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={fetchOrders}
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-xl border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition-colors cursor-pointer"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh Data
                    </Button>
                </div>
            </div>

            {/* KPI Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Pesanan</p>
                        <h3 className="text-2xl font-bold text-zinc-900 mt-1">{stats.total}</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Semua entri transaksi</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sudah Dibayar</p>
                        <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.paidCount}</h3>
                        <p className="text-xs text-emerald-600/80 font-medium mt-0.5">{formatRupiah(stats.paidAmount)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Menunggu Bayar</p>
                        <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.pendingCount}</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Menunggu respon QRIS/VA</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Gagal / Expired</p>
                        <h3 className="text-2xl font-bold text-rose-600 mt-1">{stats.failedCount}</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Dibatalkan / waktu habis</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                        <XCircle className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-xl">
                        {[
                            { id: "all", label: "Semua Pesanan", count: stats.total },
                            { id: "paid", label: "Sudah Dibayar", count: stats.paidCount },
                            { id: "pending", label: "Menunggu Pembayaran", count: stats.pendingCount },
                            { id: "failed", label: "Gagal", count: stats.failedCount },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setStatusFilter(tab.id)}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                    statusFilter === tab.id
                                        ? "bg-white text-zinc-900 shadow-xs"
                                        : "text-zinc-600 hover:text-zinc-900 hover:bg-white/50"
                                }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Cari Order ID, nama, email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Orders Data Table - Full Width Desktop */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                        <thead>
                            <tr className="bg-zinc-50/80 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                <th className="py-4 px-6">Order ID & Tanggal</th>
                                <th className="py-4 px-6">Pelanggan</th>
                                <th className="py-4 px-6">Metode Bayar</th>
                                <th className="py-4 px-6">Total Pembayaran</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/80 text-xs text-zinc-700">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-zinc-400">
                                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00a884]" />
                                        Memuat data pesanan customer...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-zinc-400">
                                        <Package className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                                        Tidak ada pesanan yang sesuai dengan filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((ord) => {
                                    const items = ord.order_items || ord.OrderItems || [];
                                    const firstTitle = items[0]?.title || "Produk E-Commerce";
                                    const itemCount = items.length;

                                    return (
                                        <tr
                                            key={ord.id || ord.order_id}
                                            className="hover:bg-zinc-50/80 transition-colors"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-zinc-900 font-mono">
                                                    {ord.order_id}
                                                </div>
                                                <div className="text-zinc-400 text-[11px] mt-0.5">
                                                    {formatDate(ord.created_at)}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-zinc-900">
                                                    {ord.customer_name || "Pelanggan Umum"}
                                                </div>
                                                <div className="text-zinc-400 text-[11px]">
                                                    {ord.customer_email || ord.customer_phone || "-"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center gap-1.5 uppercase font-medium text-[11px] px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-md border border-zinc-200">
                                                    <CreditCard className="w-3 h-3 text-zinc-500" />
                                                    {formatPaymentType(ord.payment_type, ord.va_bank)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-zinc-900 text-sm">
                                                    {formatRupiah(ord.total_amount || ord.total_price || 0)}
                                                </div>
                                                <div className="text-zinc-400 text-[11px]">
                                                    {firstTitle} {itemCount > 1 ? `(+${itemCount - 1} item lainnya)` : ""}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {getStatusBadge(ord.status)}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedOrder(ord)}
                                                        className="h-8 px-3 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer text-xs"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 mr-1" />
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDownloadInvoice(ord.order_id)}
                                                        disabled={isDownloadingInvoice}
                                                        className="h-8 px-3 rounded-lg border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer text-xs"
                                                        title="Unduh Invoice PDF"
                                                    >
                                                        <Download className="w-3.5 h-3.5 mr-1 text-[#00a884]" />
                                                        Invoice
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
                    <div
                        className="bg-white w-full max-w-3xl lg:max-w-4xl rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
                        style={{ width: "100%", maxWidth: "840px", minWidth: "320px" }}
                    >
                        {/* Modal Header */}
                        <div className="p-6 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-zinc-900 font-mono">
                                        {selectedOrder.order_id}
                                    </h3>
                                    {getStatusBadge(selectedOrder.status)}
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">
                                    Dibuat pada {formatDate(selectedOrder.created_at)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                            {/* Customer Information */}
                            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3">
                                <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#00a884]" />
                                    Informasi Pelanggan
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-zinc-700">
                                    <div>
                                        <span className="text-zinc-400 block text-[11px]">Nama Pembeli</span>
                                        <span className="font-semibold">{selectedOrder.customer_name || "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 block text-[11px]">Email</span>
                                        <span className="font-semibold">{selectedOrder.customer_email || "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 block text-[11px]">Nomor Telepon</span>
                                        <span className="font-semibold">{selectedOrder.customer_phone || "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 block text-[11px]">Metode Pembayaran</span>
                                        <span className="font-semibold uppercase">{formatPaymentType(selectedOrder.payment_type, selectedOrder.va_bank)}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-zinc-400 block text-[11px]">Alamat Pengiriman</span>
                                        <span className="font-medium">{selectedOrder.shipping_address || "Indonesia"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items Table */}
                            <div className="space-y-3">
                                <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                                    <Package className="w-4 h-4 text-[#00a884]" />
                                    Rincian Produk Dibeli
                                </h4>
                                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[11px] uppercase font-semibold">
                                                <th className="py-2.5 px-4">Nama Produk</th>
                                                <th className="py-2.5 px-4 text-center">Jumlah</th>
                                                <th className="py-2.5 px-4 text-right">Harga Satuan</th>
                                                <th className="py-2.5 px-4 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-200 text-zinc-800">
                                            {(selectedOrder.order_items || selectedOrder.OrderItems || []).map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="py-3 px-4 font-medium">{item.title}</td>
                                                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                                                    <td className="py-3 px-4 text-right">{formatRupiah(item.price)}</td>
                                                    <td className="py-3 px-4 text-right font-semibold">
                                                        {formatRupiah(item.price * item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-zinc-50/80 font-bold text-zinc-900 border-t border-zinc-200">
                                                <td colSpan={3} className="py-3 px-4 text-right">Total Pembayaran:</td>
                                                <td className="py-3 px-4 text-right text-sm text-[#00a884]">
                                                    {formatRupiah(selectedOrder.total_amount || selectedOrder.total_price || 0)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-zinc-200 bg-zinc-50/50 flex items-center justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedOrder(null)}
                                className="rounded-xl border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                            >
                                Tutup
                            </Button>
                            <Button
                                onClick={() => handleDownloadInvoice(selectedOrder.order_id)}
                                disabled={isDownloadingInvoice}
                                className="rounded-xl bg-[#00a884] hover:bg-[#008f70] text-white flex items-center gap-2 cursor-pointer"
                            >
                                <Download className="w-4 h-4" />
                                Unduh Invoice PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
