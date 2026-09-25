import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { ProductItem, ProductPayload } from "~/types/product";
import { Button } from "~/components/ui/button";
import {
  PriceInput,
  NumberInput,
  CategorySelect,
  RichTextEditor,
  MediaUploader,
} from "~/features/products/components/ProductFormControls";

interface ProductFormDesktopProps {
  editingProduct: ProductItem | null;
  formData: ProductPayload;
  setFormData: React.Dispatch<React.SetStateAction<ProductPayload>>;
  categories: string[];
  addCategory: (newCat: string) => void | Promise<void>;
  actionLoading: boolean;
  setViewMode: (mode: "list" | "form") => void;
  handleSaveProduct: (targetStatus?: "active" | "draft" | "archived") => Promise<void>;
  showToast: (msg: string) => void;
}

export function ProductFormDesktop({
  editingProduct,
  formData,
  setFormData,
  categories,
  addCategory,
  actionLoading,
  setViewMode,
  handleSaveProduct,
  showToast,
}: ProductFormDesktopProps) {
  const handleGenerateSku = () => {
    let newSku = "";
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      newSku = `SKU-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    } else {
      newSku = `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
    setFormData((prev) => ({ ...prev, sku: newSku }));
  };
  return (
    <div className="w-full p-6 flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Form Action Header */}
      <div className="w-full flex items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <span className="text-[#E2E8F0]">|</span>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight font-outfit">
            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setViewMode("list")}
            className="bg-white border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] h-9 px-4 text-xs font-medium cursor-pointer"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={() => handleSaveProduct("draft")}
            disabled={actionLoading}
            className="bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] hover:bg-[#E2E8F0] h-9 px-4 text-xs font-medium cursor-pointer"
          >
            Simpan Draft
          </Button>
          <Button
            type="button"
            onClick={() => handleSaveProduct("active")}
            disabled={actionLoading}
            className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white h-9 px-4 text-xs font-medium cursor-pointer shadow-xs"
          >
            {actionLoading ? "Menyimpan..." : "Simpan Produk"}
          </Button>
        </div>
      </div>

      {/* Form Layout: Full-Width 2 Columns Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Left Column: Informasi Produk & Harga/Stok */}
        <div className="flex flex-col gap-6 w-full">
          {/* Card 1: Informasi Produk */}
          <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">
                Informasi Produk
              </h2>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Nama Produk */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-medium text-[#374151]">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama produk"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* SKU & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#374151]">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateSku}
                      className="text-[10px] font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Generate UUID</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="SKU-XXXXXXXX"
                      value={formData.sku}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] font-mono placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#374151]">Brand</label>
                  <input
                    type="text"
                    placeholder="Nama brand"
                    value={formData.brand}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              {/* Kategori */}
              <CategorySelect
                label="Kategori"
                required
                value={formData.category}
                categories={categories}
                onChange={(cat: string) => setFormData({ ...formData, category: cat })}
                onAddCategory={addCategory}
              />

              {/* Deskripsi Singkat */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-medium text-[#374151]">Deskripsi Singkat</label>
                <input
                  type="text"
                  placeholder="Deskripsi singkat produk"
                  value={formData.short_description}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, short_description: e.target.value })
                  }
                  className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {/* Deskripsi Lengkap */}
              <RichTextEditor
                label="Deskripsi Lengkap"
                value={formData.description || ""}
                onChange={(desc: string) => setFormData({ ...formData, description: desc })}
                placeholder="Tulis deskripsi produk yang lengkap dan menarik..."
              />
            </div>
          </div>

          {/* Card 2: Harga & Stok */}
          <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Harga & Stok</h2>
            </div>

            <div className="p-4 flex flex-col gap-4">
              {/* Harga Normal & Harga Diskon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <PriceInput
                  label="Harga Normal"
                  required
                  value={formData.price}
                  onChange={(val: number) => setFormData({ ...formData, price: val })}
                  placeholder="0"
                />

                <PriceInput
                  label="Harga Diskon"
                  value={formData.discount_price || 0}
                  onChange={(val: number) => setFormData({ ...formData, discount_price: val })}
                  placeholder="0"
                />
              </div>

              {/* Stok, Batas Stok Rendah, Berat */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                <NumberInput
                  label="Jumlah Stok"
                  required
                  value={formData.stock}
                  onChange={(val: number) => setFormData({ ...formData, stock: val })}
                  placeholder="0"
                />

                <NumberInput
                  label="Batas Stok Rendah"
                  value={formData.low_stock_threshold || 10}
                  onChange={(val: number) => setFormData({ ...formData, low_stock_threshold: val })}
                  placeholder="10"
                />

                <NumberInput
                  label="Berat"
                  step="0.1"
                  suffix="kg"
                  value={formData.weight || 0.5}
                  onChange={(val: number) => setFormData({ ...formData, weight: val })}
                  placeholder="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media Produk & Status Produk */}
        <div className="flex flex-col gap-6 w-full">
          {/* Card 1: Media Produk */}
          <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Media Produk</h2>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <MediaUploader
                image={formData.image || ""}
                onChange={(imgUrl: string) => setFormData({ ...formData, image: imgUrl })}
                showToast={showToast}
              />
            </div>
          </div>

          {/* Card 2: Status Produk */}
          <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Status Produk</h2>
            </div>

            <div className="p-4 flex flex-col gap-2.5">
              {/* Option: Aktif */}
              <label
                onClick={() => setFormData({ ...formData, status: "active", is_active: true })}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.status === "active" || (formData.is_active && formData.status !== "draft" && formData.status !== "archived")
                    ? "bg-[#EFF6FF] border-[#BFDBFE]"
                    : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === "active" || (formData.is_active && formData.status !== "draft" && formData.status !== "archived")}
                  onChange={() => setFormData({ ...formData, status: "active", is_active: true })}
                  className="text-[#1D4ED8] focus:ring-[#1D4ED8]"
                />
                <div>
                  <p className="text-xs font-medium text-[#0F172A]">Aktif</p>
                  <p className="text-[11px] text-[#64748B]">Tampil di storefront</p>
                </div>
              </label>

              {/* Option: Draft */}
              <label
                onClick={() => setFormData({ ...formData, status: "draft", is_active: false })}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.status === "draft"
                    ? "bg-[#EFF6FF] border-[#BFDBFE]"
                    : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === "draft"}
                  onChange={() => setFormData({ ...formData, status: "draft", is_active: false })}
                  className="text-[#1D4ED8] focus:ring-[#1D4ED8]"
                />
                <div>
                  <p className="text-xs font-medium text-[#0F172A]">Draft</p>
                  <p className="text-[11px] text-[#64748B]">Tersimpan, tidak publik</p>
                </div>
              </label>

              {/* Option: Diarsipkan */}
              <label
                onClick={() => setFormData({ ...formData, status: "archived", is_active: false })}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  formData.status === "archived"
                    ? "bg-[#EFF6FF] border-[#BFDBFE]"
                    : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]"
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  checked={formData.status === "archived"}
                  onChange={() => setFormData({ ...formData, status: "archived", is_active: false })}
                  className="text-[#1D4ED8] focus:ring-[#1D4ED8]"
                />
                <div>
                  <p className="text-xs font-medium text-[#0F172A]">Diarsipkan</p>
                  <p className="text-[11px] text-[#64748B]">Disembunyikan dari katalog</p>
                </div>
              </label>
            </div>
          </div>

          {/* Card 3: Best Deals Configuration */}
          <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
            <div className="px-4 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Best Deals Promo</h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                formData.is_best_deal ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-500"
              }`}>
                {formData.is_best_deal ? "● AKTIF" : "○ NONAKTIF"}
              </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_best_deal || false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({
                      ...formData,
                      is_best_deal: e.target.checked,
                      best_deal_duration: e.target.checked ? (formData.best_deal_duration || 6) : undefined,
                    })
                  }
                  className="w-4 h-4 text-[#1D4ED8] rounded focus:ring-[#1D4ED8]"
                />
                <span className="text-xs font-semibold text-[#0F172A]">Aktifkan Best Deals</span>
              </label>

              {formData.is_best_deal && (
                <div className="flex flex-col gap-2 pt-1 animate-in fade-in duration-150">
                  <label className="text-xs font-medium text-[#374151]">Durasi Best Deals</label>
                  <select
                    value={formData.best_deal_duration || 6}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFormData({ ...formData, best_deal_duration: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value={2}>2 Jam (2 Hours)</option>
                    <option value={4}>4 Jam (4 Hours)</option>
                    <option value={6}>6 Jam (6 Hours)</option>
                    <option value={12}>12 Jam (12 Hours)</option>
                    <option value={24}>24 Jam (24 Hours)</option>
                  </select>

                  {formData.best_deal_expires_at && (
                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-md text-[11px] text-amber-900 mt-1 space-y-1">
                      <p className="font-semibold">Status Expired:</p>
                      <p className="font-mono text-[10px]">
                        {new Date(formData.best_deal_expires_at).toLocaleString("id-ID")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

