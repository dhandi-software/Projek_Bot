import { useState } from "react";
import { useNavigate } from "react-router";
import { BreadTrackOrderMobile } from "~/components/template/breadcrumb/BreadTrackOrderMobile";
import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  Info,
  HelpCircle,
  Truck,
  Headphones,
} from "lucide-react";

export function TrackOrderMobile() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Silakan masukkan Nomor Pesanan (Order ID).");
      return;
    }
    setError(null);
    navigate(`/track-order/detail?id=${encodeURIComponent(orderId.trim())}`);
  };

  return (
    <div className="w-full bg-white font-sans min-h-screen flex flex-col justify-between">
      <div>
        {/* Mobile Breadcrumb Header */}
        <BreadTrackOrderMobile />

        {/* Main Container */}
        <div className="py-6 px-4 space-y-6">
          <h1 className="text-xl font-extrabold text-[#191C1E] tracking-tight">
            Track Order
          </h1>

          <p className="text-[#5F6C72] text-xs leading-relaxed">
            To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.
          </p>

          {/* Track Order Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#191C1E] block">
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ID..."
                className="w-full h-11 px-3.5 bg-white border border-[#E4E7E9] rounded-md text-sm text-[#191C1E] placeholder-[#929FA5] focus:outline-none focus:border-[#2DA5F3] focus:ring-1 focus:ring-[#2DA5F3]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#191C1E] block">
                Billing Email
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email address"
                className="w-full h-11 px-3.5 bg-white border border-[#E4E7E9] rounded-md text-sm text-[#191C1E] placeholder-[#929FA5] focus:outline-none focus:border-[#2DA5F3] focus:ring-1 focus:ring-[#2DA5F3]"
              />
            </div>

            <div className="flex items-start gap-1.5 text-xs text-[#5F6C72] pt-1">
              <Info className="w-4 h-4 text-[#77878F] shrink-0 mt-0.5" />
              <span>Order ID that we send to you in your email address.</span>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>TRACK ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-md text-xs font-medium">
              {error}
            </div>
          )}

          {/* Mobile Helper Cards */}
          <div className="mt-10 pt-6 border-t border-[#E4E7E9] space-y-4">
            <h3 className="text-xs font-bold text-[#191C1E] uppercase tracking-wider">
              Informasi & Panduan Pengiriman
            </h3>

            <div className="space-y-3">
              <div className="bg-[#F2F4F5] p-4 rounded-lg border border-[#E4E7E9] space-y-1.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#2DA5F3]" />
                  <h4 className="font-bold text-xs text-[#191C1E]">
                    Dimana Saya Menemukan Order ID?
                  </h4>
                </div>
                <p className="text-[11px] text-[#5F6C72] leading-relaxed">
                  Order ID tercantum dalam email konfirmasi pesanan dan struk yang Anda terima saat checkout.
                </p>
              </div>

              <div className="bg-[#F2F4F5] p-4 rounded-lg border border-[#E4E7E9] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2DA5F3]" />
                  <h4 className="font-bold text-xs text-[#191C1E]">
                    Estimasi Pengiriman
                  </h4>
                </div>
                <p className="text-[11px] text-[#5F6C72] leading-relaxed">
                  Pengiriman Reguler memerlukan 2-4 hari kerja tergantung lokasi tujuan Anda.
                </p>
              </div>

              <div className="bg-[#F2F4F5] p-4 rounded-lg border border-[#E4E7E9] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-bold text-xs text-[#191C1E]">
                    Butuh Bantuan?
                  </h4>
                </div>
                <p className="text-[11px] text-[#5F6C72] leading-relaxed">
                  Hubungi Customer Service kami 24/7 di (629) 555-0129.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
