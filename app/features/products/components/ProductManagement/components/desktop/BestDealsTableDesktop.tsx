import React from "react";
import { Flame, Clock, Edit3, Power, RefreshCw, Image as ImageIcon } from "lucide-react";
import type { ProductItem } from "~/types/product";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { formatTimeRemaining } from "~/hooks/useBestDeals";

interface BestDealsTableDesktopProps {
  loading: boolean;
  products: ProductItem[];
  handleOpenEditForm: (product: ProductItem) => void;
  onRefresh?: () => void;
}

export function BestDealsTableDesktop({
  loading,
  products,
  handleOpenEditForm,
}: BestDealsTableDesktopProps) {
  const bestDealProducts = products.filter((p) => p.is_best_deal);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs space-y-0">
      <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#FA8232] text-white">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Daftar Best Deals Aktif & Riwayat</h3>
            <p className="text-[11px] text-zinc-500">
              Menampilkan semua produk yang diset sebagai Best Deals oleh Admin.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#FA8232] bg-white px-3 py-1 rounded-full border border-orange-200">
          {bestDealProducts.length} Produk Best Deals
        </span>
      </div>

      {loading ? (
        <div className="p-12 text-center text-[#64748B]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FA8232]" />
          Memuat data Best Deals...
        </div>
      ) : bestDealProducts.length === 0 ? (
        <div className="p-12 text-center text-[#64748B]">
          <Flame className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
          <p className="font-semibold text-base text-[#0F172A] mb-1">Belum Ada Produk Best Deals</p>
          <p className="text-xs text-[#64748B]">
            Edit produk pada tabel utama dan aktifkan centang "Aktifkan Best Deals" untuk menetapkan penawaran khusus.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-medium text-xs">
                <th className="py-3.5 px-4">Gambar</th>
                <th className="py-3.5 px-4">Nama Produk</th>
                <th className="py-3.5 px-4">Harga Normal</th>
                <th className="py-3.5 px-4">Status Deal</th>
                <th className="py-3.5 px-4">Waktu Kedaluwarsa</th>
                <th className="py-3.5 px-4">Sisa Waktu</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {bestDealProducts.map((product) => {
                const expiresAt = product.best_deal_expires_at
                  ? new Date(product.best_deal_expires_at).getTime()
                  : null;
                const isExpired = expiresAt ? expiresAt <= Date.now() : false;
                const timeRemaining = formatTimeRemaining(product.best_deal_expires_at);

                return (
                  <tr key={product.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-[#94A3B8]" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#0F172A] line-clamp-1">{product.title}</p>
                      <p className="text-xs text-[#64748B] font-mono">{product.sku}</p>
                    </td>

                    <td className="py-3 px-4 font-semibold text-[#0F172A]">
                      Rp {(product.price || 0).toLocaleString("id-ID")}
                    </td>

                    <td className="py-3 px-4">
                      {isExpired ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Flame className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                          Aktif
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-xs font-medium text-zinc-600">
                      {product.best_deal_expires_at
                        ? new Date(product.best_deal_expires_at).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    <td className="py-3 px-4">
                      <span className={cn(
                        "text-xs font-mono font-bold px-2 py-1 rounded",
                        isExpired ? "text-zinc-400 bg-zinc-100" : "text-[#FA8232] bg-orange-50 border border-orange-200"
                      )}>
                        {timeRemaining}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEditForm(product)}
                        className={cn(
                          "!h-8 !px-3 rounded-md text-xs font-semibold bg-[#FA8232]/10 text-[#FA8232] hover:bg-[#FA8232] hover:text-white cursor-pointer transition-colors",
                          "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
                        )}
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1" />
                        Edit Deal
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
