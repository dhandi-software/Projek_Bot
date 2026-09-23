import { XCircle, Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCheckout } from "~/hooks/useCheckout";
import { BreadCartDesktop } from "~/components/template/breadcrumb/BreadCartDesktop";

export function CartDesktop() {
    const navigate = useNavigate();
    const {
        items,
        totals,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        handleApplyCoupon,
        removeFromCart,
    } = useCheckout();

    return (
        <div className="w-full bg-white">
            <BreadCartDesktop />
            <section className="w-full py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-12 gap-6 items-start">
                        {/* LEFT COLUMN: Shopping Card Table (8 cols) */}
                        <div className="col-span-8 border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-xs">
                            <div className="p-6 border-b border-zinc-200">
                                <h1 className="text-xl font-bold text-[#191C1F]">Shopping Card</h1>
                            </div>

                            {/* Table Sub-Heading */}
                            <div className="grid grid-cols-12 bg-zinc-50 border-b border-zinc-200 px-6 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                <div className="col-span-6">Products</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-2">Quantity</div>
                                <div className="col-span-2 text-right">Sub-Total</div>
                            </div>

                            {/* Table Products List */}
                            <div className="divide-y divide-zinc-200">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-12 items-center px-6 py-5 hover:bg-zinc-50/50 transition-colors group"
                                    >
                                        {/* Product info + Remove */}
                                        <div className="col-span-6 flex items-center gap-3.5 pr-4">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                                                title="Remove item"
                                            >
                                                <XCircle className="w-5 h-5 text-red-400 hover:text-red-600" />
                                            </button>
                                            <div className="w-16 h-16 rounded border border-zinc-200 bg-white p-1.5 shrink-0 overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <h3 className="text-xs font-medium text-[#191C1F] line-clamp-2 leading-relaxed">
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-2 text-xs font-semibold text-zinc-700">
                                            {item.price}
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="col-span-2 flex items-center">
                                            <div className="flex items-center border border-zinc-200 rounded-md bg-white overflow-hidden">
                                                <button
                                                    type="button"
                                                    className="w-8 h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-10 text-center text-xs font-bold text-[#191C1F]">
                                                    {String(item.quantity).padStart(2, "0")}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="w-8 h-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sub-Total */}
                                        <div className="col-span-2 text-right text-xs font-bold text-[#191C1F]">
                                            ${(item.numericPrice * item.quantity).toFixed(0)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Table Footer Actions */}
                            <div className="p-6 border-t border-zinc-200 flex items-center justify-between bg-white">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="border-[#2DA5F3] text-[#2DA5F3] hover:bg-sky-50 font-semibold text-xs h-11 px-6 uppercase tracking-wider"
                                >
                                    <Link to="/" className="flex items-center gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Return to Shop</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-[#2DA5F3] text-[#2DA5F3] hover:bg-sky-50 font-semibold text-xs h-11 px-6 uppercase tracking-wider"
                                >
                                    Update Cart
                                </Button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Card Totals & Coupon (4 cols) */}
                        <div className="col-span-4 space-y-6">
                            {/* Card Totals Box (Node 21:8333) */}
                            <div className="border border-zinc-200 rounded-lg bg-white p-6 shadow-xs space-y-5">
                                <h2 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Card Totals
                                </h2>

                                <div className="space-y-3.5 text-xs text-zinc-600">
                                    <div className="flex justify-between items-center">
                                        <span>Sub-total</span>
                                        <span className="font-semibold text-[#191C1F]">
                                            ${totals.subTotal.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-[#191C1F]">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Discount</span>
                                        <span className="font-semibold text-[#191C1F]">
                                            ${totals.discount.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Tax</span>
                                        <span className="font-semibold text-[#191C1F]">
                                            ${totals.tax.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#191C1F]">Total</span>
                                    <span className="text-base font-bold text-[#191C1F]">
                                        ${totals.total.toFixed(2)} USD
                                    </span>
                                </div>

                                <Button
                                    onClick={() => navigate("/checkout")}
                                    className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-13 uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Coupon Code Box (Node 21:8355) */}
                            <div className="border border-zinc-200 rounded-lg bg-white p-6 shadow-xs space-y-4">
                                <h2 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Coupon Code
                                </h2>

                                <div className="space-y-3">
                                    <Input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Email address / coupon code"
                                        className="h-11 text-xs border-zinc-300 focus-visible:ring-[#2DA5F3]"
                                    />
                                    {appliedCoupon && (
                                        <p className="text-xs font-semibold text-emerald-600">
                                            Kupon {appliedCoupon} berhasil digunakan (-$24)
                                        </p>
                                    )}
                                    {couponError && (
                                        <p className="text-xs font-medium text-rose-600">
                                            {couponError}
                                        </p>
                                    )}
                                    <Button
                                        onClick={handleApplyCoupon}
                                        className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs h-11 px-6 uppercase tracking-wider"
                                    >
                                        Apply Coupon
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
