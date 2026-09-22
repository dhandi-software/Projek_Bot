import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { ProductManagementDesktop } from "~/features/products/components/ProductManagementDesktop/ProductManagementDesktop";
import { ProductManagementMobile } from "~/features/products/components/ProductManagementMobile/ProductManagementMobile";

export default function AdminProductsRoute() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <ProductManagementMobile /> : <ProductManagementDesktop />;
}
