import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck, Truck, Banknote, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { BreadCheckoutMobile } from "~/components/template/breadcrumb/BreadCheckoutMobile";

export function CheckoutMobile() {
    const navigate = useNavigate();
    const { items, totals, billingInfo, updateBillingField } = useCheckout();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate("/checkout/success");
        }, 800);
    };

    return (
        <div className="w-full bg-white">
            <BreadCheckoutMobile />
            <section className="w-full py-6 px-4">
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-4">
                        <h1 className="text-base font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                            Billing Information
                        </h1>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">First Name</Label>
                                <Input
                                    required
                                    value={billingInfo.firstName}
                                    onChange={(e) => updateBillingField("firstName", e.target.value)}
                                    placeholder="First name"
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Last Name</Label>
                                <Input
                                    required
                                    value={billingInfo.lastName}
                                    onChange={(e) => updateBillingField("lastName", e.target.value)}
                                    placeholder="Last name"
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs font-semibold text-zinc-700">Address</Label>
                            <Input
                                required
                                value={billingInfo.address}
                                onChange={(e) => updateBillingField("address", e.target.value)}
                                placeholder="Street address"
                                className="h-11 text-xs border-zinc-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Email</Label>
                                <Input
                                    type="email"
                                    required
                                    value={billingInfo.email}
                                    onChange={(e) => updateBillingField("email", e.target.value)}
                                    placeholder="Email address"
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs font-semibold text-zinc-700">Phone</Label>
                                <Input
                                    type="tel"
                                    required
                                    value={billingInfo.phone}
                                    onChange={(e) => updateBillingField("phone", e.target.value)}
                                    placeholder="Phone"
                                    className="h-11 text-xs border-zinc-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-3">
                        <h2 className="text-sm font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Payment Option
                        </h2>
                        <div className="grid grid-cols-2 gap-2.5">
                            {[
                                { id: "cod", label: "COD", icon: Banknote },
                                { id: "bank", label: "Transfer", icon: Truck },
                                { id: "wallet", label: "E-Wallet", icon: Wallet },
                                { id: "card", label: "Credit Card", icon: CreditCard },
                            ].map((method) => {
                                const Icon = method.icon;
                                const isSelected = billingInfo.paymentMethod === method.id;
                                return (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => updateBillingField("paymentMethod", method.id)}
                                        className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all ${
                                            isSelected
                                                ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392]"
                                                : "border-zinc-200 text-zinc-600"
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="text-xs font-semibold">{method.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border border-zinc-200 rounded-lg p-4 bg-white shadow-xs space-y-4">
                        <h2 className="text-sm font-bold text-[#191C1F] pb-2 border-b border-zinc-200">
                            Order Summary
                        </h2>

                        <div className="space-y-2.5 text-xs text-zinc-600">
                            <div className="flex justify-between">
                                <span>Sub-total</span>
                                <span className="font-semibold text-zinc-900">${totals.subTotal.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-semibold text-zinc-900">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span className="font-semibold text-zinc-900">${totals.discount.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-semibold text-zinc-900">${totals.tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-zinc-200 pt-3 flex justify-between items-center">
                            <span className="text-xs font-bold text-[#191C1F]">Total</span>
                            <span className="text-sm font-bold text-[#191C1F]">${totals.total.toFixed(2)} USD</span>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#FA8232] hover:bg-[#E07026] text-white font-bold text-xs min-h-[48px] uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                        >
                            <span>{isSubmitting ? "Processing..." : "Place Order"}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 pt-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Safe & Secure Checkout</span>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}
