import { useState } from "react";
import { ArrowRight, CreditCard, ShieldCheck, Truck, Banknote, Wallet } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useCheckout } from "~/hooks/useCheckout";
import { BreadCheckoutDesktop } from "~/components/template/breadcrumb/BreadCheckoutDesktop";

export function CheckoutDesktop() {
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
            <BreadCheckoutDesktop />
            <section className="w-full py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <form onSubmit={handleSubmitOrder} className="grid grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: Billing Information Form (8 cols) */}
                        <div className="col-span-8 space-y-6">
                            <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-xs space-y-5">
                                <h1 className="text-xl font-bold text-[#191C1F] pb-4 border-b border-zinc-200">
                                    Billing Information
                                </h1>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">First Name</Label>
                                        <Input
                                            required
                                            value={billingInfo.firstName}
                                            onChange={(e) => updateBillingField("firstName", e.target.value)}
                                            placeholder="Your first name"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Last Name</Label>
                                        <Input
                                            required
                                            value={billingInfo.lastName}
                                            onChange={(e) => updateBillingField("lastName", e.target.value)}
                                            placeholder="Your last name"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-zinc-700">
                                        Company Name <span className="text-zinc-400 font-normal">(Optional)</span>
                                    </Label>
                                    <Input
                                        value={billingInfo.companyName}
                                        onChange={(e) => updateBillingField("companyName", e.target.value)}
                                        placeholder="Company name"
                                        className="h-11 text-xs border-zinc-300"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-zinc-700">Address</Label>
                                    <Input
                                        required
                                        value={billingInfo.address}
                                        onChange={(e) => updateBillingField("address", e.target.value)}
                                        placeholder="House number and street name"
                                        className="h-11 text-xs border-zinc-300"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Country</Label>
                                        <Input
                                            value={billingInfo.country}
                                            onChange={(e) => updateBillingField("country", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Region / State</Label>
                                        <Input
                                            value={billingInfo.regionState}
                                            onChange={(e) => updateBillingField("regionState", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">City</Label>
                                        <Input
                                            value={billingInfo.city}
                                            onChange={(e) => updateBillingField("city", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Zip Code</Label>
                                        <Input
                                            value={billingInfo.zipCode}
                                            onChange={(e) => updateBillingField("zipCode", e.target.value)}
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
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
                                    <div className="space-y-1.5">
                                        <Label className="text-xs font-semibold text-zinc-700">Phone Number</Label>
                                        <Input
                                            type="tel"
                                            required
                                            value={billingInfo.phone}
                                            onChange={(e) => updateBillingField("phone", e.target.value)}
                                            placeholder="Phone number"
                                            className="h-11 text-xs border-zinc-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Option Selection */}
                            <div className="border border-zinc-200 rounded-lg p-6 bg-white shadow-xs space-y-4">
                                <h2 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Payment Option
                                </h2>

                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { id: "cod", label: "Cash on Delivery", icon: Banknote },
                                        { id: "bank", label: "Bank Transfer", icon: Truck },
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
                                                className={`p-4 rounded-lg border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "border-[#2DA5F3] bg-sky-50/50 text-[#1B6392] ring-1 ring-[#2DA5F3]"
                                                        : "border-zinc-200 hover:border-zinc-300 text-zinc-600"
                                                }`}
                                            >
                                                <Icon className="w-6 h-6" />
                                                <span className="text-xs font-bold">{method.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary Box (4 cols) */}
                        <div className="col-span-4 space-y-6">
                            <div className="border border-zinc-200 rounded-lg bg-white p-6 shadow-xs space-y-5">
                                <h2 className="text-lg font-bold text-[#191C1F] pb-3 border-b border-zinc-200">
                                    Order Summary
                                </h2>

                                {/* Purchased Item Previews */}
                                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded border border-zinc-200 p-1 shrink-0 bg-white">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-zinc-800 truncate">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.quantity} x {item.price}
                                                </p>
                                            </div>
                                            <p className="text-xs font-bold text-zinc-900">
                                                ${(item.numericPrice * item.quantity).toFixed(0)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2.5 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
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

                                <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
                                    <span className="text-sm font-bold text-[#191C1F]">Total</span>
                                    <span className="text-base font-bold text-[#191C1F]">
                                        ${totals.total.toFixed(2)} USD
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#FA8232] hover:bg-[#E07026] text-white font-bold text-xs h-13 uppercase tracking-wider shadow-xs flex items-center justify-center gap-2"
                                >
                                    <span>{isSubmitting ? "Processing..." : "Place Order"}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Guaranteed 100% Safe & Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
