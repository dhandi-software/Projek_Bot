import React, { useState } from "react";
import { Check, Flame, Package } from "lucide-react";
import { useProductDesktop } from "~/features/products/hooks";
import { useProductImport } from "~/features/products/hooks/useProductImport";
import { ProductHeaderDesktop } from "./components/desktop/ProductHeaderDesktop";
import { ProductFilterDesktop } from "./components/desktop/ProductFilterDesktop";
import { ProductTableDesktop } from "./components/desktop/ProductTableDesktop";
import { BestDealsTableDesktop } from "./components/desktop/BestDealsTableDesktop";
import { ProductFormDesktop } from "./components/desktop/ProductFormDesktop";
import { ProductDeleteModalDesktop } from "./components/desktop/ProductDeleteModalDesktop";
import { cn } from "~/lib/utils";

export function ProductManagementDesktop() {
  const {
    filteredProducts,
    products,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    addCategory,
    viewMode,
    setViewMode,
    editingProduct,
    formData,
    setFormData,
    deleteConfirmId,
    setDeleteConfirmId,
    actionLoading,
    toastMessage,
    showToast,
    fetchProducts,
    handleOpenAddForm,
    handleOpenEditForm,
    handleSaveProduct,
    handleDelete,
    recentlyUpdatedIds,
  } = useProductDesktop();

  const [activeTab, setActiveTab] = useState<"all" | "best-deals">("all");

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { downloadSampleCsv, handleFileSelect, importLoading } =
    useProductImport(fetchProducts);

  const bestDealsCount = (products || []).filter((p) => p.is_best_deal).length;

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-geist text-[#0F172A] pb-16">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[9999] bg-[#0F172A]/95 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {viewMode === "list" ? (
        <div className="w-full p-6 flex flex-col gap-6">
          <ProductHeaderDesktop
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            importLoading={importLoading}
            downloadSampleCsv={downloadSampleCsv}
            handleOpenAddForm={handleOpenAddForm}
          />

          {/* Tab Navigation: All Products vs Best Deals */}
          <div className="flex items-center gap-2 border-b border-zinc-200 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                activeTab === "all"
                  ? "bg-[#1D4ED8] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              )}
            >
              <Package className="w-4 h-4" />
              <span>Semua Produk</span>
              <span className={cn(
                "ml-1 text-[10px] px-2 py-0.5 rounded-full font-mono",
                activeTab === "all" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700"
              )}>
                {filteredProducts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("best-deals")}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                activeTab === "best-deals"
                  ? "bg-[#FA8232] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:bg-orange-50 hover:text-[#FA8232] border border-zinc-200"
              )}
            >
              <Flame className="w-4 h-4" />
              <span>Daftar Best Deals</span>
              <span className={cn(
                "ml-1 text-[10px] px-2 py-0.5 rounded-full font-mono",
                activeTab === "best-deals" ? "bg-white/20 text-white" : "bg-orange-100 text-[#FA8232]"
              )}>
                {bestDealsCount}
              </span>
            </button>
          </div>

          {activeTab === "all" ? (
            <>
              <ProductFilterDesktop
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <ProductTableDesktop
                loading={loading}
                filteredProducts={filteredProducts}
                handleOpenEditForm={handleOpenEditForm}
                setDeleteConfirmId={setDeleteConfirmId}
                recentlyUpdatedIds={recentlyUpdatedIds}
              />
            </>

          ) : (
            <BestDealsTableDesktop
              loading={loading}
              products={products}
              handleOpenEditForm={handleOpenEditForm}
              onRefresh={fetchProducts}
              recentlyUpdatedIds={recentlyUpdatedIds}
            />
          )}
        </div>
      ) : (
        <ProductFormDesktop
          editingProduct={editingProduct}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          addCategory={addCategory}
          actionLoading={actionLoading}
          setViewMode={setViewMode}
          handleSaveProduct={handleSaveProduct}
          showToast={showToast}
        />
      )}

      <ProductDeleteModalDesktop
        deleteConfirmId={deleteConfirmId}
        setDeleteConfirmId={setDeleteConfirmId}
        handleDelete={handleDelete}
        actionLoading={actionLoading}
      />
    </div>
  );
}
