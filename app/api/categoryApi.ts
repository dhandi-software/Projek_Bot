import { client } from "./client";
import type { CategoryItem, CategoryPayload } from "~/features/products/types";

export const categoryApi = {
  async getAll() {
    const res = await client.get<{ total: number; data: CategoryItem[] }>("/categories");
    return res.data;
  },

  async create(data: CategoryPayload) {
    const res = await client.post<{ message: string; data: CategoryItem }>("/categories", data);
    return res.data;
  },

  async update(id: string | number, data: Partial<CategoryPayload>) {
    const res = await client.put<{ message: string; data: CategoryItem }>(`/categories/${id}`, data);
    return res.data;
  },

  async delete(id: string | number) {
    const res = await client.delete<{ message: string }>(`/categories/${id}`);
    return res.data;
  },
};
