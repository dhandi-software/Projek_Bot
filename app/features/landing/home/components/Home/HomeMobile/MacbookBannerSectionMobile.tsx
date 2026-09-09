import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "~/context/CartContext";

export function MacbookBannerSectionMobile() {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: "macbook-pro-m1-max-mob",
      title: "Macbook Pro - Apple M1 Max Chip, 32GB Memory, 1TB SSD",
      price: "$1,999.00",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <section className="w-full my-6">
      <div className="bg-[#FFEEDD] rounded-xl p-5 relative overflow-hidden shadow-sm border border-amber-200/50 space-y-4">
        {/* Floating Price Badge */}
        <div className="absolute top-4 right-4 z-20 w-14 h-14 rounded-full bg-[#FFD4B2] text-[#191C1E] font-black flex items-center justify-center text-sm shadow border-2 border-white">
          $1999
        </div>

        <div className="space-y-2 z-10 pr-12">
          <span className="bg-[#2DA5F3] text-white text-[10px] font-bold px-2.5 py-0.5 uppercase rounded-sm inline-block tracking-wider">
            SAVE UP TO $200.00
          </span>

          <h2 className="text-2xl font-black text-[#191C1E] leading-tight">
            Macbook Pro
          </h2>

          <p className="text-xs text-gray-700 font-normal leading-relaxed">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-2 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-5 py-2.5 rounded flex items-center gap-1.5 text-xs uppercase shadow active:scale-95"
          >
            <span>{isAdded ? "ADDED" : "SHOP NOW"}</span>
            {isAdded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="w-full h-44 flex items-center justify-center relative z-0 pt-2">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
            alt="Macbook Pro"
            className="max-h-full max-w-full object-contain rounded-md drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
