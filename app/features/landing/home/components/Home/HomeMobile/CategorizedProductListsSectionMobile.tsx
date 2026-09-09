import React, { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import type { MiniProductItem } from "../HomeDesktop/CategorizedProductListsSection";

const CATEGORIZED_COLUMNS_MOBILE = [
  {
    title: "FLASH SALE TODAY",
    products: [
      {
        id: "fs-bose-earbuds-mob",
        title: "Bose Sport Earbuds - Wireless Earphones...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "fs-simple-4g-phone-mob",
        title: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "fs-4k-uhd-tv-mob",
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
        id: "bs-samsung-s21-mob",
        title: "Samsung Electronics Samsung Galaxy S21 5G",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "bs-simple-5g-phone-mob",
        title: "Simple Mobile 5G LTE Galaxy 12 Mini Gaming Phone",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "bs-sony-dschx8-mob",
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
        id: "tr-washing-machine-mob",
        title: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "tr-sony-camera-mob",
        title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "tr-dell-optiplex-mob",
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
        id: "na-tozo-t6-mob",
        title: "TOZO T6 True Wireless Earbuds Bluetooth Headphones...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "na-jbl-flip4-mob",
        title: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "na-wyze-cam-mob",
        title: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart...",
        price: "$1,500",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

export function CategorizedProductListsSectionMobile() {
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
    <section className="w-full my-6 space-y-6">
      {CATEGORIZED_COLUMNS_MOBILE.map((column, colIdx) => (
        <div key={colIdx} className="space-y-3">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1.5">
            {column.title}
          </h3>

          <div className="space-y-2.5">
            {column.products.map((product) => {
              const isAdded = addedIds[product.id];

              return (
                <div
                  key={product.id}
                  onClick={(e) => handleAddToCart(e, product)}
                  className="bg-white rounded-lg border border-gray-200 p-2.5 flex items-center gap-3 shadow-sm cursor-pointer"
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-1 overflow-hidden">
                    <h4 className="text-xs text-gray-800 font-medium line-clamp-2 leading-snug">
                      {product.title}
                    </h4>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-xs font-bold text-[#2DA5F3]">
                        {product.price}
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className={cn(
                          "p-1.5 rounded-full text-gray-400 hover:bg-[#FA8232] hover:text-white transition-all",
                          isAdded && "bg-emerald-500 text-white"
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
    </section>
  );
}
