import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Plus, Edit3, Trash2, Check, RefreshCw, X, AlertCircle } from "lucide-react";
import { bannerApi } from "~/api/bannerApi";
import type { BannerItem, BannerPayload } from "~/features/products/types/types";

export function BannerManagementMobile() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<BannerPayload>({
    title: "",
    subtitle: "",
    tagline: "",
    image: "",
    price_badge: "",
    link_url: "",
    button_text: "SHOP NOW",
    bg_color: "#FFFFFF",
    is_active: true,
    sort_order: 1,
  });

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await bannerApi.getAll();
      setBanners(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil data banner:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      subtitle: "",
      tagline: "",
      image: "",
      price_badge: "",
      link_url: "",
      button_text: "SHOP NOW",
      bg_color: "#FFFFFF",
      is_active: true,
      sort_order: banners.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (banner: BannerItem) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      tagline: banner.tagline || "",
      image: banner.image,
      price_badge: banner.price_badge || "",
      link_url: banner.link_url || "",
      button_text: banner.button_text || "SHOP NOW",
      bg_color: banner.bg_color || "#FFFFFF",
      is_active: banner.is_active,
      sort_order: banner.sort_order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingBanner) {
        await bannerApi.update(editingBanner.id, formData);
        showToast("Banner diperbarui.");
      } else {
        await bannerApi.create(formData);
        showToast("Banner ditambahkan.");
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (err) {
      console.error("Gagal menyimpan banner:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    setActionLoading(true);
    try {
      await bannerApi.delete(id);
      showToast("Banner dihapus.");
      setDeleteConfirmId(null);
      fetchBanners();
    } catch (err) {
      console.error("Gagal menghapus banner:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-4 pb-24 font-sans max-w-lg mx-auto">
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#00a884]" />
            Banner Promo
          </h1>
          <p className="text-xs text-zinc-500">Kelola hero banner utama</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="p-2.5 bg-[#00a884] text-white rounded-xl shadow-sm flex items-center gap-1 text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-zinc-400 flex flex-col items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-[#00a884]" />
          <p className="text-xs">Memuat banner...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center text-zinc-500">
          <ImageIcon className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
          <p className="text-xs font-medium">Belum ada banner promo</p>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200 rounded-xl p-3 shadow-xs flex flex-col gap-2"
            >
              <div className="relative w-full h-32 rounded-lg bg-zinc-100 overflow-hidden border border-zinc-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/Image.png";
                  }}
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#2DA5F3] uppercase">
                  {item.tagline || "PROMO"}
                </span>
                <h3 className="font-semibold text-zinc-900 text-xs">{item.title}</h3>
                <p className="text-[11px] text-zinc-500 line-clamp-1">{item.subtitle || "-"}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400">Status: {item.is_active ? "Aktif" : "Non-aktif"}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 bg-red-50 text-red-600 rounded-lg text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Form Sheet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
              <h2 className="font-bold text-sm text-zinc-900">
                {editingBanner ? "Edit Banner" : "Tambah Banner"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Judul Banner *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Xbox Consoles"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">URL Gambar *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/Image.png"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Badge Harga</label>
                <input
                  type="text"
                  value={formData.price_badge}
                  onChange={(e) => setFormData({ ...formData, price_badge: e.target.value })}
                  placeholder="$299"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded text-[#00a884]"
                />
                <span className="text-zinc-700">Banner Aktif</span>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-2.5 bg-[#00a884] text-white rounded-xl font-semibold"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-5 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-bold text-zinc-900 text-sm mb-1">Hapus banner?</h3>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
