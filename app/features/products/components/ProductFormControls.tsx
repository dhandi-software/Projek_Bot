import React from "react";
import {
  ChevronDown,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  Plus,
  Bold,
  Italic,
  List,
} from "lucide-react";
import type {
  PriceInputProps,
  NumberInputProps,
  CategorySelectProps,
  RichTextEditorProps,
  MediaUploaderProps,
} from "../types/productFormControlsTypes";
import {
  usePriceInput,
  useNumberInput,
  useCategorySelect,
  useRichTextEditor,
  useMediaUploader,
  renderCategoryIcon,
} from "../hooks/useProductFormControls";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function PriceInput({
  label,
  required = false,
  value,
  onChange,
  placeholder = "0",
  id,
}: PriceInputProps) {
  const { displayValue, handleChange } = usePriceInput(value, onChange);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-medium text-[#374151]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#64748B] pointer-events-none select-none">
          Rp
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className="w-full h-10 md:h-9 pl-9 pr-3 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] font-medium placeholder-[#94A3B8] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-all"
        />
      </div>
    </div>
  );
}

export function NumberInput({
  label,
  required = false,
  value,
  onChange,
  placeholder = "0",
  step = "1",
  min = 0,
  suffix,
  id,
}: NumberInputProps) {
  const { displayValue, handleChange } = useNumberInput(value, step, onChange);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-medium text-[#374151]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type="number"
          step={step}
          min={min}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className="w-full h-10 md:h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] font-medium placeholder-[#94A3B8] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-all"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#64748B] pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function CategorySelect({
  label,
  required = false,
  value,
  categories,
  onChange,
  onAddCategory,
}: CategorySelectProps) {
  const {
    isOpen,
    setIsOpen,
    isAdding,
    setIsAdding,
    newCatName,
    setNewCatName,
    dropdownRef,
    handleCreateCategory,
  } = useCategorySelect(value, onChange, onAddCategory);

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
      <label className="text-xs font-medium text-[#374151]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-10 md:h-9 px-3 bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-lg text-xs text-[#0F172A] flex items-center justify-between cursor-pointer focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-all shadow-xs"
        )}
      >
        <div className="flex items-center gap-2 font-medium">
          {renderCategoryIcon(value)}
          <span>{value || "Pilih Kategori"}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#94A3B8] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-1.5 animate-in fade-in zoom-in-95 duration-150 max-h-64 overflow-y-auto flex flex-col divide-y divide-[#F1F5F9]">
          <div className="flex flex-col">
            {categories.map((cat) => {
              const isSelected = value === cat;
              return (
                <Button
                  key={cat}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    onChange(cat);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full justify-between px-3 py-2.5 h-auto min-h-[44px] md:min-h-[36px] text-xs font-normal cursor-pointer rounded-none",
                    isSelected
                      ? "bg-[#EFF6FF] text-[#1D4ED8] font-semibold hover:bg-[#EFF6FF]"
                      : "text-[#334155] hover:bg-[#F8FAFC]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {renderCategoryIcon(cat)}
                    <span>{cat}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#1D4ED8]" />}
                </Button>
              );
            })}
          </div>

          <div className="p-2 bg-[#F8FAFC]">
            {isAdding ? (
              <form onSubmit={handleCreateCategory} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Nama Kategori Baru"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  autoFocus
                  className="flex-1 h-8 px-2 bg-white border border-[#E2E8F0] rounded text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className={cn("px-2.5 h-8 bg-[#1D4ED8] text-white rounded text-xs font-medium hover:bg-[#1e40af] cursor-pointer")}
                >
                  Simpan
                </Button>
              </form>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
                className={cn("w-full h-8 px-2.5 text-xs text-[#1D4ED8] hover:bg-[#EFF6FF] font-medium rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-dashed border-[#BFDBFE]")}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kategori Baru</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Tulis deskripsi produk yang lengkap...",
}: RichTextEditorProps) {
  const { textareaRef, insertFormat } = useRichTextEditor(value, onChange);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-[#374151]">{label}</label>
      <div className="w-full border border-[#E2E8F0] rounded-lg overflow-hidden bg-white focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/15 transition-all">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-2 py-1.5 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat("bold")}
            className={cn(
              "!w-[2rem] !h-[2rem] !p-0 rounded text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A] cursor-pointer",
              "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
            )}
            aria-label="Teks Tebal (Bold)"
          >
            <Bold className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat("italic")}
            className={cn(
              "!w-[2rem] !h-[2rem] !p-0 rounded text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A] cursor-pointer",
              "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
            )}
            aria-label="Teks Miring (Italic)"
          >
            <Italic className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat("list")}
            className={cn(
              "!w-[2rem] !h-[2rem] !p-0 rounded text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A] cursor-pointer",
              "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
            )}
            aria-label="Daftar (List)"
          >
            <List className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertFormat("link")}
            className={cn(
              "!w-[2rem] !h-[2rem] !p-0 rounded text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A] cursor-pointer",
              "[&_svg]:!w-3.5 [&_svg]:!h-3.5"
            )}
            aria-label="Tautan (Link)"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </Button>
        </div>
        <textarea
          ref={textareaRef}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-white text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none resize-y min-h-[90px]"
        />
      </div>
    </div>
  );
}

