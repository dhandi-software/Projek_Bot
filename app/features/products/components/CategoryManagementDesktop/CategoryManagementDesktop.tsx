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
import { useCategoryDesktop, renderCategoryIcon } from "~/features/products/hooks";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function CategoryManagementDesktop() {
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
  } = useCategoryDesktop();

  const filteredCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-geist text-[#0F172A] p-6 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] bg-[#0F172A]/95 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-amber-500/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span>Produk</span>
            <span>/</span>
            <span className="font-medium text-[#0F172A]">Kategori</span>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] mt-1 font-outfit">Manajemen Kategori</h1>
        </div>

        <Button
          type="button"
          variant="default"
          size="md"
          onClick={handleOpenAdd}
          className={cn(
            "bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium shadow-xs cursor-pointer h-9 px-4 text-xs",
            "[&_svg]:!w-4 [&_svg]:!h-4"
          )}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Kategori Baru
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="w-full bg-white p-4 rounded-xl border border-[#E2E8F0] mb-6 shadow-xs flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Cari kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
          />
        </div>
        <span className="text-xs font-semibold text-[#64748B]">
          Total: {filteredCategories.length} Kategori
        </span>
      </div>

      {/* Main Categories Display */}
      {loading ? (
        <div className="p-12 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1D4ED8]" />
          Memuat data kategori...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="p-12 text-center text-[#64748B] bg-white rounded-xl border border-[#E2E8F0]">
          <FolderTree className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
          <p className="font-semibold text-base text-[#0F172A] mb-1">Belum ada kategori</p>
          <p className="text-sm">Klik tombol "Tambah Kategori Baru" untuk menambahkan kategori pertama.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((cat) => {
            const iconNode = renderCategoryIcon(cat.name, "w-5 h-5");
            return (
              <div
                key={cat.id}
                className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between gap-4 hover:border-[#BFDBFE] transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                      {iconNode}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                        /{cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
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

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F9]">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenEdit(cat)}
                    className={cn(
                      "h-8 px-3 rounded-lg text-xs font-medium text-[#475569] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors flex items-center gap-1.5 cursor-pointer",
                      "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
                    )}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteConfirmId(cat.id)}
                    className={cn(
                      "h-8 px-3 rounded-lg text-xs font-medium text-[#475569] hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer",
                      "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
                    )}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Add / Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg min-w-[320px] p-6 shadow-2xl border border-[#E2E8F0] flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150 my-auto shrink-0">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] w-full">
              <h2 className="text-base font-bold text-[#0F172A] font-outfit">
                {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className={cn(
                  "!w-8 !h-8 !p-0 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer",
                  "[&_svg]:!w-4 [&_svg]:!h-4"
                )}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSaveCategory} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-medium text-[#374151]">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Smart TV, Aksesoris..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-medium text-[#374151]">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsi kategori produk..."
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-all resize-y min-h-[80px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E2E8F0] w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className={cn("border-[#E2E8F0] text-xs h-9 px-4 cursor-pointer")}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={actionLoading}
                  className={cn(
                    "bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs h-9 px-4 shadow-xs cursor-pointer font-medium"
                  )}
                >
                  {actionLoading ? "Menyimpan..." : "Simpan Kategori"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm min-w-[280px] p-6 shadow-2xl border border-[#E2E8F0] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 my-auto shrink-0">
            <h3 className="text-base font-bold text-[#0F172A]">Hapus Kategori?</h3>
            <p className="text-xs text-[#64748B]">
              Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#F1F5F9] w-full">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirmId(null)}
                className={cn("border-[#E2E8F0] text-xs h-9 px-4 cursor-pointer")}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className={cn("bg-red-600 hover:bg-red-700 text-white text-xs h-9 px-4 cursor-pointer font-medium")}
              >
                {actionLoading ? "Menghapus..." : "Ya, Hapus"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

