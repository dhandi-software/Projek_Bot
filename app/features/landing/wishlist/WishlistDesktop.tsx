import { XCircle, ShoppingCart, Heart, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useWishlist } from "~/hooks/useWishlist";
import { BreadWishlistDesktop } from "~/components/template/breadcrumb/BreadWishlistDesktop";

export function WishlistDesktop() {
    const { items, removeItem, resetToDefault, clearAll } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="w-full bg-white">
                <BreadWishlistDesktop />
                <div className="py-20 px-4">
                    <div className="max-w-md mx-auto text-center space-y-4">
                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191C1F]">Your Wishlist is Empty</h2>
                        <p className="text-sm text-zinc-500">
                            Explore products and click the heart icon to add your favorite items here.
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                            <Button
                                onClick={resetToDefault}
                                variant="outline"
                                className="flex items-center gap-2 border-zinc-300 hover:bg-zinc-50"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Reset Default</span>
                            </Button>
                            <Button asChild className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white">
                                <Link to="/" className="flex items-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Continue Shopping</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white">
            <BreadWishlistDesktop />
            <section className="w-full py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                        <h1 className="text-2xl font-bold text-[#191C1F]">Wishlist</h1>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={clearAll}
                                className="text-xs font-semibold text-zinc-500 hover:text-red-600 transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                type="button"
                                onClick={resetToDefault}
                                className="text-xs font-semibold text-[#1B6392] hover:underline transition-colors flex items-center gap-1"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset Default</span>
                            </button>
                        </div>
                    </div>

                    <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-xs">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 bg-zinc-50/80 border-b border-zinc-200 px-6 py-3.5 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                            <div className="col-span-5">Products</div>
                            <div className="col-span-2">Price</div>
                            <div className="col-span-2">Stock Status</div>
                            <div className="col-span-3 text-right pr-8">Actions</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-zinc-200">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 items-center px-6 py-4 hover:bg-zinc-50/50 transition-colors group"
                                >
                                    {/* Product Title & Image */}
                                    <div className="col-span-5 flex items-center gap-4 pr-4">
                                        <div className="w-18 h-18 rounded-md border border-zinc-200 bg-white p-2 shrink-0 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-2 leading-relaxed">
                                            {item.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 flex items-center gap-2">
                                        {item.originalPrice && (
                                            <span className="text-xs text-zinc-400 line-through">
                                                ${item.originalPrice.toFixed(0)}
                                            </span>
                                        )}
                                        <span className="text-sm font-bold text-[#191C1F]">
                                            ${item.price.toFixed(item.price % 1 === 0 ? 0 : 2)}
                                        </span>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="col-span-2">
                                        <span
                                            className={`text-xs font-bold uppercase tracking-wide ${
                                                item.stockStatus === "IN STOCK"
                                                    ? "text-emerald-600"
                                                    : "text-rose-600"
                                            }`}
                                        >
                                            {item.stockStatus}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-3 flex items-center justify-end gap-3">
                                        <Button
                                            disabled={item.stockStatus === "OUT OF STOCK"}
                                            className={`font-semibold text-xs h-11 px-5 transition-all ${
                                                item.stockStatus === "OUT OF STOCK"
                                                    ? "bg-zinc-200 text-zinc-500 border-zinc-200 cursor-not-allowed"
                                                    : "bg-[#2DA5F3] hover:bg-[#1B6392] text-white shadow-xs"
                                            }`}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            <span>ADD TO CART</span>
                                        </Button>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-zinc-100"
                                            title="Remove item"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
