export interface ProductItem {
  id: number | string;
  sku: string;
  title: string;
  category: string;
  price: number;
  discount_price?: number;
  stock: number;
  low_stock_threshold?: number;
  weight?: number;
  materials?: string;
  brand?: string;
  short_description?: string;
  description?: string;
  image?: string;
  images?: string[];
  status?: "active" | "draft" | "archived" | string;
  is_featured: boolean;
  is_active: boolean;
  is_best_deal?: boolean;
  best_deal_started_at?: string | null;
  best_deal_expires_at?: string | null;
  best_deal_duration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  sku?: string;
  title: string;
  category: string;
  price: number;
  discount_price?: number;
  stock: number;
  low_stock_threshold?: number;
  weight?: number;
  materials?: string;
  brand?: string;
  short_description?: string;
  description?: string;
  image?: string;
  images?: string[];
  status?: "active" | "draft" | "archived" | string;
  is_featured?: boolean;
  is_active?: boolean;
  is_best_deal?: boolean;
  best_deal_started_at?: string | null;
  best_deal_expires_at?: string | null;
  best_deal_duration?: number;
}

