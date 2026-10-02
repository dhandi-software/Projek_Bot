import { useState, useEffect, useCallback } from "react";
import type { ProductItem } from "~/types/product";
import { categoryApi } from "~/api/categoryApi";

const DEFAULT_CATEGORIES = [
  "Computer & Laptop",
  "Gaming Console",
  "Smartphone",
  "Headphone",
  "Computer Accessories",
  "Umum",
];

export function useCategories(_products: ProductItem[] = []) {
  const [categories, setCategories] = useState<string[]>([]);

  const fetchBackendCategories = useCallback(async () => {
    try {
      const res = await categoryApi.getAll();
      const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
      if (list.length > 0) {
        const backendCatNames = list
          .map((c: any) => c.name)
          .filter((name): name is string => Boolean(name && name.trim()));
        setCategories(backendCatNames);
      } else {
        setCategories(DEFAULT_CATEGORIES);
      }
    } catch (e) {
      console.warn("Gagal mengambil kategori dari backend:", e);
      setCategories((prev) => (prev.length > 0 ? prev : DEFAULT_CATEGORIES));
    }
  }, []);

  useEffect(() => {
    fetchBackendCategories();
  }, [fetchBackendCategories]);

  const addCategory = async (newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;

    const alreadyExists = categories.some(
      (c) => c.trim().toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) return;

    try {
      await categoryApi.create({ name: trimmed });
      await fetchBackendCategories();
    } catch (e) {
      console.warn("Gagal mengirim kategori baru ke backend:", e);
      setCategories((prev) => [...prev, trimmed]);
    }
  };

  return {
    categories,
    addCategory,
    fetchBackendCategories,
  };
}

