import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "~/context/CartContext";

export function PromoBannersSection() {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, product: { id: string; title: string; price: string; image: string }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Banner Card: Apple HomePod Mini */}
        <div className="bg-[#F2F4F5] rounded-xl p-8 lg:p-10 flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group min-h-[300px]">
          {/* Content Left */}
          <div className="z-10 max-w-[55%] space-y-3">
            <span className="bg-[#2DA5F3] text-white text-[11px] font-semibold px-3 py-1 uppercase rounded-sm inline-block tracking-wider">
              INTRODUCING
            </span>

            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#191C1E] leading-tight">
              New Apple Homepod Mini
            </h3>

            <p className="text-xs lg:text-sm text-gray-500 font-normal leading-relaxed">
              Jam-packed with innovation, HomePod mini delivers unexpectedly.
            </p>

            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "promo-apple-homepod-mini",
                  title: "New Apple Homepod Mini",
                  price: "$99.00",
                  image:
                    "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
                })
              }
              className="mt-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-6 py-3 rounded flex items-center gap-2 text-xs lg:text-sm uppercase shadow transition-all duration-200 active:scale-95 group-hover:bg-[#e07228]"
            >
              <span>{addedIds["promo-apple-homepod-mini"] ? "ADDED TO CART" : "SHOP NOW"}</span>
              {addedIds["promo-apple-homepod-mini"] ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>

          {/* Product Image Right */}
          <div className="w-[45%] h-full flex items-center justify-center relative z-0">
            <img
              src="https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80"
              alt="New Apple Homepod Mini"
              className="max-h-60 max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right Banner Card: Xiaomi Mi 11 Ultra */}
        <div className="bg-[#191C1E] text-white rounded-xl p-8 lg:p-10 flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group min-h-[300px]">
          {/* Circular Price Tag */}
          <div className="absolute top-6 right-6 z-20 w-16 h-16 rounded-full bg-[#2DA5F3] text-white font-bold flex items-center justify-center text-base lg:text-lg shadow-lg border-2 border-white/20">
            $590
          </div>

          {/* Content Left */}
          <div className="z-10 max-w-[55%] space-y-3">
            <span className="bg-[#EFD33D] text-gray-900 text-[11px] font-bold px-3 py-1 uppercase rounded-sm inline-block tracking-wider">
              INTRODUCING NEW
            </span>

            <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              Xiaomi Mi 11 Ultra 12GB+256GB
            </h3>

            <p className="text-[11px] lg:text-xs text-gray-400 font-normal leading-relaxed">
              *Data provided by internal laboratories. Industry measurement.
            </p>

            <button
              onClick={(e) =>
                handleAddToCart(e, {
                  id: "promo-xiaomi-mi11-ultra",
                  title: "Xiaomi Mi 11 Ultra 12GB+256GB",
                  price: "$590.00",
                  image:
                    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
                })
              }
              className="mt-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-6 py-3 rounded flex items-center gap-2 text-xs lg:text-sm uppercase shadow transition-all duration-200 active:scale-95 group-hover:bg-[#e07228]"
            >
              <span>{addedIds["promo-xiaomi-mi11-ultra"] ? "ADDED TO CART" : "SHOP NOW"}</span>
              {addedIds["promo-xiaomi-mi11-ultra"] ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>

          {/* Product Image Right */}
          <div className="w-[45%] h-full flex items-center justify-center relative z-0">
            <img
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
              alt="Xiaomi Mi 11 Ultra"
              className="max-h-64 max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
