import React from "react";
import { Button } from "~/components/ui/button";

interface ProductDeleteModalMobileProps {
  deleteConfirmId: number | string | null;
  setDeleteConfirmId: (id: number | string | null) => void;
  handleDelete: (id: number | string) => Promise<void>;
  actionLoading: boolean;
}

export function ProductDeleteModalMobile({
  deleteConfirmId,
  setDeleteConfirmId,
  handleDelete,
  actionLoading,
}: ProductDeleteModalMobileProps) {
  if (!deleteConfirmId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xs p-5 shadow-2xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#0F172A]">Hapus Produk?</h3>
        <p className="text-xs text-[#64748B]">Tindakan ini tidak dapat dibatalkan.</p>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteConfirmId(null)}
            className="text-xs min-h-[44px]"
          >
            Batal
          </Button>
          <Button
            size="sm"
            onClick={() => handleDelete(deleteConfirmId)}
            disabled={actionLoading}
            className="bg-red-600 text-white text-xs min-h-[44px]"
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
