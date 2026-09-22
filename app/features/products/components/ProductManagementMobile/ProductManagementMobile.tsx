import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  AlertCircle,
  Check,
  RefreshCw,
  X,
  Tag
} from "lucide-react";
import { productApi } from "~/api/productApi";
import type { ProductItem, ProductPayload } from "~/features/products/types/types";

export function ProductManagementMobile() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductPayload>({
    title: "",
    sku: "",
    category: "Computer & Laptop",
    price: 0,
    stock: 10,
    materials: "",
    brand: "",
    description: "",
    image: "",
    is_featured: false,
    is_active: true,
  });

  const categories = [
    "ALL",
    "Computer & Laptop",
    "Gaming Console",
    "Smartphone",
    "Headphone",
    "Computer Accessories",
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll();
      setProducts(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      sku: "",
      category: "Computer & Laptop",
      price: 0,
      stock: 10,
      materials: "",
      brand: "",
      description: "",
      image: "",
      is_featured: false,
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: product.stock,
      materials: product.materials || "",
      brand: product.brand || "",
      description: product.description || "",
      image: product.image || "",
      is_featured: product.is_featured,
      is_active: product.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingProduct) {
        await productApi.update(editingProduct.id, formData);
        showToast("Produk diperbarui.");
      } else {
        await productApi.create(formData);
        showToast("Produk ditambahkan.");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Gagal menyimpan produk:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    setActionLoading(true);
    try {
      await productApi.delete(id);
      showToast("Produk dihapus.");
      setDeleteConfirmId(null);
      fetchProducts();
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.materials && p.materials.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "ALL" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 pb-24 font-sans max-w-lg mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#00a884]" />
            Stok & Produk
          </h1>
          <p className="text-xs text-zinc-500">Kelola katalog dan persediaan stok</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="p-2.5 bg-[#00a884] text-white rounded-xl shadow-sm flex items-center gap-1 text-xs font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk / SKU / bahan..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-800 focus:outline-none focus:border-[#00a884]"
        />
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-600 border border-zinc-200"
            }`}
          >
            {cat === "ALL" ? "Semua" : cat}
          </button>
        ))}
      </div>

      {/* Products List (Mobile Cards) */}
      {loading ? (
        <div className="p-12 text-center text-zinc-400 flex flex-col items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-[#00a884]" />
          <p className="text-xs">Memuat produk...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center text-zinc-500">
          <Package className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
          <p className="text-xs font-medium">Tidak ada produk yang ditemukan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-zinc-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image || "/images/Image.png"}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-100 border border-zinc-100 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/Image.png";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-semibold text-zinc-900 text-xs leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                        item.is_active ? "bg-emerald-500" : "bg-zinc-300"
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> SKU: {item.sku || "-"}
                  </div>
                  <div className="font-bold text-zinc-900 text-sm mt-1">
                    ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Stock and Materials info */}
              <div className="bg-zinc-50 rounded-lg p-2 text-[11px] text-zinc-600 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span>Stok:</span>
                  {item.stock <= 0 ? (
                    <span className="font-bold text-red-600">Habis (0)</span>
                  ) : item.stock <= 5 ? (
                    <span className="font-bold text-amber-600">Menipis ({item.stock})</span>
                  ) : (
                    <span className="font-bold text-emerald-600">Tersedia ({item.stock})</span>
                  )}
                </div>
                {item.materials && (
                  <div className="flex items-start gap-1">
                    <span className="text-zinc-400 shrink-0">Bahan:</span>
                    <span className="truncate">{item.materials}</span>
                  </div>
                )}
              </div>

              {/* Mobile Card Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-100">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-xs font-medium"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Form Sheet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
              <h2 className="font-bold text-sm text-zinc-900">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Xbox Consoles"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="XBOX-01"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                  >
                    {categories.filter((c) => c !== "ALL").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Harga (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="299.00"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Jumlah Stok *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    placeholder="10"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Bahan Material / Spesifikasi</label>
                <input
                  type="text"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  placeholder="Zen 2 CPU, Alloy chassis"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">URL Gambar</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/Image.png"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#00a884]"
                />
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-700">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-[#00a884]"
                  />
                  <span>Tampilkan di Featured Products</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-700">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-[#00a884]"
                  />
                  <span>Aktif di Katalog</span>
                </label>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-2.5 bg-[#00a884] text-white rounded-xl font-semibold text-xs disabled:opacity-50"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Mobile Dialog */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-5 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-bold text-zinc-900 text-sm mb-1">Hapus produk ini?</h3>
            <p className="text-xs text-zinc-500 mb-4">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-2">
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
