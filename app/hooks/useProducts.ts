import { useState, useEffect } from "react";
import { productApi } from "~/api/productApi";
import type { ProductItem, ProductPayload } from "~/types/product";
import { useCategories } from "~/features/products/hooks/useCategories";

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { categories, addCategory } = useCategories(products);

  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const [formData, setFormData] = useState<ProductPayload>({
    title: "",
    sku: "",
    brand: "",
    category: "Computer & Laptop",
    short_description: "",
    description: "",
    price: 0,
    discount_price: 0,
    stock: 0,
    low_stock_threshold: 10,
    weight: 0.5,
    image: "",
    status: "active",
    is_featured: false,
    is_active: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

  const generateSkuUuid = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return `SKU-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    }
    return `SKU-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  };

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      sku: generateSkuUuid(),
      brand: "",
      category: "Computer & Laptop",
      short_description: "",
      description: "",
      price: 0,
      discount_price: 0,
      stock: 0,
      low_stock_threshold: 10,
      weight: 0.5,
      image: "",
      status: "active",
      is_featured: false,
      is_active: true,
      is_best_deal: false,
      best_deal_duration: 6,
    });
    setViewMode("form");
  };

  const handleOpenEditForm = (product: ProductItem) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      sku: product.sku || "",
      brand: product.brand || "",
      category: product.category || "Computer & Laptop",
      short_description: product.short_description || "",
      description: product.description || "",
      price: product.price || 0,
      discount_price: product.discount_price || 0,
      stock: product.stock || 0,
      low_stock_threshold: product.low_stock_threshold || 10,
      weight: product.weight || 0.5,
      image: product.image || "",
      status: product.status || (product.is_active ? "active" : "draft"),
      is_featured: product.is_featured || false,
      is_active: product.is_active ?? true,
      is_best_deal: product.is_best_deal || false,
      best_deal_started_at: product.best_deal_started_at || null,
      best_deal_expires_at: product.best_deal_expires_at || null,
      best_deal_duration: 6,
    });
    setViewMode("form");
  };


  const handleSaveProduct = async (targetStatus?: "active" | "draft" | "archived") => {
    if (!formData.title.trim()) {
      showToast("Nama produk wajib diisi");
      return;
    }

    setActionLoading(true);
    try {
      const payload: ProductPayload = {
        ...formData,
        status: targetStatus || formData.status || "active",
        is_active: targetStatus ? targetStatus === "active" : (formData.status === "active"),
      };

      if (editingProduct) {
        await productApi.update(editingProduct.id, payload);
        showToast("Produk berhasil diperbarui!");
      } else {
        await productApi.create(payload);
        showToast("Produk baru berhasil ditambahkan!");
      }
      setViewMode("list");
      fetchProducts();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("products-updated"));
      }
    } catch (err: any) {
      console.error("Gagal menyimpan produk:", err);
      showToast(err?.response?.data?.error || "Gagal menyimpan produk");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    setActionLoading(true);
    try {
      await productApi.delete(id);
      showToast("Produk berhasil dihapus!");
      setDeleteConfirmId(null);
      fetchProducts();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("products-updated"));
      }
    } catch (err) {
      showToast("Gagal menghapus produk");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      (p.category || "").toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return {
    products,
    filteredProducts,
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
  };
}
