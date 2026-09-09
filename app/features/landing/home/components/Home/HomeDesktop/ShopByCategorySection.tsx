import React, { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CategoryItem {
  name: string;
  image: string;
  queryParam: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: "Computer & Laptop",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
    queryParam: "Computer & Laptop",
  },
  {
    name: "SmartPhone",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80",
    queryParam: "Smartphone",
  },
  {
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    queryParam: "Headphone",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80",
    queryParam: "Computer Accessories",
  },
  {
    name: "Camera & Photo",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    queryParam: "Camera & Photo",
  },
  {
    name: "TV & Homes",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
    queryParam: "TV & Homes Appliances",
  },
  {
    name: "Gaming Console",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80",
    queryParam: "Gaming Console",
  },
  {
    name: "Smartwatch",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80",
    queryParam: "Watchs & Accessories",
  },
];

export function ShopByCategorySection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      {/* Centered Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#191C1F] tracking-tight">
          Shop with Categorys
        </h2>
      </div>

      {/* Slider Container with Left & Right Navigation Arrows */}
      <div className="relative group/slider px-2">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={scrollLeft}
          title="Previous"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#FA8232] hover:bg-[#e06d20] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Category Cards Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none scroll-smooth py-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/category-demo?category=${encodeURIComponent(cat.queryParam)}`)}
              className="bg-white border border-zinc-200 rounded-md p-5 flex flex-col items-center justify-between text-center hover:border-[#FA8232]/60 hover:shadow-md transition-all duration-300 cursor-pointer group shrink-0 w-44 md:w-48 h-56"
            >
              {/* Product Image */}
              <div className="w-32 h-32 flex items-center justify-center p-1">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
              </div>

              {/* Title */}
              <h4 className="text-xs md:text-sm font-semibold text-[#191C1F] group-hover:text-[#FA8232] transition-colors mt-2 text-center line-clamp-1">
                {cat.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
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
