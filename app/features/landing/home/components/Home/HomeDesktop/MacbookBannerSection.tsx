import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "~/context/CartContext";

export function MacbookBannerSection() {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: "macbook-pro-m1-max",
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
    <section className="w-full my-8">
      <div className="bg-[#FFEEDD] rounded-2xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm border border-amber-200/50 min-h-[360px] group">
        {/* Content Left */}
        <div className="z-10 flex-1 space-y-4 pr-4">
          <span className="bg-[#2DA5F3] text-white text-xs font-bold px-3 py-1.5 uppercase rounded-sm inline-block tracking-wider">
            SAVE UP TO $200.00
          </span>

          <h2 className="text-3xl lg:text-5xl font-black text-[#191C1E] leading-tight">
            Macbook Pro
          </h2>

          <p className="text-sm lg:text-base text-gray-700 font-normal leading-relaxed">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#FA8232] hover:bg-[#e07228] text-white font-bold px-7 py-3.5 rounded flex items-center gap-2 text-sm uppercase shadow transition-all duration-200 active:scale-95 group-hover:bg-[#e07228]"
          >
            <span>{isAdded ? "ADDED TO CART" : "SHOP NOW"}</span>
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </div>

        {/* Floating Price Badge & Macbook Image Right */}
        <div className="w-full md:w-[50%] flex items-center justify-center relative mt-8 md:mt-0 z-0">
          {/* Floating Price Tag */}
          <div className="absolute top-0 left-4 md:left-8 z-20 w-20 h-20 rounded-full bg-[#FFD4B2] text-[#191C1E] font-black flex items-center justify-center text-lg shadow-lg border-4 border-white">
            $1999
          </div>

          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
            alt="Macbook Pro"
            className="max-h-[320px] w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
