import { useProducts } from "~/hooks/useProducts";
import type { ProductMobileState, ProductMobileActions } from "../types/productMobileTypes";

export function useProductMobile(): ProductMobileState & ProductMobileActions & { categories: string[]; addCategory: (cat: string) => void } {
  return useProducts();
}
