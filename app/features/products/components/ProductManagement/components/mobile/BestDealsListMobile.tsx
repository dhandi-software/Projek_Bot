import React from "react";
import { Flame, Clock, Edit3, Image as ImageIcon } from "lucide-react";
import type { ProductItem } from "~/types/product";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { formatTimeRemaining } from "~/hooks/useBestDeals";

interface BestDealsListMobileProps {
  loading: boolean;
  products: ProductItem[];
  handleOpenEditForm: (product: ProductItem) => void;
}

export function BestDealsListMobile({
  loading,
  products,
  handleOpenEditForm,
}: BestDealsListMobileProps) {
  const bestDealProducts = products.filter((p) => p.is_best_deal);

  if (loading) {
    return (
      <div className="py-8 text-center text-[#64748B] text-xs">
        Memuat data Best Deals...
      </div>
    );
  }

  if (bestDealProducts.length === 0) {
    return (
      <div className="py-8 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0] p-4">
        <Flame className="w-6 h-6 text-zinc-300 mx-auto mb-1" />
        <p className="font-semibold text-xs text-[#0F172A]">Belum ada produk Best Deals</p>
        <p className="text-[10px]">Edit produk untuk mengaktifkan Best Deals.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {bestDealProducts.map((product) => {
        const expiresAt = product.best_deal_expires_at
          ? new Date(product.best_deal_expires_at).getTime()
          : null;
        const isExpired = expiresAt ? expiresAt <= Date.now() : false;
        const timeRemaining = formatTimeRemaining(product.best_deal_expires_at);

        return (
          <div
            key={product.id}
            className="bg-white p-3 rounded-xl border border-orange-200 flex flex-col gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-3 justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-[#94A3B8]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-xs text-[#0F172A] truncate">{product.title}</p>
                <p className="text-xs font-bold text-[#FA8232]">
                  Rp {(product.price || 0).toLocaleString("id-ID")}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleOpenEditForm(product)}
                className="!h-7 !px-2 rounded bg-orange-50 text-[#FA8232] hover:bg-[#FA8232] hover:text-white text-[10px] font-bold"
              >
                <Edit3 className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
              <span className={cn(
                "font-semibold px-2 py-0.5 rounded-full text-[10px]",
                isExpired ? "bg-zinc-100 text-zinc-600" : "bg-emerald-50 text-emerald-700"
              )}>
                {isExpired ? "Expired" : "🔥 Best Deal Active"}
              </span>

              <span className="font-mono font-bold text-[#FA8232]">
                {timeRemaining}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
