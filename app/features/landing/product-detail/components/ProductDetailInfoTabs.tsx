import * as React from "react";
import { Check, Truck, ShieldCheck, RotateCcw, Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ProductItem } from "../pages/UseProductDetail";

interface ProductDetailInfoTabsProps {
  activeTab: "description" | "additional" | "specification" | "reviews";
  setActiveTab: (tab: "description" | "additional" | "specification" | "reviews") => void;
  product: ProductItem;
}

export function ProductDetailInfoTabs({ activeTab, setActiveTab, product }: ProductDetailInfoTabsProps) {
  return (
    <div className="mt-12 border-t border-slate-200 pt-8 space-y-6">
      {/* Tabs Bar */}
      <div className="flex items-center justify-center gap-8 border-b border-slate-200 pb-3">
        {(["description", "additional", "specification", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-extrabold uppercase tracking-wider transition-colors pb-3 -mb-3 border-b-2 cursor-pointer ${activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
          >
            {tab === "description"
              ? "Description"
              : tab === "additional"
                ? "Additional Information"
                : tab === "specification"
                  ? "Specifications"
                  : `Customer Reviews (${product.reviewsCount})`}
          </button>
        ))}
      </div>

      {/* Tab Contents (Matching Design Screenshot 3-Column Layout) */}
      {activeTab === "description" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-2 text-xs text-slate-600">
          {/* COLUMN 1: Description Text (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900">
              Description
            </h3>
            <p className="text-slate-500 leading-relaxed text-xs">
              {product.description}
            </p>
            <p className="text-slate-500 leading-relaxed text-xs">
              Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
            </p>
          </div>

          {/* COLUMN 2: Features List (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-slate-100 lg:pl-6">
            <h3 className="font-extrabold text-sm text-slate-900">
              Feature
            </h3>
            <ul className="space-y-3">
              {(product.features && product.features.length > 0
                ? product.features
                : [
                    "Free 1 Year Warranty",
                    "Free Shipping & Fasted Delivery",
                    "100% Money-back guarantee",
                    "24/7 Customer support",
                    "Secure payment method",
                  ]
              ).map((featItem, idx) => {
                const lower = featItem.toLowerCase();
                let IconComp = Check;
                if (lower.includes("warranty") || lower.includes("garansi")) IconComp = ShieldCheck;
                else if (lower.includes("shipping") || lower.includes("delivery") || lower.includes("pengiriman")) IconComp = Truck;
                else if (lower.includes("money") || lower.includes("guarantee") || lower.includes("kembali")) IconComp = RotateCcw;
                else if (lower.includes("support") || lower.includes("customer") || lower.includes("layanan")) IconComp = Share2;

                return (
                  <li key={idx} className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                    <div className="size-8 rounded-lg border border-orange-200 bg-orange-50/50 flex items-center justify-center shrink-0">
                      <IconComp className="size-4 text-orange-500" />
                    </div>
                    <span>{featItem}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 3: Shipping Information (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4 lg:border-l lg:border-slate-100 lg:pl-6">
            <h3 className="font-extrabold text-sm text-slate-900">
              Shipping Information
            </h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="font-bold text-slate-800">Courier: </span>
                <span className="text-slate-500">{product.shippingWarranty?.courier || "2 - 4 days, free shipping"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Local Shipping: </span>
                <span className="text-slate-500">{product.shippingWarranty?.deliveryTime || "up to one week, $19.00"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">UPS Ground Shipping: </span>
                <span className="text-slate-500">4 - 6 days, $29.00</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Unishop Global Export: </span>
                <span className="text-slate-500">3 - 4 days, $39.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "additional" && (
        <div className="w-full">
          <table className="w-full text-xs text-left border-collapse rounded-xl overflow-hidden border border-slate-200">
            <tbody>
              <tr className="bg-slate-50 border-b border-slate-200">
                <td className="py-3 px-4 font-bold text-slate-900 w-1/4">Weight</td>
                <td className="py-3 px-4 text-slate-700">{product.additionalInfo?.weight || "2.16 kg"}</td>
              </tr>
              <tr className="bg-white border-b border-slate-200">
                <td className="py-3 px-4 font-bold text-slate-900 w-1/4">Dimensions</td>
                <td className="py-3 px-4 text-slate-700">{product.additionalInfo?.dimensions || "35.57 x 24.81 x 1.68 cm"}</td>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <td className="py-3 px-4 font-bold text-slate-900 w-1/4">Color Options</td>
                <td className="py-3 px-4 text-slate-700">{product.colors.map((c) => c.name).join(", ")}</td>
              </tr>
              <tr className="bg-white border-b border-slate-200">
                <td className="py-3 px-4 font-bold text-slate-900 w-1/4">Warranty</td>
                <td className="py-3 px-4 text-slate-700">{product.additionalInfo?.warranty || "1 Year Official Brand Warranty"}</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 w-1/4">Model Number</td>
                <td className="py-3 px-4 text-slate-700">{product.additionalInfo?.modelNumber || product.sku}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "specification" && (
        <div className="w-full">
          <table className="w-full text-xs text-left border-collapse rounded-xl overflow-hidden border border-slate-200">
            <tbody>
              {Object.entries(product.specs).map(([key, val], idx) => (
                <tr
                  key={key}
                  className={idx % 2 === 0 ? "bg-slate-50 border-b border-slate-200" : "bg-white border-b border-slate-200"}
                >
                  <td className="py-3 px-4 font-bold text-slate-900 w-1/4">
                    {key}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-5 rounded-2xl border border-slate-200 w-full">
            <div>
              <span className="text-3xl font-black text-slate-900">{product.rating}</span>
              <span className="text-xs text-slate-500 font-semibold"> / 5.0 Rating</span>
              <p className="text-xs text-slate-500 pt-1">Berdasarkan {product.reviewsCount} ulasan pembeli</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-xs cursor-pointer">
              Write a Review
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
