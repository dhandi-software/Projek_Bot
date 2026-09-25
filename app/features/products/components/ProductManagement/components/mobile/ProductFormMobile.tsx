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

interface ProductFormMobileProps {
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

export function ProductFormMobile({
  editingProduct,
  formData,
  setFormData,
  categories,
  addCategory,
  actionLoading,
  setViewMode,
  handleSaveProduct,
  showToast,
}: ProductFormMobileProps) {
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
    <div className="w-full p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
        <button
          type="button"
          onClick={() => setViewMode("list")}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#64748B] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-[#0F172A] font-outfit">
          {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
        </h1>
      </div>

      {/* Form Stack */}
      <div className="flex flex-col gap-4 w-full">
        {/* Card 1: Informasi Produk */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-3.5 w-full">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">
            Informasi Produk
          </h2>

          <div className="flex flex-col gap-1 w-full">
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
              className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#374151]">SKU *</label>
              <button
                type="button"
                onClick={handleGenerateSku}
                className="text-[10px] font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Generate UUID</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="SKU-XXXXXXXX"
              value={formData.sku}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, sku: e.target.value })
              }
              className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs font-mono text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-medium text-[#374151]">Brand</label>
            <input
              type="text"
              placeholder="Nama brand"
              value={formData.brand}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <CategorySelect
            label="Kategori"
            required
            value={formData.category}
            categories={categories}
            onChange={(cat: string) => setFormData({ ...formData, category: cat })}
            onAddCategory={addCategory}
          />

          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-medium text-[#374151]">Deskripsi Singkat</label>
            <input
              type="text"
              placeholder="Deskripsi singkat produk"
              value={formData.short_description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
              className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
            />
          </div>

          <RichTextEditor
            label="Deskripsi Lengkap"
            value={formData.description || ""}
            onChange={(desc: string) => setFormData({ ...formData, description: desc })}
            placeholder="Tulis deskripsi produk yang lengkap..."
          />
        </div>

        {/* Card 2: Harga & Stok */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-3.5 w-full">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">
            Harga & Stok
          </h2>

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

          <div className="grid grid-cols-2 gap-3 w-full">
            <NumberInput
              label="Stok"
              required
              value={formData.stock}
              onChange={(val: number) => setFormData({ ...formData, stock: val })}
              placeholder="0"
            />
            <NumberInput
              label="Batas Stok"
              value={formData.low_stock_threshold || 10}
              onChange={(val: number) => setFormData({ ...formData, low_stock_threshold: val })}
              placeholder="10"
            />
          </div>

          <NumberInput
            label="Berat"
            step="0.1"
            suffix="kg"
            value={formData.weight || 0.5}
            onChange={(val: number) => setFormData({ ...formData, weight: val })}
            placeholder="0.5"
          />
        </div>

        {/* Card 3: Media & Status */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-3.5 w-full">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">
            Media & Status
          </h2>

          <MediaUploader
            image={formData.image || ""}
            onChange={(imgUrl: string) => setFormData({ ...formData, image: imgUrl })}
            showToast={showToast}
          />

          <div className="flex flex-col gap-2 pt-1 w-full">
            <label className="text-xs font-medium text-[#374151]">Status Produk</label>
            <div className="flex flex-col gap-2 w-full">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-[#E2E8F0] text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="status_mob"
                  checked={formData.status === "active" || (formData.is_active && formData.status !== "draft" && formData.status !== "archived")}
                  onChange={() => setFormData({ ...formData, status: "active", is_active: true })}
                />
                <span>Aktif (Tampil di storefront)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-[#E2E8F0] text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="status_mob"
                  checked={formData.status === "draft"}
                  onChange={() => setFormData({ ...formData, status: "draft", is_active: false })}
                />
                <span>Draft (Tersimpan, tidak publik)</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E2E8F0] w-full">
            <label className="flex items-center gap-2 cursor-pointer">
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
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-medium text-[#374151]">Durasi Best Deals</label>
                <select
                  value={formData.best_deal_duration || 6}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData({ ...formData, best_deal_duration: Number(e.target.value) })
                  }
                  className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value={2}>2 Jam (2 Hours)</option>
                  <option value={4}>4 Jam (4 Hours)</option>
                  <option value={6}>6 Jam (6 Hours)</option>
                  <option value={12}>12 Jam (12 Hours)</option>
                  <option value={24}>24 Jam (24 Hours)</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] p-3 flex items-center gap-2 shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={() => setViewMode("list")}
          className="flex-1 h-11 min-h-[44px] text-xs border-[#E2E8F0]"
        >
          Batal
        </Button>
        <Button
          type="button"
          onClick={() => handleSaveProduct("draft")}
          disabled={actionLoading}
          className="flex-1 h-11 min-h-[44px] text-xs bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] hover:bg-[#E2E8F0]"
        >
          Draft
        </Button>
        <Button
          type="button"
          onClick={() => handleSaveProduct("active")}
          disabled={actionLoading}
          className="flex-1 h-11 min-h-[44px] text-xs bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-medium"
        >
          {actionLoading ? "..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
}
