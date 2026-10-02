export interface CategoryItem {
  id: number | string;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
}
