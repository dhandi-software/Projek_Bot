import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Laptop, Smartphone, Headphones, Gamepad2, Keyboard, Home, Watch, Camera, Tv, Speaker, Sparkles } from "lucide-react";
import { categoryApi } from "~/api/categoryApi";
import { productApi } from "~/api/productApi";

interface CategoryDisplayItem {
  id: number | string;
  name: string;
  queryParam: string;
  image: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  "Computer & Laptop": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  "Smartphone": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
  "Headphone": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  "Gaming Console": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
  "Computer Accessories": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80",
  "Smart Home & Automation": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80",
  "Wearables & Smartwatch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
  "Camera & Photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
  "TV & Home Entertainment": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80",
  "Audio & Speakers": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
};

export function ShopByCategorySection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<CategoryDisplayItem[]>([]);

  useEffect(() => {
    async function loadCategoryData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          categoryApi.getAll(),
          productApi.getAll(),
        ]);

        const rawCats = Array.isArray(catRes?.data) ? catRes.data : (Array.isArray(catRes) ? catRes : []);
        const rawProds = Array.isArray(prodRes?.data) ? prodRes.data : (Array.isArray(prodRes) ? prodRes : []);

        if (rawCats.length > 0) {
          const mapped: CategoryDisplayItem[] = rawCats.map((cat: any, idx: number) => {
            const catName = cat.name || "Kategori";
            let matchingImg = CATEGORY_IMAGES[catName];
            
            if (!matchingImg) {
              const prodInCat = rawProds.find((p: any) => p.category === catName && p.image);
              if (prodInCat) {
                matchingImg = prodInCat.image;
              }
            }

            return {
              id: cat.id || idx,
              name: catName,
              queryParam: catName,
              image: matchingImg || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
            };
          });
          setCategories(mapped);
        }
      } catch (e) {
        console.error("Gagal memuat kategori dari database:", e);
      }
    }
    loadCategoryData();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full font-sans space-y-6 py-4 relative">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#191C1F] tracking-tight">
          Shop by Categories
        </h2>
      </div>

      <div className="relative group/slider px-2">
        <button
          type="button"
          onClick={scrollLeft}
          title="Previous"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FA8232] hover:bg-[#e06d20] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category-demo?category=${encodeURIComponent(cat.queryParam)}`)}
              className="bg-white border border-zinc-200 rounded-md p-5 flex flex-col items-center justify-between text-center hover:border-[#FA8232]/60 hover:shadow-md transition-all duration-300 cursor-pointer group shrink-0 w-44 md:w-48 h-56"
            >
              <div className="w-32 h-32 flex items-center justify-center p-1">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              <h4 className="text-xs md:text-sm font-semibold text-[#191C1F] group-hover:text-[#FA8232] transition-colors mt-2 text-center line-clamp-1">
                {cat.name}
              </h4>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollRight}
          title="Next"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FA8232] hover:bg-[#e06d20] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
