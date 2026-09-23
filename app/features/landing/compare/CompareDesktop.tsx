import { XCircle, ShoppingCart, Heart, Star, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useCompare } from "~/hooks/useCompare";
import { BreadCompareDesktop } from "~/components/template/breadcrumb/BreadCompareDesktop";

export function CompareDesktop() {
    const { items, removeItem, resetToDefault, clearAll } = useCompare();

    if (items.length === 0) {
        return (
            <div className="w-full bg-white">
                <BreadCompareDesktop />
                <div className="py-20 px-4">
                    <div className="max-w-md mx-auto text-center space-y-4">
                        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <XCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191C1F]">No Products to Compare</h2>
                        <p className="text-sm text-zinc-500">
                            You have removed all items from your comparison list.
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
                            <Button asChild>
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
            <BreadCompareDesktop />
            <section className="w-full py-10">

            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <h1 className="text-2xl font-bold text-[#191C1F]">Compare Products</h1>
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
                    {/* Header Row: Products */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 bg-zinc-50/50">
                        <div className="col-span-3 p-6 font-semibold text-[#191C1F] flex items-center">
                            <span>Product Details</span>
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-6 relative flex flex-col justify-between group">
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors rounded-full p-1"
                                        title="Remove product"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>

                                    <div className="space-y-4">
                                        <div className="w-full h-52 rounded-md border border-zinc-200 bg-white p-4 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-3 min-h-[3.75rem] leading-snug">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2 pt-4 mt-2">
                                        <Button
                                            disabled={item.stockStatus === "OUT OF STOCK"}
                                            className="flex-1"
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-1.5" />
                                            <span>ADD TO CART</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-11 w-11 shrink-0 border-zinc-200 hover:bg-zinc-50 hover:text-rose-600 transition-colors"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer feedback */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Customer feedback:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 flex items-center gap-2">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < item.rating ? "fill-amber-400 text-amber-400" : "text-zinc-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-zinc-500 font-medium">
                                        ({item.ratingCount.toLocaleString()})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Price:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-sm font-bold text-[#2DA5F3]">
                                    ${item.price.toFixed(2)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sold by */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Sold by:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-xs font-medium text-zinc-700">
                                    {item.soldBy}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Brand */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Brand:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-xs font-medium text-zinc-700">
                                    {item.brand}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Model */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Model:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-xs font-medium text-zinc-700">
                                    {item.model}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stock status */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Stock status:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4">
                                    <span
                                        className={`inline-block text-[11px] font-bold tracking-wider uppercase ${
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
                    </div>

                    {/* Size */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Size:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-xs font-medium text-zinc-700">
                                    {item.size}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="grid grid-cols-12 divide-x divide-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="col-span-3 p-4 text-xs font-semibold text-zinc-600 flex items-center">
                            Weight:
                        </div>
                        <div className="col-span-9 grid grid-cols-3 divide-x divide-zinc-200">
                            {items.map((item) => (
                                <div key={item.id} className="p-4 text-xs font-medium text-zinc-700">
                                    {item.weight}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

