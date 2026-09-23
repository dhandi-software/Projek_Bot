import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { BannerManagementDesktop } from "~/features/products/components/BannerManagementDesktop/BannerManagementDesktop";
import { BannerManagementMobile } from "~/features/products/components/BannerManagementMobile/BannerManagementMobile";

export default function AdminBannersRoute() {
  const { isMobile } = useOutletContext<ContextType>();
  return isMobile ? <BannerManagementMobile /> : <BannerManagementDesktop />;
}
