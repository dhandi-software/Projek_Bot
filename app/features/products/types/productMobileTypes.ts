import type { ProductItem, ProductPayload } from "~/types/product";

export interface ProductMobileState {
  products: ProductItem[];
  filteredProducts: ProductItem[];
  loading: boolean;
  searchQuery: string;
  selectedCategory: string;
  viewMode: "list" | "form";
  editingProduct: ProductItem | null;
  formData: ProductPayload;
  deleteConfirmId: number | string | null;
  actionLoading: boolean;
  toastMessage: string | null;
}

export interface ProductMobileActions {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setViewMode: (mode: "list" | "form") => void;
  setFormData: React.Dispatch<React.SetStateAction<ProductPayload>>;
  setDeleteConfirmId: (id: number | string | null) => void;
  showToast: (msg: string) => void;
  handleOpenAddForm: () => void;
  handleOpenEditForm: (product: ProductItem) => void;
  handleSaveProduct: (targetStatus?: "active" | "draft" | "archived") => Promise<void>;
  handleDelete: (id: number | string) => Promise<void>;
}
