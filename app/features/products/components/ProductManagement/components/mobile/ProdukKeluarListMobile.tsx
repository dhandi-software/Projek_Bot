import React from "react";
import { PackageCheck, Box, RefreshCw, ShoppingBag, ArrowDownRight } from "lucide-react";
import type { ProdukKeluar } from "~/api/types";

interface ProdukKeluarListMobileProps {
  loading: boolean;
  produkKeluarList: ProdukKeluar[];
}

export function ProdukKeluarListMobile({
  loading,
  produkKeluarList,
}: ProdukKeluarListMobileProps) {
  if (loading) {
    return (
      <div className="py-8 text-center text-[#64748B] text-xs">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-600" />
        Memuat data produk keluar...
      </div>
    );
  }

  if (produkKeluarList.length === 0) {
    return (
      <div className="py-8 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0] p-4">
        <ShoppingBag className="w-6 h-6 text-zinc-300 mx-auto mb-1" />
        <p className="font-semibold text-xs text-[#0F172A]">Belum ada produk keluar</p>
        <p className="text-[10px]">Rincian barang terjual akan muncul otomatis di sini.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {produkKeluarList.map((item, idx) => (
        <div
          key={item.id || idx}
          className="bg-white p-3 rounded-xl border border-emerald-200 flex flex-col gap-2 shadow-2xs"
        >
          <div className="flex items-center gap-3 justify-between">
            <div className="w-11 h-11 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0">
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

            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-[#0F172A] truncate">{item.title}</p>
              <p className="text-[10px] text-zinc-400 font-mono">ID: {item.id}</p>
              <p className="text-[11px] font-bold text-zinc-900 mt-0.5">{item.totalAmount}</p>
            </div>

            <span className="inline-flex items-center gap-1 font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[11px] border border-orange-200 shrink-0">
              <ArrowDownRight className="w-3 h-3" />
              -{item.soldQty} Unit
            </span>
          </div>

          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
            <span>Waktu: {item.lastOrderDate}</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {item.status || "Stok Berkurang"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
