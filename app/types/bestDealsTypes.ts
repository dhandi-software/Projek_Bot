import type { ProductItem } from "~/types/product";

export interface BestDealsPageState {
  products: ProductItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  timerString: string;
  hasActiveDeals: boolean;
}
