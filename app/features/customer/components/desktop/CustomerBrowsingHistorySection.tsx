import React from "react";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import type { CustomerHistoryProduct } from "../../types/customerDashboard.types";

export interface CustomerBrowsingHistorySectionProps {
    products: CustomerHistoryProduct[];
    onViewAll?: () => void;
}

export function CustomerBrowsingHistorySection({
    products,
    onViewAll,
}: CustomerBrowsingHistorySectionProps) {
    return (
        <div className="w-full bg-white border border-[#E4E7E9] rounded-[4px] shadow-xs">
            {/* Header */}
            <div className="border-b border-[#E4E7E9] h-[52px] flex items-center justify-between px-6 rounded-t-[4px]">
                <h2 className="text-[14px] font-medium text-[#191C1F] uppercase tracking-wide">
                    Browsing History
                </h2>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="flex items-center gap-1.5 text-[14px] font-semibold text-[#FA8232] hover:text-[#e07125] transition-colors"
                    >
                        <span>View All</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Pagination Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Previous Products"
                            className="w-8 h-8 rounded-full border border-[#FA8232] text-[#FA8232] flex items-center justify-center hover:bg-amber-50 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next Products"
                            className="w-8 h-8 rounded-full bg-[#FA8232] text-white flex items-center justify-center hover:bg-[#e07125] transition-colors shadow-xs"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Cards Grid */}
            <div className="p-6 grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border border-[#E4E7E9] rounded-[4px] p-4 flex flex-col justify-between bg-white hover:border-[#FA8232] hover:shadow-md transition-all group cursor-pointer relative"
                    >
                        {/* Badge Tag */}
                        {product.badge && (
                            <span
                                className={`absolute top-3 left-3 text-[11px] font-extrabold px-2 py-0.5 rounded-[2px] text-white tracking-wider uppercase z-10 ${
                                    product.badge === "HOT"
                                        ? "bg-[#EE5858]"
                                        : "bg-[#2DA5F3]"
                                }`}
                            >
                                {product.badge}
                            </span>
                        )}

                        {/* Product Image */}
                        <div className="w-full h-[140px] flex items-center justify-center p-2 mb-3 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Title & Rating */}
                        <div className="flex flex-col gap-2">
                            {/* Stars */}
                            <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 fill-current ${
                                            i < product.rating
                                                ? "text-amber-400"
                                                : "text-zinc-200 fill-zinc-200"
                                        }`}
                                    />
                                ))}
                                <span className="text-[12px] text-[#77878F] ml-1">
                                    ({product.reviewCount})
                                </span>
                            </div>

                            <Link
                                to={`/product/${product.id}`}
                                className="text-[13px] font-normal text-[#191C1F] line-clamp-2 leading-snug group-hover:text-[#FA8232] transition-colors"
                            >
                                {product.title}
                            </Link>

                            <span className="text-[14px] font-semibold text-[#2DA5F3]">
                                Rp {product.price.toLocaleString("id-ID")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
