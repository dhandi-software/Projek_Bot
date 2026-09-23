import { XCircle, ShoppingCart, Heart, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useWishlist } from "~/hooks/useWishlist";
import { BreadWishlistMobile } from "~/components/template/breadcrumb/BreadWishlistMobile";

export function WishlistMobile() {
    const { items, removeItem, resetToDefault, clearAll } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="w-full bg-white">
                <BreadWishlistMobile />
                <div className="py-12 px-4">
                    <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <Heart className="w-7 h-7" />
                        </div>
                        <h2 className="text-lg font-bold text-[#191C1F]">Your Wishlist is Empty</h2>
                        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                            Explore products and tap the heart icon to add items to your wishlist.
                        </p>
                        <div className="flex flex-col gap-2 pt-2">
                            <Button
                                onClick={resetToDefault}
                                variant="outline"
                                className="w-full min-h-[44px] flex items-center justify-center gap-2 border-zinc-300"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Reset Default</span>
                            </Button>
                            <Button asChild className="w-full min-h-[44px] bg-[#2DA5F3] hover:bg-[#1B6392] text-white">
                                <Link to="/" className="flex items-center justify-center gap-2">
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
            <BreadWishlistMobile />
            <section className="w-full py-6 px-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                    <h1 className="text-lg font-bold text-[#191C1F]">Wishlist</h1>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={clearAll}
                            className="text-xs font-semibold text-zinc-500 hover:text-red-600 active:text-red-600 p-1"
                        >
                            Clear All
                        </button>
                        <button
                            type="button"
                            onClick={resetToDefault}
                            className="text-xs font-semibold text-[#1B6392] active:opacity-80 p-1 flex items-center gap-1"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border border-zinc-200 rounded-lg p-3 bg-white shadow-xs relative flex flex-col gap-3"
                        >
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 active:text-red-500 p-1.5 z-10"
                                title="Remove item"
                            >
                                <XCircle className="w-5 h-5" />
                            </button>

                            <div className="flex gap-3 items-start pr-8">
                                <div className="w-20 h-20 rounded border border-zinc-200 bg-white p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xs font-medium text-[#191C1F] line-clamp-2 leading-tight">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-2 pt-0.5">
                                        {item.originalPrice && (
                                            <span className="text-[11px] text-zinc-400 line-through">
                                                ${item.originalPrice.toFixed(0)}
                                            </span>
                                        )}
                                        <span className="text-sm font-bold text-[#191C1F]">
                                            ${item.price.toFixed(item.price % 1 === 0 ? 0 : 2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wider ${
                                                item.stockStatus === "IN STOCK"
                                                    ? "text-emerald-600"
                                                    : "text-rose-600"
                                            }`}
                                        >
                                            {item.stockStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                disabled={item.stockStatus === "OUT OF STOCK"}
                                className={`w-full font-semibold text-xs min-h-[44px] transition-all ${
                                    item.stockStatus === "OUT OF STOCK"
                                        ? "bg-zinc-200 text-zinc-500 border-zinc-200 cursor-not-allowed"
                                        : "bg-[#2DA5F3] hover:bg-[#1B6392] text-white"
                                }`}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                <span>ADD TO CART</span>
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
