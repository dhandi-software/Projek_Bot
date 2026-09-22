import { client } from "./client";
import type { BannerItem, BannerPayload } from "~/features/products/types/types";

export const bannerApi = {
  async getAll(params?: { active?: boolean }) {
    const res = await client.get<{ total: number; data: BannerItem[] }>("/banners", { params });
    return res.data;
  },

  async create(data: BannerPayload) {
    const res = await client.post<{ message: string; data: BannerItem }>("/banners", data);
    return res.data;
  },

  async update(id: string | number, data: BannerPayload) {
    const res = await client.put<{ message: string; data: BannerItem }>(`/banners/${id}`, data);
    return res.data;
  },

  async delete(id: string | number) {
    const res = await client.delete<{ message: string }>(`/banners/${id}`);
    return res.data;
  },
};
