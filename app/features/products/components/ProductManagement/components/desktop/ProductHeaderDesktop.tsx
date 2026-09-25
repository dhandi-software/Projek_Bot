import React from "react";
import { Plus, Upload, Download } from "lucide-react";
import { Button } from "~/components/ui/button";

interface ProductHeaderDesktopProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (file: File) => void;
  importLoading: boolean;
  downloadSampleCsv: () => void;
  handleOpenAddForm: () => void;
}

export function ProductHeaderDesktop({
  fileInputRef,
  handleFileSelect,
  importLoading,
  downloadSampleCsv,
  handleOpenAddForm,
}: ProductHeaderDesktopProps) {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span>Produk</span>
          <span>/</span>
          <span className="font-medium text-[#0F172A]">Daftar Produk</span>
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] mt-1">Manajemen Produk</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
          }}
          accept=".csv,.json"
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={importLoading}
          className="border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]"
        >
          <Upload className="w-4 h-4 mr-2" />
          {importLoading ? "Mengimpor..." : "Import CSV"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={downloadSampleCsv}
          className="border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]"
        >
          <Download className="w-4 h-4 mr-2" />
          Template
        </Button>
        <Button
          onClick={handleOpenAddForm}
          className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk Baru
        </Button>
      </div>
    </div>
  );
}
