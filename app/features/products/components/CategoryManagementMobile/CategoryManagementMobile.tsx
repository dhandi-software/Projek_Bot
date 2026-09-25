import React from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Check,
  RefreshCw,
  FolderTree,
  X,
  Package,
  AlertCircle
} from "lucide-react";
import { useCategoryMobile, renderCategoryIcon } from "~/features/products/hooks";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function CategoryManagementMobile() {
  const {
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    deleteConfirmId,
    setDeleteConfirmId,
    actionLoading,
    toastMessage,
    formData,
    setFormData,
    handleOpenAdd,
    handleOpenEdit,
    handleSaveCategory,
    handleDelete,
  } = useCategoryMobile();

  const filteredCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-geist text-[#0F172A] p-4 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 z-[9999] bg-[#0F172A]/95 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-amber-500/50 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <p className="text-[11px] text-[#94A3B8]">Produk / Kategori</p>
          <h1 className="text-lg font-bold text-[#0F172A] font-outfit">Kategori</h1>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={handleOpenAdd}
          className={cn(
            "bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs h-11 min-h-[44px] px-4 cursor-pointer",
            "[&_svg]:!w-4 [&_svg]:!h-4"
          )}
        >
          <Plus className="w-4 h-4 mr-1" />
          Tambah
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="relative w-full mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Cari kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 h-11 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
        />
      </div>

      {/* Main Categories Display */}
      {loading ? (
        <div className="py-12 text-center text-[#64748B] text-xs">
          <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#1D4ED8]" />
          Memuat data kategori...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="py-12 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0] p-6">
          <FolderTree className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
          <p className="font-semibold text-sm text-[#0F172A] mb-1">Belum ada kategori</p>
          <p className="text-xs">Klik tombol Tambah untuk membuat kategori baru.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full">
          {filteredCategories.map((cat) => {
            const iconNode = renderCategoryIcon(cat.name, "w-5 h-5");
            return (
              <div
                key={cat.id}
                className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                      {iconNode}
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[#0F172A]">{cat.name}</h3>
                      <p className="text-[10px] text-[#94A3B8] font-mono">
                        /{cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      cat.is_active ?? true
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {cat.is_active ?? true ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                {cat.description && (
                  <p className="text-xs text-[#64748B] line-clamp-2">{cat.description}</p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F9]">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(cat)}
                    className={cn(
                      "!w-[2.5rem] !h-[2.5rem] !p-0 rounded-md text-[#475569] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] cursor-pointer",
                      "[&_svg]:!w-4 [&_svg]:!h-4"
                    )}
                    aria-label="Edit Kategori"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteConfirmId(cat.id)}
                    className={cn(
                      "!w-[2.5rem] !h-[2.5rem] !p-0 rounded-md text-[#475569] hover:text-red-600 hover:bg-red-50 cursor-pointer",
                      "[&_svg]:!w-4 [&_svg]:!h-4"
                    )}
                    aria-label="Hapus Kategori"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile Modal Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#E2E8F0] flex flex-col gap-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-bold text-[#0F172A] font-outfit">
                {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className={cn(
                  "!w-[2.5rem] !h-[2.5rem] !p-0 rounded-md text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer",
                  "[&_svg]:!w-5 [&_svg]:!h-5"
                )}
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSaveCategory} className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-medium text-[#374151]">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama Kategori"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-medium text-[#374151]">Deskripsi</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsi kategori..."
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8F0] w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className={cn("flex-1 h-11 min-h-[44px] text-xs border-[#E2E8F0] cursor-pointer")}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={actionLoading}
                  className={cn("flex-1 h-11 min-h-[44px] text-xs bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium cursor-pointer")}
                >
                  {actionLoading ? "..." : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-xs p-5 shadow-2xl flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Hapus Kategori?</h3>
            <p className="text-xs text-[#64748B]">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                className={cn("text-xs min-h-[44px] flex-1 cursor-pointer")}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className={cn("bg-red-600 hover:bg-red-700 text-white text-xs min-h-[44px] flex-1 cursor-pointer")}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

