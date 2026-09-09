import React, { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";

export interface MiniProductItem {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface ProductColumn {
  title: string;
  products: MiniProductItem[];
}

const CATEGORIZED_COLUMNS: ProductColumn[] = [
  {
    title: "FLASH SALE TODAY",
    products: [
      {
        id: "fs-bose-earbuds",
        title: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "fs-simple-4g-phone",
        title: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "fs-4k-uhd-tv",
        title: "4K UHD LED Smart TV with Chromecast Built-in",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    title: "BEST SELLERS",
    products: [
      {
        id: "bs-samsung-s21",
        title: "Samsung Electronics Samsung Galaxy S21 5G",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "bs-simple-5g-phone",
        title: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "bs-sony-dschx8",
        title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    title: "TOP RATED",
    products: [
      {
        id: "tr-washing-machine",
        title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "tr-sony-camera",
        title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "tr-dell-optiplex",
        title: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    title: "NEW ARRIVAL",
    products: [
      {
        id: "na-tozo-t6",
        title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "na-jbl-flip4",
        title: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "na-wyze-cam",
        title: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

export function CategorizedProductListsSection() {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, product: MiniProductItem) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section className="w-full my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIZED_COLUMNS.map((column, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {/* Column Title */}
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
              {column.title}
            </h3>

            {/* List of 3 Horizontal Cards */}
            <div className="space-y-3">
              {column.products.map((product) => {
                const isAdded = addedIds[product.id];

                return (
                  <div
                    key={product.id}
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-white rounded-lg border border-gray-200/80 p-3 flex items-center gap-3 hover:border-[#FA8232]/60 hover:shadow-md transition-all duration-200 group cursor-pointer"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <h4 className="text-xs text-gray-800 font-medium line-clamp-2 group-hover:text-[#FA8232] transition-colors leading-snug">
                        {product.title}
                      </h4>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-sm font-semibold text-[#2DA5F3]">
                          {product.price}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={cn(
                            "p-1.5 rounded-full text-gray-400 hover:bg-[#FA8232] hover:text-white transition-all",
                            isAdded && "bg-emerald-500 text-white hover:bg-emerald-600"
                          )}
                          title="Add to Cart"
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <ShoppingCart className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
