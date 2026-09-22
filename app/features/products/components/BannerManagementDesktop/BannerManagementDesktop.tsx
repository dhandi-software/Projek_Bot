import React, { useState, useEffect } from "react";
import { Image as ImageIcon, Plus, Edit3, Trash2, Check, RefreshCw, AlertCircle } from "lucide-react";
import { bannerApi } from "~/api/bannerApi";
import type { BannerItem, BannerPayload } from "~/features/products/types/types";

export function BannerManagementDesktop() {
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
        showToast("Banner berhasil diperbarui.");
      } else {
        await bannerApi.create(formData);
        showToast("Banner promo baru berhasil dibuat.");
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
      showToast("Banner berhasil dihapus.");
      setDeleteConfirmId(null);
      fetchBanners();
    } catch (err) {
      console.error("Gagal menghapus banner:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 w-full font-sans">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3 text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-[#00a884]" />
            Manajemen Banner Promo
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Kelola hero banner promo halaman utama (Home) secara dinamis.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-[#00a884] hover:bg-[#008f70] text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Banner</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-zinc-400 flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-[#00a884]" />
          <p className="text-sm">Memuat data banner...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500">
          <ImageIcon className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="font-semibold text-zinc-800 text-base">Belum Ada Banner Promo</h3>
          <p className="text-sm text-zinc-500 w-full mt-1 mb-6">
            Tambahkan banner pertama Anda untuk ditampilkan di Hero Banner Halaman Utama.
          </p>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 bg-[#00a884] text-white font-medium text-xs px-4 py-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Banner Baru</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/Image.png";
                    }}
                  />
                  {item.price_badge && (
                    <div className="absolute top-3 right-3 bg-[#2DA5F3] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md">
                      Badge: {item.price_badge}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold text-[#2DA5F3] uppercase tracking-wider">
                    {item.tagline || "PROMO BANNER"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.is_active
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {item.is_active ? "Aktif" : "Non-aktif"}
                  </span>
                </div>

                <h3 className="font-bold text-zinc-900 text-base">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{item.subtitle || "-"}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 text-xs">
                <span className="text-zinc-400">Urutan: #{item.sort_order}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-600 hover:text-zinc-900"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Banner */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[600px] max-w-[90vw] shrink-0 p-6 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto text-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-1">
              {editingBanner ? "Edit Banner Promo" : "Tambah Banner Baru"}
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Kelola judul, teks promo, badge harga, dan gambar banner.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Judul Banner *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Xbox Consoles"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Tagline Atas</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="THE BEST PLACE TO PLAY"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Sub-judul / Deskripsi Promo</label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Hemat hingga 50% untuk konsol & game pilihan..."
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Badge Harga (misal: $299)</label>
                  <input
                    type="text"
                    value={formData.price_badge}
                    onChange={(e) => setFormData({ ...formData, price_badge: e.target.value })}
                    placeholder="$299"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Teks Tombol Action</label>
                  <input
                    type="text"
                    value={formData.button_text}
                    onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                    placeholder="SHOP NOW"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">URL Gambar Banner *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/Image.png atau URL HTTPS"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Target Link URL</label>
                <input
                  type="text"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="/category-demo?category=gaming-console"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-[#00a884]"
                  />
                  <span>Banner Aktif Ditampilkan</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-600 hover:bg-zinc-100 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f70] text-white text-xs font-semibold shadow-sm"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[400px] max-w-[90vw] shrink-0 p-6 shadow-2xl border border-zinc-200 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="font-bold text-zinc-900 text-base mb-1">Hapus Banner Ini?</h3>
            <p className="text-xs text-zinc-500 mb-6">Banner tidak akan ditampilkan lagi pada halaman utama.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
              >
                {actionLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
