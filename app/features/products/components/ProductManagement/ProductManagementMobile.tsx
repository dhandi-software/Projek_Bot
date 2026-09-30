import React, { useState } from "react";
import { Check, Flame, Package, PackageCheck } from "lucide-react";
import { useProductMobile } from "~/features/products/hooks";
import { useDashboardStats } from "~/features/dashboard/hooks/useDashboardStats";
import { ProductHeaderMobile } from "./components/mobile/ProductHeaderMobile";
import { ProductFilterMobile } from "./components/mobile/ProductFilterMobile";
import { ProductListMobile } from "./components/mobile/ProductListMobile";
import { BestDealsListMobile } from "./components/mobile/BestDealsListMobile";
import { ProdukKeluarListMobile } from "./components/mobile/ProdukKeluarListMobile";
import { ProductFormMobile } from "./components/mobile/ProductFormMobile";
import { ProductDeleteModalMobile } from "./components/mobile/ProductDeleteModalMobile";
import { cn } from "~/lib/utils";

export function ProductManagementMobile() {
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
    handleOpenAddForm,
    handleOpenEditForm,
    handleSaveProduct,
    handleDelete,
    recentlyUpdatedIds,
  } = useProductMobile();

  const { stats } = useDashboardStats();
  const produkKeluarList = stats.produkKeluar || [];

  const [activeTab, setActiveTab] = useState<"all" | "best-deals" | "produk-keluar">("all");
  const bestDealsCount = (products || []).filter((p) => p.is_best_deal).length;

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] font-geist text-[#0F172A] pb-24">
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 z-[9999] bg-[#0F172A]/95 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-emerald-500/50 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {viewMode === "list" ? (
        <div className="w-full p-4 flex flex-col gap-4">
          <ProductHeaderMobile handleOpenAddForm={handleOpenAddForm} />

          {/* Mobile Tab Navigator */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "flex-1 min-w-[90px] flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold rounded-lg transition-all shrink-0",
                activeTab === "all"
                  ? "bg-[#1D4ED8] text-white"
                  : "bg-white text-zinc-600 border border-zinc-200"
              )}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Semua</span>
              <span className="text-[10px] opacity-80">({filteredProducts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("best-deals")}
              className={cn(
                "flex-1 min-w-[100px] flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold rounded-lg transition-all shrink-0",
                activeTab === "best-deals"
                  ? "bg-[#FA8232] text-white"
                  : "bg-white text-zinc-600 border border-zinc-200"
              )}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Best Deals</span>
              <span className="text-[10px] opacity-80">({bestDealsCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("produk-keluar")}
              className={cn(
                "flex-1 min-w-[110px] flex items-center justify-center gap-1 py-2 px-2 text-xs font-bold rounded-lg transition-all shrink-0",
                activeTab === "produk-keluar"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-zinc-600 border border-zinc-200"
              )}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Terjual</span>
              <span className="text-[10px] opacity-80">({produkKeluarList.length})</span>
            </button>
          </div>

          {activeTab === "all" ? (
            <>
              <ProductFilterMobile
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <ProductListMobile
                loading={loading}
                filteredProducts={filteredProducts}
                handleOpenEditForm={handleOpenEditForm}
                setDeleteConfirmId={setDeleteConfirmId}
                recentlyUpdatedIds={recentlyUpdatedIds}
              />
            </>
          ) : activeTab === "best-deals" ? (
            <BestDealsListMobile
              loading={loading}
              products={products}
              handleOpenEditForm={handleOpenEditForm}
              recentlyUpdatedIds={recentlyUpdatedIds}
            />
          ) : (
            <ProdukKeluarListMobile
              loading={loading}
              produkKeluarList={produkKeluarList}
            />
          )}
        </div>
      ) : (
        <ProductFormMobile
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

      <ProductDeleteModalMobile
        deleteConfirmId={deleteConfirmId}
        setDeleteConfirmId={setDeleteConfirmId}
        handleDelete={handleDelete}
        actionLoading={actionLoading}
      />
    </div>
  );
}
