import React, { useState } from "react";
import {
  ArrowLeft,
  RefreshCw,
  Info,
  Package,
  ShieldCheck,
  Palette,
  Truck,
  ListPlus,
  Plus,
  Trash2,
  Sliders,
} from "lucide-react";
import type { ProductItem, ProductPayload, ColorOption } from "~/types/product";
import { Button } from "~/components/ui/button";
import {
  PriceInput,
  NumberInput,
  CategorySelect,
  RichTextEditor,
  MediaUploader,
} from "~/features/products/components/ProductFormControls";
import { cn } from "~/lib/utils";

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
  const [activeFormTab, setActiveFormTab] = useState<
    "general" | "features" | "colors" | "shipping" | "additional" | "specifications"
  >("general");

  const handleGenerateSku = () => {
    let newSku = "";
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      newSku = `SKU-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    } else {
      newSku = `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
    setFormData((prev) => ({ ...prev, sku: newSku }));
  };

  const featuresList = formData.features || [];
  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }));
  };
  const handleUpdateFeature = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.features || [])];
      updated[index] = val;
      return { ...prev, features: updated };
    });
  };
  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  const colorsList = formData.colors || [];
  const handleAddColor = () => {
    const newColor: ColorOption = {
      id: `col-${Date.now()}`,
      name: "Variasi Warna",
      hex: "#1D4ED8",
    };
    setFormData((prev) => ({
      ...prev,
      colors: [...(prev.colors || []), newColor],
    }));
  };
  const handleUpdateColor = (index: number, key: keyof ColorOption, val: string) => {
    setFormData((prev) => {
      const updated = [...(prev.colors || [])];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, colors: updated };
    });
  };
  const handleRemoveColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: (prev.colors || []).filter((_, i) => i !== index),
    }));
  };

  const shippingData = formData.shipping_info || {};
  const handleUpdateShipping = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      shipping_info: {
        ...(prev.shipping_info || {}),
        [key]: val,
      },
    }));
  };

  const addInfoData = formData.additional_info || {};
  const handleUpdateAddInfo = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      additional_info: {
        ...(prev.additional_info || {}),
        [key]: val,
      },
    }));
  };

  const specsObj = formData.specifications || {};
  const specsEntries = Object.entries(specsObj);

  const handleAddSpec = () => {
    const defaultKey = `Spesifikasi_${Object.keys(specsObj).length + 1}`;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [defaultKey]: "",
      },
    }));
  };

  const handleUpdateSpecKey = (oldKey: string, newKey: string) => {
    if (!newKey.trim()) return;
    setFormData((prev) => {
      const current = { ...(prev.specifications || {}) };
      const val = current[oldKey] || "";
      delete current[oldKey];
      current[newKey] = val;
      return { ...prev, specifications: current };
    });
  };

  const handleUpdateSpecVal = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...(prev.specifications || {}),
        [key]: val,
      },
    }));
  };

  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const current = { ...(prev.specifications || {}) };
      delete current[key];
      return { ...prev, specifications: current };
    });
  };

  return (
    <div className="w-full p-4 flex flex-col gap-4 pb-24">
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

      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3 text-xs text-[#1E40AF] flex items-start gap-2.5">
        <Info className="w-4 h-4 shrink-0 text-[#1D4ED8] mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-semibold text-[#1E3A8A] mb-0.5">Kelola Tab Detail Produk:</p>
          <p className="text-[11px] text-[#1E40AF]/90">
            Pilih tab di bawah untuk mengatur Informasi Utama, Fitur, Warna, Pengiriman, Information & Specifications.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveFormTab("general")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "general"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Utama</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("features")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "features"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fitur ({featuresList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("colors")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "colors"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Warna ({colorsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("shipping")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "shipping"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Pengiriman</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("additional")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "additional"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Additional</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("specifications")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "specifications"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0]"
          )}
        >
          <ListPlus className="w-3.5 h-3.5" />
          <span>Specs ({specsEntries.length})</span>
        </button>
      </div>

      {activeFormTab === "general" && (
        <div className="flex flex-col gap-4 w-full">
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
                placeholder="Nama brand (misal: Apple, Sony)"
                value={formData.brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-xs font-medium text-[#374151]">Material / Bahan Produk</label>
              <input
                type="text"
                placeholder="Contoh: Aluminum, OLED Display"
                value={formData.materials || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, materials: e.target.value })
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
              value={formData.discount_price}
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
                value={formData.low_stock_threshold}
                onChange={(val: number) => setFormData({ ...formData, low_stock_threshold: val })}
                placeholder="10"
              />
            </div>

            <NumberInput
              label="Berat"
              step="0.1"
              suffix="kg"
              value={formData.weight}
              onChange={(val: number) => setFormData({ ...formData, weight: val })}
              placeholder="0.5"
            />
          </div>

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
      )}

      {activeFormTab === "features" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">Fitur Produk</h2>
            <Button
              type="button"
              onClick={handleAddFeature}
              className="bg-[#1D4ED8] text-white text-xs h-9 px-3 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </Button>
          </div>
          {featuresList.length === 0 ? (
            <p className="text-xs text-[#64748B] text-center py-4">Belum ada fitur.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {featuresList.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Poin fitur"
                    value={feat}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    className="flex-1 h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:border-[#1D4ED8] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2.5 text-rose-500 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeFormTab === "colors" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">Variasi Warna</h2>
            <Button
              type="button"
              onClick={handleAddColor}
              className="bg-[#1D4ED8] text-white text-xs h-9 px-3 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </Button>
          </div>
          {colorsList.length === 0 ? (
            <p className="text-xs text-[#64748B] text-center py-4">Belum ada opsi warna.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {colorsList.map((col, idx) => (
                <div key={col.id || idx} className="p-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-6 h-6 rounded-full border shrink-0" style={{ backgroundColor: col.hex || "#000000" }} />
                      <input
                        type="text"
                        placeholder="Nama Warna"
                        value={col.name}
                        onChange={(e) => handleUpdateColor(idx, "name", e.target.value)}
                        className="w-full h-9 px-2 bg-white border rounded text-xs"
                      />
                    </div>
                    <button type="button" onClick={() => handleRemoveColor(idx)} className="p-1 text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={col.hex || "#000000"}
                      onChange={(e) => handleUpdateColor(idx, "hex", e.target.value)}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="# HEX Code"
                      value={col.hex}
                      onChange={(e) => handleUpdateColor(idx, "hex", e.target.value)}
                      className="flex-1 h-9 px-2 bg-white border rounded text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeFormTab === "shipping" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-3.5 w-full">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">Informasi Pengiriman</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Courier & Service Status</label>
              <input
                type="text"
                placeholder="2 - 4 days, free shipping"
                value={shippingData.courier || ""}
                onChange={(e) => handleUpdateShipping("courier", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Local Shipping Estimate</label>
              <input
                type="text"
                placeholder="up to one week, $19.00"
                value={shippingData.localShipping || ""}
                onChange={(e) => handleUpdateShipping("localShipping", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Express / Ground Shipping</label>
              <input
                type="text"
                placeholder="4 - 6 days, $29.00"
                value={shippingData.expressShipping || ""}
                onChange={(e) => handleUpdateShipping("expressShipping", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Global Export</label>
              <input
                type="text"
                placeholder="3 - 4 days, $39.00"
                value={shippingData.globalExport || ""}
                onChange={(e) => handleUpdateShipping("globalExport", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
          </div>
        </div>
      )}

      {activeFormTab === "additional" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-3.5 w-full">
          <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">Informasi Tambahan</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Berat (Weight Text)</label>
              <input
                type="text"
                placeholder="2.16 kg (4.8 lbs)"
                value={addInfoData.weight || (formData.weight ? `${formData.weight} kg` : "")}
                onChange={(e) => handleUpdateAddInfo("weight", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Dimensi</label>
              <input
                type="text"
                placeholder="35.57 x 24.81 x 1.68 cm"
                value={addInfoData.dimensions || ""}
                onChange={(e) => handleUpdateAddInfo("dimensions", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Ringkasan Warna</label>
              <input
                type="text"
                placeholder="Black, Silver"
                value={addInfoData.colorOptions || ""}
                onChange={(e) => handleUpdateAddInfo("colorOptions", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Garansi</label>
              <input
                type="text"
                placeholder="1 Year Official Brand Warranty"
                value={addInfoData.warranty || ""}
                onChange={(e) => handleUpdateAddInfo("warranty", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#374151]">Model Number</label>
              <input
                type="text"
                placeholder="MUW63ID/A"
                value={addInfoData.modelNumber || (formData.sku || "")}
                onChange={(e) => handleUpdateAddInfo("modelNumber", e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs font-mono text-[#0F172A]"
              />
            </div>
          </div>
        </div>
      )}

      {activeFormTab === "specifications" && (
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-outfit">Spesifikasi Lengkap</h2>
            <Button
              type="button"
              onClick={handleAddSpec}
              className="bg-[#1D4ED8] text-white text-xs h-9 px-3 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </Button>
          </div>
          {specsEntries.length === 0 ? (
            <p className="text-xs text-[#64748B] text-center py-4">Belum ada spesifikasi.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {specsEntries.map(([key, val], idx) => (
                <div key={idx} className="p-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Nama Atribut"
                      defaultValue={key}
                      onBlur={(e) => handleUpdateSpecKey(key, e.target.value)}
                      className="w-full h-9 px-2 bg-white border rounded text-xs font-bold"
                    />
                    <button type="button" onClick={() => handleRemoveSpec(key)} className="p-1 text-rose-500 shrink-0 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Nilai Atribut"
                    value={val}
                    onChange={(e) => handleUpdateSpecVal(key, e.target.value)}
                    className="w-full h-9 px-2 bg-white border rounded text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
