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
  recentlyUpdatedIds?: Set<string | number>;
}

export function BestDealsListMobile({
  loading,
  products,
  handleOpenEditForm,
  recentlyUpdatedIds,
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

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [bestDealProducts.length]);

  const totalPages = Math.ceil(bestDealProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = bestDealProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {paginatedProducts.map((product) => {
        const expiresAt = product.best_deal_expires_at
          ? new Date(product.best_deal_expires_at).getTime()
          : null;
        const isExpired = expiresAt ? expiresAt <= Date.now() : false;
        const timeRemaining = formatTimeRemaining(product.best_deal_expires_at);
        const isUpdated = Boolean(
          recentlyUpdatedIds?.has(product.id) || recentlyUpdatedIds?.has(String(product.id))
        );

        return (
          <div
            key={product.id}
            className={cn(
              "bg-white p-3 rounded-xl border border-orange-200 flex flex-col gap-2 shadow-2xs",
              isUpdated && "bg-blue-50/40 border-blue-200"
            )}
          >
            <div className="flex items-center gap-3 justify-between">
              <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-[#94A3B8]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-xs text-[#0F172A] truncate">{product.title}</p>
                  {isUpdated && (
                    <span className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                      <span className="w-1 h-1 rounded-full bg-[#1D4ED8]" />
                      Diperbarui
                    </span>
                  )}
                </div>
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

      {totalPages > 1 && (
        <div className="pt-2 flex items-center justify-between text-xs text-[#64748B]">
          <span>
            {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, bestDealProducts.length)} / {bestDealProducts.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 text-xs px-2.5"
            >
              Prev
            </Button>
            <span className="font-semibold px-1 text-zinc-900">
              {currentPage} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 text-xs px-2.5"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
