export type OrderStatus = "IN PROGRESS" | "COMPLETED" | "CANCELED" | "PENDING";

export interface CustomerOrderItem {
    id: string;
    productTitle: string;
    productImage: string;
    price: number;
    quantity: number;
}

export interface CustomerOrder {
    id: string;
    orderId: string;
    status: OrderStatus;
    date: string;
    totalAmount: number;
    itemCount: number;
    productTitle?: string;
    productImage?: string;
    items?: CustomerOrderItem[];
    paymentMethod?: string;
    shippingAddress?: string;
}

export interface CustomerOrdersFilter {
    status?: OrderStatus | "ALL";
    searchQuery?: string;
    page: number;
    pageSize: number;
}

export interface PaginatedCustomerOrders {
    orders: CustomerOrder[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}
