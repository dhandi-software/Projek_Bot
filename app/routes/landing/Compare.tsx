import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { CompareDesktop } from "~/features/landing/compare/CompareDesktop";
import { CompareMobile } from "~/features/landing/compare/CompareMobile";

export default function CompareRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <CompareMobile /> : <CompareDesktop />;
}
