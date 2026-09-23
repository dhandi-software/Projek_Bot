import { XCircle, ShoppingCart, Heart, Star, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useCompare } from "~/hooks/useCompare";
import { BreadCompareMobile } from "~/components/template/breadcrumb/BreadCompareMobile";

export function CompareMobile() {
    const { items, removeItem, resetToDefault, clearAll } = useCompare();

    if (items.length === 0) {
        return (
            <div className="w-full bg-white">
                <BreadCompareMobile />
                <div className="py-12 px-4">
                    <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <XCircle className="w-7 h-7" />
                        </div>
                        <h2 className="text-lg font-bold text-[#191C1F]">No Products to Compare</h2>
                        <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                            You have removed all items from your comparison list.
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
                            <Button asChild className="w-full min-h-[44px] bg-[#FA8232] hover:bg-[#E07026] text-white">
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
            <BreadCompareMobile />
            <section className="w-full py-6 px-4 space-y-4">

            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <h1 className="text-lg font-bold text-[#191C1F]">Compare Products</h1>
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

            {/* Horizontal Scrollable Table Wrapper for Mobile */}
            <div className="overflow-x-auto rounded-lg border border-zinc-200 shadow-xs pb-1">
                <div className="min-w-[640px]">
                    {/* Header Row: Products */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200 bg-zinc-50/60">
                        <div className="p-3 text-xs font-semibold text-[#191C1F] flex items-center">
                            Products
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 relative flex flex-col justify-between">
                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 active:text-red-500 p-1.5"
                                    title="Remove product"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>

                                <div className="space-y-2 pt-2">
                                    <div className="w-full h-36 rounded border border-zinc-200 bg-white p-2 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-xs font-medium text-[#191C1F] line-clamp-3 min-h-[3rem] leading-snug">
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-1.5 pt-3">
                                    <Button
                                        disabled={item.stockStatus === "OUT OF STOCK"}
                                        className={`flex-1 font-semibold text-[11px] min-h-[40px] px-2 ${
                                            item.stockStatus === "OUT OF STOCK"
                                                ? "bg-zinc-200 text-zinc-500 border-zinc-200 cursor-not-allowed"
                                                : "bg-[#FA8232] hover:bg-[#E07026] text-white"
                                        }`}
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                                        <span>ADD</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0 border-zinc-200 hover:bg-zinc-50"
                                    >
                                        <Heart className="w-3.5 h-3.5 text-zinc-600" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Customer feedback */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Rating:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 flex flex-col gap-0.5 justify-center">
                                <div className="flex items-center gap-0.5 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${
                                                i < item.rating ? "fill-amber-400 text-amber-400" : "text-zinc-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-zinc-400 font-medium truncate">
                                    ({item.ratingCount.toLocaleString()})
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Price:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-bold text-[#2DA5F3] flex items-center">
                                ${item.price.toFixed(2)}
                            </div>
                        ))}
                    </div>

                    {/* Sold by */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Sold by:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-medium text-zinc-700 flex items-center">
                                {item.soldBy}
                            </div>
                        ))}
                    </div>

                    {/* Brand */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Brand:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-medium text-zinc-700 flex items-center">
                                {item.brand}
                            </div>
                        ))}
                    </div>

                    {/* Model */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Model:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-medium text-zinc-700 flex items-center">
                                {item.model}
                            </div>
                        ))}
                    </div>

                    {/* Stock status */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Stock:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 flex items-center">
                                <span
                                    className={`text-[10px] font-bold tracking-wider uppercase ${
                                        item.stockStatus === "IN STOCK"
                                            ? "text-emerald-600"
                                            : "text-rose-600"
                                    }`}
                                >
                                    {item.stockStatus}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Size */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Size:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-medium text-zinc-700 flex items-center">
                                {item.size}
                            </div>
                        ))}
                    </div>

                    {/* Weight */}
                    <div className="grid grid-cols-4 divide-x divide-zinc-200">
                        <div className="p-3 text-[11px] font-semibold text-zinc-500 flex items-center">
                            Weight:
                        </div>
                        {items.map((item) => (
                            <div key={item.id} className="p-3 text-xs font-medium text-zinc-700 flex items-center">
                                {item.weight}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