export function MediaUploader({ image, onChange, showToast }: MediaUploaderProps) {
  const {
    activeTab,
    setActiveTab,
    urlInput,
    setUrlInput,
    isConverting,
    fileInputRef,
    handleFileChange,
    handleUrlSubmit,
  } = useMediaUploader(image, onChange, showToast);

  const isDataUrl = image.startsWith("data:");
  const isWebP = isDataUrl && image.includes("image/webp");

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex bg-[#F1F5F9] p-1 rounded-lg gap-1 border border-[#E2E8F0]">
        <Button
          type="button"
          variant={activeTab === "device" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("device")}
          className={cn(
            "flex-1 py-1.5 px-3 h-8 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer",
            activeTab === "device" ? "bg-white text-[#0F172A] shadow-xs font-semibold" : "text-[#64748B] hover:text-[#0F172A]"
          )}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Dari Perangkat</span>
        </Button>
        <Button
          type="button"
          variant={activeTab === "link" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("link")}
          className={cn(
            "flex-1 py-1.5 px-3 h-8 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer",
            activeTab === "link" ? "bg-white text-[#0F172A] shadow-xs font-semibold" : "text-[#64748B] hover:text-[#0F172A]"
          )}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Gunakan Link</span>
        </Button>
      </div>

      {image ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] shadow-xs group">
          <img src={image} alt="Preview Produk" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.value = "";
                onChange("");
                setUrlInput("");
              }}
              className={cn(
                "!w-[2.25rem] !h-[2.25rem] !p-0 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg cursor-pointer",
                "[&_svg]:!w-4 [&_svg]:!h-4"
              )}
              aria-label="Hapus Media"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
            {isDataUrl ? (isWebP ? "WEBP (Perangkat)" : "File Perangkat") : "Link URL"}
          </span>
        </div>
      ) : activeTab === "device" ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border-2 border-dashed border-[#CBD5E1] hover:border-[#1D4ED8] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-[#0F172A]">
            {isConverting ? "Mengkonversi ke WebP..." : "Klik untuk Upload Gambar"}
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">Otomatis diubah ke format WebP ringan</p>
          <p className="text-[10px] text-[#94A3B8] mt-1.5 font-mono">PNG, JPG, WEBP · Maks. 5MB</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
          <label className="text-[11px] font-medium text-[#475569]">URL Gambar Produk</label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/gambar-produk.jpg"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onChange(e.target.value);
              }}
              className="flex-1 h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
            />
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleUrlSubmit}
              className={cn("px-3 h-9 bg-[#1D4ED8] hover:bg-[#1e40af] text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs")}
            >
              Terapkan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
