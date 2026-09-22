import * as React from "react";
import { Link } from "react-router";
import { type ProductItem, PRODUCTS_DATABASE } from "../pages/UseProductDetail";

interface ProductRelatedWidgetSectionProps {
  currentProductId: string;
}

interface WidgetGroup {
  title: string;
  items: ProductItem[];
}

export function ProductRelatedWidgetSection({ currentProductId }: ProductRelatedWidgetSectionProps) {
  const allProducts = Object.values(PRODUCTS_DATABASE);

  // Group 1: Related Product (products in same or similar category)
  const relatedProducts = allProducts.filter((p) => p.id !== currentProductId).slice(0, 3);

  // Group 2: Product Accessories
  const accessories = [
    {
      id: "acc-1",
      title: "Samsung Electronics Samsung Galaxy S21 5G",
      price: "Rp 12.500.000",
      images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "acc-2",
      title: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
      price: "Rp 8.900.000",
      images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "acc-3",
      title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      price: "Rp 6.499.000",
      images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"],
    },
  ];

  // Group 3: Apple Product
  const appleProducts = [
    {
      id: "apple-1",
      title: "TOZO T6 True Wireless Earbuds Bluetooth Headphone",
      price: "Rp 1.500.000",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "apple-2",
      title: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker",
      price: "Rp 2.100.000",
      images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "apple-3",
      title: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart Camera",
      price: "Rp 990.000",
      images: ["https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80"],
    },
  ];

  // Group 4: Featured Products
  const featuredProducts = [
    {
      id: "feat-1",
      title: "Portable Washing Machine, 11lbs capacity Model 18NMF",
      price: "Rp 4.250.000",
      images: ["https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "feat-2",
      title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      price: "Rp 6.499.000",
      images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "feat-3",
      title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      price: "Rp 18.500.000",
      images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80"],
    },
  ];

  const widgetGroups: WidgetGroup[] = [
    { title: "RELATED PRODUCT", items: relatedProducts },
    { title: "PRODUCT ACCESSORIES", items: accessories as ProductItem[] },
    { title: "APPLE PRODUCT", items: appleProducts as ProductItem[] },
    { title: "FEATURED PRODUCTS", items: featuredProducts as ProductItem[] },
  ];

  return (
    <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-lg shadow-sky-950/5 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgetGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            {/* Widget Group Title */}
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              {group.title}
            </h3>

            {/* List of 3 Products */}
            <div className="space-y-3">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="group/item flex items-center gap-3 p-2 rounded-xl border border-slate-100 bg-white hover:border-orange-300 hover:shadow-xs transition-all duration-200"
                >
                  {/* Thumbnail Image */}
                  <div className="size-16 rounded-lg bg-slate-50 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 group-hover/item:scale-102 transition-transform">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title & Price */}
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
