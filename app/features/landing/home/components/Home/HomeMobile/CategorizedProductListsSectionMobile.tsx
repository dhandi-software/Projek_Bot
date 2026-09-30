import React, { useState } from "react";
import { Check, ShoppingCart, PackageX } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCart } from "~/context/CartContext";
import { useProducts } from "~/hooks/useProducts";
import type { MiniProductItem } from "../HomeDesktop/CategorizedProductListsSection";

export function CategorizedProductListsSectionMobile() {
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const realMiniProducts: MiniProductItem[] = products.map((p) => {
    const isDiscount = Boolean(p.discount_price && p.discount_price > 0 && p.discount_price < p.price);
    const formattedPrice = isDiscount && p.discount_price
      ? `Rp ${p.discount_price.toLocaleString("id-ID")}`
      : `Rp ${p.price.toLocaleString("id-ID")}`;

    return {
      id: String(p.id),
      title: p.title,
      price: formattedPrice,
      image: p.image || "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
    };
  });

  const columns = [
    {
      title: "FLASH SALE TODAY",
      products: realMiniProducts.slice(0, 3),
    },
    {
      title: "BEST SELLERS",
      products: realMiniProducts.slice(3, 6).length > 0 ? realMiniProducts.slice(3, 6) : realMiniProducts.slice(0, 3),
    },
    {
      title: "TOP RATED",
      products: realMiniProducts.slice(6, 9).length > 0 ? realMiniProducts.slice(6, 9) : realMiniProducts.slice(0, 3),
    },
    {
      title: "NEW ARRIVAL",
      products: realMiniProducts.slice(0, 3),
    },
  ];

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

  if (loading) {
    return (
      <div className="w-full my-6 text-center text-gray-400 text-xs py-6">
        Memuat daftar kategori...
      </div>
    );
  }

  if (realMiniProducts.length === 0) {
    return (
      <section className="w-full my-6 bg-white rounded-lg border border-gray-200 p-6 text-center space-y-1">
        <PackageX className="w-6 h-6 text-gray-300 mx-auto" />
        <p className="font-bold text-xs text-gray-800">Belum Ada Kategori Produk</p>
        <p className="text-[11px] text-gray-400">Produk buatan admin akan tampil di sini.</p>
      </section>
    );
  }

  return (
    <section className="w-full my-6 space-y-6">
      {columns.map((column, colIdx) => (
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
                          "p-1.5 rounded-full text-gray-400 hover:bg-[#FA8232] hover:text-white transition-all cursor-pointer",
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
