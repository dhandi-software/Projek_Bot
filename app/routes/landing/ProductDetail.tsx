import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { ProductDetailDesktop, ProductDetailMobile } from "~/features/landing/product-detail/pages";

export function meta() {
  return [
    { title: "Product Details - Dhandi Ecommerce" },
    { name: "description", content: "Detail produk & spesifikasi Dhandi Ecommerce" },
  ];
}

export default function ProductDetail() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <ProductDetailMobile /> : <ProductDetailDesktop />;
}
