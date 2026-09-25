import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import {
  ProductManagementDesktop,
  ProductManagementMobile,
} from "~/features/products/components/ProductManagement";

export default function AdminProductsRoute() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <ProductManagementMobile /> : <ProductManagementDesktop />;
}

