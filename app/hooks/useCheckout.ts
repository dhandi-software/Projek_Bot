import { useState, useEffect } from "react";
import { useCart } from "~/context/CartContext";
import { useAuth } from "~/hooks/useAuth";
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
    const { user } = useAuth();

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

    useEffect(() => {
        let custData: Record<string, any> = {};

        if (user) {
            custData = { ...user };
        }

        const savedUserStr = localStorage.getItem("user");
        if (savedUserStr) {
            try {
                const parsed = JSON.parse(savedUserStr);
                custData = { ...parsed, ...custData };
            } catch (e) {
                // ignore
            }
        }

        const email = custData.email || user?.email || "";
        const role = (custData.role || user?.role || "customer").toLowerCase();
        const roleProfileKey = `userProfile_${role}_${email || "guest"}`;

        const savedProfileStr = localStorage.getItem(roleProfileKey) || localStorage.getItem("userProfile");
        if (savedProfileStr) {
            try {
                const parsedProf = JSON.parse(savedProfileStr);
                custData = { ...custData, ...parsedProf };
            } catch (e) {
                // ignore
            }
        }

        const activeCustStr = localStorage.getItem("active_customer") || localStorage.getItem("customer_user");
        if (activeCustStr) {
            try {
                const parsedActive = JSON.parse(activeCustStr);
                custData = { ...custData, ...parsedActive };
            } catch (e) {
                // ignore
            }
        }

        if (Object.keys(custData).length > 0) {
            const rawName = String(custData.name || custData.fullName || custData.username || "").trim();
            const nameParts = rawName ? rawName.split(" ") : [];
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            setBillingInfo((prev) => ({
                ...prev,
                firstName: prev.firstName || firstName,
                lastName: prev.lastName || lastName,
                email: prev.email || custData.email || "",
                phone: prev.phone || custData.phone || custData.phoneNumber || "",
                address: prev.address || custData.address || "",
                companyName: prev.companyName || custData.companyName || custData.company || "",
                country: prev.country || custData.country || "Indonesia",
                regionState: prev.regionState || custData.regionState || custData.province || "DKI Jakarta",
                city: prev.city || custData.city || "Jakarta Selatan",
                zipCode: prev.zipCode || custData.zipCode || custData.postalCode || "12190",
            }));
        }
    }, [user]);

    const items = cartItems;

    const subTotal = items.reduce(
        (sum, item) => sum + item.numericPrice * item.quantity,
        0,
    );
    const shipping = 0; // Free / Gratis Ongkir
    const discount = appliedCoupon ? couponDiscount : 0;
    const tax = 0; // Tax included or 0
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
