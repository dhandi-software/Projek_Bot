import * as React from "react";
import { useParams, useSearchParams } from "react-router";
import { productApi } from "~/api/productApi";
import type { ProductItem as ApiProductItem } from "~/types/product";

export interface ProductDetailData {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  availability: string;
  brand: string;
  sku: string;
  description: string;
  features: string[];
  images: string[];
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
  specs: Record<string, string>;
  additionalInfo?: {
    weight?: string;
    dimensions?: string;
    colorOptions?: string;
    warranty?: string;
    modelNumber?: string;
  };
  shippingWarranty?: {
    courier?: string;
    deliveryTime?: string;
    guarantee?: string;
  };
}

export type ProductItem = ProductDetailData;

export const DEFAULT_PRODUCT_FALLBACK: ProductDetailData = {
  id: "1",
  title: "MacBook Pro M3 Max 16-inch (36GB RAM, 1TB SSD) - Space Black",
  category: "Computer & Laptop",
  categoryId: "computer-laptop",
  price: "Rp 35.999.000",
  originalPrice: "Rp 42.000.000",
  discountBadge: "14% OFF",
  rating: 4.9,
  reviewsCount: 328,
  availability: "In Stock",
  brand: "Apple",
  sku: "MBP-M3MAX-16-BLK",
  description: "MacBook Pro 16-inch with M3 Max chip takes power and efficiency to unprecedented heights. It delivers exceptional performance whether it's plugged in or on battery, and features a stunning Liquid Retina XDR display and all the ports you need.",
  features: [
    "Apple M3 Max chip with 16-core CPU and 40-core GPU",
    "36GB Unified Memory for extreme multi-tasking and pro workflows",
    "1TB Superfast SSD Storage with 7.4GB/s read speeds",
    "16.2-inch Liquid Retina XDR display with ProMotion 120Hz refresh rate",
  ],
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
  ],
  colors: [
    { id: "black", name: "Space Black", hex: "#1D1D1F" },
    { id: "silver", name: "Silver", hex: "#E3E4E5" },
    { id: "spacegray", name: "Space Gray", hex: "#68696D" },
  ],
  sizes: ["512GB", "1TB SSD", "2TB SSD", "4TB SSD"],
  specs: {
    "Processor": "Apple M3 Max (16-Core)",
    "Memory": "36GB Unified Memory",
    "Storage": "1TB NVMe SSD",
    "Display": "16.2\" Liquid Retina XDR (3456 x 2234)",
    "Graphics": "Integrated 40-Core GPU",
    "Warranty": "1 Year Official Apple Warranty",
  },
  additionalInfo: {
    weight: "2.16 kg (4.8 lbs)",
    dimensions: "35.57 x 24.81 x 1.68 cm",
    colorOptions: "Space Black, Silver, Space Gray",
    warranty: "1 Year Official AppleCare Warranty",
    modelNumber: "MUW63ID/A",
  },
  shippingWarranty: {
    courier: "FedEx Express / DHL Premium",
    deliveryTime: "2-4 Business Days Worldwide",
    guarantee: "100% Genuine Apple Authorized Product",
  },
};

export const PRODUCTS_DATABASE: Record<string, ProductDetailData> = {
  "1": DEFAULT_PRODUCT_FALLBACK,
};

function safeParseJson<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === "object") return val as T;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return parsed && (Array.isArray(parsed) || typeof parsed === "object") ? parsed : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

