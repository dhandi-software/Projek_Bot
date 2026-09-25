import React from "react";
import { Edit3, Trash2, RefreshCw, Image as ImageIcon } from "lucide-react";
import type { ProductItem } from "~/types/product";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ProductListMobileProps {
  loading: boolean;
  filteredProducts: ProductItem[];
  handleOpenEditForm: (product: ProductItem) => void;
  setDeleteConfirmId: (id: number | string | null) => void;
  recentlyUpdatedIds?: Set<string | number>;
}

export function ProductListMobile({
  loading,
  filteredProducts,
  handleOpenEditForm,
  setDeleteConfirmId,
  recentlyUpdatedIds,
}: ProductListMobileProps) {
  if (loading) {
    return (
      <div className="py-12 text-center text-[#64748B] text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#1D4ED8]" />
        Memuat data produk...
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-12 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0] p-6">
        <p className="font-semibold text-sm text-[#0F172A] mb-1">Tidak ada produk</p>
        <p className="text-xs">Silakan tambah produk baru atau sesuaikan kata kunci pencarian.</p>
      </div>
    );
  }

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-3 w-full">
      {paginatedProducts.map((product) => {
        const isUpdated = Boolean(
          recentlyUpdatedIds?.has(product.id) || recentlyUpdatedIds?.has(String(product.id))
        );

        return (
          <div
            key={product.id}
            className={cn(
              "bg-white p-3.5 rounded-xl border border-[#E2E8F0] flex gap-3 items-center justify-between shadow-xs",
              isUpdated && "bg-blue-50/40 border-blue-200"
            )}
          >
            <div className="w-14 h-14 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
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
                <ImageIcon className="w-6 h-6 text-[#94A3B8]" />
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-semibold text-xs text-[#0F172A] truncate">{product.title}</p>
                {isUpdated && (
                  <span className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                    <span className="w-1 h-1 rounded-full bg-[#1D4ED8]" />
                    Diperbarui
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#64748B] font-mono">{product.sku}</p>
              <p className="text-xs font-bold text-[#1D4ED8]">
                Rp {(product.price || 0).toLocaleString("id-ID")}
              </p>
            </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleOpenEditForm(product)}
              className={cn(
                "!w-[2.5rem] !h-[2.5rem] !p-0 rounded-md text-[#475569] hover:text-[#1D4ED8] hover:bg-[#F1F5F9] cursor-pointer",
                "[&_svg]:!w-4 [&_svg]:!h-4"
              )}
              aria-label="Edit Produk"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setDeleteConfirmId(product.id)}
              className={cn(
                "!w-[2.5rem] !h-[2.5rem] !p-0 rounded-md text-[#475569] hover:text-red-600 hover:bg-red-50 cursor-pointer",
                "[&_svg]:!w-4 [&_svg]:!h-4"
              )}
              aria-label="Hapus Produk"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            </div>
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="pt-2 flex items-center justify-between text-xs text-[#64748B]">
          <span>
            {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} / {filteredProducts.length}
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
