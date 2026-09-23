import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useTrackOrder } from "~/hooks/useTrackOrder";
import { BreadTrackOrderDetailDesktop } from "~/components/template/breadcrumb/BreadTrackOrderDetailDesktop";
import { Button } from "~/components/ui/button";
import {
  ArrowLeft,
  PackageCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Copy,
  Check,
  Truck,
  CreditCard,
} from "lucide-react";

export function TrackOrderDetailDesktop() {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id") || "ORD-892341";

  const { order, trackOrder, isLoading } = useTrackOrder();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackOrder(queryId);
  }, [queryId, trackOrder]);

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen">
      {/* Breadcrumb Header */}
      <BreadTrackOrderDetailDesktop />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-24">
        {/* Navigation & Header Title */}
        <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-6 mb-8">
          <div className="space-y-1">
            <Link
              to="/track-order"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B6392] hover:underline mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Cari Pesanan</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191C1E] tracking-tight">
              Detail Status Pesanan #{order?.id || queryId}
            </h1>
            <p className="text-xs text-[#5F6C72]">
              Laporan status pengiriman dan rincian transaksi secara real-time.
            </p>
          </div>

          <Button asChild variant="outline" className="border-[#E4E7E9] text-xs font-bold text-[#191C1E]">
            <Link to="/track-order">+ Lacak Pesanan Lain</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#FA8232] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#5F6C72] font-medium">Memuat detail pesanan...</p>
          </div>
        ) : order ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Order Status Header Card */}
            <div className="bg-[#F2F4F5] rounded-xl p-6 border border-[#E4E7E9] space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E7E9] pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-[#191C1E]">
                      Pesanan #{order.id}
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      Dalam Pengiriman
                    </span>
                  </div>
                  <p className="text-xs text-[#5F6C72] mt-1">
                    Tanggal Transaksi: {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-[#5F6C72]">
                  <div>
                    <span className="text-xs text-[#77878F] block">Kurir Pengiriman</span>
                    <span className="font-semibold text-[#191C1E]">{order.carrier}</span>
                  </div>
                  <div className="h-8 w-[1px] bg-[#E4E7E9]" />
                  <div>
                    <span className="text-xs text-[#77878F] block">Nomor Resi</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#191C1E]">{order.trackingNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyTracking(order.trackingNumber)}
                        className="p-1 hover:bg-zinc-200 rounded text-[#5F6C72] cursor-pointer"
                        title="Salin Resi"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Steps Indicator */}
              <div className="py-2">
                <div className="grid grid-cols-5 gap-2 relative">
                  {order.timeline.map((step, idx) => (
                    <div key={step.title} className="flex flex-col items-center text-center relative">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors ${
                          step.completed
                            ? "bg-[#00a884] text-white"
                            : "bg-white text-zinc-400 border border-[#E4E7E9]"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs font-semibold mt-2 ${step.completed ? "text-[#191C1E]" : "text-[#77878F]"}`}>
                        {step.title}
                      </span>
                      <span className="text-[11px] text-[#77878F] mt-0.5 max-w-[120px] truncate">
                        {step.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Details & Order Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Cols: Detailed Activity Timeline */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E4E7E9] p-6 space-y-6">
                <h3 className="text-base font-bold text-[#191C1E] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FA8232]" />
                  Riwayat Aktivitas Pengiriman
                </h3>

                <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E7E9]">
                  {order.timeline.map((event) => (
                    <div key={event.title} className="relative flex items-start gap-4">
                      <div
                        className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                          event.current
                            ? "bg-[#FA8232] animate-pulse"
                            : event.completed
                            ? "bg-[#00a884]"
                            : "bg-[#E4E7E9]"
                        }`}
                      />
                      <div className="flex-1 bg-[#F2F4F5] p-3.5 rounded-lg border border-[#E4E7E9] space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#191C1E]">
                            {event.title}
                          </h4>
                          <span className="text-[11px] text-[#77878F]">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-[#5F6C72]">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Col: Shipping Address & Items Summary */}
              <div className="space-y-6">
                {/* Shipping Address Card */}
                <div className="bg-white rounded-xl border border-[#E4E7E9] p-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#191C1E] flex items-center gap-2 border-b border-[#E4E7E9] pb-2">
                    <MapPin className="w-4 h-4 text-[#FA8232]" />
                    Alamat Pengiriman
                  </h4>
                  <div className="text-xs text-[#5F6C72] space-y-0.5">
                    <p className="font-bold text-[#191C1E]">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}</p>
                    <p className="text-[#77878F] pt-1">Telp: {order.shippingAddress.phone}</p>
                  </div>
                </div>

                {/* Items & Payment Summary Card */}
                <div className="bg-white rounded-xl border border-[#E4E7E9] p-5 space-y-3">
                  <h4 className="text-xs font-bold text-[#191C1E] flex items-center gap-2 border-b border-[#E4E7E9] pb-2">
                    <PackageCheck className="w-4 h-4 text-[#FA8232]" />
                    Rincian Produk Dipesan
                  </h4>
                  <div className="space-y-2.5">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-md object-cover border border-[#E4E7E9] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#191C1E] truncate">{item.title}</p>
                          <p className="text-[11px] text-[#77878F]">{item.quantity} x Rp {item.price.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E4E7E9] pt-3 space-y-1.5 text-xs text-[#5F6C72]">
                    <div className="flex justify-between">
                      <span>Subtotal Produk</span>
                      <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkos Kirim</span>
                      <span>Rp {order.shippingCost.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs text-[#191C1E] pt-2 border-t border-[#E4E7E9]">
                      <span>Total Pembayaran</span>
                      <span className="text-[#2DA5F3]">Rp {order.total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-[#5F6C72]">Pesanan tidak ditemukan.</p>
            <Button asChild variant="default" className="bg-[#FA8232] text-white text-xs font-bold">
              <Link to="/track-order">Cari Pesanan Lain</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
