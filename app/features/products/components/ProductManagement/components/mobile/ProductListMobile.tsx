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
}

export function ProductListMobile({
  loading,
  filteredProducts,
  handleOpenEditForm,
  setDeleteConfirmId,
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

  return (
    <div className="flex flex-col gap-3 w-full">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] flex gap-3 items-center justify-between shadow-xs"
        >
          <div className="w-14 h-14 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-[#94A3B8]" />
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <p className="font-semibold text-xs text-[#0F172A] truncate">{product.title}</p>
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
      ))}
    </div>
  );
}
