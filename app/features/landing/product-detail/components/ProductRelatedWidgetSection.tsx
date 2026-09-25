import * as React from "react";
import { Link } from "react-router";
import { productApi } from "~/api/productApi";
import type { ProductItem } from "~/types/product";
import { getProductDetailUrl } from "~/lib/utils";

interface ProductRelatedWidgetSectionProps {
  currentProductId: string;
  currentCategory?: string;
}

interface FormattedWidgetItem {
  id: string;
  sku?: string;
  title: string;
  price: string;
  image: string;
}

interface WidgetGroup {
  title: string;
  items: FormattedWidgetItem[];
}

export function ProductRelatedWidgetSection({ currentProductId, currentCategory }: ProductRelatedWidgetSectionProps) {
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const res = await productApi.getAll();
        const list: ProductItem[] = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        if (isMounted) {
          setProducts(list);
        }
      } catch (e) {
        console.warn("Gagal memuat produk serupa:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatItem = (p: ProductItem): FormattedWidgetItem => {
    const finalPrice = p.discount_price && p.discount_price > 0 ? p.discount_price : p.price;
    return {
      id: String(p.id),
      sku: p.sku,
      title: p.title || "Produk",
      price: `Rp ${(finalPrice || 0).toLocaleString("id-ID")}`,
      image: p.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    };
  };

  const otherProducts = React.useMemo(() => {
    return products.filter((p) => String(p.id) !== String(currentProductId) && p.sku !== currentProductId);
  }, [products, currentProductId]);

  // Group 1: Related Products (same category or general)
  const relatedItems = React.useMemo(() => {
    let matches = otherProducts;
    if (currentCategory) {
      const catLower = currentCategory.toLowerCase();
      const inCat = otherProducts.filter((p) => p.category && p.category.toLowerCase().includes(catLower));
      if (inCat.length > 0) matches = inCat;
    }
    return matches.slice(0, 3).map(formatItem);
  }, [otherProducts, currentCategory]);

  // Group 2: Product Accessories
  const accessoryItems = React.useMemo(() => {
    const acc = otherProducts.filter(
      (p) =>
        (p.category && (p.category.toLowerCase().includes("accessories") || p.category.toLowerCase().includes("headphone"))) ||
        (p.title && (p.title.toLowerCase().includes("mouse") || p.title.toLowerCase().includes("keyboard") || p.title.toLowerCase().includes("speaker") || p.title.toLowerCase().includes("power") || p.title.toLowerCase().includes("headphone")))
    );
    const pool = acc.length >= 3 ? acc : [...acc, ...otherProducts.filter((p) => !acc.includes(p))];
    return pool.slice(0, 3).map(formatItem);
  }, [otherProducts]);

  // Group 3: Apple Products
  const appleItems = React.useMemo(() => {
    const apple = otherProducts.filter(
      (p) =>
        (p.brand && p.brand.toLowerCase().includes("apple")) ||
        (p.title && (p.title.toLowerCase().includes("macbook") || p.title.toLowerCase().includes("iphone") || p.title.toLowerCase().includes("ipad") || p.title.toLowerCase().includes("airpods") || p.title.toLowerCase().includes("apple")))
    );
    const pool = apple.length >= 3 ? apple : [...apple, ...otherProducts.filter((p) => !apple.includes(p))];
    return pool.slice(0, 3).map(formatItem);
  }, [otherProducts]);

  // Group 4: Featured Products
  const featuredItems = React.useMemo(() => {
    const feat = otherProducts.filter((p) => p.is_featured || p.is_best_deal);
    const pool = feat.length >= 3 ? feat : [...feat, ...otherProducts.filter((p) => !feat.includes(p))];
    return pool.slice(0, 3).map(formatItem);
  }, [otherProducts]);

  const widgetGroups: WidgetGroup[] = [
    { title: "RELATED PRODUCT", items: relatedItems },
    { title: "PRODUCT ACCESSORIES", items: accessoryItems },
    { title: "APPLE PRODUCT", items: appleItems },
    { title: "FEATURED PRODUCTS", items: featuredItems },
  ];

  if (loading) {
    return (
      <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-zinc-100 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgetGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              {group.title}
            </h3>

            <div className="space-y-3">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  to={getProductDetailUrl(item)}
                  className="group/item flex items-center gap-3 p-2 rounded-xl border border-slate-100 bg-white hover:border-orange-300 hover:shadow-xs transition-all duration-200"
                >
                  <div className="size-16 rounded-lg bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 group-hover/item:scale-102 transition-transform overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover/item:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold text-sky-500 block">
                      {item.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
