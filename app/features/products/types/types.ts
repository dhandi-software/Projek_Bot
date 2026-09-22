export interface ProductItem {
  id: number | string;
  sku: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  materials: string;
  brand: string;
  description: string;
  image: string;
  is_featured: boolean;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  sku?: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  materials?: string;
  brand?: string;
  description?: string;
  image?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

export interface BannerItem {
  id: number | string;
  title: string;
  subtitle?: string;
  tagline?: string;
  image: string;
  price_badge?: string;
  link_url?: string;
  button_text?: string;
  bg_color?: string;
  is_active: boolean;
  sort_order: number;
}

export interface BannerPayload {
  title: string;
  subtitle?: string;
  tagline?: string;
  image: string;
  price_badge?: string;
  link_url?: string;
  button_text?: string;
  bg_color?: string;
  is_active?: boolean;
  sort_order?: number;
}
