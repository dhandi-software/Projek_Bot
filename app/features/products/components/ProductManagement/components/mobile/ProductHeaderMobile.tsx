import React from "react";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

interface ProductHeaderMobileProps {
  handleOpenAddForm: () => void;
}

export function ProductHeaderMobile({ handleOpenAddForm }: ProductHeaderMobileProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-[11px] text-[#94A3B8]">Produk / Daftar Produk</p>
        <h1 className="text-lg font-bold text-[#0F172A]">Produk</h1>
      </div>

      <Button
        onClick={handleOpenAddForm}
        className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs h-11 px-4 min-h-[44px] cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-1" />
        Tambah
      </Button>
    </div>
  );
}
