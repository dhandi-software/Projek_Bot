import { useState, useEffect } from "react";
import { categoryApi } from "~/api/categoryApi";
import type { CategoryItem, CategoryPayload } from "../types/categoryTypes";

export function useCategoryManagement() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState<CategoryPayload>({
    name: "",
    description: "",
    icon: "Umum",
    is_active: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryApi.getAll();
      setCategories(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil data kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      icon: "Umum",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || "",
      description: cat.description || "",
      icon: cat.icon || "Umum",
      is_active: cat.is_active ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      showToast("Nama kategori wajib diisi");
      return;
    }

    const targetName = trimmedName.toLowerCase();
    const isDuplicate = categories.some((c) => {
      const isSelf = editingCategory && String(c.id) === String(editingCategory.id);
      return !isSelf && (c.name || "").trim().toLowerCase() === targetName;
    });

    if (isDuplicate) {
      showToast("Kategori dengan nama ini sudah ada!");
      return;
    }

    setActionLoading(true);
    try {
      if (editingCategory && editingCategory.id) {
        await categoryApi.update(editingCategory.id, { ...formData, name: trimmedName });
        showToast("Kategori berhasil diperbarui!");
      } else {
        await categoryApi.create({ ...formData, name: trimmedName });
        showToast("Kategori baru berhasil dibuat!");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      console.error("Gagal menyimpan kategori:", err);
      showToast(err?.response?.data?.error || "Gagal menyimpan kategori");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!id) return;
    setActionLoading(true);
    try {
      await categoryApi.delete(id);
      showToast("Kategori berhasil dihapus!");
      setDeleteConfirmId(null);
      fetchCategories();
    } catch (err) {
      showToast("Gagal menghapus kategori");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    deleteConfirmId,
    setDeleteConfirmId,
    actionLoading,
    toastMessage,
    formData,
    setFormData,
    showToast,
    fetchCategories,
    handleOpenAdd,
    handleOpenEdit,
    handleSaveCategory,
    handleDelete,
  };
}
