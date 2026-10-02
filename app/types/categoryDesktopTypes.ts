import type { CategoryItem, CategoryPayload } from "./categoryTypes";

export interface CategoryDesktopState {
  categories: CategoryItem[];
  loading: boolean;
  searchQuery: string;
  isModalOpen: boolean;
  editingCategory: CategoryItem | null;
  deleteConfirmId: number | string | null;
  actionLoading: boolean;
  toastMessage: string | null;
  formData: CategoryPayload;
}

export interface CategoryDesktopActions {
  setSearchQuery: (query: string) => void;
  setIsModalOpen: (open: boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<CategoryPayload>>;
  setDeleteConfirmId: (id: number | string | null) => void;
  showToast: (msg: string) => void;
  fetchCategories: () => Promise<void>;
  handleOpenAdd: () => void;
  handleOpenEdit: (cat: CategoryItem) => void;
  handleSaveCategory: (e: React.FormEvent) => Promise<void>;
  handleDelete: (id: number | string) => Promise<void>;
}
