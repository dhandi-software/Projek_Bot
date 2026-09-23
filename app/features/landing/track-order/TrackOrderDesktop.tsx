import { useState } from "react";
import { useNavigate } from "react-router";
import { BreadTrackOrderDesktop } from "~/components/template/breadcrumb/BreadTrackOrderDesktop";
import { Button } from "~/components/ui/button";
import {
  ArrowRight,
  Info,
  HelpCircle,
  Truck,
  Headphones,
} from "lucide-react";

export function TrackOrderDesktop() {
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
        {/* Breadcrumb Header */}
        <BreadTrackOrderDesktop />

        {/* Main Track Order Form Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-16">
          <div className="space-y-6">
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#191C1E] tracking-tight">
              Track Order
            </h1>

            {/* Description Paragraph */}
            <p className="text-[#5F6C72] text-sm leading-relaxed">
              To track your order please enter your order ID in the input field below and press the “Track Order” button. this was given to you on your receipt and in the confirmation email you should have received.
            </p>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6 pt-2">
              {/* Input Grid (2 Equal Columns on Desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order ID Field */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#191C1E] block">
                    Order ID
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="ID..."
                    className="w-full h-11 px-4 bg-white border border-[#E4E7E9] rounded-md text-sm text-[#191C1E] placeholder-[#929FA5] focus:outline-none focus:border-[#FA8232] focus:ring-1 focus:ring-[#FA8232] transition-all"
                  />
                </div>

                {/* Billing Email Field */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-[#191C1E] block">
                    Billing Email
                  </label>
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Email address"
                    className="w-full h-11 px-4 bg-white border border-[#E4E7E9] rounded-md text-sm text-[#191C1E] placeholder-[#929FA5] focus:outline-none focus:border-[#FA8232] focus:ring-1 focus:ring-[#FA8232] transition-all"
                  />
                </div>
              </div>

              {/* Helper Info Message */}
              <div className="flex items-center gap-2 text-xs text-[#5F6C72]">
                <Info className="w-4 h-4 text-[#77878F] shrink-0" />
                <span>Order ID that we send to you in your email address.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="bg-[#FA8232] hover:bg-[#de6c20] text-white font-bold text-sm tracking-wider uppercase h-12 px-8 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <span>TRACK ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm font-medium mt-4">
                {error}
              </div>
            )}

            {/* Helper Info Cards Section */}
            <div className="mt-16 pt-10 border-t border-[#E4E7E9]">
              <h3 className="text-sm font-bold text-[#191C1E] uppercase tracking-wider mb-6">
                Informasi & Panduan Pengiriman
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-[#F2F4F5] p-6 rounded-xl border border-[#E4E7E9] space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E7E9] flex items-center justify-center text-[#FA8232]">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#191C1E]">
                    Dimana Saya Menemukan Order ID?
                  </h4>
                  <p className="text-xs text-[#5F6C72] leading-relaxed">
                    Order ID (contoh: ORD-892341) tercantum dalam email konfirmasi pesanan dan struk pembayaran yang Anda terima saat checkout.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#F2F4F5] p-6 rounded-xl border border-[#E4E7E9] space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E7E9] flex items-center justify-center text-[#2DA5F3]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#191C1E]">
                    Estimasi Waktu Pengiriman
                  </h4>
                  <p className="text-xs text-[#5F6C72] leading-relaxed">
                    Pengiriman Reguler memerlukan 2-4 hari kerja tergantung lokasi tujuan dan layanan kurir yang Anda pilih saat checkout.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#F2F4F5] p-6 rounded-xl border border-[#E4E7E9] space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E7E9] flex items-center justify-center text-emerald-600">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#191C1E]">
                    Butuh Bantuan Lebih Lanjut?
                  </h4>
                  <p className="text-xs text-[#5F6C72] leading-relaxed">
                    Tim Customer Support kami siap membantu Anda 24/7. Hubungi kami melalui WhatsApp atau telepon di (629) 555-0129.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
