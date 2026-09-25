import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { CategoryManagementDesktop } from "~/features/products/components/CategoryManagementDesktop/CategoryManagementDesktop";
import { CategoryManagementMobile } from "~/features/products/components/CategoryManagementMobile/CategoryManagementMobile";

export default function AdminKategoriRoute() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <CategoryManagementMobile /> : <CategoryManagementDesktop />;
}

