import { useState } from "react";
import { useCart } from "~/context/CartContext";
import type { BillingInfo, CartTotals } from "~/types/checkout";

export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export function useCheckout() {
    const { cartItems, removeFromCart, updateQuantity, totalCount } = useCart();

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [couponDiscount, setCouponDiscount] = useState<number>(360000);
    const [couponError, setCouponError] = useState<string | null>(null);

    const [billingInfo, setBillingInfo] = useState<BillingInfo>({
        firstName: "",
        lastName: "",
        companyName: "",
        address: "",
        country: "Indonesia",
        regionState: "DKI Jakarta",
        city: "Jakarta Selatan",
        zipCode: "12190",
        email: "",
        phone: "",
        paymentMethod: "cod",
        notes: "",
    });

    const items = cartItems;

    const subTotal = items.reduce(
        (sum, item) => sum + item.numericPrice * item.quantity,
        0,
    );
    const shipping = 0; // Free / Gratis
    const discount = appliedCoupon ? couponDiscount : 360000;
    const tax = 930000;
    const total = Math.max(0, subTotal + shipping + tax - discount);

    const totals: CartTotals = {
        subTotal,
        shipping,
        discount,
        tax,
        total,
    };

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError("Silakan masukkan kode kupon");
            return;
        }
        if (
            couponCode.toLowerCase() === "dhandi24" ||
            couponCode.toLowerCase() === "discount24" ||
            couponCode.toLowerCase() === "promo2026"
        ) {
            setAppliedCoupon(couponCode.toUpperCase());
            setCouponDiscount(360000);
            setCouponError(null);
        } else {
            setAppliedCoupon(couponCode.toUpperCase());
            setCouponDiscount(360000);
            setCouponError(null);
        }
    };

    const updateBillingField = (field: keyof BillingInfo, value: string) => {
        setBillingInfo((prev) => ({ ...prev, [field]: value }));
    };

    return {
        items,
        totals,
        totalCount,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        handleApplyCoupon,
        billingInfo,
        updateBillingField,
        removeFromCart,
        updateQuantity,
        formatRupiah,
    };
}
