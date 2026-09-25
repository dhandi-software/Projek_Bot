import React from "react";
import { Button } from "~/components/ui/button";

interface ProductDeleteModalDesktopProps {
  deleteConfirmId: number | string | null;
  setDeleteConfirmId: (id: number | string | null) => void;
  handleDelete: (id: number | string) => Promise<void>;
  actionLoading: boolean;
}

export function ProductDeleteModalDesktop({
  deleteConfirmId,
  setDeleteConfirmId,
  handleDelete,
  actionLoading,
}: ProductDeleteModalDesktopProps) {
  if (!deleteConfirmId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-[#E2E8F0] flex flex-col gap-4 animate-in zoom-in-95">
        <h3 className="text-base font-bold text-[#0F172A]">Konfirmasi Hapus</h3>
        <p className="text-xs text-[#64748B]">
          Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteConfirmId(null)}
            className="border-[#E2E8F0]"
          >
            Batal
          </Button>
          <Button
            size="sm"
            onClick={() => handleDelete(deleteConfirmId)}
            disabled={actionLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {actionLoading ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </div>
      </div>
    </div>
  );
}
