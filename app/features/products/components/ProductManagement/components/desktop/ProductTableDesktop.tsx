import React, { useState, useEffect } from "react";
import { Edit3, Trash2, RefreshCw, Image as ImageIcon } from "lucide-react";
import type { ProductItem } from "~/types/product";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface ProductTableDesktopProps {
  loading: boolean;
  filteredProducts: ProductItem[];
  handleOpenEditForm: (product: ProductItem) => void;
  setDeleteConfirmId: (id: number | string | null) => void;
  recentlyUpdatedIds?: Set<string | number>;
}

export function ProductTableDesktop({
  loading,
  filteredProducts,
  handleOpenEditForm,
  setDeleteConfirmId,
  recentlyUpdatedIds,
}: ProductTableDesktopProps) {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs flex flex-col justify-between">
      {loading ? (
        <div className="p-12 text-center text-[#64748B]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1D4ED8]" />
          Memuat data produk...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-12 text-center text-[#64748B]">
          <p className="font-semibold text-base text-[#0F172A] mb-1">Tidak ada produk ditemukan</p>
          <p className="text-sm">Coba sesuaikan kata kunci pencarian atau kategori Anda.</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-medium text-xs">
                  <th className="py-3.5 px-4">Gambar</th>
                  <th className="py-3.5 px-4">Nama Produk</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Harga</th>
                  <th className="py-3.5 px-4">Stok</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {paginatedProducts.map((product) => {
                  const isUpdated = Boolean(
                    recentlyUpdatedIds?.has(product.id) || recentlyUpdatedIds?.has(String(product.id))
                  );

                  return (
                    <tr key={product.id} className={cn("hover:bg-[#F8FAFC]/60 transition-colors", isUpdated && "bg-blue-50/40")}>
                      <td className="py-3 px-4">
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
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-[#0F172A] line-clamp-1">{product.title}</p>
                          {isUpdated && (
                            <span className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                              Baru Diperbarui
                            </span>
                          )}
                        </div>
                        {product.brand && <p className="text-xs text-[#64748B]">{product.brand}</p>}
                      </td>

                      <td className="py-3 px-4 font-mono text-xs text-[#475569]">{product.sku}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#0F172A]">
                        Rp {(product.price || 0).toLocaleString("id-ID")}
                        {product.discount_price ? (
                          <span className="block text-xs font-normal text-emerald-600">
                            Diskon: Rp {product.discount_price.toLocaleString("id-ID")}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          product.stock <= (product.low_stock_threshold || 10)
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        }`}>
                          {product.stock} unit
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          product.is_active || product.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : product.status === "archived"
                            ? "bg-zinc-100 text-zinc-600"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {product.is_active || product.status === "active" ? "Aktif" : product.status === "archived" ? "Diarsipkan" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEditForm(product)}
                            className={cn(
                              "!w-[2.25rem] !h-[2.25rem] !p-0 rounded-md text-[#475569] hover:text-[#1D4ED8] hover:bg-[#F1F5F9] cursor-pointer",
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
                              "!w-[2.25rem] !h-[2.25rem] !p-0 rounded-md text-[#475569] hover:text-red-600 hover:bg-red-50 cursor-pointer",
                              "[&_svg]:!w-4 [&_svg]:!h-4"
                            )}
                            aria-label="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between">
              <div className="text-xs text-[#64748B] font-medium">
                Menampilkan <span className="font-bold text-[#0F172A]">{startIndex + 1}</span> - <span className="font-bold text-[#0F172A]">{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</span> dari <span className="font-bold text-[#0F172A]">{filteredProducts.length}</span> produk
              </div>
              <Pagination className="w-auto mx-0">
                <PaginationContent className="gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={cn(
                        "cursor-pointer text-xs h-8 px-2.5 rounded-md border border-[#E2E8F0] hover:bg-zinc-100",
                        currentPage === 1 && "pointer-events-none opacity-40"
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        className={cn(
                          "cursor-pointer text-xs h-8 w-8 rounded-md font-semibold border transition-all",
                          page === currentPage
                            ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-2xs"
                            : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-zinc-100"
                        )}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={cn(
                        "cursor-pointer text-xs h-8 px-2.5 rounded-md border border-[#E2E8F0] hover:bg-zinc-100",
                        currentPage === totalPages && "pointer-events-none opacity-40"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
