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
    price: undefined,
    discount_price: undefined,
    stock: undefined,
    low_stock_threshold: undefined,
    weight: undefined,
    image: "",
    status: "active",
    is_featured: false,
    is_active: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [recentlyUpdatedTimestamps, setRecentlyUpdatedTimestamps] = useState<Record<string | number, number>>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("recently_updated_product_timestamps");
        if (stored) {
          const parsed = JSON.parse(stored);
          const now = Date.now();
          const ONE_HOUR = 60 * 60 * 1000;
          const cleaned: Record<string, number> = {};
          Object.keys(parsed).forEach((key) => {
            if (parsed[key] && now - parsed[key] < ONE_HOUR) {
              cleaned[key] = parsed[key];
            }
          });
          return cleaned;
        }
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll();
      const fetched: ProductItem[] = res.data || [];
      setProducts(fetched);
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

  const safeParseJson = <T>(val: any, fallback: T): T => {
    if (!val) return fallback;
    if (typeof val === "object") return val as T;
    if (typeof val === "string") {
      try {
        const p = JSON.parse(val);
        return p ? p : fallback;
      } catch {
        return fallback;
      }
    }
    return fallback;
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
      price: undefined,
      discount_price: undefined,
      stock: undefined,
      low_stock_threshold: undefined,
      weight: undefined,
      image: "",
      status: "active",
      is_featured: false,
      is_active: true,
      is_best_deal: false,
      best_deal_duration: 6,
      features: [
        "Free 1 Year Warranty",
        "Free Shipping & Fasted Delivery",
        "100% Money-back guarantee",
        "24/7 Customer support",
        "Secure payment method",
      ],
      colors: [
        { id: "black", name: "Black / Dark", hex: "#1D1D1F" },
        { id: "silver", name: "Silver / Metal", hex: "#E3E4E5" },
      ],
      shipping_info: {
        courier: "2 - 4 days, free shipping",
        localShipping: "up to one week, $19.00",
        expressShipping: "4 - 6 days, $29.00",
        globalExport: "3 - 4 days, $39.00",
      },
      additional_info: {
        weight: "0.5 kg",
        dimensions: "35.57 x 24.81 x 1.68 cm",
        colorOptions: "Black, Silver",
        warranty: "1 Year Official Warranty",
        modelNumber: "MOD-001",
      },
      specifications: {
        "Brand": "",
        "SKU": "",
        "Bahan": "",
        "Garansi": "1 Tahun Garansi Resmi",
      },
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
      features: safeParseJson<string[]>(product.features, [
        "Free 1 Year Warranty",
        "Free Shipping & Fasted Delivery",
        "100% Money-back guarantee",
        "24/7 Customer support",
        "Secure payment method",
      ]),
      colors: safeParseJson<Array<{ id: string; name: string; hex: string }>>(product.colors, [
        { id: "black", name: "Black / Dark", hex: "#1D1D1F" },
        { id: "silver", name: "Silver / Metal", hex: "#E3E4E5" },
      ]),
      shipping_info: safeParseJson<any>(product.shipping_info, {
        courier: "2 - 4 days, free shipping",
        localShipping: "up to one week, $19.00",
        expressShipping: "4 - 6 days, $29.00",
        globalExport: "3 - 4 days, $39.00",
      }),
      additional_info: safeParseJson<any>(product.additional_info, {
        weight: product.weight ? `${product.weight} kg` : "0.5 kg",
        dimensions: "35.57 x 24.81 x 1.68 cm",
        colorOptions: "Black, Silver",
        warranty: "1 Year Official Warranty",
        modelNumber: product.sku || "MOD-001",
      }),
      specifications: safeParseJson<Record<string, string>>(product.specifications, {
        "Brand": product.brand || "-",
        "SKU": product.sku || "-",
        "Bahan": product.materials || "-",
        "Garansi": "1 Tahun Garansi Resmi",
      }),
    });
    setViewMode("form");
  };



  const markProductAsUpdated = (id: string | number) => {
    const now = Date.now();
    setRecentlyUpdatedTimestamps((prev) => {
      const next = { ...prev, [id]: now, [String(id)]: now };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("recently_updated_product_timestamps", JSON.stringify(next));
        } catch (e) {
          // ignore
        }
      }
      return next;
    });
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
        markProductAsUpdated(editingProduct.id);
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

  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();
  const recentlyUpdatedIds = new Set<string | number>(
    Object.keys(recentlyUpdatedTimestamps).filter((idKey) => {
      const ts = recentlyUpdatedTimestamps[idKey];
      return ts && now - ts < ONE_HOUR;
    })
  );

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
    recentlyUpdatedIds,
    recentlyUpdatedTimestamps,
  };
}
