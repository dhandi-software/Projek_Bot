import { useProducts } from "~/hooks/useProducts";
import type { ProductDesktopState, ProductDesktopActions } from "../types/productDesktopTypes";

export function useProductDesktop(): ProductDesktopState & ProductDesktopActions & { categories: string[]; addCategory: (cat: string) => void } {
  return useProducts();
}
