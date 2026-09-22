import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { CategoryDesktop, CategoryMobile } from "~/features/landing/category/pages";

export function meta() {
  return [
    { title: "Category - Dhandi Ecommerce" },
    { name: "description", content: "Kategori Produk & Filter Dhandi Ecommerce" },
  ];
}

export default function CategoryDemo() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <CategoryMobile /> : <CategoryDesktop />;
}



