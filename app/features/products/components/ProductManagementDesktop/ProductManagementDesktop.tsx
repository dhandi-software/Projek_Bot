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
  Layers,
  Sparkles,
  Tag,
  Upload,
  FileSpreadsheet,
  Download,
  X
} from "lucide-react";
import { productApi } from "~/api/productApi";
import type { ProductItem, ProductPayload } from "~/features/products/types/types";
import { useProductImport } from "~/features/products/hooks/useProductImport";
import { Button } from "~/components/ui/button";

export function ProductManagementDesktop() {
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
        showToast("Produk berhasil diperbarui.");
      } else {
        await productApi.create(formData);
        showToast("Produk baru berhasil ditambahkan.");
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
      showToast("Produk berhasil dihapus.");
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

  const {
    isImportModalOpen,
    setIsImportModalOpen,
    importLoading,
    parsedProducts,
    importError,
    downloadSampleCsv,
    handleFileSelect,
    executeImport,
    resetImport,
  } = useProductImport(() => {
    showToast("Import produk berhasil disimpan!");
    fetchProducts();
  });

  return (
    <div className="p-6 md:p-8 w-full font-sans">
      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-3 text-sm animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-2.5">
            <Package className="w-7 h-7 text-[#00a884]" />
            Manajemen Produk & Stok
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Kelola katalog produk, ketersediaan stok, bahan material, dan status penayangan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetImport();
              setIsImportModalOpen(true);
            }}
            className="inline-flex items-center gap-2 border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <Upload className="w-4 h-4 text-[#00a884]" />
            <span>Import Produk</span>
          </Button>

          <Button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 bg-[#00a884] hover:bg-[#008f70] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk, SKU, atau bahan..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:outline-none focus:border-[#00a884] focus:bg-white transition-all"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${selectedCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
            >
              {cat === "ALL" ? "Semua Kategori" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-400 flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#00a884]" />
            <p className="text-sm">Memuat data produk...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-zinc-500 flex flex-col items-center justify-center">
            <Package className="w-12 h-12 text-zinc-300 mb-3" />
            <h3 className="font-semibold text-zinc-800 text-base">Tidak Ada Produk</h3>
            <p className="text-sm text-zinc-500 mt-1 mb-6">
              Tidak ada produk yang cocok dengan pencarian atau filter kategori yang dipilih.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 bg-[#00a884] text-white font-medium text-xs px-4 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-5">Produk</th>
                  <th className="py-3.5 px-4">Kategori & Brand</th>
                  <th className="py-3.5 px-4">Harga</th>
                  <th className="py-3.5 px-4">Stok</th>
                  <th className="py-3.5 px-4">Bahan / Spesifikasi</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    {/* Item Image & Title */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.image || "/images/Image.png"}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover bg-zinc-100 border border-zinc-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/Image.png";
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-zinc-900">
                            {item.title}
                          </div>
                          <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                            <Tag className="w-3 h-3 text-zinc-400" />
                            <span>SKU: {item.sku || "-"}</span>
                            {item.is_featured && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200">
                                <Sparkles className="w-2.5 h-2.5" /> Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Brand */}
                    <td className="py-4 px-4 text-zinc-700">
                      <div className="font-medium text-xs text-zinc-900">{item.category}</div>
                      <div className="text-xs text-zinc-400">{item.brand || "-"}</div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-semibold text-zinc-900">
                      ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Stock status badge */}
                    <td className="py-4 px-4">
                      {item.stock <= 0 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          Habis (0)
                        </span>
                      ) : item.stock <= 5 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Stok Menipis ({item.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Tersedia ({item.stock})
                        </span>
                      )}
                    </td>

                    {/* Materials */}
                    <td className="py-4 px-4 text-xs text-zinc-600">
                      <div title={item.materials || "-"}>
                        {item.materials || "-"}
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${item.is_active ? "bg-emerald-500" : "bg-zinc-300"
                          }`}
                        title={item.is_active ? "Aktif" : "Non-aktif"}
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                          title="Edit Produk"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-[640px] max-w-[90vw] shrink-0 p-6 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-zinc-900 mb-1">
              {editingProduct ? "Edit Detail Produk" : "Tambah Produk Baru"}
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Isi informasi produk, stok, bahan material, dan harga di bawah ini.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Nama Produk *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Xbox Series X Console"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">SKU Produk</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Contoh: XBOX-CON-01"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  >
                    {categories.filter((c) => c !== "ALL").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Brand / Merek</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Contoh: Microsoft, Apple, Dell"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Harga (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Jumlah Stok *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    placeholder="10"
                    className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Bahan Material / Spesifikasi</label>
                <input
                  type="text"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  placeholder="Contoh: Alloy chassis, OLED Glass, Recycled Plastic"
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">URL Gambar Produk</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/Image.png atau https://..."
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan keunggulan produk..."
                  className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#00a884] focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-[#00a884] focus:ring-[#00a884]"
                  />
                  <span>Tampilkan sebagai Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-[#00a884] focus:ring-[#00a884]"
                  />
                  <span>Status Aktif (Tampil di Katalog)</span>
                </label>
              </div>

              {/* Modal Buttons */}
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
                  className="px-5 py-2 rounded-xl bg-[#00a884] hover:bg-[#008f70] text-white text-xs font-semibold shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[400px] max-w-[90vw] shrink-0 p-6 shadow-2xl border border-zinc-200 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base mb-1">Hapus Produk Ini?</h3>
            <p className="text-xs text-zinc-500 mb-6">
              Tindakan ini akan menghapus produk secara permanen dari katalog dan stok toko.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                {actionLoading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Products Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-[640px] max-w-[90vw] shrink-0 p-6 shadow-2xl border border-zinc-200 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#00a884]" />
                <h2 className="text-base font-bold text-zinc-900">Import Massal Produk (CSV / JSON)</h2>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-900 flex items-center justify-between gap-3">
                <div>
                  <span className="font-semibold">Unduh Template Contoh CSV:</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Gunakan struktur kolom standar untuk mempermudah proses impor produk.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadSampleCsv}
                  className="bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs shrink-0 gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample</span>
                </Button>
              </div>

              {/* Upload Input Area */}
              <div className="border-2 border-dashed border-zinc-200 hover:border-[#00a884] rounded-2xl p-6 text-center bg-zinc-50/50 transition-all">
                <Upload className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-700 mb-1">
                  Pilih file CSV atau JSON untuk di-import
                </p>
                <p className="text-[11px] text-zinc-400 mb-3">Mendukung file .csv dan .json</p>
                <label className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors">
                  <span>Pilih File</span>
                  <input
                    type="file"
                    accept=".csv,.json"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Import Error Message */}
              {importError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Parsed Preview Table */}
              {parsedProducts.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                    <span>Pratinjau Data Impor ({parsedProducts.length} Produk):</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-zinc-200 rounded-xl bg-white text-xs divide-y divide-zinc-100">
                    {parsedProducts.map((p, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-zinc-900 truncate">{p.title || "Tanpa Judul"}</div>
                          <div className="text-[11px] text-zinc-400">
                            SKU: {p.sku || "Auto"} | Kategori: {p.category} | Brand: {p.brand || "-"}
                          </div>
                        </div>
                        <div className="text-right shrink-0 font-bold text-zinc-900">
                          ${p.price} (Stok: {p.stock})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dialog Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsImportModalOpen(false)}
                  className="text-xs"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  disabled={parsedProducts.length === 0 || importLoading}
                  onClick={executeImport}
                  className="bg-[#00a884] hover:bg-[#008f70] text-white text-xs font-semibold px-5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {importLoading ? "Mengimpor..." : `Import ${parsedProducts.length} Produk`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