function mapApiToDetailData(raw: ApiProductItem): ProductDetailData {
  const normPrice = raw.price || 0;
  const discPrice = raw.discount_price && raw.discount_price > 0 ? raw.discount_price : 0;
  const finalPrice = discPrice > 0 ? discPrice : normPrice;
  const origPrice = discPrice > 0 && normPrice > discPrice ? normPrice : undefined;

  let discountBadge: string | undefined = undefined;
  if (discPrice > 0 && normPrice > discPrice) {
    const pct = Math.round(((normPrice - discPrice) / normPrice) * 100);
    discountBadge = `${pct}% OFF`;
  }

  const mainImg = raw.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80";
  const imageList = raw.images && raw.images.length > 0 ? raw.images : [mainImg];

  const catName = raw.category || "General";
  const catSlug = catName.toLowerCase().replace(/\s+/g, "-");

  const materials = raw.materials || "Material Komposit Premium";
  const brandName = raw.brand || "Dhandi Store";

  const features = safeParseJson<string[]>(raw.features, [
    `Garansi Resmi & Terjamin (${brandName})`,
    `Material Berkualitas: ${materials}`,
    `Stok Tersedia: ${raw.stock} unit`,
    `Pengiriman cepat dan aman ke seluruh Indonesia`,
  ]);

  const colors = safeParseJson<Array<{ id: string; name: string; hex: string }>>(raw.colors, [
    { id: "black", name: "Black / Original", hex: "#111111" },
    { id: "silver", name: "Silver / Metal", hex: "#D8D9DD" },
  ]);

  const specs = safeParseJson<Record<string, string>>(raw.specifications, {
    "Brand": brandName,
    "SKU": raw.sku || `SKU-${raw.id}`,
    "Kategori": catName,
    "Bahan": materials,
    "Berat": raw.weight ? `${raw.weight} kg` : "0.5 kg",
    "Stok": `${raw.stock} unit`,
    "Garansi": "1 Tahun Garansi Resmi",
  });

  const additionalInfo = safeParseJson<{
    weight?: string;
    dimensions?: string;
    colorOptions?: string;
    warranty?: string;
    modelNumber?: string;
  }>(raw.additional_info, {
    weight: raw.weight ? `${raw.weight} kg` : "0.5 kg",
    dimensions: "Standard Package",
    colorOptions: Array.isArray(colors) ? colors.map((c) => c.name).join(", ") : "Black, Silver",
    warranty: "1 Tahun Garansi Resmi Supplier",
    modelNumber: raw.sku || `SKU-${raw.id}`,
  });

  const shippingInfo = safeParseJson<{
    courier?: string;
    localShipping?: string;
    expressShipping?: string;
    globalExport?: string;
  }>(raw.shipping_info, {
    courier: "JNE / J&T / SiCepat / GoSend",
    localShipping: "2 - 4 hari, gratis ongkir",
    expressShipping: "4 - 6 hari, $29.00",
    globalExport: "3 - 4 hari, $39.00",
  });

  return {
    id: String(raw.id),
    title: raw.title || "Produk",
    category: catName,
    categoryId: catSlug,
    price: `Rp ${finalPrice.toLocaleString("id-ID")}`,
    originalPrice: origPrice ? `Rp ${origPrice.toLocaleString("id-ID")}` : undefined,
    discountBadge,
    rating: 4.9,
    reviewsCount: 120,
    availability: raw.stock > 0 ? "In Stock" : "Out of Stock",
    brand: brandName,
    sku: raw.sku || `SKU-${raw.id}`,
    description: raw.description || raw.short_description || "Deskripsi produk berkualitas tinggi.",
    features: Array.isArray(features) ? features : [],
    images: imageList,
    colors: Array.isArray(colors) ? colors : [],
    sizes: ["Standard", "Pro Edition"],
    specs,
    additionalInfo,
    shippingWarranty: {
      courier: shippingInfo.courier || "JNE / J&T / SiCepat",
      deliveryTime: shippingInfo.localShipping || "1-3 Hari Kerja",
      guarantee: "100% Produk Original Garansi Uang Kembali",
    },
  };
}

export function useProductDetail() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const productId = params.id || params["*"] || searchParams.get("id") || "1";
  const cleanId = productId.replace(/^\//, "").trim();

  const [productData, setProductData] = React.useState<ProductDetailData>(
    PRODUCTS_DATABASE[cleanId] || DEFAULT_PRODUCT_FALLBACK
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const [selectedImage, setSelectedImage] = React.useState<string>(productData.images[0]);
  const [selectedColor, setSelectedColor] = React.useState<string>(productData.colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = React.useState<string>(productData.sizes[0] || "");
  const [quantity, setQuantity] = React.useState<number>(1);
  const [activeTab, setActiveTab] = React.useState<"description" | "additional" | "specification" | "reviews">("description");

  React.useEffect(() => {
    let isMounted = true;
    async function fetchDetail() {
      setLoading(true);
      try {
        const data = await productApi.getById(cleanId);
        if (isMounted && data) {
          const detail = mapApiToDetailData(data);
          setProductData(detail);
          setSelectedImage(detail.images[0]);
          setSelectedColor(detail.colors[0]?.id || "");
          setSelectedSize(detail.sizes[0] || "");
        }
      } catch (err) {
        console.warn(`Gagal mengambil detail produk ID ${cleanId}, mencoba dari list...`, err);
        try {
          const allRes = await productApi.getAll();
          const list: ApiProductItem[] = Array.isArray(allRes?.data) ? allRes.data : (Array.isArray(allRes) ? allRes : []);
          const match = list.find((p) => String(p.id) === String(cleanId) || (p.sku && p.sku.toLowerCase() === cleanId.toLowerCase()));
          if (isMounted && match) {
            const detail = mapApiToDetailData(match);
            setProductData(detail);
            setSelectedImage(detail.images[0]);
            setSelectedColor(detail.colors[0]?.id || "");
            setSelectedSize(detail.sizes[0] || "");
          }
        } catch (e) {
          console.warn("Gagal mengambil data produk dari list:", e);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (cleanId) {
      fetchDetail();
    }
  }, [cleanId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    product: productData,
    loading,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    handleIncrement,
    handleDecrement,
    activeTab,
    setActiveTab,
  };
}
