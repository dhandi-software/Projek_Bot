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
    <div className="w-full p-6 flex flex-col gap-6 animate-in fade-in duration-200">
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

      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-3.5 text-xs text-[#1E40AF] flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0 text-[#1D4ED8]" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
            <span className="font-semibold text-[#1E3A8A]">Kelola Tab Detail Produk:</span>
            <span>Gunakan tab di bawah untuk mengatur Informasi Utama, Fitur, Warna, Pengiriman, Information & Specifications.</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveFormTab("general")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "general"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Informasi Utama</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("features")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "features"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fitur Produk ({featuresList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("colors")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "colors"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Variasi Warna ({colorsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("shipping")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "shipping"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Informasi Pengiriman</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("additional")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "additional"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Additional Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFormTab("specifications")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0",
            activeFormTab === "specifications"
              ? "bg-[#1D4ED8] text-white shadow-xs"
              : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          )}
        >
          <ListPlus className="w-3.5 h-3.5" />
          <span>Spesifikasi Lengkap ({specsEntries.length})</span>
        </button>
      </div>

      {activeFormTab === "general" && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="flex flex-col gap-6 w-full">
            <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
              <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
                <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">
                  Informasi Produk
                </h2>
              </div>

              <div className="p-4 flex flex-col gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
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

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#374151]">Brand</label>
                    <input
                      type="text"
                      placeholder="Contoh: Apple, Sony, Samsung"
                      value={formData.brand}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#374151]">Material / Bahan Produk</label>
                    <input
                      type="text"
                      placeholder="Contoh: Aluminum, OLED Display"
                      value={formData.materials || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, materials: e.target.value })
                      }
                      className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-[5px] text-xs text-[#0F172A] placeholder-[#0F172A]/50 focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <CategorySelect
                  label="Kategori"
                  required
                  value={formData.category}
                  categories={categories}
                  onChange={(cat: string) => setFormData({ ...formData, category: cat })}
                  onAddCategory={addCategory}
                />

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

                <RichTextEditor
                  label="Deskripsi Lengkap"
                  value={formData.description || ""}
                  onChange={(desc: string) => setFormData({ ...formData, description: desc })}
                  placeholder="Tulis deskripsi produk yang lengkap dan menarik..."
                />
              </div>
            </div>

            <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
              <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
                <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Harga & Stok</h2>
              </div>

              <div className="p-4 flex flex-col gap-4">
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
                    value={formData.discount_price}
                    onChange={(val: number) => setFormData({ ...formData, discount_price: val })}
                    placeholder="0"
                  />
                </div>

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
                    value={formData.low_stock_threshold}
                    onChange={(val: number) => setFormData({ ...formData, low_stock_threshold: val })}
                    placeholder="10"
                  />

                  <NumberInput
                    label="Berat"
                    step="0.1"
                    suffix="kg"
                    value={formData.weight}
                    onChange={(val: number) => setFormData({ ...formData, weight: val })}
                    placeholder="0.5"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full">
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

            <div className="w-full bg-white rounded-lg border border-[#E2E8F0] overflow-hidden shadow-xs">
              <div className="px-4 py-3.5 border-b border-[#E2E8F0]">
                <h2 className="text-sm font-semibold text-[#0F172A] font-outfit">Status Produk</h2>
              </div>

              <div className="p-4 flex flex-col gap-2.5">
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
      )}

      {activeFormTab === "features" && (
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-outfit">Fitur-Fitur Produk (Features)</h2>
              <p className="text-xs text-[#64748B]">Daftar fitur keunggulan produk yang ditampilkan pada tab Description di storefront.</p>
            </div>
            <Button
              type="button"
              onClick={handleAddFeature}
              className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-medium h-9 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Fitur</span>
            </Button>
          </div>

          {featuresList.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#E2E8F0] rounded-lg text-xs text-[#64748B]">
              Belum ada fitur produk yang ditambahkan. Klik tombol di atas untuk menambah fitur.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {featuresList.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#64748B] w-6 shrink-0 text-center">{idx + 1}.</span>
                  <input
                    type="text"
                    placeholder="Masukkan poin fitur produk (contoh: Free 1 Year Warranty)"
                    value={feature}
                    onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                    className="flex-1 h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md cursor-pointer transition-colors"
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
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-outfit">Variasi Warna Produk (Color Options)</h2>
              <p className="text-xs text-[#64748B]">Opsi warna yang tersedia untuk dipilih oleh pembeli pada halaman detail.</p>
            </div>
            <Button
              type="button"
              onClick={handleAddColor}
              className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-medium h-9 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Warna</span>
            </Button>
          </div>

          {colorsList.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#E2E8F0] rounded-lg text-xs text-[#64748B]">
              Belum ada opsi warna yang ditambahkan. Klik tombol di atas untuk menambah variasi warna.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorsList.map((col, idx) => (
                <div key={col.id || idx} className="p-4 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-8 h-8 rounded-full border border-slate-300 shadow-xs shrink-0"
                      style={{ backgroundColor: col.hex || "#000000" }}
                    />
                    <div className="flex flex-col gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Nama Warna (contoh: Space Black)"
                        value={col.name}
                        onChange={(e) => handleUpdateColor(idx, "name", e.target.value)}
                        className="w-full h-8 px-2.5 bg-white border border-[#E2E8F0] rounded text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={col.hex || "#000000"}
                          onChange={(e) => handleUpdateColor(idx, "hex", e.target.value)}
                          className="w-7 h-7 rounded border border-[#E2E8F0] cursor-pointer"
                        />
                        <input
                          type="text"
                          placeholder="# HEX Code"
                          value={col.hex}
                          onChange={(e) => handleUpdateColor(idx, "hex", e.target.value)}
                          className="flex-1 h-7 px-2 bg-white border border-[#E2E8F0] rounded text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(idx)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeFormTab === "shipping" && (
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs flex flex-col gap-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0F172A] font-outfit">Informasi Pengiriman (Shipping Information)</h2>
            <p className="text-xs text-[#64748B]">Informasi opsi kurir dan estimasi lama pengiriman produk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Courier & Service Status</label>
              <input
                type="text"
                placeholder="Contoh: 2 - 4 days, free shipping"
                value={shippingData.courier || ""}
                onChange={(e) => handleUpdateShipping("courier", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Local Shipping Estimate & Cost</label>
              <input
                type="text"
                placeholder="Contoh: up to one week, $19.00"
                value={shippingData.localShipping || ""}
                onChange={(e) => handleUpdateShipping("localShipping", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Express / Ground Shipping</label>
              <input
                type="text"
                placeholder="Contoh: 4 - 6 days, $29.00"
                value={shippingData.expressShipping || ""}
                onChange={(e) => handleUpdateShipping("expressShipping", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Global Export Shipping</label>
              <input
                type="text"
                placeholder="Contoh: 3 - 4 days, $39.00"
                value={shippingData.globalExport || ""}
                onChange={(e) => handleUpdateShipping("globalExport", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>
          </div>
        </div>
      )}

      {activeFormTab === "additional" && (
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs flex flex-col gap-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <h2 className="text-base font-bold text-[#0F172A] font-outfit">Informasi Tambahan (Additional Information)</h2>
            <p className="text-xs text-[#64748B]">Detail dimensi, garansi, model number, dan spesifikasi pendukung produk.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Berat (Weight Text)</label>
              <input
                type="text"
                placeholder="Contoh: 2.16 kg (4.8 lbs)"
                value={addInfoData.weight || (formData.weight ? `${formData.weight} kg` : "")}
                onChange={(e) => handleUpdateAddInfo("weight", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Dimensi (Dimensions)</label>
              <input
                type="text"
                placeholder="Contoh: 35.57 x 24.81 x 1.68 cm"
                value={addInfoData.dimensions || ""}
                onChange={(e) => handleUpdateAddInfo("dimensions", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Ringkasan Warna (Color Options)</label>
              <input
                type="text"
                placeholder="Contoh: Space Black, Silver, Space Gray"
                value={addInfoData.colorOptions || ""}
                onChange={(e) => handleUpdateAddInfo("colorOptions", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">Garansi (Warranty)</label>
              <input
                type="text"
                placeholder="Contoh: 1 Year Official Brand Warranty"
                value={addInfoData.warranty || ""}
                onChange={(e) => handleUpdateAddInfo("warranty", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-medium text-[#374151]">Model Number / Part Number</label>
              <input
                type="text"
                placeholder="Contoh: MUW63ID/A"
                value={addInfoData.modelNumber || (formData.sku || "")}
                onChange={(e) => handleUpdateAddInfo("modelNumber", e.target.value)}
                className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>
          </div>
        </div>
      )}

      {activeFormTab === "specifications" && (
        <div className="w-full bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-outfit">Spesifikasi Lengkap (Specifications Table)</h2>
              <p className="text-xs text-[#64748B]">Tabel pasangan Kunci & Nilai spesifikasi teknis produk.</p>
            </div>
            <Button
              type="button"
              onClick={handleAddSpec}
              className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-medium h-9 px-3 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Spesifikasi</span>
            </Button>
          </div>

          {specsEntries.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-[#E2E8F0] rounded-lg text-xs text-[#64748B]">
              Belum ada baris spesifikasi yang ditambahkan. Klik tombol di atas untuk menambah baris spesifikasi.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_40px] gap-3 px-1 text-xs font-bold text-[#374151]">
                <span>Nama Atribut</span>
                <span>Nilai / Keterangan</span>
                <span></span>
              </div>
              {specsEntries.map(([key, val], idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-[200px_1fr_40px] gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Nama Atribut (misal: Processor)"
                    defaultValue={key}
                    onBlur={(e) => handleUpdateSpecKey(key, e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  />
                  <input
                    type="text"
                    placeholder="Nilai (misal: Apple M3 Max 16-Core)"
                    value={val}
                    onChange={(e) => handleUpdateSpecVal(key, e.target.value)}
                    className="w-full h-9 px-3 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(key)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md cursor-pointer transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
