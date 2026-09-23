export interface CartTotals {
    subTotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
}

export interface BillingInfo {
    firstName: string;
    lastName: string;
    companyName?: string;
    address: string;
    country: string;
    regionState: string;
    city: string;
    zipCode: string;
    email: string;
    phone: string;
    paymentMethod: "cod" | "bank" | "wallet" | "card";
    notes?: string;
}

export interface OrderSummaryItem {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
