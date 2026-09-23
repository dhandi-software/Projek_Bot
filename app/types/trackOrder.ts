export type OrderStatus = "pending" | "processing" | "shipped" | "in_transit" | "delivered" | "cancelled";

export interface TimelineEvent {
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetail {
  id: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: OrderItem[];
  timeline: TimelineEvent[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  total: number;
}
