import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "~/context/CartContext";

export function PromoBannersSectionMobile() {
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
    <section className="w-full my-6 space-y-4">
      {/* 1. Mobile Banner: Apple HomePod Mini */}
      <div className="bg-[#F2F4F5] rounded-xl p-5 flex items-center justify-between relative overflow-hidden shadow-sm">
        <div className="max-w-[60%] space-y-2 z-10">
          <span className="bg-[#2DA5F3] text-white text-[10px] font-semibold px-2.5 py-0.5 uppercase rounded-sm inline-block tracking-wider">
            INTRODUCING
          </span>

          <h3 className="text-lg font-extrabold text-[#191C1E] leading-snug">
            New Apple Homepod Mini
          </h3>

          <p className="text-[11px] text-gray-500 font-normal line-clamp-2">
            Jam-packed with innovation, HomePod mini delivers unexpectedly.
          </p>

          <button
            onClick={(e) =>
              handleAddToCart(e, {
                id: "promo-apple-homepod-mini-mob",
                title: "New Apple Homepod Mini",
                price: "$99.00",
                image:
                  "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
              })
            }
            className="mt-1 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-4 py-2 rounded flex items-center gap-1.5 text-xs uppercase shadow active:scale-95"
          >
            <span>{addedIds["promo-apple-homepod-mini-mob"] ? "ADDED" : "SHOP NOW"}</span>
            {addedIds["promo-apple-homepod-mini-mob"] ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="w-[38%] h-32 flex items-center justify-center relative z-0">
          <img
            src="https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80"
            alt="New Apple Homepod Mini"
            className="max-h-full max-w-full object-contain drop-shadow"
          />
        </div>
      </div>

      {/* 2. Mobile Banner: Xiaomi Mi 11 Ultra */}
      <div className="bg-[#191C1E] text-white rounded-xl p-5 flex items-center justify-between relative overflow-hidden shadow-sm">
        {/* Floating Price Badge */}
        <div className="absolute top-3 right-3 z-20 w-12 h-12 rounded-full bg-[#2DA5F3] text-white font-bold flex items-center justify-center text-xs shadow-md border border-white/20">
          $590
        </div>

        <div className="max-w-[60%] space-y-2 z-10">
          <span className="bg-[#EFD33D] text-gray-900 text-[10px] font-bold px-2.5 py-0.5 uppercase rounded-sm inline-block tracking-wider">
            INTRODUCING NEW
          </span>

          <h3 className="text-lg font-extrabold text-white leading-snug">
            Xiaomi Mi 11 Ultra 12GB+256GB
          </h3>

          <p className="text-[10px] text-gray-400 font-normal line-clamp-2">
            *Data provided by internal laboratories.
          </p>

          <button
            onClick={(e) =>
              handleAddToCart(e, {
                id: "promo-xiaomi-mi11-ultra-mob",
                title: "Xiaomi Mi 11 Ultra 12GB+256GB",
                price: "$590.00",
                image:
                  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
              })
            }
            className="mt-1 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-4 py-2 rounded flex items-center gap-1.5 text-xs uppercase shadow active:scale-95"
          >
            <span>{addedIds["promo-xiaomi-mi11-ultra-mob"] ? "ADDED" : "SHOP NOW"}</span>
            {addedIds["promo-xiaomi-mi11-ultra-mob"] ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="w-[38%] h-36 flex items-center justify-center relative z-0">
          <img
            src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
            alt="Xiaomi Mi 11 Ultra"
            className="max-h-full max-w-full object-contain drop-shadow"
          />
        </div>
      </div>
    </section>
  );
}
