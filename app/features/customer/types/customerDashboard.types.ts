export type OrderStatusType = "IN PROGRESS" | "COMPLETED" | "CANCELED" | "PENDING";

export interface CustomerProfileInfo {
    name: string;
    email: string;
    secEmail?: string;
    phone: string;
    location: string;
    avatar: string;
}

export interface CustomerBillingAddress {
    name: string;
    address: string;
    phone: string;
    email: string;
}

export interface CustomerDashboardStats {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
}

export interface CustomerPaymentCard {
    id: string;
    cardType: "visa" | "mastercard";
    balance: string;
    currency: string;
    cardNumberMasked: string;
    cardHolderName: string;
    isDefault?: boolean;
}

export interface CustomerRecentOrder {
    id: string;
    orderId: string;
    status: OrderStatusType;
    date: string;
    totalAmount: string;
    productCount: number;
    actionUrl?: string;
}

export interface CustomerHistoryProduct {
    id: string;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
    image: string;
    badge?: "HOT" | "BEST DEALS";
    slug?: string;
}
