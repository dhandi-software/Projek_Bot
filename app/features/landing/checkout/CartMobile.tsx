import { XCircle, Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useCheckout } from "~/hooks/useCheckout";
import { BreadCartMobile } from "~/components/template/breadcrumb/BreadCartMobile";

export function CartMobile() {
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
            <BreadCartMobile />
            <section className="w-full py-6 px-4 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                    <h1 className="text-lg font-bold text-[#191C1F]">Shopping Card</h1>
                    <span className="text-xs font-semibold text-zinc-500">
                        {items.length} items
                    </span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border border-zinc-200 rounded-lg p-3 bg-white shadow-xs relative flex flex-col gap-3"
                        >
                            <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 active:text-red-500 p-1.5 z-10"
                                title="Remove item"
                            >
                                <XCircle className="w-5 h-5 text-red-400" />
                            </button>

                            <div className="flex gap-3 items-start pr-8">
                                <div className="w-16 h-16 rounded border border-zinc-200 bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xs font-medium text-[#191C1F] line-clamp-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs font-bold text-[#191C1F]">
                                        {item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                                <div className="flex items-center border border-zinc-200 rounded-md bg-white">
                                    <button
                                        type="button"
                                        className="w-9 h-9 flex items-center justify-center text-zinc-500 active:bg-zinc-100"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-9 text-center text-xs font-bold text-[#191C1F]">
                                        {String(item.quantity).padStart(2, "0")}
                                    </span>
                                    <button
                                        type="button"
                                        className="w-9 h-9 flex items-center justify-center text-zinc-500 active:bg-zinc-100"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-zinc-400 font-medium uppercase">Subtotal</p>
                                    <p className="text-sm font-bold text-[#191C1F]">
                                        ${(item.numericPrice * item.quantity).toFixed(0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 min-h-[44px] text-xs font-semibold border-[#2DA5F3] text-[#2DA5F3]"
                    >
                        <Link to="/" className="flex items-center justify-center gap-1.5">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Return to Shop</span>
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 min-h-[44px] text-xs font-semibold border-[#2DA5F3] text-[#2DA5F3]"
                    >
                        Update Cart
                    </Button>
                </div>

                {/* Card Totals */}
                <div className="border border-zinc-200 rounded-lg bg-white p-4 shadow-xs space-y-4">
                    <h2 className="text-base font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                        Card Totals
                    </h2>

                    <div className="space-y-2.5 text-xs text-zinc-600">
                        <div className="flex justify-between items-center">
                            <span>Sub-total</span>
                            <span className="font-semibold text-[#191C1F]">${totals.subTotal.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Shipping</span>
                            <span className="font-semibold text-[#191C1F]">Free</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Discount</span>
                            <span className="font-semibold text-[#191C1F]">${totals.discount.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Tax</span>
                            <span className="font-semibold text-[#191C1F]">${totals.tax.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-zinc-200 pt-3 flex justify-between items-center">
                        <span className="text-xs font-bold text-[#191C1F]">Total</span>
                        <span className="text-sm font-bold text-[#191C1F]">${totals.total.toFixed(2)} USD</span>
                    </div>

                    <Button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs min-h-[48px] uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                    >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Coupon Code */}
                <div className="border border-zinc-200 rounded-lg bg-white p-4 shadow-xs space-y-3">
                    <h2 className="text-sm font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                        Coupon Code
                    </h2>
                    <Input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Email address / coupon code"
                        className="min-h-[44px] text-xs border-zinc-300"
                    />
                    {appliedCoupon && (
                        <p className="text-xs font-semibold text-emerald-600">
                            Kupon {appliedCoupon} berhasil digunakan (-$24)
                        </p>
                    )}
                    {couponError && (
                        <p className="text-xs font-medium text-rose-600">{couponError}</p>
                    )}
                    <Button
                        onClick={handleApplyCoupon}
                        className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs min-h-[44px] uppercase"
                    >
                        Apply Coupon
                    </Button>
                </div>
            </section>
        </div>
    );
}
