import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useTrackOrder } from "~/hooks/useTrackOrder";
import { BreadTrackOrderDetailMobile } from "~/components/template/breadcrumb/BreadTrackOrderDetailMobile";
import { Button } from "~/components/ui/button";
import {
  ArrowLeft,
  PackageCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Copy,
  Check,
} from "lucide-react";

export function TrackOrderDetailMobile() {
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
      {/* Mobile Breadcrumb Header */}
      <BreadTrackOrderDetailMobile />

      {/* Main Container */}
      <div className="py-6 px-4 space-y-6">
        {/* Navigation & Header Title */}
        <div className="space-y-2 border-b border-[#E4E7E9] pb-4">
          <Link
            to="/track-order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B6392] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Lacak Pesanan</span>
          </Link>
          <h1 className="text-xl font-extrabold text-[#191C1E] tracking-tight">
            Detail Pesanan #{order?.id || queryId}
          </h1>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2">
            <div className="w-7 h-7 border-2 border-[#2DA5F3] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#5F6C72]">Memuat detail pesanan...</p>
          </div>
        ) : order ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Card Mobile */}
            <div className="bg-[#F2F4F5] rounded-xl p-4 border border-[#E4E7E9] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E4E7E9] pb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#191C1E]">
                    #{order.id}
                  </h2>
                  <p className="text-[10px] text-[#5F6C72]">
                    {order.date}
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Dalam Pengiriman
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-[#E4E7E9] space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#77878F]">Kurir:</span>
                  <span className="font-semibold text-[#191C1E]">{order.carrier}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#77878F]">No. Resi:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-[#191C1E]">{order.trackingNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyTracking(order.trackingNumber)}
                      className="p-1 text-[#5F6C72]"
                      title="Salin Resi"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-[#E4E7E9] p-4 space-y-4">
              <h3 className="text-xs font-bold text-[#191C1E] flex items-center gap-2 border-b border-[#E4E7E9] pb-2">
                <Clock className="w-3.5 h-3.5 text-[#2DA5F3]" />
                Riwayat Pengiriman
              </h3>

              <div className="relative pl-4 space-y-3.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E7E9]">
                {order.timeline.map((event) => (
                  <div key={event.title} className="relative space-y-0.5">
                    <div
                      className={`absolute -left-4 top-1 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                        event.current
                          ? "bg-[#2DA5F3] animate-pulse"
                          : event.completed
                          ? "bg-[#00a884]"
                          : "bg-[#E4E7E9]"
                      }`}
                    />
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#191C1E]">
                        {event.title}
                      </h4>
                      <span className="text-[10px] text-[#77878F]">
                        {event.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5F6C72]">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Products Summary */}
            <div className="bg-white rounded-xl border border-[#E4E7E9] p-4 space-y-4">
              <h4 className="text-xs font-bold text-[#191C1E] flex items-center gap-2 border-b border-[#E4E7E9] pb-2">
                <MapPin className="w-3.5 h-3.5 text-[#2DA5F3]" />
                Alamat Tujuan
              </h4>
              <div className="text-xs text-[#5F6C72] space-y-0.5">
                <p className="font-bold text-[#191C1E]">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}</p>
              </div>

              <h4 className="text-xs font-bold text-[#191C1E] flex items-center gap-2 border-b border-[#E4E7E9] pt-2 pb-2">
                <PackageCheck className="w-3.5 h-3.5 text-[#2DA5F3]" />
                Barang Dipesan
              </h4>

              <div className="space-y-2.5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2.5">
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

              <div className="border-t border-[#E4E7E9] pt-3 flex justify-between font-bold text-xs text-[#191C1E]">
                <span>Total Pembayaran</span>
                <span className="text-[#2DA5F3]">Rp {order.total.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full text-xs font-bold border-[#E4E7E9]">
              <Link to="/track-order">Lacak Pesanan Lain</Link>
            </Button>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <p className="text-xs text-[#5F6C72]">Pesanan tidak ditemukan.</p>
            <Button asChild variant="default" className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold w-full">
              <Link to="/track-order">Cari Pesanan Lain</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
