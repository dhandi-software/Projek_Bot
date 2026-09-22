import { client } from "./client";
import type { ProductItem, ProductPayload } from "~/features/products/types/types";

export const productApi = {
  async getAll(params?: { category?: string; q?: string; featured?: boolean; active?: boolean }) {
    const res = await client.get<{ total: number; data: ProductItem[] }>("/products", { params });
    return res.data;
  },

  async getById(id: string | number) {
    const res = await client.get<ProductItem>(`/products/${id}`);
    return res.data;
  },

  async create(data: ProductPayload) {
    const res = await client.post<{ message: string; data: ProductItem }>("/products", data);
    return res.data;
  },

  async bulkCreate(data: ProductPayload[]) {
    const res = await client.post<{ message: string; total: number; data: ProductItem[] }>("/products/bulk", data);
    return res.data;
  },

  async update(id: string | number, data: ProductPayload) {
    const res = await client.put<{ message: string; data: ProductItem }>(`/products/${id}`, data);
    return res.data;
  },

  async delete(id: string | number) {
    const res = await client.delete<{ message: string }>(`/products/${id}`);
    return res.data;
  },
};
