import React, { useState } from "react";
import { PackageCheck, Box, RefreshCw, ShoppingBag, ArrowDownRight } from "lucide-react";
import { cn } from "~/lib/utils";
import type { ProdukKeluar } from "~/api/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface ProdukKeluarTableDesktopProps {
  loading: boolean;
  produkKeluarList: ProdukKeluar[];
  onRefresh?: () => void;
}

export function ProdukKeluarTableDesktop({
  loading,
  produkKeluarList,
}: ProdukKeluarTableDesktopProps) {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(produkKeluarList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = produkKeluarList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-xs space-y-0 flex flex-col justify-between">
      <div>
        {/* Header Banner */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/40 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <PackageCheck className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Daftar Produk Keluar (Barang Terjual)</h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                Menampilkan rincian barang yang telah dibeli customer (Stok berkurang otomatis).
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
            {produkKeluarList.length} Jenis Produk Terjual
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#64748B]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
            Memuat data produk keluar...
          </div>
        ) : produkKeluarList.length === 0 ? (
          <div className="p-12 text-center text-[#64748B]">
            <ShoppingBag className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="font-semibold text-base text-[#0F172A] mb-1">Belum Ada Transaksi Produk Keluar</p>
            <p className="text-xs text-[#64748B]">
              Setiap kali customer menyelesaikan pesanan, rincian barang terjual akan tercatat otomatis di sini.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] font-medium text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Gambar</th>
                  <th className="py-3.5 px-4">Nama Produk</th>
                  <th className="py-3.5 px-4">Unit Keluar (Terjual)</th>
                  <th className="py-3.5 px-4">Total Penjualan</th>
                  <th className="py-3.5 px-4">Waktu Transaksi</th>
                  <th className="py-3.5 px-4 text-right">Status Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] font-medium text-zinc-700">
                {paginatedList.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Box className="w-5 h-5 text-[#94A3B8]" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0F172A] line-clamp-1 text-xs">{item.title}</p>
                      <p className="text-[11px] text-[#64748B] font-mono">ID: {item.id}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md text-xs border border-orange-200">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        -{item.soldQty} Unit
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-[#0F172A] text-xs">
                      {item.totalAmount}
                    </td>

                    <td className="py-3 px-4 text-xs text-zinc-500 font-medium">
                      {item.lastOrderDate}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {item.status || "Terjual & Stok Berkurang"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between">
          <div className="text-xs text-[#64748B] font-medium">
            Menampilkan <span className="font-bold text-[#0F172A]">{startIndex + 1}</span> - <span className="font-bold text-[#0F172A]">{Math.min(startIndex + ITEMS_PER_PAGE, produkKeluarList.length)}</span> dari <span className="font-bold text-[#0F172A]">{produkKeluarList.length}</span> jenis produk keluar
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
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
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
    </div>
  );
}
