import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";

import { NeedHelpDesktop, NeedHelpMobile } from "~/features/landing/need-help";

export default function NeedHelpRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <NeedHelpMobile /> : <NeedHelpDesktop />;
}
